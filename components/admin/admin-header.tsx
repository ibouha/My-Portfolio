"use client"

import { useSession } from "next-auth/react"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
            <Bell className="w-5 h-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-teal-600 text-white">
                    {session?.user?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700" align="end">
              <DropdownMenuLabel className="text-gray-300">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-white">
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {session?.user?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-700">
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
