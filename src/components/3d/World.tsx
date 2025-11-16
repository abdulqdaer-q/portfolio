import { Canvas } from '@react-three/fiber'
import { Sky, Stars, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import { Ground } from './Ground'
import { Buildings } from './Buildings'
import { Collectibles } from './Collectibles'
import { Player } from './Player'
import { PortalSections } from './PortalSections'
import { Lighting } from './Lighting'

interface WorldProps {
  onCollectItem: (itemId: string) => void
  onEnterPortal: (sectionId: string) => void
}

export function World({ onCollectItem, onEnterPortal }: WorldProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />

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
          <Player />

          {/* Controls */}
          <OrbitControls
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={50}
            enablePan={true}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
