import { Canvas } from '@react-three/fiber'
import { Sky, Stars, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import { Vector3 } from 'three'
import { Ground } from './Ground'
import { Buildings } from './Buildings'
import { Collectibles } from './Collectibles'
import { Player, PlayerRef } from './Player'
import { PortalSections } from './PortalSections'
import { Lighting } from './Lighting'
import { CameraFollow } from './CameraFollow'

interface WorldProps {
  onCollectItem: (itemId: string) => void
  onEnterPortal: (sectionId: string) => void
  onPlayerPositionChange?: (position: Vector3) => void
}

export function World({ onCollectItem, onEnterPortal, onPlayerPositionChange }: WorldProps) {
  const playerRef = useRef<PlayerRef>(null)
  const [playerPosition, setPlayerPosition] = useState(new Vector3(0, 0.5, 8))

  const handlePlayerMove = (position: Vector3) => {
    setPlayerPosition(position)
    onPlayerPositionChange?.(position)
  }

  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 15, 20]} />

          {/* Lighting */}
          <Lighting />

          {/* Sky */}
          <Sky distance={450000} sunPosition={[100, 20, 100]} inclination={0.6} azimuth={0.25} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

          {/* Environment */}
          <Ground />
          <Buildings />

          {/* Interactive Elements */}
          <PortalSections onEnterPortal={onEnterPortal} />
          <Collectibles onCollect={onCollectItem} />

          {/* Player */}
          <Player ref={playerRef} onPositionChange={handlePlayerMove} />

          {/* Camera Follow */}
          <CameraFollow target={playerPosition} />
        </Suspense>
      </Canvas>
    </div>
  )
}
