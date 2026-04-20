'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export function GoogleSignInButton() {
  const handleSignIn = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/confirm`,
      },
    })
  }

  return (
    <Button onClick={handleSignIn} className="w-full" variant="outline">
      Continue with Google
    </Button>
  )
}
