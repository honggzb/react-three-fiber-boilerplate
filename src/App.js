import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber"
import { HexColorPicker } from "react-colorful";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "react-three-fiber";
import { ContactShadows, OrbitControls, Environment } from "@react-three/drei";
import { proxy, useSnapshot } from "valtio"
import './App.css';

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    laces: "#ffffff",
    mesh: "#ffffff",
    caps: "#ffffff",
    inner: "#ffffff",
    sole: "#ffffff",
    stripes: "#ffffff",
    band: "#ffffff",
    patch: "#ffffff",
  },
});

const Picker = () => {
  const snap = useSnapshot(state);
  return (
      <div style={{ display: snap.current ? "block" : "none" }}>
          <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
          <h1>{snap.current}</h1>
      </div>
  );
};

const  Shoe = () =>  {

  const ref = useRef();
  const snap = useSnapshot(state);
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("./models/shoe-draco.glb");
  
 // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  }, []);

  //Cursor showing current color
  const [hovered, set] = useState(null);
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  return (
     <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} material-color={snap.items.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} material-color={snap.items.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} material-color={snap.items.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} material-color={snap.items.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} material-color={snap.items.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} material-color={snap.items.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} material-color={snap.items.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} material-color={snap.items.patch} />
    </group>
  );

}

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.5} />
        <spotLight 
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10,15,10]}
          castShadow 
        />
        <Suspense fallback={null}>
          <Shoe />
          <Environment files="./models/royal_esplanade_1k.hdr" />
          <ContactShadows 
            position={[0, -0.8, 0]}
            opacity={0.5}
            scale={10}
            blur={1.5}
            far={0.8} 
          />
        </Suspense>
        <OrbitControls 
          minPolarAngle={Math.PI/2} 
          maxDistance={Math.PI/2} 
          enableZoom={false} 
          enablePan={false} />
      </Canvas>
      <Picker />
    </>
  );

}

export default App;
