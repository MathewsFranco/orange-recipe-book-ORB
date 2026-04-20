import { RecipeCard } from "./recipe-card"
import type { RecipeSearchResult } from "@/lib/types"

interface RecipeGridProps {
  recipes: RecipeSearchResult[]
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  if (recipes.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
