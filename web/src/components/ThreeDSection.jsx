import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const DepthMesh = ({ image, depthMap }) => {
  const meshRef = useRef();
  // Load both the original photo and the depth map
  const [tex, depth] = useLoader(THREE.TextureLoader, [image, depthMap]);

  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTexture: { value: tex },
      uDepth: { value: depth },
      uMouse: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform sampler2D uDepth;
      uniform vec2 uMouse;
      void main() {
        float d = texture2D(uDepth, vUv).r;
        vec2 displacement = uMouse * (d - 0.5) * 0.05; // Adjust 0.05 for depth intensity
        gl_FragColor = texture2D(uTexture, vUv + displacement);
      }
    `,
  }), [tex, depth]);

  useFrame((state) => {
    // Smooth mouse interpolation
    const x = state.mouse.x;
    const y = state.mouse.y;
    meshRef.current.material.uniforms.uMouse.value.x += (x - meshRef.current.material.uniforms.uMouse.value.x) * 0.1;
    meshRef.current.material.uniforms.uMouse.value.y += (y - meshRef.current.material.uniforms.uMouse.value.y) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[10, 6.5]} /> 
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default function ThreeDSection({ image, depthMap }) {
  return (
    <div className="w-full h-[600px] rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 border border-slate-200 cursor-move">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <DepthMesh image={image} depthMap={depthMap} />
      </Canvas>
    </div>
  );
}