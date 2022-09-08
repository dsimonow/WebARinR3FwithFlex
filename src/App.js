import { useState, useRef } from "react";
import * as THREE from "three";
import useInterval from "@use-it/interval";
import { useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  Text,
  Sphere,
  Cone,
  Backdrop
} from "@react-three/drei";
import { useHelper } from "@react-three/drei";
import { Flex, Box } from "@react-three/flex";
import { ARCanvas, useHitTest, Interactive } from "@react-three/xr";
import create from "zustand";
import data from "./components/data/data.json";

//todo clean up unused variables

const useStore = create((set) => ({
  slidePosition: 0,
  increaseSlidePosition: () =>
    set((state) => ({
      //Hardcode Limit >7
      slidePosition:
        state.slidePosition === 7
          ? (state.slidePositon = 7)
          : state.slidePosition + 1
    })),
  decreaseSlidePosition: () =>
    set((state) => ({
      slidePosition:
        //Limit <0
        state.slidePosition === 0
          ? (state.slidePositon = 0)
          : state.slidePosition - 1
    })),
  resetSlidePosition: () => set({ slidePosition: 0 })
}));

function HitTestExample() {
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
  });

  //const handleClick = useCallback(e => set(items => [...items, uuid.generate()]), [])

  // Tracking Stop. Set Flag for Compositionmanager
  function handleClick() {
    const prevRotation = ref.current.rotation.clone();
    console.log(prevRotation);
    //debugshelper //console.log(ref.current.position);
    setHitenabled((prevHitenabled) => true);
    setPos((prevPos) => ref.current.position);

    //debugshelper //console.log(ref.current.position);
    const prevRot = ref.current.quaternion.copy(camera.quaternion);
    setRota((prevRota) => rota.setFromQuaternion(prevRot));
    ref.current.visible = false;
    console.log(ref.visible);
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
      <CompositionManager
        hitEnabled={hitEnabled}
        position={pos}
        rotation={rota}
        scale={0.2}
      />
    </>
  );
}

function CompositionManager(props) {
  const ref = useRef();
  useHelper(ref, THREE.BoxHelper, "#FFC0CB");
  const isGoal = props.hitEnabled;

  if (isGoal) {
    return (
      <group>
        <Composition
          position={props.position}
          rotation={props.rotation}
          scale={props.scale}
        />
      </group>
    );
  }
  return null;
}

function Composition(props) {
  const ref = useRef();
  const group1 = useRef();
  const text1 = useRef();
  const flex1 = useRef();
  const box1 = useRef();
  const text2 = useRef();
  const box2 = useRef();
  const text3 = useRef();
  const backdrop = useRef();

  // HELFER DEBUG OUTLINES 3D
  ////useHelper(ref, THREE.BoxHelper, "#FFC0CB");
  ////useHelper(group1, THREE.BoxHelper, "#FFC0CB");
  //useHelper(text1, THREE.BoxHelper, "#FFC0CB");
  ////useHelper(flex1, THREE.BoxHelper, "#FFC0CB");
  ////useHelper(box1, THREE.BoxHelper, "#000000");
  //useHelper(text2, THREE.BoxHelper, "#FFC0CB");
  ////useHelper(box2, THREE.BoxHelper, "#000000");
  //useHelper(text3, THREE.BoxHelper, "#FFC0CB");

  const [state, setState] = useState(true);
  const [pos, setPos] = useState([0, 0, 0]);
  const flexSize = [1, 5, 1]; // zu state ändern
  //const reflow = useReflow();
  useInterval(() => setState((s) => !s), 10);

  // StateStore
  const slide = useStore((state) => state.slidePosition);

  // CSS Flexbox Layout 3D
  // consuming json
  return (
    <group
      ref={group1}
      position={props.position}
      rotation={props.rotation}
      scale={0.1}
    >
      <Backdrop
        receiveShadow
        scale={[10, 5, 5]}
        floor={0}
        position={[0, -1.5, 0]}
        rotation={[0.5, 0, 0]}
      >
        <meshPhysicalMaterial roughness={10} color="#efefef" />
      </Backdrop>
      <Text
        ref={text1}
        position={[0, 3, 0]}
        fontSize={1}
        outlineWidth={"5%"}
        outlineColor="#000000"
        outlineOpacity={1}
      >
        Slide {data[slide].id}
      </Text>

      <Flex
        ref={flex1}
        flexDirection="row"
        flexWrap="wrap"
        plane="xy"
        size={flexSize}
        position={[0, 0, 0]}
        justifyContent="center"
        alignItems="center"
        centerAnchor="true"
      >
        <Box ref={box1} centerAnchor>
          <Text
            ref={text2}
            fontSize={0.5}
            maxWidth={7}
            outlineWidth={"5%"}
            outlineColor="#000000"
            outlineOpacity={1}
          >
            {data[slide].title}
          </Text>
        </Box>
        <Box ref={box2}>
          <Text
            ref={text3}
            anchorX={0}
            anchorY={0}
            scale={0.2}
            textAlign={"justify"}
            fontSize={1}
            maxWidth={20}
            outlineWidth={"5%"}
            outlineColor="#000000"
            outlineOpacity={1}
            lineHeight={1}
            letterSpacing={0.02}
            text={data[slide].desc}
            //clipRect={[-10, 3, 10, 28]}
            //clipRect={[-1,-0,-10,-10]}
            //[minX(links), minY(unten), maxX(rechts), maxY(oben)]
            clipRect={[0, -12, 20, 0]}
          ></Text>
        </Box>
      </Flex>
    </group>
  );
}

function UIElements() {
  const increaseSlidePosition = useStore(
    (state) => state.increaseSlidePosition
  );
  const decreaseSlidePosition = useStore(
    (state) => state.decreaseSlidePosition
  );
  const resetSlidePosition = useStore((state) => state.resetSlidePosition);
  return (
    <>
      <Interactive onSelect={increaseSlidePosition}>
        <Cone
          position={[0.1, -0.15, -0.5]}
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
          position={[0, -0.15, -0.5]}
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
          position={[-0.1, -0.15, -0.5]}
          rotation={[0, 0, 1.65]}
          castShadow
          receiveShadow
          scale={0.03}
          onClick={decreaseSlidePosition}
        >
          <Cone position={[0, 0.8, 0]} scale={0.1} />
        </Cone>
      </Interactive>
    </>
  );
}

export default function App() {
  return (
    <ARCanvas sessionInit={{ requiredFeatures: ["hit-test"] }}>
      <PerspectiveCamera makeDefault position={[0, 0, 10]}>
        <UIElements />
      </PerspectiveCamera>
      <HitTestExample />
      <OrbitControls />
    </ARCanvas>
  );
}
