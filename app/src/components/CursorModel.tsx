'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const CURSOR_SIZE = 400;

function Cursor3D() {
  const { scene, animations } = useGLTF('/cursor2.glb');
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        mixer.clipAction(clip).play();
      });
      mixerRef.current = mixer;
      return () => {
        mixer.stopAllAction();
      };
    }
  }, [scene, animations]);

  useFrame((_, delta) => {
    mixerRef.current?.update(delta);
  });

  return (
    <Center>
      <group scale={[2.8, 2.8, 2.8]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function CursorModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -CURSOR_SIZE, y: -CURSOR_SIZE });
  const smoothPos = useRef({ x: -CURSOR_SIZE, y: -CURSOR_SIZE });
  const dotPos = useRef({ x: -20, y: -20 });
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // White dot follows mouse with fast easing
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.45;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.45;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 6}px, ${dotPos.current.y - 6}px)`;
      }

      // 3D cursor follows with slower easing (trails behind)
      smoothPos.current.x += (pos.current.x - smoothPos.current.x) * 0.08;
      smoothPos.current.y += (pos.current.y - smoothPos.current.y) * 0.08;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${smoothPos.current.x - CURSOR_SIZE / 2 + 50}px, ${smoothPos.current.y - CURSOR_SIZE / 2 + 130}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return (
    <>
    {/* White circular cursor dot */}
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: 'white',
        zIndex: 10,
        pointerEvents: 'none',
        willChange: 'transform',
        boxShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.15)',
        mixBlendMode: 'difference',
      }}
    />
    {/* 3D cursor that follows the dot */}
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        zIndex: 5,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          gl={{ alpha: true, antialias: true, premultipliedAlpha: false }}
          style={{ pointerEvents: 'none' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.pointerEvents = 'none';
          }}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} />
          <pointLight position={[0, 0, 5]} intensity={1} />
          <Environment files="/docklands_02_1k.hdr" />
          <Cursor3D />
        </Canvas>
      </Suspense>
    </div>
    </>
  );
}

useGLTF.preload('/cursor2.glb');
