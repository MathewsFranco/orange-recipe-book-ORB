"use client"

import { useState, useEffect, useRef, useTransition } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RecipeGrid } from "./recipe-grid"
import { searchRecipes } from "@/lib/actions/recipes"
import type { RecipeSearchResult } from "@/lib/types"

export function RecipeSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<RecipeSearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isPending, startTransition] = useTransition()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    debounceRef.current = setTimeout(() => {
      startTransition(async () => {
        const data = await searchRecipes(query)
        setResults(data)
        setHasSearched(true)
      })
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="relative w-full max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search by recipe name or ingredient…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 pl-12 pr-4 text-base rounded-xl shadow-sm"
          autoFocus
        />
      </div>

      {isPending && (
        <p className="text-sm text-muted-foreground animate-pulse">Searching…</p>
      )}

      {!isPending && hasSearched && results.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No recipes found for &ldquo;{query}&rdquo;.
        </p>
      )}

      {!isPending && results.length > 0 && (
        <RecipeGrid recipes={results} />
      )}
    </div>
  )
}
