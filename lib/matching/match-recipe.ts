import type { Ingredient, RecipeIngredient } from '@/lib/types'

interface MatchInput {
  pantry: Ingredient[]
  recipe: { ingredients: RecipeIngredient[] }
}

interface MatchResult {
  match_percentage: number
  matched: RecipeIngredient[]
  missing: RecipeIngredient[]
}

export function matchRecipe({ pantry, recipe }: MatchInput): MatchResult {
  const required = recipe.ingredients.filter(i => !i.is_optional)

  if (required.length === 0) {
    return { match_percentage: 100, matched: [], missing: [] }
  }

  const pantryNames = new Set(
    pantry.map(i => i.name.trim().toLowerCase())
  )

  const matched: RecipeIngredient[] = []
  const missing: RecipeIngredient[] = []

  for (const ingredient of required) {
    const normalized = ingredient.ingredient_name.trim().toLowerCase()
    if (pantryNames.has(normalized)) {
      matched.push(ingredient)
    } else {
      missing.push(ingredient)
    }
  }

  const match_percentage = Math.round((matched.length / required.length) * 100)

  return { match_percentage, matched, missing }
}
