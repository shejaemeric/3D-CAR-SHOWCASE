import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {
    const gtlf = useLoader(
        GLTFLoader,
        "./public/models/car/scene.gltf"
    );

    useEffect(() => {
        gtlf.scene.scale.set(0.005, 0.005, 0.005);
        gtlf.scene.position.set(0, -0.035, 0);
        gtlf.scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.envMapIntensity = 20;
            }
        });
    }, [gtlf]);
    return <primitive object={gtlf.scene} />;
}

export default Car;
