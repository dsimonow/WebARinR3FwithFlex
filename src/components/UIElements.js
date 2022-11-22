import { Interactive } from "@react-three/xr";
import { Cone } from "@react-three/drei";
import { useStore } from "./store";

export default function UIElements(props) {
  const increaseSlidePosition = useStore(
    (state) => state.increaseSlidePosition
  );
  const decreaseSlidePosition = useStore(
    (state) => state.decreaseSlidePosition
  );
  const resetSlidePosition = useStore((state) => state.resetSlidePosition);
  return (
    <group position={[0,-0.15,0]}>
      <Interactive onSelect={increaseSlidePosition}>
        <Cone
          position={[0.1, 0, -0.5]}
          rotation={[0, 0, -1.65]}
          castShadow
          receiveShadow
          scale={0.03}
          onClick={increaseSlidePosition}
        >
          <Cone position={[0, 0.8, 0]} scale={0.1} />
        </Cone>
      </Interactive>
      <Interactive onSelect={resetSlidePosition}>
        <mesh
          position={[0, 0, -0.5]}
          castShadow
          receiveShadow
          scale={0.05}
          onClick={resetSlidePosition}
        >
          <boxBufferGeometry />
        </mesh>
      </Interactive>
      <Interactive onSelect={decreaseSlidePosition}>
        <Cone
          position={[-0.1, 0, -0.5]}
          rotation={[0, 0, 1.65]}
          castShadow
          receiveShadow
          scale={0.03}
          onClick={decreaseSlidePosition}
        >
          <Cone position={[0, 0.8, 0]} scale={0.1} />
        </Cone>
      </Interactive>
    </group>
  );
}
