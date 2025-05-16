
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  PerspectiveCamera,
  useScroll,
  Environment,
  Preload,
} from "@react-three/drei";

import HeroSection from "./sections/HeroSection";
import InternshipSection from "./sections/InternshipSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import CertificationsSection from "./sections/CertificationsSection";
import EducationSection from "./sections/EducationSection";
import ContactSection from "./sections/ContactSection";

function CameraRig() {
  const scroll = useScroll();
  const camera = useThree((state) => state.camera);
  
  useFrame(() => {
    // Base position and rotation
    const scrollOffset = scroll.offset;
    
    // Adjust camera based on scroll position
    camera.position.y = -scrollOffset * 30; // Move camera down as we scroll
    camera.position.z = 15 - scrollOffset * 2; // Move camera closer/further based on scroll
    
    // Add some subtle movement
    camera.rotation.x = scrollOffset * 0.3;
  });

  return null;
}

function SceneSetup() {
  return (
    <>
      <fog attach="fog" args={['#f0f5ff', 5, 50]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <CameraRig />
    </>
  );
}

export default function Experience() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows gl={{ antialias: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
        <SceneSetup />
        <ScrollControls pages={7} damping={0.1} distance={1}>
          <Scroll>
            <HeroSection position={[0, 0, 0]} />
            <InternshipSection position={[0, -5, 0]} />
            <ProjectsSection position={[0, -10, 0]} />
            <SkillsSection position={[0, -15, 0]} />
            <CertificationsSection position={[0, -20, 0]} />
            <EducationSection position={[0, -25, 0]} />
            <ContactSection position={[0, -30, 0]} />
          </Scroll>
          <Scroll html>
            <div className="w-screen">
              <div className="fixed right-4 bottom-4 p-2 rounded-full bg-white/20 backdrop-blur-md">
                <div className="text-xs text-white/70">Scroll to navigate</div>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
        <Preload all />
      </Canvas>
    </div>
  );
}
