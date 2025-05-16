
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

interface SocialIconsProps {
  position?: [number, number, number];
}

interface SocialIconProps {
  texture: THREE.Texture;
  position: [number, number, number];
  url: string;
}

function SocialIcon({ texture, position, url }: SocialIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      // Scale effect when hovered
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });
  
  return (
    <mesh 
      ref={meshRef}
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
      onClick={() => window.open(url, "_blank")}
    >
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial 
        map={texture} 
        transparent
        opacity={hovered ? 1 : 0.8}
      />
    </mesh>
  );
}

export default function SocialIcons({ position = [0, 0, 0] }: SocialIconsProps) {
  const linkedinTexture = useTexture("/images/linkedin.png");
  const githubTexture = useTexture("/images/github.png");
  const instagramTexture = useTexture("/images/instagram.png");
  
  return (
    <group position={position}>
      <SocialIcon 
        texture={linkedinTexture} 
        position={[-2, 0, 0]} 
        url="https://linkedin.com/in/kathi-preetham"
      />
      <SocialIcon 
        texture={githubTexture} 
        position={[0, 0, 0]} 
        url="https://github.com/kathi-preetham"
      />
      <SocialIcon 
        texture={instagramTexture} 
        position={[2, 0, 0]} 
        url="https://instagram.com/kathi.preetham"
      />
    </group>
  );
}
