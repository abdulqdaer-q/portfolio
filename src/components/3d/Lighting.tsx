export function Lighting() {
  return (
    <>
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional light for sun */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Point lights for accent */}
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />

      {/* Hemisphere light for realistic sky/ground color */}
      <hemisphereLight
        color="#ffffff"
        groundColor="#444444"
        intensity={0.5}
        position={[0, 50, 0]}
      />
    </>
  )
}
