
import { useState, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float, Html } from "@react-three/drei";
import * as THREE from "three";

interface SkillsSectionProps {
  position: [number, number, number];
}

interface SkillProps {
  name: string;
  position: [number, number, number];
  color: string;
}

const SKILLS = [
  { name: "Python", color: "#33c3f0" },
  { name: "SQL", color: "#9b87f5" },
  { name: "Tableau", color: "#33c3f0" },
  { name: "Power BI", color: "#9b87f5" },
  { name: "PyTorch", color: "#33c3f0" },
  { name: "LangChain", color: "#9b87f5" },
  { name: "Django", color: "#33c3f0" },
  { name: "R", color: "#9b87f5" },
  { name: "Excel", color: "#33c3f0" },
  { name: "AWS", color: "#9b87f5" },
  { name: "TensorFlow", color: "#33c3f0" },
  { name: "NumPy", color: "#9b87f5" },
];

function Skill({ name, position, color }: SkillProps) {
  const [hovered, setHovered] = useState(false);
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (mesh.current) {
      // Subtle continuous rotation
      mesh.current.rotation.y += 0.005;
      
      // Scale effect when hovered
      if (hovered) {
        mesh.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1);
      } else {
        mesh.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.5} 
          roughness={0.2} 
          emissive={color} 
          emissiveIntensity={hovered ? 0.8 : 0.3} 
        />
      </mesh>
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.3}
        color="#ffffff"
        font="/fonts/Inter-Medium.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {name}
      </Text>
    </group>
  );
}

export default function SkillsSection({ position }: SkillsSectionProps) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      // Slowly rotate the entire ring
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

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
        Skills
      </Text>

      <group ref={ringRef}>
        {SKILLS.map((skill, index) => {
          const angle = (index / SKILLS.length) * Math.PI * 2;
          const radius = 6;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          
          return (
            <Float 
              key={skill.name} 
              speed={1.5} 
              rotationIntensity={0.2} 
              floatIntensity={0.5}
            >
              <Skill 
                name={skill.name} 
                position={[x, 0, z]} 
                color={skill.color} 
              />
            </Float>
          );
        })}
      </group>

      {/* Light in the center of the skills ring */}
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" distance={10} />
      
      {/* Ring visualization */}
      <mesh rotation-x={Math.PI / 2} position={[0, -0.5, 0]}>
        <torusGeometry args={[6, 0.05, 16, 100]} />
        <meshStandardMaterial color="#9b87f5" emissive="#9b87f5" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
