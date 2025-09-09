"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import personalData from "@/data/personal.json"
import { Download } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  useEffect(() => {
    // Page animations
    gsap.fromTo(".about-content", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

    gsap.fromTo(
      ".skill-item",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
        },
      },
    )

    gsap.fromTo(
      ".experience-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-section",
          start: "top 80%",
        },
      },
    )
  }, [])

  // Extract all individual skills from the nested structure
  const allSkills = personalData.skills.flatMap((category) => category.technologies.map((tech) => tech.name))

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container">
          <div className="about-content max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">About Me</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              I'm a passionate full-stack developer with a love for creating digital experiences that make a difference.
              With expertise in modern web technologies, I bring ideas to life through clean, efficient code and
              thoughtful design.
            </p>
            <a
              href="https://cvdesignr.com/p/6760322f77776"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-500 transition-colors font-medium"
            >
              <Download size={20} />
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section section-padding bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {allSkills.map((skill) => (
                <div
                  key={skill}
                  className="skill-item bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300"
                >
                  <span className="font-medium text-gray-300 hover:text-teal-400 transition-colors">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section section-padding bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <div className="space-y-8">
              {personalData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="experience-item bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-teal-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-teal-400">{exp.title}</h3>
                    <span className="text-gray-500 font-medium">{exp.period}</span>
                  </div>
                  <h4 className="text-xl text-gray-300 mb-3">{exp.company}</h4>
                  <p className="text-gray-400 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
