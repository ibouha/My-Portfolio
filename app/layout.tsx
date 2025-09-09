import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { FloatingDock } from "@/components/floating-dock"
import { CommandPalette } from "@/components/command-palette"
import { InteractiveCursor } from "@/components/interactive-cursor"
import { LoadingScreen } from "@/components/loading-screen"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { AuthProvider } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Portfolio - Full Stack Developer",
  description: "Innovative Full Stack Developer Portfolio with Modern UI/UX",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} cursor-none`}>
        <AuthProvider>
          <LoadingScreen />
          <InteractiveCursor />
          <EnhancedNavigation />
          <FloatingDock />
          <CommandPalette />
          <KeyboardShortcuts />
          <main className="pt-16">{children}</main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
