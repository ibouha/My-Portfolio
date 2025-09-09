"use client"

import { useEffect, useRef } from "react"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { gsap } from "gsap"
import personalData from "@/data/personal.json"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Hero animation
    tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5",
      )
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")

    // Floating animation for arrow
    gsap.to(".scroll-arrow", {
      y: 10,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    })
  }, [])

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold text-teal-900 mb-6 leading-tight">
          {personalData.name}
        </h1>

        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          {personalData.title}
        </p>

        <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">{personalData.bio}</p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="/contact"
            className="bg-teal-900 text-white px-8 py-3 rounded-full hover:bg-teal-900/90 transition-colors font-medium"
          >
            Get In Touch
          </a>
          <a
            href="/projects"
            className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:border-gray-400 transition-colors font-medium"
          >
            View My Work
          </a>
        </div>

        <div className="flex justify-center space-x-6 mb-16">
          <a
            href={personalData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-teal-900 transition-colors"
          >
            <Github size={24} />
          </a>
          <a
            href={personalData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-teal-900 transition-colors"
          >
            <Linkedin size={24} />
          </a>
          <a href={`mailto:${personalData.email}`} className="text-gray-600 hover:text-teal-900 transition-colors">
            <Mail size={24} />
          </a>
        </div>

        <div className="scroll-arrow">
          <ArrowDown className="mx-auto text-gray-400" size={24} />
        </div>
      </div>
    </section>
  )
}
