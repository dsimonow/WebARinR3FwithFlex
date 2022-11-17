import { useState, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import { useHitTest, Interactive } from "@react-three/xr";
import Composition from "./Composition";

export default function HitTest() {
  const state = useThree();
  const camera = useThree((state) => state.camera);
  const ref = useRef();
  //HELPER Outline 3D Debugger
  //useHelper(ref, THREE.BoxHelper, "#FFC0CB");

  // nur AR relevant
  // Finder Funktion in Tandem mit useHitTest
  const [pos, setPos] = useState(() => {
    return [0, 0, 0];
  });
  const [rota, setRota] = useState(() => {
    return new THREE.Euler(0, 0, 0);
  });
  const [hitEnabled, setHitenabled] = useState(() => {
    return false;
  });
  const [hitScale, setHitscale] = useState(0.1);
  const [hitRota, setHitrota] = useState(() => {
    return camera.quaternion;
  });

  useHitTest((hitMatrix) => {
    hitMatrix.decompose(ref.current.position, hitRota, hitScale);
    console.log(ref);
  });

  //const handleClick = useCallback(e => set(items => [...items, uuid.generate()]), [])

  // Tracking Stop. Set Flag for Composition
  function handleClick() {
    const prevRotation = ref.current.rotation.clone();

    setHitenabled((prevHitenabled) => true);
    //setPos((prevPos) => ref.current.position);

    //debugshelper //console.log(ref.current.position);
    const prevRot = ref.current.quaternion.copy(camera.quaternion);
    setRota((prevRota) => rota.setFromQuaternion(prevRot));
    ref.current.visible = false;
    //console.log(ref.visible);
  }

  return (
    <>
      <Interactive
        onSelect={() => {
          handleClick();
        }}
      >
        <Sphere
          ref={ref}
          scale={0.1}
          onClick={() => {
            handleClick();
          }}
        />
      </Interactive>
      <Composition
        hitEnabled={hitEnabled}
        position={pos}
        rotation={rota}
        scale={0.2}
      />
    </>
  );
}
