"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Wait for page to load before showing cursor
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000) // Wait 2 seconds for loading screen to finish

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      })
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      gsap.to([cursor, follower], {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    document.addEventListener("mousemove", moveCursor)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .cursor-hover")
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [isLoaded])

  if (!isLoaded) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-teal-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-teal-400 rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  )
}
