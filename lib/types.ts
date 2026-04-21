export interface Ingredient {
  id?: string
  name: string
  quantity?: number
  unit?: string
  category?: string
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
