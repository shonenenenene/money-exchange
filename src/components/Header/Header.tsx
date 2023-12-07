import React, { Suspense } from 'react';
import './Header.scss';
import { Canvas } from '@react-three/fiber';
import { Cloud, Clouds, OrbitControls, Sparkles, Stage, useCubeTexture } from '@react-three/drei';
import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { extend, Object3DNode } from '@react-three/fiber';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as pixelFont from '../../assets/fonts/IBM.json';
import { useRef } from 'react';
import { EffectComposer, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
extend({ TextGeometry });
declare module '@react-three/fiber' {
    interface ThreeElements {
        textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
    }
}

const LoadingHeader = () => {
    return (
        <div className='header-container container'>
            <h1 className='header-title'>
                MONEY
                <br />
                EXCHANGE
            </h1>
        </div>
    );
};

const Mesh = () => {
    const font = new FontLoader().parse(pixelFont);

    const mesh = useRef<THREE.Mesh | null>(null);

    const textOptions = {
        font,
        size: 3,
        height: 2,
    };

    const goldTexture = useCubeTexture(['/px.png', '/nx.png', '/py.png', '/ny.png', '/pz.png', '/nz.png'], {
        path: '../../../textures',
    });

    return (
        <>
            <ambientLight />
            <Clouds material={THREE.MeshBasicMaterial}>
                <Cloud segments={12} bounds={[20, 2, 2]} volume={2} color='#9386c9' />
                <Cloud seed={1} scale={2} volume={5} color='hotpink' fade={100} />
            </Clouds>
            <pointLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-3, -3, 3]} intensity={1} />
            <OrbitControls autoRotate autoRotateSpeed={0.2} enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
            <Sparkles count={50} scale={20} size={6} speed={1} color={'#6a6386'} />
            <EffectComposer>
                <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.2} />
            </EffectComposer>
            <Stage
                preset='soft'
                shadows={{ type: 'contact', color: '#6a6386', colorBlend: 2, opacity: 0.1, offset: 0.05, scale: 50 }}
                intensity={0.4}
                environment='sunset'
            >
                <mesh ref={mesh} position={[0, 0, 3]}>
                    <textGeometry attach='geometry' args={['₿', textOptions]} />
                    <meshBasicMaterial attach='material' envMap={goldTexture} />
                </mesh>
            </Stage>
        </>
    );
};

const Header = () => {
    return (
        <header className='header'>
            <LoadingHeader />
            <Suspense fallback={<></>}>
                <Canvas camera={{ position: [0, 0, 3.8] }}>
                    <Mesh />
                </Canvas>
            </Suspense>
        </header>
    );
};

export default Header;
