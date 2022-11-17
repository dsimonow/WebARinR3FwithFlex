import { useState, useRef } from "react";
import useInterval from "@use-it/interval";
import { useStore } from "./store";
import { Text, Backdrop } from "@react-three/drei";
import data from "./data/data.json";
import { Flex, Box } from "@react-three/flex";

export default function Composition(props) {
  const ref = useRef();
  const group1 = useRef();
  const text1 = useRef();
  const flex1 = useRef();
  const box1 = useRef();
  const text2 = useRef();
  const box2 = useRef();
  const text3 = useRef();
  const backdrop = useRef();
  const isGoal = props.hitEnabled;

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

  if (isGoal) {
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
  return null;
}

