
import { Text, Float } from "@react-three/drei";
import { GlassPanel } from "../ui/GlassPanel";

interface InternshipSectionProps {
  position: [number, number, number];
}

export default function InternshipSection({ position }: InternshipSectionProps) {
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
        Internships
      </Text>

      <Float floatIntensity={0.5} rotationIntensity={0.2} speed={2}>
        <GlassPanel width={7} height={4} depth={0.2} position={[-4, 0, 0]}>
          <Text
            position={[0, 1.3, 0.15]}
            fontSize={0.35}
            color="#ffffff"
            font="/fonts/Inter-Bold.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            TransOrg Analytics
          </Text>
          
          <Text
            position={[0, 0.8, 0.15]}
            fontSize={0.2}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Jan 2025 - Present
          </Text>

          <Text
            position={[-2, 0, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="left"
            anchorX="left"
            anchorY="middle"
          >
            • Data pipeline automation
          </Text>
          
          <Text
            position={[-2, -0.4, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="left"
            anchorX="left"
            anchorY="middle"
          >
            • ML model implementation
          </Text>
          
          <Text
            position={[-2, -0.8, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="left"
            anchorX="left"
            anchorY="middle"
          >
            • Business insights reports
          </Text>
        </GlassPanel>
      </Float>

      <Float floatIntensity={0.5} rotationIntensity={0.2} speed={2.5}>
        <GlassPanel width={7} height={4} depth={0.2} position={[4, 0, 0]}>
          <Text
            position={[0, 1.3, 0.15]}
            fontSize={0.35}
            color="#ffffff"
            font="/fonts/Inter-Bold.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
            maxWidth={6}
          >
            Movidu Technologies
          </Text>
          
          <Text
            position={[0, 0.8, 0.15]}
            fontSize={0.2}
            color="#aac7f0"
            font="/fonts/Inter-Regular.woff"
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            Oct 2024 - Jan 2025
          </Text>

          <Text
            position={[-2, 0, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="left"
            anchorX="left"
            anchorY="middle"
          >
            • Database optimization
          </Text>
          
          <Text
            position={[-2, -0.4, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="left"
            anchorX="left"
            anchorY="middle"
          >
            • Power BI dashboard creation
          </Text>
          
          <Text
            position={[-2, -0.8, 0.15]}
            fontSize={0.2}
            color="#ffffff"
            font="/fonts/Inter-Regular.woff"
            textAlign="left"
            anchorX="left"
            anchorY="middle"
          >
            • SQL query performance tuning
          </Text>
        </GlassPanel>
      </Float>

      {/* Section lighting */}
      <pointLight position={[-4, 0, 4]} intensity={0.6} color="#9b87f5" />
      <pointLight position={[4, 0, 4]} intensity={0.6} color="#9b87f5" />
    </group>
  );
}
