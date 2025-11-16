import { useEffect, useState, useCallback } from 'react'
import { Vector3 } from 'three'

export interface PlayerControls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
}

export function usePlayerControls() {
  const [keys, setKeys] = useState<PlayerControls>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  })

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    setKeys((prev) => {
      switch (key) {
        case 'w':
        case 'arrowup':
          return { ...prev, forward: true }
        case 's':
        case 'arrowdown':
          return { ...prev, backward: true }
        case 'a':
        case 'arrowleft':
          return { ...prev, left: true }
        case 'd':
        case 'arrowright':
          return { ...prev, right: true }
        default:
          return prev
      }
    })
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    setKeys((prev) => {
      switch (key) {
        case 'w':
        case 'arrowup':
          return { ...prev, forward: false }
        case 's':
        case 'arrowdown':
          return { ...prev, backward: false }
        case 'a':
        case 'arrowleft':
          return { ...prev, left: false }
        case 'd':
        case 'arrowright':
          return { ...prev, right: false }
        default:
          return prev
      }
    })
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  return keys
}

export function calculateMovement(keys: PlayerControls, speed: number, delta: number): Vector3 {
  const movement = new Vector3()

  if (keys.forward) movement.z -= speed * delta
  if (keys.backward) movement.z += speed * delta
  if (keys.left) movement.x -= speed * delta
  if (keys.right) movement.x += speed * delta

  return movement
}
