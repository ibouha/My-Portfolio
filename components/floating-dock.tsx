"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Home, User, Briefcase, BookOpen, Mail, Github, Linkedin, Coffee } from "lucide-react"
import { gsap } from "gsap"
import Link from "next/link"
import { usePathname } from "next/navigation"
import personalData from "@/data/personal.json"

const dockItems = [
  { icon: Home, href: "/", label: "Home" },
  { icon: User, href: "/about", label: "About" },
  { icon: Briefcase, href: "/projects", label: "Projects" },
  { icon: BookOpen, href: "/blog", label: "Blog" },
  { icon: Mail, href: "/contact", label: "Contact" },
  { icon: Github, href: personalData.social.github, label: "GitHub", external: true },
  { icon: Linkedin, href: personalData.social.linkedin, label: "LinkedIn", external: true },
  { icon: Coffee, href: "#", label: "Buy me coffee", action: true },
]

export function FloatingDock() {
  const [isVisible, setIsVisible] = useState(false)
  const dockRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100
      setIsVisible(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (dockRef.current) {
      if (isVisible) {
        gsap.to(dockRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        })
      } else {
        gsap.to(dockRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
        })
      }
    }
  }, [isVisible])

  const handleItemHover = (e: React.MouseEvent<HTMLElement>) => {
    const item = e.currentTarget
    const siblings = Array.from(item.parentElement?.children || []).filter((child) => child !== item)

    // Scale up hovered item
    gsap.to(item, {
      scale: 1.4,
      y: -10,
      duration: 0.3,
      ease: "back.out(1.7)",
    })

    // Scale down siblings
    gsap.to(siblings, {
      scale: 0.8,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleItemLeave = (e: React.MouseEvent<HTMLElement>) => {
    const item = e.currentTarget
    const siblings = Array.from(item.parentElement?.children || []).filter((child) => child !== item)

    // Reset all items
    gsap.to([item, ...siblings], {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <div
      ref={dockRef}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 opacity-0"
      style={{ transform: "translateX(-50%) translateY(100px)" }}
    >
      <div className="flex items-end gap-2 bg-gray-900/90 backdrop-blur-xl rounded-2xl p-3 border border-gray-700/50 shadow-2xl shadow-black/50">
        {dockItems.map((item, index) => {
          const Icon = item.icon
          const isActive = !item.external && !item.action && pathname === item.href

          if (item.external) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleItemHover}
                onMouseLeave={handleItemLeave}
                className="group relative p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 cursor-hover"
                title={item.label}
              >
                <Icon size={20} className="text-gray-400 group-hover:text-teal-400 transition-colors duration-300" />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 bg-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </a>
            )
          }

          if (item.action) {
            return (
              <button
                key={index}
                onMouseEnter={handleItemHover}
                onMouseLeave={handleItemLeave}
                className="group relative p-3 rounded-xl bg-gradient-to-r from-orange-600/50 to-red-600/50 hover:from-orange-500/50 hover:to-red-500/50 transition-all duration-300 cursor-hover"
                title={item.label}
              >
                <Icon
                  size={20}
                  className="text-orange-300 group-hover:text-orange-200 transition-colors duration-300"
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.label}
                </div>

                {/* Pulse effect */}
                <div className="absolute inset-0 bg-orange-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </button>
            )
          }

          return (
            <Link
              key={index}
              href={item.href}
              onMouseEnter={handleItemHover}
              onMouseLeave={handleItemLeave}
              className={`group relative p-3 rounded-xl transition-all duration-300 cursor-hover ${
                isActive
                  ? "bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg shadow-teal-500/25"
                  : "bg-gray-800/50 hover:bg-gray-700/50"
              }`}
              title={item.label}
            >
              <Icon
                size={20}
                className={`transition-colors duration-300 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-teal-400"
                }`}
              />

              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {item.label}
              </div>

              {/* Glow effect */}
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md ${
                  isActive ? "bg-teal-400/30" : "bg-teal-500/20"
                }`}
              ></div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
