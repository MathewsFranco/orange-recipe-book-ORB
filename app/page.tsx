import { createClient } from "@/lib/supabase/server"
import { hasEnvVars } from "@/lib/utils"
import { RecipeSearch } from "@/components/recipes/recipe-search"

export default async function Home() {
  let isLoggedIn = false
  if (hasEnvVars) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    isLoggedIn = !!data?.claims?.email
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] flex flex-col items-center px-4 pt-16 pb-16">
      <div className="w-full max-w-5xl flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="font-[family-name:var(--font-bebas-neue)] text-[6rem] sm:text-[8rem] leading-none tracking-wide text-primary">
            ORB
          </h1>
          <p className="text-lg text-muted-foreground max-w-sm">
            Ingredient-first recipe discovery. Search by what you have.
          </p>
        </div>

        <RecipeSearch isLoggedIn={isLoggedIn} />
      </div>
    </main>
  )
}
