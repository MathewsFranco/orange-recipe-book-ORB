import Link from "next/link"
import Image from "next/image"
import { Clock, ChefHat, Users, Timer, FlaskConical, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AuthNudge } from "@/components/auth-nudge"
import { SaveButton } from "@/components/recipes/save-button"
import { cn } from "@/lib/utils"
import type { MatchResult, RecipeDetail, RecipeIngredient } from "@/lib/types"

interface RecipeDetailProps {
  recipe: RecipeDetail
  isLoggedIn: boolean
  matchResult?: MatchResult
  isSaved?: boolean
}

export function RecipeDetailView({ recipe, isLoggedIn, matchResult, isSaved = false }: RecipeDetailProps) {
  const instructions = parseInstructions(recipe.instructions)

  const requiredCount = recipe.ingredients.filter((i) => !i.is_optional).length
  const matchedNames = matchResult
    ? new Set(matchResult.matched.map((i) => i.ingredient_name.trim().toLowerCase()))
    : null

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

      {/* Match summary band */}
      {matchResult && (
        <div className={cn(
          "rounded-xl px-5 py-3 text-sm font-medium flex items-center gap-2",
          matchResult.match_percentage >= 80
            ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
            : matchResult.match_percentage >= 40
            ? "bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
            : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        )}>
          <span className="text-base font-bold">{matchResult.match_percentage}%</span>
          <span>
            You have {matchResult.matched.length} of {requiredCount} ingredient{requiredCount !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {isLoggedIn ? (
          <>
            <SaveButton recipeId={recipe.id} initialSaved={isSaved} />
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/protected">
                <FlaskConical className="size-4" />
                Manage pantry
              </Link>
            </Button>
          </>
        ) : (
          <>
            <AuthNudge message="Sign in to save recipes for later." isLoggedIn={false}>
              <Button variant="default" className="gap-2">
                <FlaskConical className="size-4" />
                Save recipe
              </Button>
            </AuthNudge>
            <AuthNudge message="Sign in to check which ingredients you already have." isLoggedIn={false}>
              <Button variant="outline" className="gap-2">
                <FlaskConical className="size-4" />
                Check what I have
              </Button>
            </AuthNudge>
          </>
        )}
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
            <IngredientRow
              key={ing.id ?? ing.ingredient_name}
              ingredient={ing}
              matchedNames={matchedNames}
            />
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
                    "bg-primary text-primary-foreground",
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

function IngredientRow({
  ingredient,
  matchedNames,
}: {
  ingredient: RecipeIngredient
  matchedNames: Set<string> | null
}) {
  const isRequired = !ingredient.is_optional
  const isMatched =
    isRequired && matchedNames !== null
      ? matchedNames.has(ingredient.ingredient_name.trim().toLowerCase())
      : null

  return (
    <li className="flex items-baseline gap-2 py-1.5 border-b border-border/50 last:border-0">
      {isMatched !== null && (
        <span className="shrink-0 mt-0.5 self-start">
          {isMatched ? (
            <CheckCircle2 className="size-4 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="size-4 text-red-500 dark:text-red-400" />
          )}
        </span>
      )}
      <span className="text-sm font-medium text-foreground capitalize flex-1">
        {ingredient.ingredient_name}
      </span>
      {(ingredient.quantity != null || ingredient.unit) && (
        <span className="text-sm text-muted-foreground shrink-0">
          {ingredient.quantity != null ? ingredient.quantity : ""}
          {ingredient.unit ? ` ${ingredient.unit}` : ""}
        </span>
      )}
      {ingredient.is_optional && (
        <Badge variant="secondary" className="text-xs shrink-0">
          optional
        </Badge>
      )}
    </li>
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
  const lines = raw
    .split(/\n|(?=\d+[.)]\s)/)
    .map((s) => s.replace(/^\d+[.)]\s*/, "").trim())
    .filter(Boolean)
  return lines
}
