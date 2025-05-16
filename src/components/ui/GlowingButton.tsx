
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface GlowingButtonProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  text: string;
  url: string;
}

export default function GlowingButton({ 
  position = [0, 0, 0], 
  scale = [1, 1, 1], 
  text, 
  url 
}: GlowingButtonProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Basic hover effect
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
    
    if (glowRef.current) {
      // Pulsing glow effect when hovered
      if (hovered) {
        glowRef.current.intensity = 0.7 + Math.sin(clock.getElapsedTime() * 5) * 0.3;
      } else {
        glowRef.current.intensity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      }
    }
  });
  
  return (
    <group 
      position={position} 
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(url, "_blank")}
    >
      {/* Button mesh */}
      <mesh ref={meshRef}>
        <roundedBoxGeometry args={[2.5, 0.8, 0.2, 4, 0.1]} />
        <meshPhysicalMaterial
          color={hovered ? "#33c3f0" : "#1e88e5"}
          roughness={0.3}
          metalness={0.7}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          emissive={hovered ? "#33c3f0" : "#1e88e5"}
          emissiveIntensity={hovered ? 0.7 : 0.3}
        />
      </mesh>
      
      {/* Button text */}
      <Text
        position={[0, 0, 0.15]}
        fontSize={0.35}
        color="#ffffff"
        font="/fonts/Inter-Medium.woff"
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
      
      {/* Glow effect */}
      <pointLight ref={glowRef} position={[0, 0, 0.5]} intensity={0.3} color="#33c3f0" distance={2} />
    </group>
  );
}
