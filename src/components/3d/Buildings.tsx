import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text, Center } from '@react-three/drei'

export function Buildings() {
  return (
    <>
      {/* Central tower - Portfolio hub */}
      <CentralTower />

      {/* Section buildings */}
      <SectionBuilding position={[-15, 0, -10]} label="EXPERIENCE" color="#3b82f6" />
      <SectionBuilding position={[15, 0, -10]} label="SKILLS" color="#8b5cf6" />
      <SectionBuilding position={[-15, 0, 10]} label="EDUCATION" color="#10b981" />
      <SectionBuilding position={[15, 0, 10]} label="CONTACT" color="#f59e0b" />

      {/* Decorative buildings */}
      <DecorativeBuilding position={[-25, 0, 0]} height={8} />
      <DecorativeBuilding position={[25, 0, 0]} height={12} />
      <DecorativeBuilding position={[0, 0, -25]} height={10} />
      <DecorativeBuilding position={[0, 0, 25]} height={6} />
    </>
  )
}

function CentralTower() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 7.5, 0]}>
        <cylinderGeometry args={[3, 4, 15, 8]} />
        <meshStandardMaterial
          color="#1e3a8a"
          metalness={0.8}
          roughness={0.2}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing ring at top */}
      <mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
      </mesh>

      {/* AQ Logo */}
      <Center position={[0, 16, 0]}>
        <Text
          fontSize={1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="#3b82f6"
        >
          &lt;AQ/&gt;
        </Text>
      </Center>
    </group>
  )
}

function SectionBuilding({
  position,
  label,
  color,
}: {
  position: [number, number, number]
  label: string
  color: string
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 2.5 + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[4, 5, 4]}
        radius={0.2}
        smoothness={4}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* Label */}
      <Center position={[0, 6, 0]}>
        <Text
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor={color}
        >
          {label}
        </Text>
      </Center>

      {/* Portal effect */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2, 2.5, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  )
}

function DecorativeBuilding({
  position,
  height,
}: {
  position: [number, number, number]
  height: number
}) {
  return (
    <mesh position={[position[0], height / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[3, height, 3]} />
      <meshStandardMaterial
        color="#1a1f3a"
        metalness={0.5}
        roughness={0.5}
        emissive="#3b82f6"
        emissiveIntensity={0.1}
      />
    </mesh>
  )
}
