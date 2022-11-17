import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import UIElements from "./components/UIElements";
import HitTest from "./components/HitTest";
import { Canvas } from '@react-three/fiber'
import { ARButton, XR } from '@react-three/xr'

export default function App() {
  return (
    <>
    <ARButton />
    <Canvas >
    <XR sessionInit={{ requiredFeatures: ["hit-test"] }}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
        <UIElements />
      </PerspectiveCamera>
      <HitTest />
      <OrbitControls />
    </XR>
    </Canvas>
    </>
  );
}
