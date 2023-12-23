import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { ContactShadows, Html, Environment, useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import DatGui, { DatNumber } from 'react-dat-gui';
import './phone.css';

const PhoneModel = (props) => {

  const ref = useRef();
  const { nodes, materials } = useGLTF("./models/iphone/iphone_13_pro_max.glb");
  
  // rotation animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t;
  });

  return (
    // missing ref={ref} after convert online
    <group {...props} ref={ref} dispose={null}>
      <group scale={0.01}>
        <group scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Frame_0.geometry}
            material={materials.Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Frame2_0.geometry}
            material={materials.Frame2}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Port_0.geometry}
            material={materials.Port}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Antenna_0.geometry}
            material={materials.Antenna}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Frame_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Bezel_0.geometry}
            material={materials.Bezel}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Wallpaper_0.geometry}
            material={materials.Wallpaper}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Camera_Glass_0.geometry}
            material={materials.Camera_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Lens_0.geometry}
            material={materials.Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body_Material_0.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera_Glass_0.geometry}
            material={materials.Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera_Camera_Frame001_0.geometry}
            material={materials["Camera_Frame.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera_Mic_0.geometry}
            material={materials.material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Body001_Screen_Glass_0.geometry}
            material={materials.Screen_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Button_Frame_0.geometry}
            material={materials.Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Circle003_Frame_0.geometry}
            material={materials.Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Apple_Logo_Logo_0.geometry}
            material={materials.Logo}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Body_0.geometry}
            material={materials.Body}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Gray_Glass_0.geometry}
            material={materials.Gray_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Flash_0.geometry}
            material={materials.Flash}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Port_0.geometry}
            material={materials.Port}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Camera_Frame_0.geometry}
            material={materials.Camera_Frame}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Camera_Glass_0.geometry}
            material={materials.Camera_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Lens_0.geometry}
            material={materials.Lens}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera001_Black_Glass_0.geometry}
            material={materials.Black_Glass}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Camera003_Material002_0.geometry}
            material={materials["Material.002"]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/iphone/iphone_13_pro_max.glb');

export default function IPhone() {
  const [positionForCamera, setPositionForCamera] = useState({x:0, y:0, z:7});

  const Camera = (props) => {
    const ref = useRef();
    const set = useThree((state) => state.set);
    useEffect( () => set({camera: ref.current}) );
    // add animation
    useFrame(() => ref.current.updateMatrixWorld(), []);
    // useFrame(() => {
    //     ref.current.position.y = 0;
    // });
    return <PerspectiveCamera {...props} ref={ref} dispose={null} />;
  };
  //console.log(positionForCamera);
  return (
    <div className='IPhone'>
      <h2>Iphone 13 pro Max</h2>
      <DatGui className='gui'
        data={positionForCamera}
        onUpdate={(data) => {
            //console.log(data);
            setPositionForCamera({...positionForCamera, ...data});
        }}>
        <DatNumber path={"x"} label={"x value for camera"} />
        <DatNumber path={"y"} label={"y value for camera"} />
        <DatNumber path={"z"} label={"z value for camera"} />
      </DatGui>
      <div className='canvas'>
        <Canvas shadows>
            <Camera 
                position= {[positionForCamera.x, positionForCamera.y, positionForCamera.z]} 
                fov={50} />
            <ambientLight intensity={1} />
            <pointLight intensity={1} position={[2,0,4]} />
            <Suspense fallback={null}>
                <PhoneModel scale={4} />
                <Environment preset='city' />
                <ContactShadows position={[0, -2, 0]} scale={10} />
                <Html style={{right: '-240px'}}>
                    <p style={{width: '100px', color: 'white', background: 'black', borderRadius: '12px', padding: '10px'}}>888 $</p>
                </Html>
            </Suspense>
            <OrbitControls 
                minPolarAngle={Math.PI / 2} 
                maxPolarAngle={Math.PI / 2} 
                enableZoom={false} 
                enablePan={false}
            />
        </Canvas>
      </div> 
    </div>
  );

}