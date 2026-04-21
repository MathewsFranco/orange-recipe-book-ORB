"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAddIngredient } from "@/lib/hooks/use-ingredients"
import type { IngredientCategory, IngredientInput, IngredientUnit } from "@/lib/types"

const UNITS: IngredientUnit[] = [
  "unit", "g", "kg", "mg", "ml", "l", "cup", "tbsp", "tsp",
  "oz", "lb", "pt", "qt", "pinch", "handful",
]

const CATEGORIES: { value: IngredientCategory; label: string }[] = [
  { value: "pantry", label: "Pantry" },
  { value: "fridge", label: "Fridge" },
  { value: "freezer", label: "Freezer" },
  { value: "other", label: "Other" },
]

const COMMON_INGREDIENTS = [
  "Eggs", "Milk", "Butter", "Flour", "Sugar", "Salt", "Olive oil",
  "Garlic", "Onion", "Tomato", "Chicken breast", "Ground beef", "Rice",
  "Pasta", "Cheese", "Yogurt", "Lemon", "Carrot", "Potato", "Spinach",
]

const DEFAULT_FORM: IngredientInput = {
  name: "",
  quantity: 1,
  unit: "unit",
  category: "pantry",
  expires_at: null,
}

interface Props {
  defaultCategory?: IngredientCategory
}

export function AddIngredientDialog({ defaultCategory }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<IngredientInput>({
    ...DEFAULT_FORM,
    category: defaultCategory ?? "pantry",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { mutate, isPending } = useAddIngredient()

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = "Name is required"
    if (!form.quantity || form.quantity <= 0) next.quantity = "Must be > 0"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    mutate(form, {
      onSuccess: () => {
        setOpen(false)
        setForm({ ...DEFAULT_FORM, category: defaultCategory ?? "pantry" })
        setErrors({})
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <PlusIcon />
          Add ingredient
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add ingredient</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              list="common-ingredients"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Eggs"
              aria-invalid={!!errors.name}
              autoComplete="off"
            />
            <datalist id="common-ingredients">
              {COMMON_INGREDIENTS.map((n) => (
                <option key={n} value={n} />
              ))}
            </datalist>
            {errors.name && (
              <p className="text-destructive text-xs">{errors.name}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min={0.01}
                step="any"
                value={form.quantity}
                onChange={(e) =>
                  setForm((f) => ({ ...f, quantity: parseFloat(e.target.value) || 0 }))
                }
                aria-invalid={!!errors.quantity}
              />
              {errors.quantity && (
                <p className="text-destructive text-xs">{errors.quantity}</p>
              )}
            </div>
            <div className="grid gap-1.5">
              <Label>Unit</Label>
              <Select
                value={form.unit}
                onValueChange={(v) => setForm((f) => ({ ...f, unit: v as IngredientUnit }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNITS.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, category: v as IngredientCategory }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="expires_at">Expiry date (optional)</Label>
            <Input
              id="expires_at"
              type="date"
              value={form.expires_at ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, expires_at: e.target.value || null }))
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding…" : "Add ingredient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
