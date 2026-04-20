import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

type SpoonacularIngredient = {
  name?: string
  originalName?: string
  amount?: number
  unit?: string
}

type SpoonacularStep = { number: number; step: string }

type SpoonacularRecipe = {
  id: number
  title?: string
  summary?: string
  image?: string
  readyInMinutes?: number
  cookingMinutes?: number
  preparationMinutes?: number
  servings?: number
  cuisines?: string[]
  instructions?: string
  analyzedInstructions?: { steps: SpoonacularStep[] }[]
  extendedIngredients?: SpoonacularIngredient[]
}

const CUISINES = [
  'italian', 'mexican', 'asian', 'american', 'french',
  'indian', 'mediterranean', 'japanese', 'thai', 'greek',
]
const PER_CUISINE = 25

const UNIT_MAP: Record<string, string> = {
  tablespoon: 'tbsp', tablespoons: 'tbsp', tbsp: 'tbsp', tbsps: 'tbsp',
  teaspoon: 'tsp', teaspoons: 'tsp', tsp: 'tsp', tsps: 'tsp',
  cup: 'cup', cups: 'cup',
  gram: 'g', grams: 'g', g: 'g',
  kilogram: 'kg', kilograms: 'kg', kg: 'kg',
  milligram: 'mg', milligrams: 'mg', mg: 'mg',
  milliliter: 'ml', milliliters: 'ml', ml: 'ml',
  liter: 'l', liters: 'l', l: 'l',
  ounce: 'oz', ounces: 'oz', oz: 'oz',
  pound: 'lb', pounds: 'lb', lb: 'lb',
  pint: 'pt', pints: 'pt', pt: 'pt',
  quart: 'qt', quarts: 'qt', qt: 'qt',
  pinch: 'pinch', pinches: 'pinch',
  handful: 'handful', handfuls: 'handful',
}

function normalizeUnit(raw: string): string {
  return UNIT_MAP[raw.toLowerCase().trim()] ?? 'unit'
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim()
}

function extractInstructions(recipe: SpoonacularRecipe): string {
  if (recipe.analyzedInstructions?.length) {
    const steps = recipe.analyzedInstructions[0].steps
    if (steps?.length) {
      return steps.map((s) => `${s.number}. ${s.step}`).join('\n')
    }
  }
  if (recipe.instructions) return stripHtml(recipe.instructions)
  return 'See source for instructions.'
}

function deriveDifficulty(minutes: number | null | undefined): 'easy' | 'medium' | 'hard' {
  if (!minutes || minutes < 30) return 'easy'
  if (minutes <= 60) return 'medium'
  return 'hard'
}

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-admin-secret')
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const apiKey = process.env.SPOONACULAR_API_KEY
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  let seeded = 0
  let skipped = 0

  for (const cuisine of CUISINES) {
    const searchRes = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=${PER_CUISINE}&apiKey=${apiKey}`
    )
    const { results } = await searchRes.json()

    for (const { id } of (results ?? [])) {
      const infoRes = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
      )
      const r: SpoonacularRecipe = await infoRes.json()

      const recipeRow = {
        external_id: String(r.id),
        title: r.title ?? 'Untitled',
        description: r.summary ? stripHtml(r.summary).slice(0, 1000) : null,
        image_url: r.image ?? null,
        source: 'spoonacular' as const,
        difficulty: deriveDifficulty(r.readyInMinutes),
        cooking_time: r.cookingMinutes ?? r.readyInMinutes ?? null,
        prep_time: r.preparationMinutes ?? null,
        servings: r.servings ?? 4,
        cuisine: r.cuisines?.[0] ?? cuisine,
        instructions: extractInstructions(r),
      }

      const { data: inserted } = await supabase
        .from('recipes')
        .upsert(recipeRow, { onConflict: 'external_id', ignoreDuplicates: true })
        .select('id')
        .maybeSingle()

      if (!inserted) {
        skipped++
        continue
      }

      const ingredientRows = (r.extendedIngredients ?? []).map((ing) => ({
        recipe_id: inserted.id,
        ingredient_name: ing.name ?? ing.originalName ?? 'unknown',
        quantity: ing.amount ?? 0,
        unit: normalizeUnit(ing.unit ?? ''),
        is_optional: false,
      }))

      if (ingredientRows.length) {
        await supabase
          .from('recipe_ingredients')
          .upsert(ingredientRows, { onConflict: 'recipe_id,ingredient_name', ignoreDuplicates: true })
      }

      seeded++
    }
  }

  return NextResponse.json({ seeded, skipped })
}
