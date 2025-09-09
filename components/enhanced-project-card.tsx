"use client"

import { useRef, useEffect } from "react"
import { ExternalLink, Github, Eye } from "lucide-react"
import { gsap } from "gsap"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  live: string
  featured: boolean
}

interface EnhancedProjectCardProps {
  project: Project
  index: number
}

export function EnhancedProjectCard({ project, index }: EnhancedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const overlay = overlayRef.current

    if (!card || !image || !overlay) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      })

      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      })

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl cursor-hover transform-gpu"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden">
        <div
          ref={imageRef}
          className="w-full h-full bg-cover bg-center transition-transform duration-500"
          style={{ backgroundImage: `url(${project.image})` }}
        />

        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 flex items-center justify-center"
        >
          <div className="flex gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-teal-600 rounded-full hover:bg-teal-500 transition-colors transform hover:scale-110"
            >
              <Eye className="text-white" size={20} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors transform hover:scale-110"
            >
              <Github className="text-white" size={20} />
            </a>
          </div>
        </div>

        {/* Tech Stack Floating */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="px-2 py-1 bg-teal-600/90 text-white text-xs rounded-full backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
            {project.title}
          </h3>

          <p className="text-gray-400 mb-4 leading-relaxed text-sm">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700 hover:border-teal-500 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm"
            >
              <Github size={16} />
              Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-teal-400 transition-colors text-sm"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* Project number */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  )
}
