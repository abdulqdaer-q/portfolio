import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

interface CameraFollowProps {
  target: Vector3
}

export function CameraFollow({ target }: CameraFollowProps) {
  const { camera } = useThree()
  const targetCameraPosition = useRef(new Vector3())

  useFrame(() => {
    // Calculate desired camera position (behind and above the player)
    targetCameraPosition.current.set(target.x, target.y + 15, target.z + 20)

    // Smoothly interpolate camera position
    camera.position.lerp(targetCameraPosition.current, 0.05)

    // Always look at the player
    camera.lookAt(target.x, target.y + 1, target.z)
  })

  return null
}
