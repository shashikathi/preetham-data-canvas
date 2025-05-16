
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface ProfileSphereProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

export default function ProfileSphere({ 
  position = [0, 0, 0],
  scale = [1, 1, 1]
}: ProfileSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture("/images/profile.jpg");
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });
  
  return (
    <group position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>
      
      {/* Glowing ring around the profile */}
      <mesh rotation-x={Math.PI / 2} scale={scale}>
        <ringGeometry args={[0.85, 0.95, 64]} />
        <meshBasicMaterial color="#33c3f0" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
