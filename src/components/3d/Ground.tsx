import { useRef } from 'react'
import { Mesh } from 'three'

export function Ground() {
  const meshRef = useRef<Mesh>(null)

  return (
    <>
      {/* Main ground - simplified for performance */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.3}
          roughness={0.8}
        />
      </mesh>

      {/* Simplified grid for cyberpunk feel */}
      <gridHelper args={[100, 25, '#3b82f6', '#1e3a8a']} position={[0, 0.01, 0]} />
    </>
  )
}
