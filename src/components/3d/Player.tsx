import { useRef, forwardRef, useImperativeHandle } from 'react'
import { Group, Mesh, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { usePlayerControls, calculateMovement } from '@/hooks/usePlayerControls'

export interface PlayerRef {
  position: Vector3
}

interface PlayerProps {
  onPositionChange?: (position: Vector3) => void
}

export const Player = forwardRef<PlayerRef, PlayerProps>(({ onPositionChange }, ref) => {
  const groupRef = useRef<Group>(null)
  const playerRef = useRef<Mesh>(null)
  const keys = usePlayerControls()
  const SPEED = 10 // units per second

  useImperativeHandle(ref, () => ({
    get position() {
      return groupRef.current?.position || new Vector3(0, 0.5, 8)
    },
  }))

  useFrame((state, delta) => {
    if (groupRef.current && playerRef.current) {
      // Calculate movement
      const movement = calculateMovement(keys, SPEED, delta)

      // Apply movement
      if (movement.length() > 0) {
        groupRef.current.position.x += movement.x
        groupRef.current.position.z += movement.z

        // Constrain to world bounds
        const BOUNDS = 45
        groupRef.current.position.x = Math.max(
          -BOUNDS,
          Math.min(BOUNDS, groupRef.current.position.x)
        )
        groupRef.current.position.z = Math.max(
          -BOUNDS,
          Math.min(BOUNDS, groupRef.current.position.z)
        )

        // Notify parent of position change
        if (onPositionChange) {
          onPositionChange(groupRef.current.position.clone())
        }
      }

      // Bobbing animation
      playerRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 8]}>
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
})
