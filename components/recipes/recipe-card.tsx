import Link from "next/link"
import Image from "next/image"
import { Clock, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthNudge } from "@/components/auth-nudge"
import { cn } from "@/lib/utils"
import type { RecipeSearchResultWithMatch } from "@/lib/types"

interface RecipeCardProps {
  recipe: RecipeSearchResultWithMatch
  isLoggedIn: boolean
}

function matchBadgeClass(pct: number) {
  if (pct >= 80) return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
  if (pct >= 40) return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400"
  return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
}

export function RecipeCard({ recipe, isLoggedIn }: RecipeCardProps) {
  return (
    <div className="group relative flex flex-col rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/recipes/${recipe.id}`} className="flex flex-col flex-1">
        <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl select-none">
              🍽️
            </div>
          )}

          {recipe.match_percentage !== undefined && (
            <span
              className={cn(
                "absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full",
                matchBadgeClass(recipe.match_percentage),
              )}
            >
              {recipe.match_percentage}%
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5 p-4 flex-1">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-card-foreground">
            {recipe.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-1">
            {recipe.cuisine && (
              <span className="capitalize">{recipe.cuisine}</span>
            )}
            {recipe.cooking_time != null && (
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {recipe.cooking_time} min
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <AuthNudge message="Sign in to save recipes for later." isLoggedIn={isLoggedIn}>
          <Button variant="outline" size="sm" className="w-full gap-1.5" aria-label="Save recipe">
            <Bookmark className="size-3.5" />
            Save
          </Button>
        </AuthNudge>
      </div>
    </div>
  )
}
