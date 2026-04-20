"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogoutButton } from "@/components/logout-button"

export function UserAvatarDropdown({ email }: { email: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground text-sm">
            {email[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel className="font-normal">
          <p className="text-xs text-muted-foreground truncate">{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="p-1">
          <LogoutButton />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
