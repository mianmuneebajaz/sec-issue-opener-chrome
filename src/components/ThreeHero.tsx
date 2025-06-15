
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#4F46E5"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
        />
      </Sphere>
    </Float>
  );
};

const FloatingText = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        fontSize={0.8}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, -2]}
        font="/fonts/inter-bold.woff"
      >
        Easy URL Opener
      </Text>
    </Float>
  );
};

const ParticleField = () => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ]);
    }
    return temp;
  }, []);

  return (
    <>
      {particles.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#8B5CF6" />
        </mesh>
      ))}
    </>
  );
};

const ThreeHero = () => {
  return (
    <div className="h-96 w-full relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        
        <ParticleField />
        <AnimatedSphere />
        <FloatingText />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default ThreeHero;
