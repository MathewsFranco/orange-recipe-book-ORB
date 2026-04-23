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
  const { supabase, userId } = await getAuthedClient()
  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .eq("user_id", userId)
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
    .insert({
      name,
      quantity: input.quantity,
      unit: input.unit,
      category: input.category,
      expires_at: input.expires_at ?? null,
      user_id: userId,
    })
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
  const patch: Partial<IngredientInput> = {}
  if (input.name !== undefined) {
    const name = input.name.trim()
    if (!name) throw new Error("Name is required")
    patch.name = name
  }
  if (input.quantity !== undefined) {
    if (input.quantity <= 0) throw new Error("Quantity must be positive")
    patch.quantity = input.quantity
  }
  if (input.unit !== undefined) patch.unit = input.unit
  if (input.category !== undefined) patch.category = input.category
  if (input.expires_at !== undefined) patch.expires_at = input.expires_at

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
