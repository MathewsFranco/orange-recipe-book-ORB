"use client"

import { cloneElement, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface AuthNudgeProps {
  message: string
  isLoggedIn: boolean
  children: React.ReactElement<{ onClick?: React.MouseEventHandler; disabled?: boolean }>
}

export function AuthNudge({ message, isLoggedIn, children }: AuthNudgeProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (isLoggedIn) return children

  const handleSignIn = async () => {
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/confirm` },
    })
    if (error) setError("Something went wrong. Please try again.")
  }

  // Strip disabled so the popover trigger can receive click events
  const trigger = cloneElement(children, { disabled: false })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-64 space-y-3" align="start">
        <p className="text-sm text-muted-foreground">{message}</p>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <div className="flex flex-col gap-2">
          <Button size="sm" onClick={handleSignIn} className="w-full">
            Continue with Google
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)} className="w-full">
            Maybe later
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
