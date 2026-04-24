"use client"

import Link from "next/link"
import { AuthNudge } from "@/components/auth-nudge"

const NAV_ITEMS = [
  { href: "/ingredients", label: "My Ingredients", message: "Sign in to track your pantry ingredients." },
  { href: "/saved", label: "Saved", message: "Sign in to save recipes for later." },
]

interface NavLinksProps {
  isLoggedIn: boolean
  className?: string
  onClick?: () => void
}

export function NavLinks({ isLoggedIn, className, onClick }: NavLinksProps) {
  return (
    <>
      {NAV_ITEMS.map(({ href, label, message }) =>
        isLoggedIn ? (
          <Link key={href} href={href} className={className} onClick={onClick}>
            {label}
          </Link>
        ) : (
          <AuthNudge key={href} message={message} isLoggedIn={false}>
            <button className={className}>{label}</button>
          </AuthNudge>
        )
      )}
    </>
  )
}
