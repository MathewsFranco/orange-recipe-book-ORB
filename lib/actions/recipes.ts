"use server"

import { createClient } from "@/lib/supabase/server"
import { matchRecipe } from "@/lib/matching/match-recipe"
import type {
  Ingredient,
  RecipeDetail,
  RecipeSearchResult,
  RecipeSearchResultWithMatch,
  SearchSuggestion,
} from "@/lib/types"

const MIN_QUERY_LENGTH = 2
const SEARCH_LIMIT = 50

export async function searchRecipes(query: string): Promise<RecipeSearchResultWithMatch[]> {
  const term = query.trim()
  if (term.length < MIN_QUERY_LENGTH) return []

  const supabase = await createClient()

  const [{ data: titleMatches }, { data: ingredientMatches }] = await Promise.all([
    supabase
      .from("recipes")
      .select("id, title, image_url, cuisine, cooking_time")
      .ilike("title", `%${term}%`)
      .limit(SEARCH_LIMIT),
    supabase
      .from("recipe_ingredients")
      .select("recipe_id")
      .ilike("ingredient_name", `%${term}%`)
      .limit(SEARCH_LIMIT),
  ])

  const titleMatchIds = new Set((titleMatches ?? []).map((r) => r.id))

  const ingredientOnlyIds = [
    ...new Set((ingredientMatches ?? []).map((r) => r.recipe_id)),
  ].filter((id) => !titleMatchIds.has(id))

  let ingredientOnlyRecipes: RecipeSearchResult[] = []
  if (ingredientOnlyIds.length > 0) {
    const { data } = await supabase
      .from("recipes")
      .select("id, title, image_url, cuisine, cooking_time")
      .in("id", ingredientOnlyIds)
      .limit(SEARCH_LIMIT)
    ingredientOnlyRecipes = (data ?? []) as RecipeSearchResult[]
  }

  const allResults: RecipeSearchResult[] = [
    ...((titleMatches ?? []) as RecipeSearchResult[]),
    ...ingredientOnlyRecipes,
  ]

  const byCookTime = (a: RecipeSearchResult, b: RecipeSearchResult) =>
    (a.cooking_time ?? 9999) - (b.cooking_time ?? 9999)

  const { data: authData } = await supabase.auth.getClaims()
  const userId = authData?.claims?.sub as string | undefined

  if (!userId) {
    return allResults.sort(byCookTime)
  }

  const recipeIds = allResults.map((r) => r.id)

  const [{ data: pantryRows }, { data: recipeIngredients }] = await Promise.all([
    supabase.from("ingredients").select("name").eq("user_id", userId),
    supabase
      .from("recipe_ingredients")
      .select("recipe_id, ingredient_name, is_optional")
      .in("recipe_id", recipeIds),
  ])

  const pantry: Ingredient[] = (pantryRows ?? []).map((p) => ({ name: p.name }))

  const ingredientsByRecipe = new Map<
    string,
    { recipe_id: string; ingredient_name: string; is_optional: boolean }[]
  >()
  for (const ri of recipeIngredients ?? []) {
    const list = ingredientsByRecipe.get(ri.recipe_id) ?? []
    list.push(ri)
    ingredientsByRecipe.set(ri.recipe_id, list)
  }

  const withMatch: RecipeSearchResultWithMatch[] = allResults.map((recipe) => {
    const ingredients = ingredientsByRecipe.get(recipe.id) ?? []
    const { match_percentage } = matchRecipe({ pantry, recipe: { ingredients } })
    return { ...recipe, match_percentage }
  })

  return withMatch.sort((a, b) => {
    const matchDiff = (b.match_percentage ?? 0) - (a.match_percentage ?? 0)
    if (matchDiff !== 0) return matchDiff
    return (a.cooking_time ?? 9999) - (b.cooking_time ?? 9999)
  })
}

export async function getSuggestions(query: string): Promise<SearchSuggestion[]> {
  const term = query.trim()
  if (term.length < MIN_QUERY_LENGTH) return []

  const supabase = await createClient()

  const [{ data: recipes }, { data: ingredients }] = await Promise.all([
    supabase
      .from("recipes")
      .select("title")
      .ilike("title", `%${term}%`)
      .limit(5),
    supabase
      .from("recipe_ingredients")
      .select("ingredient_name")
      .ilike("ingredient_name", `%${term}%`)
      .limit(5),
  ])

  const recipeSuggestions: SearchSuggestion[] = (recipes ?? []).map((r) => ({
    type: "recipe",
    label: r.title,
  }))

  const seen = new Set(recipeSuggestions.map((s) => s.label.toLowerCase()))

  const ingredientSuggestions: SearchSuggestion[] = []
  for (const row of ingredients ?? []) {
    const key = row.ingredient_name.toLowerCase()
    if (!seen.has(key)) {
      seen.add(key)
      ingredientSuggestions.push({ type: "ingredient", label: row.ingredient_name })
    }
  }

  return [...recipeSuggestions, ...ingredientSuggestions]
}

export async function getRecipeById(id: string): Promise<RecipeDetail | null> {
  const supabase = await createClient()

  const { data: recipe, error: recipeError } = await supabase
    .from("recipes")
    .select("id, title, description, image_url, cuisine, difficulty, cooking_time, prep_time, servings, instructions")
    .eq("id", id)
    .maybeSingle()

  if (recipeError) throw recipeError
  if (!recipe) return null

  const { data: ingredients, error: ingredientsError } = await supabase
    .from("recipe_ingredients")
    .select("id, recipe_id, ingredient_name, quantity, unit, is_optional, notes")
    .eq("recipe_id", id)
    .order("ingredient_name")

  if (ingredientsError) throw ingredientsError

  return { ...recipe, ingredients: ingredients ?? [] }
}
