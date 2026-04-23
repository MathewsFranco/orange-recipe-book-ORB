import Image from "next/image"
import { Clock, ChefHat, Users, Timer, Bookmark, FlaskConical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { RecipeDetail } from "@/lib/types"

interface RecipeDetailProps {
  recipe: RecipeDetail
}

export function RecipeDetailView({ recipe }: RecipeDetailProps) {
  const instructions = parseInstructions(recipe.instructions)

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Hero */}
      <div className="space-y-4">
        {recipe.image_url && (
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <h1
          className="text-5xl md:text-6xl leading-none tracking-wide text-foreground"
          style={{ fontFamily: "var(--font-bebas-neue)" }}
        >
          {recipe.title}
        </h1>

        {recipe.description && (
          <p className="text-muted-foreground text-base leading-relaxed">
            {recipe.description}
          </p>
        )}
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground border-y border-border py-4">
        {recipe.cuisine && (
          <MetaItem icon={<ChefHat className="size-4" />} label={recipe.cuisine} capitalize />
        )}
        {recipe.difficulty && (
          <MetaItem icon={<span className="size-4 flex items-center">⚡</span>} label={recipe.difficulty} capitalize />
        )}
        {recipe.prep_time != null && (
          <MetaItem icon={<Timer className="size-4" />} label={`${recipe.prep_time} min prep`} />
        )}
        {recipe.cooking_time != null && (
          <MetaItem icon={<Clock className="size-4" />} label={`${recipe.cooking_time} min cook`} />
        )}
        {recipe.servings != null && (
          <MetaItem icon={<Users className="size-4" />} label={`${recipe.servings} servings`} />
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button variant="default" className="gap-2" disabled>
          <Bookmark className="size-4" />
          Save recipe
        </Button>
        <Button variant="outline" className="gap-2" disabled>
          <FlaskConical className="size-4" />
          Check what I have
        </Button>
      </div>

      {/* Ingredients */}
      <section className="space-y-3">
        <h2
          className="text-3xl text-foreground"
          style={{ fontFamily: "var(--font-bebas-neue)" }}
        >
          Ingredients
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ing) => (
            <li
              key={ing.id ?? ing.ingredient_name}
              className="flex items-baseline gap-2 py-1.5 border-b border-border/50 last:border-0"
            >
              <span className="text-sm font-medium text-foreground capitalize flex-1">
                {ing.ingredient_name}
              </span>
              {(ing.quantity != null || ing.unit) && (
                <span className="text-sm text-muted-foreground shrink-0">
                  {ing.quantity != null ? ing.quantity : ""}
                  {ing.unit ? ` ${ing.unit}` : ""}
                </span>
              )}
              {ing.is_optional && (
                <Badge variant="secondary" className="text-xs shrink-0">
                  optional
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      {instructions.length > 0 && (
        <section className="space-y-3">
          <h2
            className="text-3xl text-foreground"
            style={{ fontFamily: "var(--font-bebas-neue)" }}
          >
            Instructions
          </h2>
          <ol className="space-y-4">
            {instructions.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span
                  className={cn(
                    "shrink-0 size-7 rounded-full flex items-center justify-center text-sm font-bold",
                    "bg-primary text-primary-foreground"
                  )}
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-foreground pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}
    </article>
  )
}

function MetaItem({
  icon,
  label,
  capitalize,
}: {
  icon: React.ReactNode
  label: string
  capitalize?: boolean
}) {
  return (
    <span className={cn("flex items-center gap-1.5", capitalize && "capitalize")}>
      {icon}
      {label}
    </span>
  )
}

function parseInstructions(raw: string | null): string[] {
  if (!raw) return []
  // Split on newlines or numbered patterns like "1." / "1)" and filter empties
  const lines = raw
    .split(/\n|(?=\d+[.)]\s)/)
    .map((s) => s.replace(/^\d+[.)]\s*/, "").trim())
    .filter(Boolean)
  return lines
}
