"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, useEnvironment } from "@react-three/drei";
import * as THREE from "three";
import { TypewriterText } from "./typewriter-text";

function DiscoBallModel({ active, onVelocityChange, onInteraction }: { active: boolean; onVelocityChange?: (velocity: number) => void; onInteraction?: () => void }) {
  const { scene } = useGLTF("/models/disco.glb");
  const meshRef = useRef<THREE.Group>(null);
  const rotationStartedRef = useRef(false);
  const startTimeRef = useRef(0);
  const angularVelocityRef = useRef(0);
  const baseVelocityRef = useRef(0.5);
  const isDraggingRef = useRef(false);
  const previousMouseXRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tiltRef = useRef(0);
  const depthRef = useRef(0);

  // Handle drag interaction
  const handleMouseDown = (e: MouseEvent) => {
    if (!active) return;
    onInteraction?.();
    isDraggingRef.current = true;
    angularVelocityRef.current = 0;
    previousMouseXRef.current = e.clientX;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current || !active) return;
    const deltaX = e.clientX - previousMouseXRef.current;
    angularVelocityRef.current += deltaX * 0.01;
    previousMouseXRef.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Add event listeners to canvas
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvasRef.current = canvas;
      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        canvas.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [active, onInteraction]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Reset rotation when inactive
      if (!active) {
        rotationStartedRef.current = false;
        startTimeRef.current = 0;
        angularVelocityRef.current = 0;
        tiltRef.current = 0;
        depthRef.current = 0;
        meshRef.current.rotation.y = 0;
        meshRef.current.rotation.x = 0;
        meshRef.current.position.z = 0;
        return;
      }
      
      // Start rotation after 0.4 seconds
      if (!rotationStartedRef.current) {
        startTimeRef.current += delta;
        if (startTimeRef.current >= 0.4) {
          rotationStartedRef.current = true;
        }
      } else {
        // Apply damping only when there's extra velocity from user interaction
        if (!isDraggingRef.current && Math.abs(angularVelocityRef.current) > 0) {
          angularVelocityRef.current *= 0.98; // Damping factor
          // Reset to 0 when velocity is negligible
          if (Math.abs(angularVelocityRef.current) < 0.01) {
            angularVelocityRef.current = 0;
          }
        }
        
        // Apply base velocity + extra velocity from user interaction
        meshRef.current.rotation.y += (baseVelocityRef.current + angularVelocityRef.current) * delta;

        const interactionIntensity = Math.min(Math.abs(angularVelocityRef.current) / 1.5, 1);
        const targetTilt = interactionIntensity * -0.08;
        const targetDepth = interactionIntensity * 6;

        tiltRef.current += (targetTilt - tiltRef.current) * 0.12;
        depthRef.current += (targetDepth - depthRef.current) * 0.12;

        meshRef.current.rotation.x = tiltRef.current;
        meshRef.current.position.z = depthRef.current;
        
        // Notify parent of current velocity (normalized 0-1)
        const totalVelocity = baseVelocityRef.current + Math.abs(angularVelocityRef.current);
        const normalizedVelocity = Math.min((totalVelocity - 0.5) / 1.5, 1); // Normalize to 0-1 range
        if (onVelocityChange) {
          onVelocityChange(normalizedVelocity);
        }
      }
    }
  });
  
  useEffect(() => {
    // Debug: Log mesh information
    const meshes: THREE.Mesh[] = [];
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        meshes.push(child);
        console.log('Mesh:', {
          name: child.name,
          geometry: child.geometry.type,
          vertices: child.geometry.attributes.position?.count,
          material: child.material?.type,
        });

        // Log detailed material properties for specific mesh
        if (child.name === 'group1651111481') {
          console.log('Material properties for group1651111481:', {
            type: child.material?.type,
            color: child.material?.color,
            metalness: child.material?.metalness,
            roughness: child.material?.roughness,
            clearcoat: child.material?.clearcoat,
            clearcoatRoughness: child.material?.clearcoatRoughness,
            map: child.material?.map,
            normalMap: child.material?.normalMap,
            roughnessMap: child.material?.roughnessMap,
            metalnessMap: child.material?.metalnessMap,
            aoMap: child.material?.aoMap,
            emissiveMap: child.material?.emissiveMap,
          });
        }
      }
    });
    console.log('Total meshes:', meshes.length);

    // Apply different materials based on mesh name
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Dark painted-metal material for specific meshes
        if (child.name === 'group844412015' || child.name === 'group145974490') {
          const material = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.5,
            roughness: 0.8,
          });
          
          // Explicitly remove all texture maps
          material.map = null;
          material.normalMap = null;
          material.roughnessMap = null;
          material.metalnessMap = null;
          material.aoMap = null;
          material.emissiveMap = null;
          
          child.material = material;
        } else if (child.name === 'group1651111481') {
          // Chrome material for sphere mesh
          const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 1,
            roughness: 0.1,
          });
          
          // Explicitly remove all texture maps
          material.map = null;
          material.normalMap = null;
          material.roughnessMap = null;
          material.metalnessMap = null;
          material.aoMap = null;
          material.emissiveMap = null;
          
          child.material = material;
        }
      }
    });

    // Center the model using bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);
  
  return <primitive ref={meshRef} object={scene} scale={120} />;
}

