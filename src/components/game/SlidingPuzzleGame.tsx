import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, RotateCcw, Puzzle } from 'lucide-react'

interface SlidingPuzzleGameProps {
  onComplete: () => void
}

const GRID_SIZE = 3
const EMPTY_TILE = GRID_SIZE * GRID_SIZE - 1

export function SlidingPuzzleGame({ onComplete }: SlidingPuzzleGameProps) {
  const [tiles, setTiles] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create solved puzzle
    const solvedPuzzle = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i)

    // Shuffle by making random valid moves
    let shuffled = [...solvedPuzzle]
    for (let i = 0; i < 100; i++) {
      const emptyIndex = shuffled.indexOf(EMPTY_TILE)
      const validMoves = getValidMoves(emptyIndex)
      const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
      // Swap
      ;[shuffled[emptyIndex], shuffled[randomMove]] = [
        shuffled[randomMove],
        shuffled[emptyIndex],
      ]
    }

    setTiles(shuffled)
    setMoves(0)
    setIsCompleted(false)
    setStartTime(null)
    setEndTime(null)
  }

  const getValidMoves = (emptyIndex: number): number[] => {
    const row = Math.floor(emptyIndex / GRID_SIZE)
    const col = emptyIndex % GRID_SIZE
    const validMoves: number[] = []

    // Up
    if (row > 0) validMoves.push(emptyIndex - GRID_SIZE)
    // Down
    if (row < GRID_SIZE - 1) validMoves.push(emptyIndex + GRID_SIZE)
    // Left
    if (col > 0) validMoves.push(emptyIndex - 1)
    // Right
    if (col < GRID_SIZE - 1) validMoves.push(emptyIndex + 1)

    return validMoves
  }

  const handleTileClick = (index: number) => {
    if (!startTime) {
      setStartTime(Date.now())
    }

    const emptyIndex = tiles.indexOf(EMPTY_TILE)
    const validMoves = getValidMoves(emptyIndex)

    if (validMoves.includes(index)) {
      const newTiles = [...tiles]
      ;[newTiles[emptyIndex], newTiles[index]] = [newTiles[index], newTiles[emptyIndex]]
      setTiles(newTiles)
      setMoves(moves + 1)

      // Check if solved
      const isSolved = newTiles.every((tile, idx) => tile === idx)
      if (isSolved) {
        setIsCompleted(true)
        setEndTime(Date.now())
        onComplete()
      }
    }
  }

  const getTimeElapsed = () => {
    if (!startTime) return 0
    const end = endTime || Date.now()
    return Math.floor((end - startTime) / 1000)
  }

  const getTileStyle = (value: number) => {
    if (value === EMPTY_TILE) return {}
    const hue = (value * 40) % 360
    return {
      background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${hue + 30}, 70%, 40%))`,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Puzzle className="w-6 h-6 text-primary-400" />
        <h3 className="text-xl font-bold text-white">Sliding Puzzle</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Moves</div>
          <div className="text-2xl font-bold text-primary-400">{moves}</div>
        </div>
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <div className="text-sm text-gray-400 mb-1">Time</div>
          <div className="text-2xl font-bold text-yellow-400">
            {getTimeElapsed()}s
          </div>
        </div>
      </div>

      {/* Instructions */}
      {!isCompleted && (
        <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
          <p className="text-gray-300 text-center text-sm">
            Arrange the tiles in order from 0 to {EMPTY_TILE - 1}
          </p>
        </div>
      )}

      {/* Puzzle Grid */}
      <div
        className="grid gap-2 mx-auto max-w-xs"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {tiles.map((tile, index) => (
          <motion.button
            key={index}
            onClick={() => handleTileClick(index)}
            disabled={tile === EMPTY_TILE || isCompleted}
            className={`aspect-square rounded-lg text-2xl font-bold text-white transition-all ${
              tile === EMPTY_TILE
                ? 'bg-dark-900 cursor-default'
                : 'hover:scale-105 active:scale-95'
            }`}
            style={getTileStyle(tile)}
            whileHover={tile !== EMPTY_TILE ? { scale: 1.05 } : {}}
            whileTap={tile !== EMPTY_TILE ? { scale: 0.95 } : {}}
          >
            {tile !== EMPTY_TILE && tile}
          </motion.button>
        ))}
      </div>

      {/* Results */}
      {isCompleted && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl p-6 border border-primary-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-bold text-white">Puzzle Solved!</h4>
          </div>
          <p className="text-gray-300 mb-4">
            🎉 You solved the puzzle in {moves} moves and {getTimeElapsed()}{' '}
            seconds!
          </p>
          <button
            onClick={initializeGame}
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
