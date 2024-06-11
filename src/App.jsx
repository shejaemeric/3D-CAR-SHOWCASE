import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Ground } from "./Ground";
import Car from "./Car";
import Rings from "./Rings";
import { Boxes } from "./Boxes";
import { BlendFunction } from "postprocessing";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { FloatingGrid } from "./FloatingGrid";

function CarShow() {
  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
        enableZoom={true} // Enable zooming with the mouse wheel
        enablePan={true} // Enable panning (moving horizontally and vertically) with the mouse
        enableRotate={true}
      />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={200}
        angle={1.2}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={300}
        angle={1.2}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
      <Rings />
      <Boxes />
      <FloatingGrid />

      {/* <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
          height={300}
          width={300}
          intensity={0.4}
          kernelSize={5}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          BlendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer> */}
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
