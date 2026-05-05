"use client"

import { useState, useTransition } from "react"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toggleSavedRecipe } from "@/lib/actions/saved-recipes"

interface SaveButtonProps {
  recipeId: string
  initialSaved: boolean
}

export function SaveButton({ recipeId, initialSaved }: SaveButtonProps) {
  const [saved, setSaved] = useState(initialSaved)
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      const nowSaved = await toggleSavedRecipe(recipeId)
      setSaved(nowSaved)
    })
  }

  return (
    <Button
      variant={saved ? "default" : "outline"}
      className="gap-2"
      onClick={handleClick}
      disabled={isPending}
    >
      <Bookmark className={saved ? "size-4 fill-current" : "size-4"} />
      {saved ? "Saved" : "Save recipe"}
    </Button>
  )
}
