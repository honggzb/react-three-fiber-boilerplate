import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { ScrollControls } from "@react-three/drei";

const GuildLine = () => {
  return (
    <>
      {/* <Canvas camera={{ position: [0, 0, 5], fov: 50 }}> */}
      <Canvas>
        <color attach="background" args={["#ececec"]} />
        <ScrollControls pages={5} damping={0.3}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </>
  );
}

export default GuildLine;