import Link from "next/link"
import Image from "next/image"
import { Clock, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { RecipeSearchResult } from "@/lib/types"

interface RecipeCardProps {
  recipe: RecipeSearchResult
}

export function RecipeCard({ recipe }: RecipeCardProps) {
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
        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5"
          disabled
          aria-label="Save recipe"
        >
          <Bookmark className="size-3.5" />
          Save
        </Button>
      </div>
    </div>
  )
}
