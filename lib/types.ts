export interface Ingredient {
  id?: string
  name: string
  quantity?: number
  unit?: string
  category?: string
}

export type IngredientUnit =
  | "g" | "kg" | "mg" | "ml" | "l" | "cup" | "tbsp" | "tsp"
  | "oz" | "lb" | "pt" | "qt" | "unit" | "pinch" | "handful"

export type IngredientCategory = "pantry" | "fridge" | "freezer" | "other"

export interface PantryIngredient {
  id: string
  user_id: string
  name: string
  quantity: number
  unit: IngredientUnit
  category: IngredientCategory
  expires_at: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface IngredientInput {
  name: string
  quantity: number
  unit: IngredientUnit
  category: IngredientCategory
  expires_at?: string | null
}

export interface RecipeIngredient {
  id?: string
  recipe_id?: string
  ingredient_name: string
  quantity?: number
  unit?: string
  is_optional?: boolean
  notes?: string
}

export interface Recipe {
  id?: string
  title: string
  description?: string
  image_url?: string
  ingredients: RecipeIngredient[]
}

export interface RecipeSearchResult {
  id: string
  title: string
  image_url: string | null
  cuisine: string | null
  cooking_time: number | null
}

export interface SearchSuggestion {
  type: "recipe" | "ingredient"
  label: string
}

export interface RecipeWithMatch extends Recipe {
  match_percentage: number
  matched: RecipeIngredient[]
  missing: RecipeIngredient[]
}

export interface RecipeDetail {
  id: string
  title: string
  description: string | null
  image_url: string | null
  cuisine: string | null
  difficulty: string | null
  cooking_time: number | null
  prep_time: number | null
  servings: number | null
  instructions: string | null
  ingredients: RecipeIngredient[]
}
