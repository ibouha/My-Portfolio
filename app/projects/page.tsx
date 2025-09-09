"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import projectsData from "@/data/projects.json"
import { ExternalLink, Github } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  useEffect(() => {
    gsap.fromTo(".page-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <div className="min-h-screen">
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="page-title text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">Projects</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A collection of projects that showcase my skills in web development, from concept to deployment.
            </p>
          </div>

          <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.projects.map((project) => (
              <div key={project.id} className="project-card bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                <div className="aspect-video bg-gray-200">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-teal-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-teal-900 transition-colors"
                    >
                      <Github size={18} />
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 hover:text-teal-900 transition-colors"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
