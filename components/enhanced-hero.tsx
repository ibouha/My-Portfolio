"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Github, Linkedin, Mail, Terminal, Code, Zap } from "lucide-react"
import { gsap } from "gsap"
import Link from "next/link"
import personalData from "@/data/personal.json"

export function EnhancedHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Get roles from personal data and add some variations
  const roles = [
    personalData.title,
    "React Specialist",
    "Next.js Expert",
    "Node.js Developer",
    "UI/UX Designer",
    "Problem Solver"
  ]

  // Typing animation effect
  useEffect(() => {
    const currentRole = roles[currentIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentRole.length) {
            setTypedText(currentRole.slice(0, typedText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(typedText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentIndex((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [typedText, currentIndex, isDeleting, roles])

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(15, 66, 61, ${particle.opacity})`
        ctx.fill()

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(15, 66, 61, ${0.1 * (1 - distance / 100)})`
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline()

    tl.fromTo(
      ".hero-title",
      { opacity: 0, y: 100, rotationX: 90 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: "power3.out" },
    )
      .fromTo(
        ".hero-subtitle",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.5",
      )
      .fromTo(".hero-cta", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(
        ".floating-icons",
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.2",
      )

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: "random(-20, 20)",
      x: "random(-10, 10)",
      rotation: "random(-15, 15)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.2,
    })

    // Glitch effect for title
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 5 })
    glitchTl
      .to(".hero-title", { skewX: 2, duration: 0.1 })
      .to(".hero-title", { skewX: -2, duration: 0.1 })
      .to(".hero-title", { skewX: 0, duration: 0.1 })
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: "screen" }} />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(15, 66, 61, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 66, 61, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-icons">
          <Terminal className="floating-icon absolute top-20 left-20 text-teal-400 opacity-20" size={40} />
          <Code className="floating-icon absolute top-40 right-32 text-teal-400 opacity-20" size={35} />
          <Zap className="floating-icon absolute bottom-40 left-32 text-teal-400 opacity-20" size={30} />
          <div className="floating-icon absolute top-60 left-1/4 text-teal-400 opacity-20 font-mono text-lg">
            {"</>"}
          </div>
          <div className="floating-icon absolute bottom-60 right-1/4 text-teal-400 opacity-20 font-mono text-lg">
            {"{ }"}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Terminal-like header */}
        <div className="hero-subtitle mb-8">
          <div className="inline-block bg-gray-800 rounded-lg p-4 border border-teal-500 shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-2">portfolio.dev</span>
            </div>
            <div className="text-left font-mono text-sm">
              <span className="text-green-400">$</span>
              <span className="text-white ml-2">whoami</span>
              <br />
              <span className="text-teal-400">{personalData.name}</span>
            </div>
          </div>
        </div>

        <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-teal-200 to-teal-400 bg-clip-text text-transparent">
            {personalData.name.split(' ').slice(0, -1).join(' ')}
          </span>
          <br />
          <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {personalData.name.split(' ').slice(-1)[0]}
          </span>
        </h1>

        <div className="hero-subtitle mb-8">
          <div className="text-2xl md:text-4xl text-gray-300 mb-4">
            <span className="font-mono">I'm a </span>
            <span className="text-teal-400 font-bold">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        </div>

        <p className="hero-subtitle text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {personalData.bio}
        </p>

        <div className="hero-cta flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Link
            href="/projects"
            className="group relative bg-teal-600 text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25 cursor-hover"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </Link>

          <Link
            href="/contact"
            className="group relative border-2 border-teal-400 text-teal-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-teal-400 hover:text-gray-900 hover:scale-105 cursor-hover"
          >
            <span className="relative z-10">Get In Touch</span>
          </Link>
        </div>

        <div className="hero-cta flex justify-center space-x-8 mb-16">
          <a
            href={personalData.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-gray-800 rounded-full border border-gray-700 hover:border-teal-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/25"
          >
            <Github className="text-gray-400 group-hover:text-teal-400 transition-colors" size={24} />
          </a>
          <a
            href={personalData.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 bg-gray-800 rounded-full border border-gray-700 hover:border-teal-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/25"
          >
            <Linkedin className="text-gray-400 group-hover:text-teal-400 transition-colors" size={24} />
          </a>
          <a
            href={`mailto:${personalData.email}`}
            className="group relative p-4 bg-gray-800 rounded-full border border-gray-700 hover:border-teal-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/25"
          >
            <Mail className="text-gray-400 group-hover:text-teal-400 transition-colors" size={24} />
          </a>
        </div>

        <button
          onClick={() => {
            const nextSection = document.querySelector('.skills-section') || document.querySelector('section:nth-of-type(2)')
            nextSection?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="hero-cta animate-bounce cursor-hover hover:scale-110 transition-transform duration-300"
        >
          <ArrowDown className="mx-auto text-teal-400" size={32} />
        </button>
      </div>

      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent"></div>
    </section>
  )
}
