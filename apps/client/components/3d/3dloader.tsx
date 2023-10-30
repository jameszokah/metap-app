'use client';
import { Canvas } from "@react-three/fiber";
import { Loader } from "r3dy";

export default function Loader3D({ theme}: { theme?: 'light' | 'dark'  }) {
  return (
      <Canvas>
        <Loader model={2} theme={theme} scale={1.2}  color="#fff" />
      </Canvas>
  );
}
