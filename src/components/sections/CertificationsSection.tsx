
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { GlassPanel } from "../ui/GlassPanel";

interface CertificationsSectionProps {
  position: [number, number, number];
}

interface CertificationPanelProps {
  title: string;
  date: string;
  description: string;
  position: [number, number, number];
}

function CertificationPanel({ title, date, description, position }: CertificationPanelProps) {
  const panelRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (panelRef.current) {
      // Add subtle floating movement to each panel
      panelRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.1;
    }
  });

  return (
    <group position={position} ref={panelRef}>
      <GlassPanel width={8} height={3} depth={0.2} position={[0, 0, 0]}>
        <Text
          position={[0, 0.8, 0.15]}
          fontSize={0.4}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          maxWidth={7}
        >
          {title}
        </Text>

        <Text
          position={[0, 0.3, 0.15]}
          fontSize={0.25}
          color="#aac7f0"
          font="/fonts/Inter-Regular.woff"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {date}
        </Text>

        <Text
          position={[0, -0.4, 0.15]}
          fontSize={0.25}
          color="#ffffff"
          font="/fonts/Inter-Regular.woff"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          maxWidth={7}
        >
          {description}
        </Text>
      </GlassPanel>
    </group>
  );
}

export default function CertificationsSection({ position }: CertificationsSectionProps) {
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
        Certifications
      </Text>

      <Float floatIntensity={0.1} rotationIntensity={0.1} speed={2}>
        <CertificationPanel 
          title="Goldman Sachs Excel Skills" 
          date="Jan 2025" 
          description="Advanced Excel for Financial Analysis"
          position={[0, 1, 0]} 
        />
      </Float>

      <Float floatIntensity={0.1} rotationIntensity={0.1} speed={1.8}>
        <CertificationPanel 
          title="Google Networking Essentials" 
          date="Nov 2023" 
          description="Professional Google Cloud certification"
          position={[0, -2, 2]} 
        />
      </Float>

      <Float floatIntensity={0.1} rotationIntensity={0.1} speed={1.6}>
        <CertificationPanel 
          title="UC San Diego DSA Specialization" 
          date="Nov 2022" 
          description="Data Structures and Algorithms"
          position={[0, -5, 4]} 
        />
      </Float>

      {/* Section lighting */}
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#33c3f0" />
      <pointLight position={[3, -3, 5]} intensity={0.6} color="#9b87f5" />
      <pointLight position={[-3, -6, 5]} intensity={0.6} color="#33c3f0" />
    </group>
  );
}
