"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

interface AuthNudgeProps {
  message: string
  isLoggedIn: boolean
  children: React.ReactElement<{ onClick?: React.MouseEventHandler }>
}

export function AuthNudge({ message, isLoggedIn, children }: AuthNudgeProps) {
  const [open, setOpen] = useState(false)

  if (isLoggedIn) return children

  const handleSignIn = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/confirm` },
    })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-64 space-y-3" align="start">
        <p className="text-sm text-muted-foreground">{message}</p>
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
