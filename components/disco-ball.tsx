"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function DiscoBallModel() {
  const { scene } = useGLTF("/models/disco.glb");
  const meshRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 1,
          roughness: 0.05,
        });
      }
    });
  }, [scene]);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });
  
  return <primitive ref={meshRef} object={scene} scale={120} />;
}

function DiscoBallScene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 60], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={2} />
      <DiscoBallModel />
    </Canvas>
  );
}

export function DiscoBall() {
  const [active, setActive] = useState(false);

  return (
    <>
      {/* Trigger button in top-right corner */}
      <motion.button
        type="button"
        onClick={() => setActive(!active)}
        className="fixed top-6 right-6 z-50 h-8 w-8 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-[1px] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] sm:top-12 sm:right-12 md:top-16 md:right-16 lg:top-24 lg:right-24"
        aria-label="Toggle disco ball"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        whileHover={{ opacity: 0.4, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-white/15"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4 L12 20 M4 12 L20 12 M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </motion.button>

      {/* 3D overlay layer - fixed, full screen, independent of layout */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <DiscoBallScene />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
