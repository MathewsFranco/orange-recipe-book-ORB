"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { PantryIngredient, IngredientInput } from "@/lib/types"

async function getAuthedClient() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) redirect("/auth/login")
  return { supabase, userId: data.claims.sub as string }
}

export async function getIngredients(): Promise<PantryIngredient[]> {
  const { supabase } = await getAuthedClient()
  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .order("name")
  if (error) throw new Error(error.message)
  return (data ?? []) as PantryIngredient[]
}

export async function addIngredient(input: IngredientInput): Promise<PantryIngredient> {
  const { supabase, userId } = await getAuthedClient()
  const name = input.name.trim()
  if (!name) throw new Error("Name is required")
  if (input.quantity <= 0) throw new Error("Quantity must be positive")

  const { data, error } = await supabase
    .from("ingredients")
    .insert({ ...input, name, user_id: userId })
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as PantryIngredient
}

export async function updateIngredient(
  id: string,
  input: Partial<IngredientInput>,
): Promise<PantryIngredient> {
  const { supabase, userId } = await getAuthedClient()
  const patch: Partial<IngredientInput> = { ...input }
  if (patch.name !== undefined) {
    const name = patch.name.trim()
    if (!name) throw new Error("Name is required")
    patch.name = name
  }
  if (patch.quantity !== undefined && patch.quantity <= 0) {
    throw new Error("Quantity must be positive")
  }

  const { data, error } = await supabase
    .from("ingredients")
    .update(patch)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data as PantryIngredient
}

export async function deleteIngredient(id: string): Promise<void> {
  const { supabase, userId } = await getAuthedClient()
  const { error } = await supabase
    .from("ingredients")
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
  if (error) throw new Error(error.message)
}
