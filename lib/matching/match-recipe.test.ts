import { describe, it, expect } from 'vitest'
import { matchRecipe } from './match-recipe'
import type { Ingredient, RecipeIngredient } from '@/lib/types'

const ing = (name: string, is_optional = false): RecipeIngredient => ({
  ingredient_name: name,
  is_optional,
})

const pantryItem = (name: string): Ingredient => ({ name })

describe('matchRecipe', () => {
  it('empty pantry returns 0% with all required as missing', () => {
    const result = matchRecipe({
      pantry: [],
      recipe: { ingredients: [ing('eggs'), ing('flour')] },
    })
    expect(result.match_percentage).toBe(0)
    expect(result.matched).toHaveLength(0)
    expect(result.missing).toHaveLength(2)
  })

  it('full match returns 100% with all in matched', () => {
    const result = matchRecipe({
      pantry: [pantryItem('eggs'), pantryItem('flour'), pantryItem('butter')],
      recipe: { ingredients: [ing('eggs'), ing('flour'), ing('butter')] },
    })
    expect(result.match_percentage).toBe(100)
    expect(result.matched).toHaveLength(3)
    expect(result.missing).toHaveLength(0)
  })

  it('partial match returns correct percentage and split', () => {
    const result = matchRecipe({
      pantry: [pantryItem('eggs')],
      recipe: { ingredients: [ing('eggs'), ing('flour')] },
    })
    expect(result.match_percentage).toBe(50)
    expect(result.matched).toHaveLength(1)
    expect(result.missing).toHaveLength(1)
  })

  it('optional ingredients are excluded from denominator', () => {
    const result = matchRecipe({
      pantry: [],
      recipe: {
        ingredients: [
          ing('garnish', true),
          ing('sauce', true),
        ],
      },
    })
    expect(result.match_percentage).toBe(100)
    expect(result.matched).toHaveLength(0)
    expect(result.missing).toHaveLength(0)
  })

  it('optional ingredients do not count as missing when absent from pantry', () => {
    const result = matchRecipe({
      pantry: [pantryItem('eggs')],
      recipe: {
        ingredients: [ing('eggs'), ing('garnish', true)],
      },
    })
    expect(result.match_percentage).toBe(100)
    expect(result.matched).toHaveLength(1)
    expect(result.missing).toHaveLength(0)
  })

  it('matching is case-insensitive', () => {
    const result = matchRecipe({
      pantry: [pantryItem('Flour')],
      recipe: { ingredients: [ing('flour')] },
    })
    expect(result.match_percentage).toBe(100)
  })

  it('matching trims whitespace', () => {
    const result = matchRecipe({
      pantry: [pantryItem('  eggs  ')],
      recipe: { ingredients: [ing(' eggs ')] },
    })
    expect(result.match_percentage).toBe(100)
  })
})
