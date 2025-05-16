
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GlassPanel } from "../ui/GlassPanel";
import GlowingButton from "../ui/GlowingButton";

interface ProjectsSectionProps {
  position: [number, number, number];
}

export default function ProjectsSection({ position }: ProjectsSectionProps) {
  const wineTexture = useTexture("/images/wine-project.jpg");
  const cryptoTexture = useTexture("/images/crypto-dashboard.jpg");

  return (
    <group position={position}>
      <Text
        position={[0, 3, 0]}
        fontSize={0.7}
        color="#ffffff"
        font="/fonts/Inter-Bold.woff"
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Projects
      </Text>

      <Float floatIntensity={0.3} rotationIntensity={0.2} speed={1.5}>
        <GlassPanel width={7} height={6} depth={0.2} position={[-4, 0, 0]}>
          <Text
            position={[0, 2.3, 0.15]}
            fontSize={0.35}
            color="#ffffff"
            font="/fonts/Inter-Bold.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            Wine Quality Prediction
          </Text>
          
          <Text
            position={[0, 1.8, 0.15]}
            fontSize={0.2}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Apr - May 2025
          </Text>

          <mesh position={[0, 0.2, 0.15]} scale={[5, 2.5, 0.01]}>
            <planeGeometry />
            <meshBasicMaterial map={wineTexture} />
          </mesh>

          <Text
            position={[0, -1.3, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            ML model to predict wine quality based on chemical properties
          </Text>
          
          <GlowingButton 
            position={[0, -2.1, 0.15]} 
            scale={[0.8, 0.8, 0.8]} 
            text="GitHub"
            url="https://github.com/profile/wine-quality" 
          />
        </GlassPanel>
      </Float>

      <Float floatIntensity={0.3} rotationIntensity={0.2} speed={1.8}>
        <GlassPanel width={7} height={6} depth={0.2} position={[4, 0, 0]}>
          <Text
            position={[0, 2.3, 0.15]}
            fontSize={0.35}
            color="#ffffff"
            font="/fonts/Inter-Bold.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            Cryptocurrency Dashboard
          </Text>
          
          <Text
            position={[0, 1.8, 0.15]}
            fontSize={0.2}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Feb - Mar 2025
          </Text>

          <mesh position={[0, 0.2, 0.15]} scale={[5, 2.5, 0.01]}>
            <planeGeometry />
            <meshBasicMaterial map={cryptoTexture} />
          </mesh>

          <Text
            position={[0, -1.3, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            Real-time dashboard with Power BI tracking crypto trends
          </Text>
          
          <GlowingButton 
            position={[0, -2.1, 0.15]} 
            scale={[0.8, 0.8, 0.8]} 
            text="GitHub" 
            url="https://github.com/profile/crypto-dashboard"
          />
        </GlassPanel>
      </Float>

      {/* Section lighting */}
      <pointLight position={[-4, 0, 4]} intensity={0.7} color="#33c3f0" />
      <pointLight position={[4, 0, 4]} intensity={0.7} color="#33c3f0" />
    </group>
  );
}
