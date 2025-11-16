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
              {/* Keyboard Controls */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Keyboard className="w-5 h-5 text-primary-400" />
                  <h3 className="font-bold text-white">Keyboard Controls</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Move Forward:</span>
                    <span className="text-white font-mono">W / ↑</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Move Back:</span>
                    <span className="text-white font-mono">S / ↓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Move Left:</span>
                    <span className="text-white font-mono">A / ←</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Move Right:</span>
                    <span className="text-white font-mono">D / →</span>
                  </div>
                </div>
              </div>

              {/* Mouse Controls & Objectives */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Mouse className="w-5 h-5 text-primary-400" />
                  <h3 className="font-bold text-white">Objectives</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-gray-300">Collect XP orbs</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400">🔮</span>
                    <span className="text-gray-300">Click portals to sections</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-pink-400">💎</span>
                    <span className="text-gray-300">Find secret collectibles</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">🎮</span>
                    <span className="text-gray-300">Play mini-games</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
              <p className="text-sm text-primary-300 text-center">
                💡 Tip: Use WASD to move around and explore the 3D world!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
