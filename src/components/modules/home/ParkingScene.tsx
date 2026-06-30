"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// Individual Animated Car Component
interface CarProps {
  initialPosition: [number, number, number];
  color: string;
  speed: number;
  direction: number; // 1 or -1
  range: number;
}

function MovingCar({ initialPosition, color, speed, direction, range }: CarProps) {
  const ref = useRef<THREE.Group>(null);
  const [pos, setPos] = useState<number>(0);
  const [dir, setDir] = useState<number>(direction);

  useFrame((state, delta) => {
    if (ref.current) {
      // Calculate new position offset
      const nextPos = pos + speed * delta * dir;
      if (Math.abs(nextPos) > range) {
        setDir(-dir); // Reverse direction
      } else {
        setPos(nextPos);
      }

      // Apply transformation (move along Z axis)
      ref.current.position.z = initialPosition[2] + nextPos;

      // Subtle wheel rotation simulation
      const wheels = ref.current.children.filter(child => child.name === "wheel");
      wheels.forEach(wheel => {
        wheel.rotation.x += speed * delta * dir * 2;
      });
    }
  });

  return (
    <group ref={ref} position={[initialPosition[0], initialPosition[1], initialPosition[2]]}>
      {/* Car Body (Sleek minimalist box) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.6, 2.5]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cabin Roof */}
      <mesh castShadow position={[0, 0.45, -0.2]}>
        <boxGeometry args={[1.2, 0.45, 1.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} transparent opacity={0.85} />
      </mesh>

      {/* Headlights (Glowing) */}
      <mesh position={[-0.5, 0.1, 1.26]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>
      <mesh position={[0.5, 0.1, 1.26]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color="#fef08a" />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.5, 0.1, -1.26]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0.5, 0.1, -1.26]}>
        <boxGeometry args={[0.2, 0.1, 0.05]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Wheels */}
      <mesh name="wheel" position={[-0.8, -0.3, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      <mesh name="wheel" position={[0.8, -0.3, 0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      <mesh name="wheel" position={[-0.8, -0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
      <mesh name="wheel" position={[0.8, -0.3, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Glowing Slot Indicator Component
interface GlowingSlotProps {
  position: [number, number, number];
  isOccupied: boolean;
}

function GlowingSlot({ position, isOccupied }: GlowingSlotProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      // Glow pulse effect
      const t = state.clock.getElapsedTime();
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.15 + Math.sin(t * 3) * 0.1;
    }
  });

  const glowColor = isOccupied ? "#ef4444" : "#06b6d4"; // Red for occupied, cyan for free

  return (
    <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.0, 3.8]} />
      <meshBasicMaterial
        color={glowColor}
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Scene Elements
function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />

      {/* Dynamic spot light on the parking spaces */}
      <spotLight
        position={[0, 10, 0]}
        angle={0.6}
        penumbra={0.5}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Cyber Grid Stars */}
      <Stars radius={50} depth={20} count={100} factor={4} saturation={0.5} fade speed={2} />

      {/* Parking Floor */}
      <mesh receiveShadow position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial color="#080c18" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Parking Lanes Outline */}
      <gridHelper args={[24, 8, "#2563EB", "#1f2937"]} position={[0, -0.59, 0]} />

      {/* Glowing Slots */}
      <GlowingSlot position={[-3, -0.58, 2]} isOccupied={false} />
      <GlowingSlot position={[3, -0.58, 2]} isOccupied={true} />
      <GlowingSlot position={[-3, -0.58, -2.5]} isOccupied={true} />
      <GlowingSlot position={[3, -0.58, -2.5]} isOccupied={false} />

      {/* Moving and Static Cars */}
      <MovingCar initialPosition={[-3, -0.2, 2]} color="#06b6d4" speed={1.2} direction={1} range={1.5} />
      <MovingCar initialPosition={[3, -0.2, -2.5]} color="#2563eb" speed={0.9} direction={-1} range={1.2} />

      {/* Static Cars parked */}
      <group position={[3, -0.2, 2]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.6, 2.5]} />
          <meshStandardMaterial color="#10b981" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.45, -0.2]}>
          <boxGeometry args={[1.2, 0.45, 1.4]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.85} />
        </mesh>
      </group>
      <group position={[-3, -0.2, -2.5]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.6, 2.5]} />
          <meshStandardMaterial color="#6b7280" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.45, -0.2]}>
          <boxGeometry args={[1.2, 0.45, 1.4]} />
          <meshStandardMaterial color="#0f172a" transparent opacity={0.85} />
        </mesh>
      </group>

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.3}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export function ParkingScene() {
  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px] relative cursor-grab active:cursor-grabbing">
      {/* Loading Backdrop inside R3F wrapper */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-12 h-12 rounded-full border-2 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>

      <Canvas
        camera={{ position: [6, 5, 8], fov: 40 }}
        className="w-full h-full relative z-10"
        gl={{ shadowMap: { enabled: true } } as any}
      >
        <color attach="background" args={["#030712"]} />
        <Scene />
      </Canvas>
    </div>
  );
}
