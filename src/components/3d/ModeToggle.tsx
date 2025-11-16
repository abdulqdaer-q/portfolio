import { motion } from 'framer-motion'
import { Box, Layers } from 'lucide-react'
import { use3DMode } from '@/hooks/use3DMode'

export function ModeToggle() {
  const { is3DMode, toggle3DMode } = use3DMode()

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle3DMode}
      className="fixed top-24 right-6 z-50 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all group"
    >
      <div className="flex items-center gap-3">
        {is3DMode ? (
          <>
            <Layers className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            <span className="text-white font-bold">2D Mode</span>
          </>
        ) : (
          <>
            <Box className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            <span className="text-white font-bold">3D World</span>
          </>
        )}
      </div>
    </motion.button>
  )
}
