import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

export function Boxes() {
  return (
    <>
      {[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ].map((e, i) => (
        <Box
          key={i}
          color={i % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
        />
      ))}
    </>
  );
}

function Box({ color }) {
  const box = useRef();
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [position, setPosition] = useState(resetPosition());
  const [scale] = useState(() => Math.pow(Math.random(), 1) * 0.35 + 0.35);

  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15
    );
    if (v.x < 0) v.x -= 2;
    if (v.x > 0) v.x += 2;
    return v;
  }

  useFrame(
    (state, delta) => {
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
      box.current.position.set(position.x, position.y, position.z);
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh ref={box} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}
