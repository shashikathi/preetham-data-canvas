
import { Suspense } from "react";
import { Loader } from "@react-three/drei";
import Experience from "../components/Experience";

const Index = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-radial from-[#0a192f] to-[#020c1b]">
      <Suspense fallback={null}>
        <Experience />
      </Suspense>
      <Loader 
        containerStyles={{
          background: "radial-gradient(circle at center, #0a192f 0%, #020c1b 100%)"
        }}
        innerStyles={{
          backgroundColor: "rgba(255,255,255,0.1)",
          width: "50vw"
        }}
        barStyles={{
          backgroundColor: "#33c3f0"
        }}
        dataStyles={{
          color: "#ffffff",
          fontFamily: "monospace",
          fontSize: "14px"
        }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
      
      <div className="fixed top-4 left-4 z-10">
        <h1 className="text-white text-2xl font-bold glow-text">Kathi Shashi Preetham</h1>
      </div>
      
      <div className="fixed bottom-4 left-4 z-10 text-white/60 text-xs">
        © 2025 Kathi Shashi Preetham | Portfolio
      </div>
    </div>
  );
};

export default Index;
