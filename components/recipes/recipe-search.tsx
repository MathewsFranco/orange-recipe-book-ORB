"use client"

import { useState, useEffect, useRef, useTransition } from "react"
import { Search, UtensilsCrossed, Leaf } from "lucide-react"
import { Input } from "@/components/ui/input"
import { RecipeGrid } from "./recipe-grid"
import { searchRecipes, getSuggestions } from "@/lib/actions/recipes"
import type { RecipeSearchResult, SearchSuggestion } from "@/lib/types"

const MIN_QUERY_LENGTH = 2

interface RecipeSearchProps {
  isLoggedIn: boolean
}

export function RecipeSearch({ isLoggedIn }: RecipeSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [results, setResults] = useState<RecipeSearchResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [isPending, startTransition] = useTransition()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const suppressSuggestionsRef = useRef(false)

  // Fetch suggestions as user types
  useEffect(() => {
    if (suppressSuggestionsRef.current) {
      suppressSuggestionsRef.current = false
      return
    }

    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (query.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([])
      setShowSuggestions(false)
      setActiveIndex(-1)
      return
    }

    const capturedQuery = query

    debounceRef.current = setTimeout(async () => {
      const data = await getSuggestions(capturedQuery)
      if (capturedQuery !== query) return
      setSuggestions(data)
      setShowSuggestions(data.length > 0)
      setActiveIndex(-1)
    }, 200)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function commitSearch(term: string) {
    suppressSuggestionsRef.current = true
    setQuery(term)
    setShowSuggestions(false)
    setActiveIndex(-1)

    const capturedTerm = term

    startTransition(async () => {
      const data = await searchRecipes(capturedTerm)
      if (capturedTerm !== term) return
      setResults(data)
      setHasSearched(true)
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions) {
      if (e.key === "Enter" && query.trim().length >= MIN_QUERY_LENGTH) {
        commitSearch(query.trim())
      }
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (activeIndex >= 0) {
        commitSearch(suggestions[activeIndex].label)
      } else {
        commitSearch(query.trim())
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div ref={containerRef} className="relative w-full max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground pointer-events-none z-10" />
        <Input
          type="search"
          placeholder="Search by recipe name or ingredient…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true)
          }}
          className="h-14 pl-12 pr-4 text-base rounded-xl shadow-sm"
          autoFocus
          autoComplete="off"
        />

        {showSuggestions && suggestions.length > 0 && (
          <ul
            role="listbox"
            className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-md overflow-hidden z-50"
          >
            {suggestions.map((s, i) => (
              <li
                key={`${s.type}-${s.label}`}
                role="option"
                aria-selected={i === activeIndex}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer select-none transition-colors ${
                  i === activeIndex
                    ? "bg-accent text-accent-foreground"
                    : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onMouseDown={(e) => {
                  e.preventDefault()
                  commitSearch(s.label)
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {s.type === "recipe" ? (
                  <UtensilsCrossed className="size-3.5 text-muted-foreground shrink-0" />
                ) : (
                  <Leaf className="size-3.5 text-muted-foreground shrink-0" />
                )}
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
        )}
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
        <RecipeGrid recipes={results} isLoggedIn={isLoggedIn} />
      )}
    </div>
  )
}
