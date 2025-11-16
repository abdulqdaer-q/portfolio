import { motion } from 'framer-motion'
import { Map } from 'lucide-react'

interface MinimapProps {
  playerPosition: { x: number; z: number }
  collectibles: Array<{ id: string; position: [number, number, number]; collected: boolean }>
}

export function Minimap({ playerPosition, collectibles }: MinimapProps) {
  const mapScale = 2 // Scale factor for minimap
  const mapSize = 200

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="bg-dark-900/90 backdrop-blur-md rounded-xl border border-primary-500/30 p-4 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Map className="w-5 h-5 text-primary-400" />
          <h3 className="text-sm font-bold text-white">Minimap</h3>
        </div>

        {/* Map */}
        <div
          className="relative bg-dark-950 rounded-lg overflow-hidden"
          style={{ width: mapSize, height: mapSize }}
        >
          {/* Grid */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`v-${i}`}>
                <div
                  className="absolute h-full w-px bg-primary-500"
                  style={{ left: `${(i * 100) / 10}%` }}
                />
                <div
                  className="absolute w-full h-px bg-primary-500"
                  style={{ top: `${(i * 100) / 10}%` }}
                />
              </div>
            ))}
          </div>

          {/* Collectibles */}
          {collectibles.map((item) =>
            !item.collected ? (
              <div
                key={item.id}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  left: `${50 + item.position[0] / mapScale}%`,
                  top: `${50 + item.position[2] / mapScale}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ) : null
          )}

          {/* Portals */}
          {[
            { x: -15, z: -10, color: '#3b82f6' },
            { x: 15, z: -10, color: '#8b5cf6' },
            { x: -15, z: 10, color: '#10b981' },
            { x: 15, z: 10, color: '#f59e0b' },
          ].map((portal, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${50 + portal.x / mapScale}%`,
                top: `${50 + portal.z / mapScale}%`,
                backgroundColor: portal.color,
                transform: 'translate(-50%, -50%)',
                boxShadow: `0 0 10px ${portal.color}`,
              }}
            />
          ))}

          {/* Player */}
          <motion.div
            className="absolute w-3 h-3 bg-white rounded-full border-2 border-primary-400"
            style={{
              left: `${50 + playerPosition.x / mapScale}%`,
              top: `${50 + playerPosition.z / mapScale}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        </div>

        {/* Legend */}
        <div className="mt-3 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full" />
            <span className="text-gray-400">You</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="text-gray-400">Collectibles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full" />
            <span className="text-gray-400">Portals</span>
          </div>
        </div>
      </div>
    </div>
  )
}
