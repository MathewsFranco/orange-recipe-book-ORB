"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="font-[family-name:var(--font-bebas-neue)] text-2xl text-primary">
            ORB
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/protected/ingredients"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            My Ingredients
          </Link>
          <Link
            href="/saved"
            className="text-lg font-medium hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          >
            Saved
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
