import { useRef } from 'react'
import { Mesh } from 'three'
import { MeshReflectorMaterial } from '@react-three/drei'

export function Ground() {
  const meshRef = useRef<Mesh>(null)

  return (
    <>
      {/* Main ground */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
          mirror={0}
        />
      </mesh>

      {/* Grid lines for cyberpunk feel */}
      <gridHelper args={[100, 50, '#3b82f6', '#1e3a8a']} position={[0, 0.01, 0]} />
    </>
  )
}
