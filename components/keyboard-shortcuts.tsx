"use client"

import { useEffect, useState } from "react"
import { Keyboard, X } from "lucide-react"

export function KeyboardShortcuts() {
  const [isVisible, setIsVisible] = useState(false)

  const shortcuts = [
    { key: "⌘ + K", description: "Open command palette" },
    { key: "ESC", description: "Close modals" },
    { key: "↑ ↓", description: "Navigate commands" },
    { key: "ENTER", description: "Execute command" },
    { key: "?", description: "Show shortcuts" },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setIsVisible(!isVisible)
      }

      if (e.key === "Escape") {
        setIsVisible(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isVisible])

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-30">
        <button
          onClick={() => setIsVisible(true)}
          className="p-3 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 cursor-hover group"
          title="Keyboard shortcuts (?)"
        >
          <Keyboard className="text-gray-400 group-hover:text-teal-400 transition-colors" size={20} />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl p-6 max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-600/20 rounded-lg">
              <Keyboard className="text-teal-400" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">Keyboard Shortcuts</h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors cursor-hover"
          >
            <X className="text-gray-400 hover:text-white" size={16} />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-300">{shortcut.description}</span>
              <kbd className="px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm font-mono border border-gray-700">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700/50 text-center text-sm text-gray-400">
          Press <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">?</kbd> to toggle this panel
        </div>
      </div>
    </div>
  )
}
