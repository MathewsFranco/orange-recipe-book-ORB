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

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

function editDistanceThreshold(word: string): number {
  if (word.length <= 3) return 0
  if (word.length <= 6) return 1
  return 2
}

function fuzzyWordsMatch(pantryName: string, recipeName: string): boolean {
  const pWords = pantryName.trim().toLowerCase().split(/\s+/)
  const rWords = recipeName.trim().toLowerCase().split(/\s+/)
  const [shorter, longer] =
    pWords.length <= rWords.length ? [pWords, rWords] : [rWords, pWords]
  return shorter.every((sw) =>
    longer.some((lw) => levenshtein(sw, lw) <= editDistanceThreshold(sw)),
  )
}

export function matchRecipe({ pantry, recipe }: MatchInput): MatchResult {
  const required = recipe.ingredients.filter((i) => !i.is_optional)

  if (required.length === 0) {
    return { match_percentage: 100, matched: [], missing: [] }
  }

  const matched: RecipeIngredient[] = []
  const missing: RecipeIngredient[] = []

  for (const ingredient of required) {
    if (pantry.some((p) => fuzzyWordsMatch(p.name, ingredient.ingredient_name))) {
      matched.push(ingredient)
    } else {
      missing.push(ingredient)
    }
  }

  const match_percentage = Math.round((matched.length / required.length) * 100)

  return { match_percentage, matched, missing }
}
