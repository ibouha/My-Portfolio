"use client"

import { useEffect } from "react"
import { EnhancedHero } from "@/components/enhanced-hero"
import { SkillsSection } from "@/components/skills-section"
import { EnhancedProjectCard } from "@/components/enhanced-project-card"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import projectsData from "@/data/projects.json"
import Link from "next/link"
import { Sparkles, Zap, Code2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Enhanced scroll animations
    gsap.fromTo(
      ".project-card-enhanced",
      {
        opacity: 0,
        y: 100,
        rotationX: 45,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
        },
      },
    )

    // Parallax effect for section backgrounds
    gsap.to(".parallax-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-bg",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    // Text reveal animation
    gsap.fromTo(
      ".text-reveal",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".text-reveal",
          start: "top 85%",
        },
      },
    )
  }, [])

  const featuredProjects = projectsData.projects.filter((project) => project.featured)

  return (
    <div className="bg-gray-900">
      <EnhancedHero />

      {/* Skills Section */}
      <SkillsSection />

      {/* What I Do Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden">
        <div className="parallax-bg absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(15, 66, 61, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(15, 66, 61, 0.2) 0%, transparent 50%)
            `,
            }}
          />
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                What I Do
              </span>
            </h2>
            <p className="text-reveal text-xl text-gray-400 max-w-2xl mx-auto">
              Transforming ideas into digital reality with cutting-edge technologies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 size={40} />,
                title: "Frontend Development",
                description: "Creating stunning, responsive interfaces with React, Next.js, and modern CSS frameworks",
              },
              {
                icon: <Zap size={40} />,
                title: "Backend Development",
                description:
                  "Building robust APIs and server-side applications with Node.js, Python, and cloud technologies",
              },
              {
                icon: <Sparkles size={40} />,
                title: "UI/UX Design",
                description:
                  "Designing intuitive user experiences with attention to detail and modern design principles",
              },
            ].map((skill, index) => (
              <div
                key={index}
                className="text-reveal group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-teal-500 transition-all duration-300 cursor-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-teal-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                    {skill.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Projects Section */}
      <section className="projects-section relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-reveal text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-reveal text-xl text-gray-400 max-w-2xl mx-auto">
              A showcase of my latest work, featuring innovative solutions and cutting-edge technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="project-card-enhanced">
                <EnhancedProjectCard project={project} index={index} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white px-8 py-4 rounded-full font-semibold hover:from-teal-500 hover:to-teal-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/25 cursor-hover"
            >
              <span>Explore All Projects</span>
              <Sparkles className="group-hover:rotate-12 transition-transform duration-300" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 via-teal-900 to-gray-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's collaborate and bring your ideas to life with innovative solutions
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 cursor-hover"
          >
            <span>Start a Project</span>
            <Zap size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}
