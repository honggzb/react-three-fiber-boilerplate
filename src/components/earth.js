import React, { useRef, useEffect } from "react";
import { Canvas,useThree,useFrame } from "react-three-fiber";
import { Html, Environment } from "@react-three/drei";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

const CameraController = () => {
    const { camera, gl } = useThree();

    useEffect( () => {
        const controls = new OrbitControls(camera, gl.domElement);
        controls.minDistance = 3;
        controls.maxDistance = 20;
        return () => { controls.dispose(); };
      },
      [camera, gl]
    );
    return null;
};
  
const Earth = () => {
    
    const colorMap = new THREE.TextureLoader().load('./textures/earth/8k_earth_daymap_low.jpg'); 
    const normalMap = new THREE.TextureLoader().load('./textures/earth/8k_earth_normal_map_low.jpg'); 
    const specularMap = new THREE.TextureLoader().load('./textures/earth/8k_earth_specular_map_low.jpg'); 
    const cloudsMap = new THREE.TextureLoader().load('./textures/earth/8k_earth_clouds_low.jpg'); 

    // const ref = useRef();
    // useFrame(() => ref.current.updateMatrixWorld(), []);

    return (
        <Canvas>
            <ambientLight intensity={2} />
            <pointLight color="#f6f3ea" position={[2, 0, 5]} intensity={2} />
            {/* <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} /> */}
            {/* <primitive object={new THREE.AxesHelper(10)} /> */}
            <group dispose={null}>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[2.21, 32, 32]} />
                    <meshPhongMaterial
                        map={cloudsMap}
                        opacity={0.4}
                        depthWrite={true}
                        transparent={true}
                        side={THREE.DoubleSide}
                    />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[2.2, 32, 32]} />
                    <meshPhongMaterial specularMap={specularMap} />
                    <meshStandardMaterial
                        map={colorMap}
                        normalMap={normalMap}
                        metalness={0.4}
                        roughness={0.7}
                        />
                        <Html style={{right: '350px',top: '-100px'}}>
                            <h1 style={{color: 'white'}}>Welcome</h1>
                        </Html>
                </mesh> 
            </group>
            <CameraController />
            <Environment preset="city" />
        </Canvas>
    );
};

export default Earth;