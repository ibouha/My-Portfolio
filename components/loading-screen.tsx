"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const loaderRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Debug log
  useEffect(() => {
    console.log("LoadingScreen mounted, progress:", progress)
  }, [progress])

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10 + 5 // Ensure consistent progress

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            // Animate out
            if (loaderRef.current) {
              gsap.to(loaderRef.current, {
                y: "-100%",
                duration: 1,
                ease: "power3.inOut",
                onComplete: () => setIsLoading(false),
              })
            }
          }, 500)
          return 100
        }
        return newProgress
      })
    }, 150) // Slightly slower for better visibility

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[10000] bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-teal-600 rounded-full animate-spin"></div>
            <div
              className="absolute inset-2 border-4 border-teal-400 rounded-full animate-spin"
              style={{ animationDirection: "reverse" }}
            ></div>
            <div className="absolute inset-4 bg-teal-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{"</>"}</span>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Loading Portfolio</h2>
          <p className="text-gray-400">Initializing awesome experience...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-teal-600 to-teal-400 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Text */}
        <div className="mt-4 text-teal-400 font-mono">{Math.round(progress)}%</div>

        {/* Terminal-like output */}
        <div className="mt-8 text-left bg-gray-800 rounded-lg p-4 font-mono text-sm max-w-md mx-auto">
          <div className="text-green-400">$ npm run dev</div>
          <div className="text-gray-400">Loading components...</div>
          <div className="text-gray-400">Compiling assets...</div>
          <div className="text-teal-400">Ready in {(progress / 20).toFixed(1)}s</div>
        </div>
      </div>
    </div>
  )
}
