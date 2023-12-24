import React from "react";

const Ball = ({ position }) => {
  return (
    <>
      <mesh position={position}>
        <sphereBufferGeometry
          visible
          position={[0, 0, 2]}
          args={[1, 250, 250]}
        />
        <meshStandardMaterial attach="material" color="#00F5D4" roughness={0} />
      </mesh>
    </>
  );
};

export default Ball;
