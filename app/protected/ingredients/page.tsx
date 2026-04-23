import { Suspense } from "react"
import { getIngredients } from "@/lib/actions/ingredients"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"
import { IngredientList } from "@/components/ingredients/ingredient-list"
import { AddIngredientDialog } from "@/components/ingredients/add-ingredient-dialog"

export const metadata = { title: "My Pantry — ORB" }

async function PantryContent() {
  const qc = new QueryClient()
  await qc.prefetchQuery({ queryKey: ["ingredients"], queryFn: getIngredients })

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <IngredientList />
    </HydrationBoundary>
  )
}

export default function IngredientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl">My Pantry</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track what you have at home
          </p>
        </div>
        <AddIngredientDialog />
      </div>
      <Suspense
        fallback={
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-muted h-10 animate-pulse rounded-md" />
            ))}
          </div>
        }
      >
        <PantryContent />
      </Suspense>
    </div>
  )
}
