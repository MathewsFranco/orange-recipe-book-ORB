"use client"

import { useIngredients } from "@/lib/hooks/use-ingredients"
import { IngredientCard } from "./ingredient-card"
import { AddIngredientDialog } from "./add-ingredient-dialog"
import type { IngredientCategory, PantryIngredient } from "@/lib/types"

const SECTION_ORDER: IngredientCategory[] = ["pantry", "fridge", "freezer", "other"]
const SECTION_LABELS: Record<IngredientCategory, string> = {
  pantry: "Pantry",
  fridge: "Fridge",
  freezer: "Freezer",
  other: "Other",
}

export function IngredientList() {
  const { data, isLoading, isError } = useIngredients()

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-muted h-10 animate-pulse rounded-md" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Failed to load ingredients. Please refresh.
      </p>
    )
  }

  const grouped = (data ?? []).reduce<Record<IngredientCategory, PantryIngredient[]>>(
    (acc, item) => {
      const cat = item.category as IngredientCategory
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(item)
      return acc
    },
    { pantry: [], fridge: [], freezer: [], other: [] },
  )

  const nonEmptySections = SECTION_ORDER.filter((cat) => grouped[cat].length > 0)

  if (nonEmptySections.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-muted-foreground text-sm">
          Your pantry is empty. Add your first ingredient to get started.
        </p>
        <AddIngredientDialog />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {nonEmptySections.map((cat) => (
        <section key={cat}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {SECTION_LABELS[cat]}
              <span className="ml-2 text-xs font-normal">
                ({grouped[cat].length})
              </span>
            </h2>
            <AddIngredientDialog defaultCategory={cat} />
          </div>
          <div className="space-y-2">
            {grouped[cat].map((item) => (
              <IngredientCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
