import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { ARCanvas } from "@react-three/xr";
import UIElements from "./components/UIElements";
import HitTest from "./components/HitTest";

export default function App() {
  return (
    <ARCanvas sessionInit={{ requiredFeatures: ["hit-test"] }}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
        <UIElements />
      </PerspectiveCamera>
      <HitTest />
      <OrbitControls />
    </ARCanvas>
  );
}
