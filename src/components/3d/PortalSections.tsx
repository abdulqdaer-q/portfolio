import { useRef, useState, useMemo } from 'react'
import { Mesh, Group, Vector3 } from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

interface PortalProps {
  position: [number, number, number]
  sectionId: string
  color: string
  label: string
  onEnter: (sectionId: string) => void
  playerPosition: Vector3
}

function Portal({ position, sectionId, color, label, onEnter, playerPosition }: PortalProps) {
  const meshRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)
  const [isNear, setIsNear] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.02
    }

    // Check proximity to player
    const distance = playerPosition.distanceTo(
      new Vector3(position[0], position[1], position[2])
    )
    setIsNear(distance < 5)
  })

  const handleClick = () => {
    onEnter(sectionId)
  }

  // Shared geometry to improve performance
  const torusGeometry = useMemo(() => [2, 0.1, 16, 50], [])
  const circleGeometry = useMemo(() => [2, 32], [])

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh
        ref={ringRef}
        rotation={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <torusGeometry args={torusGeometry as any} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isNear ? 3 : 2}
        />
      </mesh>

      {/* Inner portal */}
      <mesh
        ref={meshRef}
        rotation={[0, 0, 0]}
        onClick={handleClick}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <circleGeometry args={circleGeometry as any} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isNear ? 1.5 : 1}
          transparent
          opacity={isNear ? 0.5 : 0.3}
        />
      </mesh>

      {/* Reduced particles for performance */}
      <ParticleRing color={color} radius={2.2} />

      {/* Show label when near */}
      {isNear && (
        <Text
          position={[0, -2, 0]}
          fontSize={0.4}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor={color}
        >
          Click to visit {label}
        </Text>
      )}
    </group>
  )
}

function ParticleRing({ color, radius }: { color: string; radius: number }) {
  const particles = useRef<Group>(null)

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.z += 0.005
    }
  })

  // Reduced from 12 to 6 particles for performance
  const particlePositions = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2
      return [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number]
    })
  }, [radius])

  return (
    <group ref={particles}>
      {particlePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
      ))}
    </group>
  )
}

interface PortalSectionsProps {
  onEnterPortal: (sectionId: string) => void
  playerPosition: Vector3
}

export function PortalSections({ onEnterPortal, playerPosition }: PortalSectionsProps) {
  return (
    <>
      <Portal
        position={[-15, 3, -10]}
        sectionId="experience"
        label="Experience"
        color="#3b82f6"
        onEnter={onEnterPortal}
        playerPosition={playerPosition}
      />
      <Portal
        position={[15, 3, -10]}
        sectionId="skills"
        label="Skills"
        color="#8b5cf6"
        onEnter={onEnterPortal}
        playerPosition={playerPosition}
      />
      <Portal
        position={[-15, 3, 10]}
        sectionId="education"
        label="Education"
        color="#10b981"
        onEnter={onEnterPortal}
        playerPosition={playerPosition}
      />
      <Portal
        position={[15, 3, 10]}
        sectionId="contact"
        label="Contact"
        color="#f59e0b"
        onEnter={onEnterPortal}
        playerPosition={playerPosition}
      />
    </>
  )
}
