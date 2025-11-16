import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Zap } from 'lucide-react'

interface ColorPatternGameProps {
  onComplete: () => void
}

const colors = [
  { id: 'red', color: '#ef4444', name: 'Red' },
  { id: 'blue', color: '#3b82f6', name: 'Blue' },
  { id: 'green', color: '#22c55e', name: 'Green' },
  { id: 'yellow', color: '#eab308', name: 'Yellow' },
]

export function ColorPatternGame({ onComplete }: ColorPatternGameProps) {
  const [sequence, setSequence] = useState<string[]>([])
  const [playerSequence, setPlayerSequence] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [level, setLevel] = useState(1)
  const [isGameOver, setIsGameOver] = useState(false)
  const [hasWon, setHasWon] = useState(false)

  // Start new game
  const startGame = () => {
    setSequence([])
    setPlayerSequence([])
    setLevel(1)
    setIsGameOver(false)
    setHasWon(false)
    nextRound([])
  }

  // Add new color to sequence and play it
  const nextRound = (currentSequence: string[]) => {
    const newColor = colors[Math.floor(Math.random() * colors.length)].id
    const newSequence = [...currentSequence, newColor]
    setSequence(newSequence)
    setPlayerSequence([])
    playSequence(newSequence)
  }

  // Play the sequence
  const playSequence = async (seq: string[]) => {
    setIsPlaying(true)
    setIsPlayerTurn(false)

    for (let i = 0; i < seq.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setActiveColor(seq[i])
      await new Promise((resolve) => setTimeout(resolve, 500))
      setActiveColor(null)
    }

    setIsPlaying(false)
    setIsPlayerTurn(true)
  }

  // Handle player color click
  const handleColorClick = (colorId: string) => {
    if (!isPlayerTurn || isPlaying) return

    const newPlayerSequence = [...playerSequence, colorId]
    setPlayerSequence(newPlayerSequence)

    // Flash the color
    setActiveColor(colorId)
    setTimeout(() => setActiveColor(null), 300)

    // Check if correct
    const currentIndex = newPlayerSequence.length - 1
    if (newPlayerSequence[currentIndex] !== sequence[currentIndex]) {
      // Wrong! Game over
      setIsGameOver(true)
      setIsPlayerTurn(false)
      return
    }

    // Check if sequence is complete
    if (newPlayerSequence.length === sequence.length) {
      if (level >= 10) {
        // Won the game!
        setHasWon(true)
        setIsPlayerTurn(false)
        onComplete()
      } else {
        // Next level
        setLevel(level + 1)
        setTimeout(() => nextRound(sequence), 1000)
      }
    }
  }

  useEffect(() => {
    startGame()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">Color Pattern</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Level</div>
          <div className="text-2xl font-bold text-primary-400">{level}/10</div>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Status</div>
          <div className="text-lg font-bold text-green-400">
            {isPlaying
              ? 'Watch...'
              : isPlayerTurn
                ? 'Your Turn!'
                : isGameOver
                  ? 'Game Over'
                  : hasWon
                    ? 'You Won!'
                    : 'Ready'}
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!isGameOver && !hasWon && (
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <p className="text-gray-300 text-center">
            {isPlaying
              ? 'Watch the pattern carefully...'
              : isPlayerTurn
                ? 'Repeat the pattern!'
                : 'Get ready...'}
          </p>
        </div>
      )}

      {/* Color Buttons */}
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <motion.button
            key={color.id}
            onClick={() => handleColorClick(color.id)}
            disabled={!isPlayerTurn || isPlaying}
            className="aspect-square rounded-xl font-bold text-white text-xl transition-all disabled:cursor-not-allowed"
            style={{
              backgroundColor: color.color,
              opacity: activeColor === color.id ? 1 : 0.6,
              transform:
                activeColor === color.id ? 'scale(0.95)' : 'scale(1)',
            }}
            whileHover={isPlayerTurn ? { scale: 1.05 } : {}}
            whileTap={isPlayerTurn ? { scale: 0.95 } : {}}
          >
            {color.name}
          </motion.button>
        ))}
      </div>

      {/* Sequence Progress */}
      {isPlayerTurn && (
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-2">Progress</div>
          <div className="flex gap-2">
            {sequence.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded ${
                  index < playerSequence.length
                    ? 'bg-green-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Game Over */}
      {isGameOver && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30"
        >
          <h4 className="text-xl font-bold text-white mb-2">Game Over!</h4>
          <p className="text-gray-300 mb-4">
            You reached level {level}. Try again to beat your score!
          </p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>
      )}

      {/* Victory */}
      {hasWon && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl p-6 border border-primary-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">
              Perfect Memory!
            </h4>
          </div>
          <p className="text-gray-300 mb-4">
            🎉 Amazing! You completed all 10 levels!
          </p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  )
}
