"use server"

import { createClient } from "@/lib/supabase/server"
import type { RecipeSearchResult, SearchSuggestion } from "@/lib/types"

const MIN_QUERY_LENGTH = 2
const SEARCH_LIMIT = 50
const SUGGESTION_LIMIT = 5

export async function searchRecipes(query: string): Promise<RecipeSearchResult[]> {
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

  const byCookTime = (a: RecipeSearchResult, b: RecipeSearchResult) =>
    (a.cooking_time ?? 9999) - (b.cooking_time ?? 9999)

  return [
    ...(titleMatches ?? []).sort(byCookTime),
    ...ingredientOnlyRecipes.sort(byCookTime),
  ] as RecipeSearchResult[]
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
      .limit(SUGGESTION_LIMIT),
    supabase
      .from("recipe_ingredients")
      .select("ingredient_name")
      .ilike("ingredient_name", `%${term}%`)
      .limit(SUGGESTION_LIMIT),
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
