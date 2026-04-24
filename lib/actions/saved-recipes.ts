"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

async function getAuthedClient() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) redirect("/auth/login")
  return { supabase, userId: data.claims.sub as string }
}

export async function toggleSavedRecipe(recipeId: string): Promise<boolean> {
  const { supabase, userId } = await getAuthedClient()

  const { data: existing } = await supabase
    .from("saved_recipes")
    .select("id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId)
    .maybeSingle()

  if (existing) {
    await supabase.from("saved_recipes").delete().eq("id", existing.id)
    return false
  }

  await supabase.from("saved_recipes").insert({ user_id: userId, recipe_id: recipeId })
  return true
}

export async function getIsSaved(recipeId: string): Promise<boolean> {
  const supabase = await createClient()
  const { data: authData } = await supabase.auth.getClaims()
  const userId = authData?.claims?.sub as string | undefined
  if (!userId) return false

  const { data } = await supabase
    .from("saved_recipes")
    .select("id")
    .eq("user_id", userId)
    .eq("recipe_id", recipeId)
    .maybeSingle()

  return !!data
}
