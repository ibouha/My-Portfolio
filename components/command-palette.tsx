"use client"

import { useEffect, useRef, useState } from "react"
import { Search, Terminal, ArrowRight, Zap } from "lucide-react"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"

interface Command {
  id: string
  title: string
  description: string
  action: () => void
  category: string
  shortcut?: string
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const paletteRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const commands: Command[] = [
    {
      id: "home",
      title: "Go to Home",
      description: "Navigate to the homepage",
      action: () => router.push("/"),
      category: "Navigation",
    },
    {
      id: "about",
      title: "About Me",
      description: "Learn more about my background",
      action: () => router.push("/about"),
      category: "Navigation",
    },
    {
      id: "projects",
      title: "View Projects",
      description: "Explore my portfolio projects",
      action: () => router.push("/projects"),
      category: "Navigation",
    },
    {
      id: "blog",
      title: "Read Blog",
      description: "Check out my latest articles",
      action: () => router.push("/blog"),
      category: "Navigation",
    },
    {
      id: "contact",
      title: "Contact Me",
      description: "Get in touch for collaborations",
      action: () => router.push("/contact"),
      category: "Navigation",
    },
    {
      id: "github",
      title: "GitHub Profile",
      description: "View my code repositories",
      action: () => window.open("https://github.com/yourusername", "_blank"),
      category: "Social",
    },
    {
      id: "linkedin",
      title: "LinkedIn Profile",
      description: "Connect with me professionally",
      action: () => window.open("https://linkedin.com/in/yourusername", "_blank"),
      category: "Social",
    },
    {
      id: "resume",
      title: "Download Resume",
      description: "Get my latest CV",
      action: () => window.open("https://cvdesignr.com/p/6760322f77776", "_blank"),
      category: "Documents",
    },
  ]

  const filteredCommands = commands.filter(
    (command) =>
      command.title.toLowerCase().includes(query.toLowerCase()) ||
      command.description.toLowerCase().includes(query.toLowerCase()) ||
      command.category.toLowerCase().includes(query.toLowerCase()),
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }

      if (e.key === "Escape") {
        setIsOpen(false)
        setQuery("")
        setSelectedIndex(0)
      }

      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
        }

        if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
        }

        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
          e.preventDefault()
          filteredCommands[selectedIndex].action()
          setIsOpen(false)
          setQuery("")
          setSelectedIndex(0)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, filteredCommands, selectedIndex])

  useEffect(() => {
    if (isOpen && paletteRef.current) {
      gsap.fromTo(
        paletteRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" },
      )

      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50 backdrop-blur-sm">
      <div
        ref={paletteRef}
        className="w-full max-w-2xl mx-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700/50">
          <div className="p-2 bg-teal-600/20 rounded-lg">
            <Terminal className="text-teal-400" size={20} />
          </div>
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="w-full bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">⌘K</kbd>
          </div>
        </div>

        {/* Commands */}
        <div className="max-h-96 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Search className="mx-auto mb-3" size={32} />
              <p>No commands found</p>
            </div>
          ) : (
            <div className="p-2">
              {Object.entries(
                filteredCommands.reduce(
                  (acc, command) => {
                    if (!acc[command.category]) {
                      acc[command.category] = []
                    }
                    acc[command.category].push(command)
                    return acc
                  },
                  {} as Record<string, Command[]>,
                ),
              ).map(([category, categoryCommands]) => (
                <div key={category} className="mb-4">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {category}
                  </div>
                  {categoryCommands.map((command, index) => {
                    const globalIndex = filteredCommands.indexOf(command)
                    const isSelected = globalIndex === selectedIndex

                    return (
                      <button
                        key={command.id}
                        onClick={() => {
                          command.action()
                          setIsOpen(false)
                          setQuery("")
                          setSelectedIndex(0)
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-hover ${
                          isSelected
                            ? "bg-teal-600/20 border border-teal-500/30"
                            : "hover:bg-gray-800/50 border border-transparent"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isSelected ? "bg-teal-600/30" : "bg-gray-700/50"
                          }`}
                        >
                          <Zap
                            size={16}
                            className={`transition-colors ${isSelected ? "text-teal-400" : "text-gray-400"}`}
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <div
                            className={`font-medium transition-colors ${isSelected ? "text-white" : "text-gray-200"}`}
                          >
                            {command.title}
                          </div>
                          <div className="text-sm text-gray-400">{command.description}</div>
                        </div>
                        <ArrowRight
                          size={16}
                          className={`transition-all ${isSelected ? "text-teal-400 translate-x-1" : "text-gray-500"}`}
                        />
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-gray-700/50 text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">↵</kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">esc</kbd>
              <span>Close</span>
            </div>
          </div>
          <div>{filteredCommands.length} commands</div>
        </div>
      </div>
    </div>
  )
}
