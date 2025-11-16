import { useRef, useState } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

interface CollectibleProps {
  position: [number, number, number]
  id: string
  emoji: string
  onCollect: (id: string) => void
}

function Collectible({ position, id, emoji, onCollect }: CollectibleProps) {
  const meshRef = useRef<Mesh>(null)
  const [collected, setCollected] = useState(false)

  useFrame((state) => {
    if (meshRef.current && !collected) {
      meshRef.current.rotation.y += 0.02
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  const handleClick = () => {
    if (!collected) {
      setCollected(true)
      onCollect(id)
    }
  }

  if (collected) return null

  return (
    <group position={position}>
      <mesh ref={meshRef} onClick={handleClick} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Emoji label */}
      <Text
        position={[0, 1, 0]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {emoji}
      </Text>

      {/* Glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <ringGeometry args={[0.6, 0.8, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={2}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

export function Collectibles({ onCollect }: { onCollect: (id: string) => void }) {
  const collectibles = [
    { id: 'xp-1', position: [-10, 1, -5], emoji: '⭐' },
    { id: 'xp-2', position: [10, 1, -5], emoji: '⭐' },
    { id: 'xp-3', position: [-10, 1, 5], emoji: '⭐' },
    { id: 'xp-4', position: [10, 1, 5], emoji: '⭐' },
    { id: 'secret-1', position: [-20, 1, -15], emoji: '🎮' },
    { id: 'secret-2', position: [20, 1, -15], emoji: '🏆' },
    { id: 'secret-3', position: [-20, 1, 15], emoji: '💎' },
    { id: 'secret-4', position: [20, 1, 15], emoji: '🔮' },
  ] as const

  return (
    <>
      {collectibles.map((item) => (
        <Collectible
          key={item.id}
          id={item.id}
          position={item.position as [number, number, number]}
          emoji={item.emoji}
          onCollect={onCollect}
        />
      ))}
    </>
  )
}
