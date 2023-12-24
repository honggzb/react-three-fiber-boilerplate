import React , { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
// react-spring 流行的动画库
import { useSpring, animated } from "@react-spring/three";

const Box = ({ props }) => {

  // Use useRef hook to access the mesh element
  const mesh=useRef();

  // State values for hover 悬停时改变颜色
  const [hovered, setHover] = useState(false);
  // State values for 存储单击时网格的活动状态
  const [active, setActive] = useState(false);

  //Basic animation to rotate our cube using animation frame
  useFrame ( ()=> (mesh.current.rotation.x += 0.01))

  //Spring animation hook that scales size based on active state
  const { scale } = useSpring({ scale: active ? 1.5 : 1 });

  // 3d cube will have height width and depth equal 2 units.
  return (
    <animated.mesh
      ref={mesh}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)} 
      onClick = {(event)=> setActive(!active)}
      scale = { scale}
    >
      <boxGeometry args={[2, 2, 2]} attach="geometry" />
      <meshStandardMaterial color={hovered ? "#010203" : "orange"} attach="material" />
    </animated.mesh>
  );
};

export default Box;


//https://blog.csdn.net/shebao3333/article/details/129702338