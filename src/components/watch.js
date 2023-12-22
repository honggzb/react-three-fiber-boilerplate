import { Suspense } from 'react'
import { Canvas } from "react-three-fiber"
import { ContactShadows, Html, Environment, useGLTF,PresentationControls } from "@react-three/drei";
import './watch.css';

const Watchmodel = (props) => {
  const { nodes, materials } = useGLTF("./models/watch.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object005_glass_0.geometry}
        material={materials.glass}
        rotation={[-Math.PI / 2, 0, 0]}>
          <Html scale={100} rotation={[Math.PI / 2, 0, 0]} position={[200, -350, 10]} transform occlude>
            <div className="annotation">
              6.550 $ <span style={{ fontSize: '1.5em' }}>🥲</span>
            </div>
          </Html>
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object006_watch_0.geometry}
        material={materials.watch}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('./models/watch.glb');

export default function Watch() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 25 }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          intensity={0.5}
          angle={0.15}
          penumbra={1}
          position={[10,10,10]}
          shadow-mapSize={2048}
          castShadow 
        />
        <Suspense fallback={null}>
          <PresentationControls
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}>
              <Watchmodel rotation={[0, -0.2, 0]} position={[0, 0.25, 0]} scale={0.003} />
          </PresentationControls>
          <ContactShadows 
            position={[0, -1.4, 0]}
            opacity={0.75}
            scale={10}
            blur={2.5}
            far={4} 
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </>
  );

}
