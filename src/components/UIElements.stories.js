import React from "react";
import UIElements from "./UIElements";
import { Box, Suspense, OrbitControls, PerspectiveCamera, PresentationControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from 'three'
import { ARCanvas } from "@react-three/xr";

export default {
    title: 'UI/UIElements',
    component: UIElements,
};

function UIElementsScene() {
    
    return (
        <ARCanvas >
            <group position={[0,0.2,5]}>
                <PresentationControls global={true} snap={true}>
                    <UIElements/>
                </PresentationControls>
            </group>
        </ARCanvas>
    )
}

export const UIElementsSt = () => <UIElementsScene />
UIElementsSt.storyName = 'Default'