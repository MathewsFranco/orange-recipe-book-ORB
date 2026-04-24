"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavLinks } from "@/components/nav-links"

interface MobileNavProps {
  isLoggedIn: boolean
}

export function MobileNav({ isLoggedIn }: MobileNavProps) {
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
          <NavLinks
            isLoggedIn={isLoggedIn}
            className="text-lg font-medium hover:text-primary transition-colors text-left"
            onClick={() => setOpen(false)}
          />
        </nav>
      </SheetContent>
    </Sheet>
  )
}
