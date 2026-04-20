import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { MobileNav } from "@/components/mobile-nav"
import { UserAvatarDropdown } from "@/components/user-avatar-dropdown"
import { Button } from "@/components/ui/button"
import { hasEnvVars } from "@/lib/utils"

export async function SiteHeader() {
  let user = null
  if (hasEnvVars) {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    user = data?.claims
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-b-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-5xl mx-auto flex h-16 items-center justify-between px-5">
        <Link
          href="/"
          className="font-[family-name:var(--font-bebas-neue)] text-2xl text-primary tracking-wide"
        >
          ORB
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/ingredients" className="hover:text-primary transition-colors">
            My Ingredients
          </Link>
          <Link href="/saved" className="hover:text-primary transition-colors">
            Saved
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {user?.email ? (
            <UserAvatarDropdown email={user.email} />
          ) : (
            <Button asChild size="sm" variant="outline">
              <Link href="/auth/login">Log in</Link>
            </Button>
          )}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
