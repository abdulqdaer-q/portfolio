import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  emoji: string
}

interface ParticleEffectProps {
  trigger: boolean
  emoji?: string
}

export function ParticleEffect({ trigger, emoji = '✨' }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * window.innerWidth,
          y: window.innerHeight / 2,
          emoji,
        })
      }
      setParticles(newParticles)

      setTimeout(() => setParticles([]), 2000)
    }
  }, [trigger, emoji])

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              y: particle.y - 200 - Math.random() * 200,
              x: particle.x + (Math.random() - 0.5) * 400,
              opacity: 0,
              scale: 1 + Math.random(),
              rotate: Math.random() * 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute text-4xl"
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
