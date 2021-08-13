import React, { Suspense, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {  Environment, Html, MeshWobbleMaterial, RoundedBox, TrackballControls } from '@react-three/drei';
import { useSpring, config } from '@react-spring/core';
import { a } from '@react-spring/three';
import { Matrix4, Vector3 } from 'three';
import { Link } from 'wouter';
// import { useDrag } from 'react-use-gesture';

import Resume from "../../src/resume/Resume.pdf"


const xAxis = new Vector3(1, 0, 0);
const yAxis = new Vector3(0, 1, 0);

let fade;

const AnimMeshWobbleMaterial = a(MeshWobbleMaterial);
const AnimRoundedBox = a(RoundedBox);

const Cube = (props) => {

    const cube = useRef();
    const material = useRef();

    const [over, setOver] = useState(false);

    const rotateCube = (ref, axis, radians) => {
        let rotationMatrix = new Matrix4();

        rotationMatrix.makeRotationAxis(axis.normalize(), radians);
        rotationMatrix.multiply(ref.matrix);
        ref.matrix = rotationMatrix;
        ref.rotation.setFromRotationMatrix(ref.matrix);
    }

    useFrame(() => {
        rotateCube(cube.current, xAxis, .0008);
        rotateCube(cube.current, yAxis, .001);
    })

    const { opacity, scale } = useSpring({
        from: { opacity: 0, scale: .5 },
        to: { opacity: 1, scale: 1 },
        delay: 750,
        config: config.molasses,
    });

    return  <AnimRoundedBox args={[1.5,1.5,1.5]} radius={.02} smoothness={10}
            ref={cube}
            onPointerOver={e => setOver(true)}
            onPointerOut={e => setOver(false)}
            scale={scale}>
                {/* <boxBufferGeometry args={[1.5,1.5,1.5]}/> */}
                <AnimMeshWobbleMaterial transparent color={over ? "#876c09" : "#877d09"} opacity={opacity} ref={material} factor={0.08} speed={5}/>
                {props.children}
            </AnimRoundedBox>
}

const Label = (props) => {
    const labelObj = useRef();
    const textObj = useRef();
    const [shade, setShade] = useState(.6);
    const [startAnim, setStartAnim] = useState(true);
    const camera = useThree((state) => state.camera);

    const shadeLabels = () => {
        let vec = new Vector3();
        labelObj.current.getWorldPosition(vec);
        let dist = camera.position.distanceTo(vec);
    
        const far = 6.8;
        const near = 2.7;
        const targetOpacity = .6;
    
        if (dist < near) { setShade(targetOpacity); }
        else if (dist > far) { setShade(0); }
        else { setShade(targetOpacity - (((dist - near) / (far - near)) * targetOpacity)); }
    }

    useFrame(({clock}) => {
        shadeLabels();
        if (startAnim) { fade = (.6 * clock.elapsedTime) ** 2 - .5 } // fade function copy into desmos: \left(.6x\right)^{2}-.5
        !startAnim ? textObj.current.style.opacity=shade : textObj.current.style.opacity=(shade * fade);
        if (fade >= 1) { setStartAnim(false) }
    });

    return  <mesh ref={labelObj} position={props.position}>
                <Html prepend occlude transform sprite className='link'>
                    {!props.link
                    ?    (<a href={props.redirect} >
                            <div ref={textObj} className="border label white alpha">
                            {props.children} 
                            </div>
                        </a>)
                    :   (<Link href={props.link}>
                            <div ref={textObj} className="border label white alpha">
                                {props.children}
                            </div>
                        </Link>)
                    }
                </Html>
            </mesh>
}

const MenuScene = () => {

    window.addEventListener( 'resize', resize);
    const camera = useThree((state) => state.camera);
    const scene = useThree((state) => state.scene);
    const gl = useThree((state) => state.gl);

    function resize(e) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        gl.setSize(window.innerWidth, window.innerHeight);

        if (window.innerWidth/window.innerHeight < 1) { // if screen taller than wide
            let scalefactor = Math.abs(window.innerWidth/window.innerHeight)
            scene.scale.set(scalefactor,scalefactor,scalefactor)
        }
    }
    
    const affixDist = 2.5;

    return      <Suspense fallback={null}>
                    <ambientLight intensity={.5} />
                    {/* <pointLight position={[0, 0, 3]} intensity={1} /> */}
                    <Cube>
                        <Label position={[0, 0, affixDist]}>Hello!</Label>
                        <Label position={[affixDist, 0, 0]} redirect="https://github.com/trexrush">GITHUB</Label>
                        <Label position={[0, affixDist, 0]} link="/about">ABOUT ME</Label>
                        <Label position={[0, 0, -affixDist]} redirect="https://www.linkedin.com/in/edmazuera/">LINKEDIN</Label>
                        <Label position={[-affixDist, 0, 0]} redirect={Resume}>RESUME</Label>
                        <Label position={[0, -affixDist, 0]} link="/projects">PROJECTS</Label>
                    </Cube>
                    <Environment preset="warehouse"/>
                    <TrackballControls rotateSpeed={15} noZoom dynamicDampingFactor={.1}/>
                </Suspense>
}

export { MenuScene, Cube, Label };