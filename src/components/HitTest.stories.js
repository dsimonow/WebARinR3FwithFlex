import HitTest from "./HitTest";
import React from "react";
import { Stage, PresentationControls, OrbitControls } from "@react-three/drei";
import { ARCanvas } from "@react-three/xr";
import { Vector3 } from 'three'
import { Canvas } from "@react-three/fiber";

export default {
    title: '3D/HitTest',
    component: HitTest,
};

function HitTestScene() {
    
    return (
        <ARCanvas >
            <React.Suspense fallback={null}>
            <group position={[0,0,4]}>
                <PresentationControls global={true} snap={true}>
                    <HitTest />
                </PresentationControls>
            </group>
            </React.Suspense>
        </ARCanvas>
    )
}

export const HitTestSt = () => <HitTestScene />
HitTestSt.storyName = 'Default'