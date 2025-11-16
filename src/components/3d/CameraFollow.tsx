import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

interface CameraFollowProps {
  target: Vector3
}

export function CameraFollow({ target }: CameraFollowProps) {
  const { camera } = useThree()
  const targetCameraPosition = useRef(new Vector3())
  const lookAtTarget = useRef(new Vector3())

  useFrame((_, delta) => {
    // Calculate desired camera position (behind and above the player)
    targetCameraPosition.current.set(target.x, target.y + 15, target.z + 20)

    // Smoothly interpolate camera position (adjusted for frame rate)
    const lerpFactor = Math.min(delta * 3, 0.1) // Smooth but responsive
    camera.position.lerp(targetCameraPosition.current, lerpFactor)

    // Smoothly look at the player
    lookAtTarget.current.set(target.x, target.y + 1, target.z)
    lookAtTarget.current.lerp(camera.position, 0.95)
    camera.lookAt(lookAtTarget.current)
  })

  return null
}
