import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, Html } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Stars />
    </Canvas>
  )
}

function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#c850c0" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
      <Html style={{right: '350px',top: '-250px'}}>
          <h1 style={{ 
            'background': 'linear-gradient(30deg, #c850c0, #ffcc70)',
            'color': 'red',
            'textAlign': 'center',
            'lineHeight': '0.8',
            'WebkitBackgroundClip': 'text',
            'WebkitTextFillColor': 'transparent'}}> 
            Welcome to my playground
        </h1>
      </Html>
    </group>
  )
}
