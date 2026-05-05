import { RecipeCard } from "./recipe-card"
import type { RecipeSearchResultWithMatch } from "@/lib/types"

interface RecipeGridProps {
  recipes: RecipeSearchResultWithMatch[]
  isLoggedIn: boolean
}

export function RecipeGrid({ recipes, isLoggedIn }: RecipeGridProps) {
  if (recipes.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  )
}
