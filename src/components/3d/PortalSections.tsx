import { useRef } from 'react'
import { Mesh, Group } from 'three'
import { useFrame } from '@react-three/fiber'

interface PortalProps {
  position: [number, number, number]
  sectionId: string
  color: string
  onEnter: (sectionId: string) => void
}

function Portal({ position, sectionId, color, onEnter }: PortalProps) {
  const meshRef = useRef<Mesh>(null)
  const ringRef = useRef<Mesh>(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= 0.02
    }
  })

  return (
    <group position={position}>
      {/* Outer ring */}
      <mesh ref={ringRef} rotation={[0, 0, 0]} onClick={() => onEnter(sectionId)}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>

      {/* Inner portal */}
      <mesh ref={meshRef} rotation={[0, 0, 0]} onClick={() => onEnter(sectionId)}>
        <circleGeometry args={[2, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Particles around portal */}
      <ParticleRing color={color} radius={2.2} />
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

  return (
    <group ref={particles}>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
          </mesh>
        )
      })}
    </group>
  )
}

export function PortalSections({ onEnterPortal }: { onEnterPortal: (sectionId: string) => void }) {
  return (
    <>
      <Portal
        position={[-15, 3, -10]}
        sectionId="experience"
        color="#3b82f6"
        onEnter={onEnterPortal}
      />
      <Portal position={[15, 3, -10]} sectionId="skills" color="#8b5cf6" onEnter={onEnterPortal} />
      <Portal
        position={[-15, 3, 10]}
        sectionId="education"
        color="#10b981"
        onEnter={onEnterPortal}
      />
      <Portal position={[15, 3, 10]} sectionId="contact" color="#f59e0b" onEnter={onEnterPortal} />
    </>
  )
}
