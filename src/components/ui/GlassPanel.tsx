
import { ReactNode, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface GlassPanelProps {
  width: number;
  height: number;
  depth: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  children?: ReactNode;
  emissiveColor?: string;
  emissiveIntensity?: number;
}

export function GlassPanel({ 
  width, 
  height, 
  depth, 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  children,
  emissiveColor = "#ffffff",
  emissiveIntensity = 0.2
}: GlassPanelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle pulsing glow effect
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = emissiveIntensity + Math.sin(clock.getElapsedTime()) * 0.05;
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Glass panel */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          color="#ffffff"
          transparent={true}
          opacity={0.1}
          roughness={0.1}
          metalness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.9}
          reflectivity={0.5}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      
      {/* Border */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial attach="material" color={emissiveColor} opacity={0.7} transparent />
      </lineSegments>
      
      {children}
    </group>
  );
}
