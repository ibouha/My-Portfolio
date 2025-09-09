"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronRight, Star, Zap, Code, Database, Cloud, Palette } from "lucide-react"
import personalData from "@/data/personal.json"

gsap.registerPlugin(ScrollTrigger)

const categoryIcons = {
  Frontend: Code,
  Backend: Database,
  Database: Database,
  "DevOps & Tools": Cloud,
  "Design & Animation": Palette,
}

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const progressRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    // Animate skills on scroll
    gsap.fromTo(
      ".skill-category",
      { opacity: 0, y: 50, rotationX: 45 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate skill bars
    personalData.skills.forEach((category) => {
      category.technologies.forEach((tech) => {
        const progressBar = progressRefs.current[tech.name]
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${tech.level}%`,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: progressBar,
                start: "top 90%",
              },
            },
          )
        }
      })
    })
  }, [])

  const selectedCategoryData = personalData.skills.find((cat) => cat.category === selectedCategory)

  return (
    <section ref={skillsRef} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(15, 66, 61, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(15, 66, 61, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(15, 66, 61, 0.1) 0%, transparent 50%)
          `,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across different domains
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Category Selector */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="text-teal-400" size={20} />
                Categories
              </h3>
              <div className="space-y-2">
                {personalData.skills.map((category) => {
                  const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code
                  const isSelected = selectedCategory === category.category

                  return (
                    <button
                      key={category.category}
                      onClick={() => setSelectedCategory(category.category)}
                      className={`skill-category w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-hover group ${
                        isSelected
                          ? "bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-lg shadow-teal-500/25"
                          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors ${isSelected ? "text-white" : "text-gray-400 group-hover:text-teal-400"}`}
                      />
                      <span className="font-medium">{category.category}</span>
                      <ChevronRight
                        size={16}
                        className={`ml-auto transition-transform ${isSelected ? "rotate-90" : "group-hover:translate-x-1"}`}
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Skills Display */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
              <div className="flex items-center gap-3 mb-8">
                {(() => {
                  const Icon = categoryIcons[selectedCategory as keyof typeof categoryIcons] || Code
                  return <Icon className="text-teal-400" size={24} />
                })()}
                <h3 className="text-2xl font-bold text-white">{selectedCategory}</h3>
                <div className="ml-auto text-sm text-gray-400">{selectedCategoryData?.technologies.length} skills</div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {selectedCategoryData?.technologies.map((tech, index) => (
                  <div
                    key={tech.name}
                    onMouseEnter={() => setHoveredSkill(tech.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group relative bg-gray-900/50 rounded-xl p-6 border border-gray-700/30 hover:border-teal-500/50 transition-all duration-300 cursor-hover"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

                    <div className="relative z-10">
                      {/* Skill Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl">{tech.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-teal-400 transition-colors">
                            {tech.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={`${
                                    i < Math.floor(tech.level / 20) ? "text-teal-400 fill-current" : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-400">{tech.level}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative">
                        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            ref={(el) => (progressRefs.current[tech.name] = el)}
                            className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full relative"
                            style={{ width: "0%" }}
                          >
                            {/* Animated shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                          </div>
                        </div>

                        {/* Skill level indicator */}
                        {hoveredSkill === tech.name && (
                          <div
                            className="absolute -top-8 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg"
                            style={{ left: `${tech.level}%`, transform: "translateX(-50%)" }}
                          >
                            {tech.level}%
                          </div>
                        )}
                      </div>

                      {/* Proficiency Level */}
                      <div className="mt-3 text-xs text-gray-400">
                        {tech.level >= 90 && "Expert"}
                        {tech.level >= 80 && tech.level < 90 && "Advanced"}
                        {tech.level >= 70 && tech.level < 80 && "Intermediate"}
                        {tech.level < 70 && "Beginner"}
                      </div>
                    </div>

                    {/* Hover animation */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Category Stats */}
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-teal-400">{selectedCategoryData?.technologies.length}</div>
                    <div className="text-sm text-gray-400">Technologies</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-400">
                      {Math.round(
                        (selectedCategoryData?.technologies.reduce((acc, tech) => acc + tech.level, 0) || 0) /
                          (selectedCategoryData?.technologies.length || 1),
                      )}
                      %
                    </div>
                    <div className="text-sm text-gray-400">Avg. Proficiency</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-teal-400">
                      {selectedCategoryData?.technologies.filter((tech) => tech.level >= 80).length}
                    </div>
                    <div className="text-sm text-gray-400">Expert Level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Skills Summary */}
        <div className="mt-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Skills Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {personalData.skills.map((category) => {
              const Icon = categoryIcons[category.category as keyof typeof categoryIcons] || Code
              const avgLevel = Math.round(
                category.technologies.reduce((acc, tech) => acc + tech.level, 0) / category.technologies.length,
              )

              return (
                <div key={category.category} className="text-center group cursor-hover">
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-teal-600/20 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="text-teal-400 group-hover:text-teal-300" size={24} />
                  </div>
                  <div className="text-sm font-medium text-white mb-1">{category.category}</div>
                  <div className="text-xs text-gray-400">{avgLevel}% avg</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
