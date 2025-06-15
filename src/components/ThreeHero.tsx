
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
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
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

// Individual Particle Component
const Particle = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float speed={1 + Math.random() * 2} rotationIntensity={1} floatIntensity={2}>
      <Sphere position={position} args={[0.1, 8, 8]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  // Pre-generate particle data to avoid runtime issues
  const particleData = React.useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      key: i,
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {particleData.map((particle) => (
        <Particle
          key={particle.key}
          position={particle.position}
          color={particle.color}
        />
      ))}
    </group>
  );
};

// 3D Text Component
const AnimatedText = () => {
  const textRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2 - 4;
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
      font="/fonts/Inter-Regular.woff"
      fallback="Arial"
    >
      Easy URL Opener
    </Text>
  );
};

// Error Boundary for Three.js
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Three.js Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-96 w-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl">
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-2">Easy URL Opener</h2>
            <p className="text-gray-300">3D visualization loading...</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main Three.js Scene
export const ThreeHero: React.FC = () => {
  return (
    <div className="h-96 w-full relative">
      <ThreeErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          
          <React.Suspense fallback={null}>
            <AnimatedLogo />
            <FloatingParticles />
            <AnimatedText />
          </React.Suspense>
          
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </ThreeErrorBoundary>
    </div>
  );
};
