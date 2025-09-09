"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Terminal, Code, Zap, Home, User, Briefcase, BookOpen, Mail } from "lucide-react"
import { gsap } from "gsap"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Blog", href: "/blog", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
]

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeIndicator, setActiveIndicator] = useState({ width: 0, left: 0 })
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate navigation on mount
  useEffect(() => {
    const tl = gsap.timeline()

    // Logo animation
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0, rotation: -180 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
    )

    // Nav items animation
    tl.fromTo(
      ".nav-item",
      { opacity: 0, y: -30, rotationX: 90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.4",
    )

    // Floating animation for logo
    gsap.to(logoRef.current, {
      y: "random(-5, 5)",
      rotation: "random(-5, 5)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }, [])

  // Update active indicator position
  useEffect(() => {
    const activeItem = document.querySelector(`[data-nav="${pathname}"]`) as HTMLElement
    if (activeItem && indicatorRef.current) {
      const rect = activeItem.getBoundingClientRect()
      const navRect = navRef.current?.getBoundingClientRect()

      if (navRect) {
        setActiveIndicator({
          width: rect.width,
          left: rect.left - navRect.left,
        })
      }
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)

    if (!isOpen) {
      // Open animation
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, scale: 0.8, rotationY: -90 },
        { opacity: 1, scale: 1, rotationY: 0, duration: 0.5, ease: "back.out(1.7)" },
      )

      gsap.fromTo(
        ".mobile-nav-item",
        { opacity: 0, x: -50, rotationY: -45 },
        { opacity: 1, x: 0, rotationY: 0, duration: 0.4, stagger: 0.1, ease: "power3.out", delay: 0.2 },
      )
    } else {
      // Close animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: 90,
        duration: 0.3,
        ease: "power3.in",
      })
    }
  }

  const handleNavItemHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const item = e.currentTarget
    gsap.to(item, {
      scale: 1.05,
      y: -2,
      duration: 0.3,
      ease: "power2.out",
    })

    // Glitch effect
    gsap.to(item, {
      skewX: "random(-2, 2)",
      duration: 0.1,
      repeat: 3,
      yoyo: true,
      ease: "power2.inOut",
    })
  }

  const handleNavItemLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const item = e.currentTarget
    gsap.to(item, {
      scale: 1,
      y: 0,
      skewX: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-xl border-b border-teal-500/30 shadow-2xl shadow-teal-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Enhanced Logo with IBOUHA */}
            <Link href="/" className="relative group cursor-hover">
              <div
                ref={logoRef}
                className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-teal-600/20 to-blue-600/20 backdrop-blur-sm border border-teal-500/30 hover:border-teal-400/50 transition-all duration-300"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">I</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-white to-teal-200 bg-clip-text text-transparent">
                  Ibouha
                </span>
                <div className="text-teal-400 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Code size={16} />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex relative">
              {/* Active indicator */}
              <div
                ref={indicatorRef}
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-300 ease-out rounded-full"
                style={{
                  width: `${activeIndicator.width}px`,
                  left: `${activeIndicator.left}px`,
                }}
              />

              {/* Glow effect */}
              <div
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 blur-sm opacity-50 transition-all duration-300 ease-out"
                style={{
                  width: `${activeIndicator.width}px`,
                  left: `${activeIndicator.left}px`,
                }}
              />

              <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700/50">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      data-nav={item.href}
                      onMouseEnter={handleNavItemHover}
                      onMouseLeave={handleNavItemLeave}
                      className={`nav-item relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-hover group ${
                        isActive
                          ? "text-white bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg shadow-teal-500/25"
                          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={`transition-all duration-300 ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-teal-400"
                        }`}
                      />
                      <span className="relative">
                        {item.name}
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                            {item.name}
                          </div>
                        )}
                      </span>

                      {/* Hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 cursor-hover group"
            >
              <div className="relative w-6 h-6">
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  }`}
                >
                  <Menu className="text-gray-300 group-hover:text-teal-400 transition-colors" size={24} />
                </div>
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    isOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                  }`}
                >
                  <X className="text-gray-300 group-hover:text-teal-400 transition-colors" size={24} />
                </div>
              </div>

              {/* Pulse effect */}
              <div className="absolute inset-0 bg-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-b border-teal-500/30 shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-nav-item flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 cursor-hover group ${
                      isActive
                        ? "text-white bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg shadow-teal-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-teal-500/20 group-hover:scale-110"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={`transition-colors duration-300 ${
                          isActive ? "text-white" : "text-gray-400 group-hover:text-teal-400"
                        }`}
                      />
                    </div>
                    <span className="font-medium">{item.name}</span>

                    {/* Active indicator */}
                    {isActive && (
                      <div className="ml-auto">
                        <Zap className="text-teal-400 animate-pulse" size={16} />
                      </div>
                    )}

                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </Link>
                )
              })}

              {/* Mobile menu footer */}
              <div className="pt-4 mt-4 border-t border-gray-700/50">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <Terminal size={16} />
                  <span>Mohamed Amine IBOUHA</span>
                  <Code size={16} />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Navigation background blur overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
