import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { hasEnvVars } from "@/lib/utils"
import { getRecipeById } from "@/lib/actions/recipes"
import { RecipeDetailView } from "@/components/recipes/recipe-detail"

interface RecipePageProps {
  params: Promise<{ id: string }>
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params
  const recipe = await getRecipeById(id)

  if (!recipe) notFound()

  let isLoggedIn = false
  if (hasEnvVars) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    isLoggedIn = !!data?.claims?.email
  }

  return <RecipeDetailView recipe={recipe} isLoggedIn={isLoggedIn} />
}
