import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { hasEnvVars } from "@/lib/utils"
import { getRecipeById } from "@/lib/actions/recipes"
import { getIsSaved } from "@/lib/actions/saved-recipes"
import { matchRecipe } from "@/lib/matching/match-recipe"
import { RecipeDetailView } from "@/components/recipes/recipe-detail"
import type { Ingredient, MatchResult } from "@/lib/types"

interface RecipePageProps {
  params: Promise<{ id: string }>
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const recipe = await getRecipeById(id)

  if (!recipe) notFound()

  let isLoggedIn = false
  let matchResult: MatchResult | undefined
  let isSaved = false

  if (hasEnvVars) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const userId = data?.claims?.sub as string | undefined
    isLoggedIn = !!data?.claims?.email

    if (userId) {
      const [{ data: pantryRows }, savedStatus] = await Promise.all([
        supabase.from("ingredients").select("name").eq("user_id", userId),
        getIsSaved(id),
      ])

      const pantry: Ingredient[] = (pantryRows ?? []).map((p) => ({ name: p.name }))
      matchResult = matchRecipe({ pantry, recipe })
      isSaved = savedStatus
    }
  }

  return (
    <RecipeDetailView
      recipe={recipe}
      isLoggedIn={isLoggedIn}
      matchResult={matchResult}
      isSaved={isSaved}
    />
  )
}
