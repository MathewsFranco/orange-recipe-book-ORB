"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  addIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from "@/lib/actions/ingredients"
import type { IngredientInput, PantryIngredient } from "@/lib/types"

const QUERY_KEY = ["ingredients"] as const

export function useIngredients() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: getIngredients,
  })
}

export function useAddIngredient() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: IngredientInput) => addIngredient(input),
    onSuccess: (item) => {
      qc.setQueryData<PantryIngredient[]>(QUERY_KEY, (prev = []) =>
        [...prev, item].sort((a, b) => a.name.localeCompare(b.name)),
      )
    },
  })
}

export function useUpdateIngredient() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<IngredientInput> }) =>
      updateIngredient(id, input),
    onSuccess: (updated) => {
      qc.setQueryData<PantryIngredient[]>(QUERY_KEY, (prev = []) =>
        prev.map((i) => (i.id === updated.id ? updated : i)),
      )
    },
  })
}

export function useDeleteIngredient() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteIngredient(id),
    onSuccess: (_, id) => {
      qc.setQueryData<PantryIngredient[]>(QUERY_KEY, (prev = []) =>
        prev.filter((i) => i.id !== id),
      )
    },
  })
}
