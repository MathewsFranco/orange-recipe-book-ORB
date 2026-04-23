"use client"

import { useState } from "react"
import { PencilIcon, Trash2Icon, CheckIcon, XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDeleteIngredient, useUpdateIngredient } from "@/lib/hooks/use-ingredients"
import type { IngredientUnit, PantryIngredient } from "@/lib/types"

const UNITS: IngredientUnit[] = [
  "unit", "g", "kg", "mg", "ml", "l", "cup", "tbsp", "tsp",
  "oz", "lb", "pt", "qt", "pinch", "handful",
]

function formatExpiry(iso: string | null): string | null {
  if (!iso) return null
  const [y, m, day] = iso.split("-").map(Number)
  const d = new Date(y, m - 1, day)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = Math.ceil((d.getTime() - now.getTime()) / 86_400_000)
  if (diff < 0) return "Expired"
  if (diff === 0) return "Expires today"
  if (diff <= 7) return `Expires in ${diff}d`
  return `Exp: ${d.toLocaleDateString()}`
}

interface Props {
  item: PantryIngredient
}

export function IngredientCard({ item }: Props) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(item.name)
  const [quantity, setQuantity] = useState(String(item.quantity))
  const [unit, setUnit] = useState<IngredientUnit>(item.unit)
  const [error, setError] = useState("")

  const { mutate: update, isPending: saving } = useUpdateIngredient()
  const { mutate: del, isPending: deleting } = useDeleteIngredient()

  function startEdit() {
    setName(item.name)
    setQuantity(String(item.quantity))
    setUnit(item.unit)
    setError("")
    setEditing(true)
  }

  function cancelEdit() {
    setEditing(false)
    setError("")
  }

  function saveEdit() {
    const trimmedName = name.trim()
    const qty = parseFloat(quantity)
    if (!trimmedName) { setError("Name required"); return }
    if (!qty || qty <= 0) { setError("Quantity must be > 0"); return }
    update(
      { id: item.id, input: { name: trimmedName, quantity: qty, unit } },
      { onSuccess: () => setEditing(false) },
    )
  }

  const expiry = formatExpiry(item.expires_at)
  const isExpired = expiry === "Expired"

  if (editing) {
    return (
      <div className="flex items-center gap-2 rounded-md border p-2">
        <Input
          className="h-7 flex-1 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit()
            if (e.key === "Escape") cancelEdit()
          }}
          autoFocus
        />
        <Input
          className="h-7 w-20 text-sm"
          type="number"
          min={0.01}
          step="any"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Select value={unit} onValueChange={(v) => setUnit(v as IngredientUnit)}>
          <SelectTrigger className="h-7 w-20 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UNITS.map((u) => (
              <SelectItem key={u} value={u}>{u}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-destructive text-xs">{error}</p>}
        <Button size="icon-sm" variant="ghost" onClick={saveEdit} disabled={saving}>
          <CheckIcon />
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={cancelEdit}>
          <XIcon />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-md border px-3 py-2">
      <span className="flex-1 text-sm font-medium">{item.name}</span>
      <Badge variant="secondary" className="text-xs tabular-nums">
        {item.quantity} {item.unit}
      </Badge>
      {expiry && (
        <span
          className={`text-xs ${isExpired ? "text-destructive" : "text-muted-foreground"}`}
        >
          {expiry}
        </span>
      )}
      <Button size="icon-sm" variant="ghost" onClick={startEdit} aria-label="Edit">
        <PencilIcon />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon-sm"
            variant="ghost"
            className="text-destructive hover:text-destructive"
            aria-label="Delete"
            disabled={deleting}
          >
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete "{item.name}"?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove this ingredient from your pantry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={() => del(item.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
