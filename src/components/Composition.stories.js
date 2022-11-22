import Composition from "./Composition";
import React from "react";
import { Stage, PresentationControls, OrbitControls } from "@react-three/drei";
import { ARCanvas } from "@react-three/xr";
import { Vector3 } from 'three'
import { Canvas } from "@react-three/fiber";

export default {
    title: '3D/Composition',
    component: Composition,
};

function CompositionScene() {
    
    return (
        <Canvas >
            <React.Suspense fallback={null}>
            <group position={[0,0,4]}>
                <PresentationControls global={true} snap={true}>
                    <Composition hitEnabled />
                </PresentationControls>
            </group>
            </React.Suspense>
        </Canvas>
    )
}

export const CompositionSt = () => <CompositionScene />
CompositionSt.storyName = 'Default'