import * as THREE from 'three'
import { Suspense, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { Html, Preload, OrbitControls } from '@react-three/drei'
//import { Popconfirm } from 'antd'

const store = [
  { name: 'outside', color: 'lightpink', position: [10, 0, -15], url: './models/room-inside.jpg', link: 1 },
  { name: 'inside', color: 'lightblue', position: [15, 0, 0], url: './models/room-outside.jpg', link: 0 }
  // ...
]


const Dome = ({ name, position, texture, onClick }) => {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
      <mesh position={position}>
        <sphereGeometry args={[1.25, 32, 32]} />
        <meshBasicMaterial color="white" />
        <Html center>
            <a href="#" onClick={onClick}>{name}</a>
        </Html>
      </mesh>
    </group>
  )
}

const Portals = () => {
  const [which, set] = useState(0)
  const { link, ...props } = store[which]
  const maps = useLoader(THREE.TextureLoader, store.map((entry) => entry.url)) // prettier-ignore
  return <Dome onClick={() => set(link)} {...props} texture={maps[which]} />
}

export default function Room() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 0.1] }}>
      <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.2} autoRotate={false} rotateSpeed={-0.5} />
      <Suspense fallback={null}>
        <Preload all />
        <Portals />
      </Suspense>
    </Canvas>
  )
}
