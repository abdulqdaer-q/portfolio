import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export function Player() {
  const playerRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (playerRef.current) {
      // Bobbing animation
      playerRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={[0, 0.5, 8]}>
      {/* Player body */}
      <mesh ref={playerRef} castShadow>
        <capsuleGeometry args={[0.4, 1, 8, 16]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>

      {/* Glow effect under player */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  )
}
