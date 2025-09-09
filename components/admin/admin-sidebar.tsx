"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  FolderOpen,
  FileText,
  Target,
  GraduationCap,
  Briefcase,
  Mail,
  Settings,
  LogOut
} from "lucide-react"
import { signOut } from "next-auth/react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Personal Info",
    href: "/admin/personal",
    icon: User
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderOpen
  },
  {
    title: "Blog Posts",
    href: "/admin/blog",
    icon: FileText
  },
  {
    title: "Skills",
    href: "/admin/skills",
    icon: Target
  },
  {
    title: "Education",
    href: "/admin/education",
    icon: GraduationCap
  },
  {
    title: "Experience",
    href: "/admin/experience",
    icon: Briefcase
  },
  {
    title: "Messages",
    href: "/admin/messages",
    icon: Mail
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" })
  }

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-800 border-r border-gray-700">
      <div className="flex flex-col h-full">
        <div className="flex-1 py-6">
          <nav className="space-y-1 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="p-3 border-t border-gray-700">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}
