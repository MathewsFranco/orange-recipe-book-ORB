import { RecipeSearch } from "@/components/recipes/recipe-search"

export default function Home() {
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

        <RecipeSearch />
      </div>
    </main>
  )
}
