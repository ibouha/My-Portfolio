"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { gsap } from "gsap"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo(
      ".nav-item",
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
    )
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.1, ease: "power2.out" },
      )
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="nav-item font-bold text-xl text-teal-900 hover:text-teal-900/70 transition-colors">
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-item px-3 py-2 text-sm font-medium transition-colors hover:text-teal-900/70 ${
                  pathname === item.href ? "text-teal-900 border-b-2 border-teal-900" : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-teal-900 hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mobile-nav-item px-3 py-2 text-base font-medium transition-colors hover:text-teal-900/70 ${
                    pathname === item.href ? "text-teal-900" : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
