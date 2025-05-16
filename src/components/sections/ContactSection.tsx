
import { useState, useRef } from "react";
import { Text, Float, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GlassPanel } from "../ui/GlassPanel";

interface ContactSectionProps {
  position: [number, number, number];
}

export default function ContactSection({ position }: ContactSectionProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Pulse the light
      lightRef.current.intensity = 0.7 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
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
        Contact Me
      </Text>

      <Float floatIntensity={0.3} rotationIntensity={0.2} speed={1.5}>
        <GlassPanel width={10} height={6} depth={0.2} position={[0, 0, 0]}>
          <Text
            position={[0, 2, 0.15]}
            fontSize={0.4}
            color="#ffffff"
            font="/fonts/Inter-Bold.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Let's Connect
          </Text>
          
          <Html
            position={[0, 0, 0.2]}
            transform
            wrapperClass="htmlScreen"
            distanceFactor={1.5}
            occlude
          >
            <div className="glass-panel w-[500px] p-6 text-white">
              <form className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 bg-white/10 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="glass-button w-full mt-2 py-2 text-white font-medium text-center"
                >
                  Send Message
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm">Or reach me directly at:</p>
                <a href="mailto:kathi.preetham@example.com" className="text-blue-300 hover:text-blue-200 mt-1 block">
                  kathi.preetham@example.com
                </a>
              </div>
            </div>
          </Html>
        </GlassPanel>
      </Float>

      {/* Contact section lighting */}
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={0.7} color="#33c3f0" distance={10} />
      
      {/* Background elements */}
      <mesh position={[0, 0, -5]} rotation={[0, 0, Math.PI / 6]}>
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color="#0a192f" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
