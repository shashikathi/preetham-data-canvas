
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { GlassPanel } from "../ui/GlassPanel";

interface EducationSectionProps {
  position: [number, number, number];
}

interface EducationCardProps {
  name: string;
  degree?: string;
  year: string;
  position: [number, number, number];
  highlighted?: boolean;
}

function EducationCard({ name, degree, year, position, highlighted = false }: EducationCardProps) {
  const cardRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (cardRef.current) {
      if (highlighted) {
        // Highlighted card glows more intensely
        const intensity = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
        if (cardRef.current.children[0] instanceof THREE.Mesh) {
          const material = cardRef.current.children[0].material as THREE.MeshStandardMaterial;
          if (material.emissiveIntensity !== undefined) {
            material.emissiveIntensity = intensity;
          }
        }
      }
    }
  });

  return (
    <group position={position} ref={cardRef}>
      <GlassPanel 
        width={9} 
        height={degree ? 3 : 2} 
        depth={0.2} 
        position={[0, 0, 0]}
        emissiveColor={highlighted ? "#33c3f0" : undefined}
        emissiveIntensity={highlighted ? 0.5 : 0.2}
      >
        <Text
          position={[0, degree ? 0.8 : 0, 0.15]}
          fontSize={0.4}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
        >
          {name}
        </Text>

        {degree && (
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.25}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            {degree}
          </Text>
        )}

        <Text
          position={[0, degree ? -0.7 : -0.5, 0.15]}
          fontSize={0.25}
          color={highlighted ? "#33c3f0" : "#ffffff"}
          font="/fonts/Inter-Regular.woff"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          {year}
        </Text>
      </GlassPanel>
    </group>
  );
}

export default function EducationSection({ position }: EducationSectionProps) {
  // Reference for the whole section to animate
  const sectionRef = useRef<THREE.Group>(null);
  
  return (
    <group position={position} ref={sectionRef}>
      <Text
        position={[0, 5, 0]}
        fontSize={0.7}
        color="#ffffff"
        font="/fonts/Inter-Bold.woff"
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        Education
      </Text>

      {/* Create a vertical stack of education panels */}
      <Float floatIntensity={0.1} rotationIntensity={0.05} speed={2}>
        <EducationCard 
          name="Lovely Professional University" 
          degree="B.Tech in Computer Science"
          year="2022 - 2026" 
          position={[0, 2, 0]} 
          highlighted={true}
        />
      </Float>
      
      <Float floatIntensity={0.1} rotationIntensity={0.05} speed={1.8}>
        <EducationCard 
          name="Narayana IIT Academy" 
          year="2020 - 2022" 
          position={[0, -1, 2]} 
        />
      </Float>
      
      <Float floatIntensity={0.1} rotationIntensity={0.05} speed={1.6}>
        <EducationCard 
          name="Tejaswi High School" 
          year="2018 - 2020" 
          position={[0, -4, 4]} 
        />
      </Float>

      {/* Connecting lines between education panels */}
      <mesh position={[0, 0.5, 0.1]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial color="#33c3f0" emissive="#33c3f0" emissiveIntensity={0.7} />
      </mesh>
      
      <mesh position={[0, -2.5, 2.1]}>
        <boxGeometry args={[0.05, 2, 0.05]} />
        <meshStandardMaterial color="#33c3f0" emissive="#33c3f0" emissiveIntensity={0.5} />
      </mesh>

      {/* Light beams for the vertical path */}
      <pointLight position={[0, 2, 3]} intensity={0.7} color="#33c3f0" />
      <pointLight position={[0, -1, 4]} intensity={0.6} color="#33c3f0" />
      <pointLight position={[0, -4, 5]} intensity={0.5} color="#33c3f0" />
    </group>
  );
}
