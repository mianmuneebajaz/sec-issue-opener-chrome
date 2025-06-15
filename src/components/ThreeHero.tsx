
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

// Animated 3D Logo Component
const AnimatedLogo = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <Box
        ref={meshRef}
        args={[2, 2, 2]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? "#8b5cf6" : "#3b82f6"}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
    </Float>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const particles = Array.from({ length: 50 }, (_, i) => (
    <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        position={[
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ]}
        args={[0.1, 8, 8]}
      >
        <meshStandardMaterial
          color={`hsl(${Math.random() * 360}, 70%, 60%)`}
          emissive={`hsl(${Math.random() * 360}, 70%, 20%)`}
        />
      </Sphere>
    </Float>
  ));

  return <group ref={particlesRef}>{particles}</group>;
};

// 3D Text Component
const AnimatedText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <Text
      ref={textRef}
      position={[0, -4, 0]}
      fontSize={1}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
      font="Inter"
    >
      Easy URL Opener
    </Text>
  );
};

// Main Three.js Scene
export const ThreeHero: React.FC = () => {
  return (
    <div className="h-96 w-full relative">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <AnimatedLogo />
        <FloatingParticles />
        <AnimatedText />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
