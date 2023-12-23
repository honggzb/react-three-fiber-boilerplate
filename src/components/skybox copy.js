import {
  CubeCamera,
  LinearMipMapLinearFilter,
  WebGLCubeRenderTarget
} from "three";
import { Canvas, useFrame, useThree } from "react-three-fiber"
import { Environment, OrbitControls  } from "@react-three/drei";

const Sphere = () => {
  const { scene, gl } = useThree();

  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    generateMipmaps: true,
    minFilter: LinearMipMapLinearFilter,
  });
  const cubeCamera = new CubeCamera(1, 1000, cubeRenderTarget);
  scene.add(cubeCamera);

  useFrame(() => cubeCamera.update(gl, scene));

  return (
      <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <directionalLight intensity={0.5} />
        <sphereGeometry attach="geometry" args={[2, 32, 32]} />
        <meshBasicMaterial
          envMap={cubeCamera.renderTarget.texture}
          attach="material"
          color="orange"
          roughness={0.1}
          metalness={1}
        />
      </mesh>
  );
}

export default function SkyboxDemo() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <directionalLight intensity={0.5} />
        <Sphere />
        <Environment background 
          path='./textures/spaces/'
          files={[ '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg' ]} />
        <OrbitControls autoRotate />
      </Canvas>
    </>
  );

}