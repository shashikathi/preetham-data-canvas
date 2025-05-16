
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GlassPanel } from "../ui/GlassPanel";
import ProfileSphere from "../ui/ProfileSphere";
import SocialIcons from "../ui/SocialIcons";

interface HeroSectionProps {
  position: [number, number, number];
}

export default function HeroSection({ position }: HeroSectionProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <GlassPanel width={10} height={6} depth={0.2} position={[0, 0, 0]}>
          <Text
            position={[0, 1.8, 0.15]}
            fontSize={0.65}
            color="#ffffff"
            font="/fonts/Inter-Bold.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            Kathi Shashi Preetham
          </Text>

          <Text
            position={[0, 1, 0.15]}
            fontSize={0.25}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            Data Analyst | Business Analyst | ML Enthusiast
          </Text>

          <Text
            position={[0, 0.6, 0.15]}
            fontSize={0.25}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            Power BI & Tableau Developer
          </Text>

          <ProfileSphere position={[0, -0.3, 0.3]} scale={[1.5, 1.5, 1.5]} />
          <SocialIcons position={[0, -1.5, 0.15]} />
        </GlassPanel>
      </Float>
      
      {/* Ambient light for the hero section */}
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#33c3f0" />
      
      {/* Background elements */}
      <mesh position={[0, 0, -3]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#0a192f" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
