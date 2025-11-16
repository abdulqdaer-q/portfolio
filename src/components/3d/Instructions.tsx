import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Mouse, Keyboard } from 'lucide-react'

export function Instructions() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 10000) // Auto-hide after 10 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-32 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl"
        >
          <div className="bg-dark-900/95 backdrop-blur-md border-2 border-primary-500/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  🎮 Welcome to the 3D Portfolio World!
                </h2>
                <p className="text-gray-400">
                  Explore the open world and discover hidden collectibles
                </p>
              </div>
              <button
                onClick={() => setShow(false)}
                className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Mouse Controls */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Mouse className="w-5 h-5 text-primary-400" />
                  <h3 className="font-bold text-white">Mouse Controls</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rotate View:</span>
                    <span className="text-white font-mono">Drag</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Zoom:</span>
                    <span className="text-white font-mono">Scroll</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Interact:</span>
                    <span className="text-white font-mono">Click</span>
                  </div>
                </div>
              </div>

              {/* Objectives */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Keyboard className="w-5 h-5 text-primary-400" />
                  <h3 className="font-bold text-white">Objectives</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-300">Collect XP orbs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400">🔮</span>
                    <span className="text-gray-300">Enter portals to sections</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pink-400">💎</span>
                    <span className="text-gray-300">Find secret collectibles</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
              <p className="text-sm text-primary-300 text-center">
                💡 Tip: Use the minimap to navigate and find collectibles!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
