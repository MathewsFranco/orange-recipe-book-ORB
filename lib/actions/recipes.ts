"use server"

import { createClient } from "@/lib/supabase/server"
import type { RecipeSearchResult } from "@/lib/types"

export async function searchRecipes(query: string): Promise<RecipeSearchResult[]> {
  if (!query.trim()) return []

  const supabase = await createClient()
  const term = query.trim()

  const [{ data: titleMatches }, { data: ingredientMatches }] = await Promise.all([
    supabase
      .from("recipes")
      .select("id, title, image_url, cuisine, cooking_time")
      .ilike("title", `%${term}%`),
    supabase
      .from("recipe_ingredients")
      .select("recipe_id")
      .ilike("ingredient_name", `%${term}%`),
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
    ingredientOnlyRecipes = (data ?? []) as RecipeSearchResult[]
  }

  const byCookTime = (a: RecipeSearchResult, b: RecipeSearchResult) =>
    (a.cooking_time ?? 9999) - (b.cooking_time ?? 9999)

  return [
    ...(titleMatches ?? []).sort(byCookTime),
    ...ingredientOnlyRecipes.sort(byCookTime),
  ] as RecipeSearchResult[]
}