function DiscoBallScene({ active, onVelocityChange, onInteraction }: { active: boolean; onVelocityChange?: (velocity: number) => void; onInteraction?: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 5, 60], fov: 60 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[20, 10, 30]} color="#4DA3FF" intensity={4} />
      <directionalLight position={[-20, 10, 30]} color="#FF5DA2" intensity={4} />
      <Environment files="/hdri/discohdr.hdr" />
      <DiscoBallModel active={active} onVelocityChange={onVelocityChange} onInteraction={onInteraction} />
    </Canvas>
  );
}

export function DiscoToggleButton() {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sparkleVisible, setSparkleVisible] = useState(false);
  const [sparkleRotation, setSparkleRotation] = useState(0);
  const [spinHintVisible, setSpinHintVisible] = useState(false);
  const [hasInteractedWithBall, setHasInteractedWithBall] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioFadedInRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'active'>('idle');
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [rotationVelocity, setRotationVelocity] = useState(0);
  const rotationVelocityRef = useRef(0);
  const wasScaledRef = useRef(false);

  // Preload assets
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        const preloadFile = async (src: string) => {
          const response = await fetch(src);
          if (!response.ok) {
            throw new Error(`Failed to preload ${src}`);
          }
          await response.blob();
        };

        // Preload 3D and environment assets into browser cache
        await Promise.all([
          preloadFile('/models/disco.glb'),
          preloadFile('/hdri/discohdr.hdr'),
        ]);
        useGLTF.preload('/models/disco.glb');

        // Preload video
        const video = document.createElement('video');
        video.src = '/videolights.mp4';
        video.muted = true;
        video.preload = 'auto';
        await new Promise((resolve, reject) => {
          video.oncanplaythrough = resolve;
          video.onerror = reject;
          video.load();
        });

        // Preload audio
        const audio = new Audio('/audio.mp3');
        audio.muted = true;
        audio.preload = 'auto';
        await new Promise((resolve, reject) => {
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
          audio.load();
        });

        setAssetsLoaded(true);
      } catch (error) {
        console.error('Error preloading assets:', error);
        setAssetsLoaded(true); // Continue even if preload fails
      }
    };

    if (buttonState === 'loading') {
      preloadAssets();
    }
  }, [buttonState]);

  useEffect(() => {
    rotationVelocityRef.current = rotationVelocity;
  }, [rotationVelocity]);

  useEffect(() => {
    if (active) {
      setHasInteractedWithBall(false);
    }
  }, [active]);

  useEffect(() => {
    if (active && assetsLoaded && !hasInteractedWithBall) {
      const timeout = setTimeout(() => setSpinHintVisible(true), 1200);
      return () => clearTimeout(timeout);
    }

    setSpinHintVisible(false);
  }, [active, assetsLoaded, hasInteractedWithBall]);

  useEffect(() => {
    if (active && assetsLoaded) {
      const getSparkleInterval = () => rotationVelocityRef.current > 0.1 ? 1000 : 6000;
      let timeout: ReturnType<typeof setTimeout>;

      const triggerSparkle = () => {
        setSparkleRotation(Math.random() * 360);
        setSparkleVisible(true);
        setTimeout(() => setSparkleVisible(false), 150);
        timeout = setTimeout(triggerSparkle, getSparkleInterval());
      };

      timeout = setTimeout(triggerSparkle, getSparkleInterval());

      return () => clearTimeout(timeout);
    }
  }, [active, assetsLoaded]);

  useEffect(() => {
    const isScaled = rotationVelocity > 0.1;

    if (active && assetsLoaded && wasScaledRef.current && !isScaled) {
      setSparkleRotation(Math.random() * 360);
      setSparkleVisible(true);
      setTimeout(() => setSparkleVisible(false), 150);
    }

    wasScaledRef.current = isScaled;
  }, [rotationVelocity, active, assetsLoaded]);

  // Update video playback rate based on rotation velocity
  useEffect(() => {
    if (videoRef.current && active) {
      const playbackRate = 1.0 + (rotationVelocity * 7); // Map 0-1 to 1.0-8.0
      videoRef.current.playbackRate = playbackRate;
    }
  }, [rotationVelocity, active]);

  // Handle audio and video playback
  useEffect(() => {
    if (active && assetsLoaded) {
      // Start audio after rotation delay (0.4s) with fade in (only once)
      const audioTimeout = setTimeout(() => {
        if (!audioRef.current) {
          audioRef.current = new Audio('/audio.mp3');
          audioRef.current.loop = true;
          audioRef.current.volume = 0;
        }
        
        if (audioRef.current && !audioFadedInRef.current) {
          audioRef.current.play().catch(console.error);
          audioFadedInRef.current = true;
          
          // Fade in to 30% volume (only once)
          const fadeInInterval = setInterval(() => {
            if (audioRef.current && audioRef.current.volume < 0.3) {
              audioRef.current.volume += 0.01;
            } else {
              clearInterval(fadeInInterval);
            }
          }, 50);
        }
      }, 400);

      // Start video playback
      if (videoRef.current) {
        videoRef.current.play().catch(console.error);
      }

      return () => {
        clearTimeout(audioTimeout);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioFadedInRef.current = false;
        }
        if (videoRef.current) {
          videoRef.current.pause();
        }
      };
    } else {
      // Stop audio when toggled off
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioFadedInRef.current = false;
      }
      // Stop video when toggled off
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [active, assetsLoaded]);

  const handleButtonClick = () => {
    if (buttonState === 'idle') {
      setButtonState('loading');
    } else if (buttonState === 'loading') {
      // Should not happen, loading is automatic
    } else if (buttonState === 'active') {
      setButtonState('idle');
      setActive(false);
    }
  };

  // Transition from loading to active when assets are loaded
  useEffect(() => {
    if (buttonState === 'loading' && assetsLoaded) {
      const timeout = setTimeout(() => {
        setButtonState('active');
        setActive(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [buttonState, assetsLoaded]);

  return (
    <>
      {/* Gradient background */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'linear-gradient(135deg, #FF0033 0%, #4DA3FF 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Video light overlay */}
      <AnimatePresence>
        {active && (
          <motion.video
            ref={videoRef}
            className="fixed inset-0 z-1 pointer-events-none object-cover w-full h-full"
            src="/videolights.mp4"
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              mixBlendMode: 'screen',
            }}
          />
        )}
      </AnimatePresence>

      {/* Grain overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed -inset-[50%] z-[9998] pointer-events-none opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 2048 2048' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '2048px 2048px',
              animation: 'grain 0.5s steps(10) infinite',
            }}
          />
        )}
      </AnimatePresence>

      {/* Vignette overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[9997] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'radial-gradient(circle at center, transparent 1%, rgba(0, 0, 0, 1) 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Sparkle overlay - 2-layer system */}
      <AnimatePresence>
        {sparkleVisible && (
          <>
            {/* Layer 2: Core glow */}
            <motion.div
              className="fixed top-1/3 right-1/3 z-[10000] pointer-events-none"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              style={{
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                mixBlendMode: 'screen',
              }}
            />
            {/* Layer 1: Main flare */}
            <motion.div
              className="fixed top-1/4 right-1/4 z-[10001] pointer-events-none"
              initial={{ opacity: 0, scale: 0, x: 0 }}
              animate={{ opacity: 1, scale: 1.5, x: 20 }}
              exit={{ opacity: 0, scale: 1.2, x: 20 }}
              transition={{ 
                duration: 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              style={{
                width: '400px',
                height: '400px',
                backgroundImage: `url("/flair.png")`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                mixBlendMode: 'screen',
                transform: `rotate(${sparkleRotation}deg)`,
              }}
            />
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {spinHintVisible && (
          <motion.div
            className="fixed bottom-10 left-1/2 z-[10002] -translate-x-1/2 text-center font-[family-name:var(--font-founders)] text-[clamp(1.15rem,2vw,1.55rem)] font-light leading-snug tracking-normal text-[#a196b2] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            <TypewriterText
              text="Spin the ball"
              delay={0.55}
              charInterval={40}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>

      {/* Circle button in top-right corner */}
      <button
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed top-6 right-4 z-[10000] flex h-16 w-16 items-center justify-center rounded-full border border-white/[0.03] text-xs backdrop-blur-sm transition-all hover:border-white/[0.05] sm:top-12 sm:right-8 sm:h-20 sm:w-20 md:top-16 md:right-12 lg:top-24 lg:right-20"
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full">
          {/* Text content with fade transitions */}
          <AnimatePresence mode="wait">
            {buttonState === 'idle' && (
              <motion.div
                key="idle"
                className={`relative z-10 flex flex-col items-center gap-0.5 transition-all duration-300 ${isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white/15'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>Have</span>
                <span>some</span>
                <span>fun</span>
              </motion.div>
            )}
            {buttonState === 'loading' && (
              <motion.div
                key="loading"
                className="relative z-10 flex h-9 w-9 items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute h-8 w-8 rounded-full border border-white/10"
                  style={{
                    maskImage: 'linear-gradient(90deg, transparent 0%, black 35%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 35%, black 100%)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute h-8 w-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#a196b2] shadow-[0_0_10px_rgba(161,150,178,0.75)]" />
                </motion.div>
                <span
                  className="absolute h-1 w-1 rounded-full bg-white/20"
                  aria-hidden
                />
              </motion.div>
            )}
            {buttonState === 'active' && (
              <motion.div
                key="active"
                className={`relative z-10 flex flex-col items-center gap-0.5 font-bold transition-all duration-300 ${isHovered ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-white'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span>I had</span>
                <span>enough</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Fullscreen overlay with 3D scene when active */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[9999] h-screen w-screen"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ 
              opacity: 1,
              scale: 1 + (rotationVelocity * 0.2) // 1.0 → 1.2 based on velocity
            }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 0.05, ease: "easeOut" }
            }}
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ y: -500, opacity: 0 }}
              animate={{ y: -100, opacity: 1 }}
              exit={{ y: -500, opacity: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <DiscoBallScene
                active={active}
                onVelocityChange={setRotationVelocity}
                onInteraction={() => {
                  setHasInteractedWithBall(true);
                  setSpinHintVisible(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
