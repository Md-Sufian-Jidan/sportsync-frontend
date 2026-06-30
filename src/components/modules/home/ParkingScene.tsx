"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/**
 * ParkingScene
 * Hero visual for a smart-parking platform.
 *
 * Signature element: a "cloud" hub floating above a small lot, with thin
 * data lines arcing up from each bay's sensor — the literal payoff of the
 * "Powered by Smart Cloud Integration" badge in the hero copy. Available
 * bays glow and pulse in the site's `accent` color (the same token your
 * "Real-time availability visualizer" badge dot uses), occupied bays sit
 * quiet, so the eye goes straight to what's free.
 *
 * Exported as a named export to match Hero.tsx's
 *   dynamic(() => import("./ParkingScene").then((m) => m.ParkingScene))
 */

/* ---------------------------------------------------------------------
 * Theme bridge — reads the site's shadcn/Tailwind CSS variables so the
 * scene's palette always matches the live theme (incl. dark mode)
 * instead of hardcoded hex values that drift from the design system.
 * ------------------------------------------------------------------- */
function cssVarToColor(varName: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return fallback;
  // shadcn stores tokens as "H S% L%" — normalize to a valid hsl() string
  const parts = raw.split(/\s+/);
  return parts.length >= 3 ? `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})` : raw;
}

function useThemeColors() {
  const [colors, setColors] = useState({
    primary: "#1e293b",
    secondary: "#0f766e",
    accent: "#22c55e",
    muted: "#e7e9ee",
    border: "#cbd5e1",
  });

  useEffect(() => {
    setColors({
      primary: cssVarToColor("--primary", "#1e293b"),
      secondary: cssVarToColor("--secondary", "#0f766e"),
      accent: cssVarToColor("--accent", "#22c55e"),
      muted: cssVarToColor("--muted", "#e7e9ee"),
      border: cssVarToColor("--border", "#cbd5e1"),
    });
  }, []);

  return colors;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------------------------------------------------------------------
 * A thin arc from a bay's sensor up to the cloud node, with a flowing
 * dash to suggest live telemetry. Brighter + faster for available bays.
 * ------------------------------------------------------------------- */
function DataLine({
  start,
  end,
  color,
  active,
  animate,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  active: boolean;
  animate: boolean;
}) {
  // drei's Line ref type varies by three/drei version — kept loose on purpose.
  const ref = useRef<any>(null);

  const points = useMemo(() => {
    const mid = new THREE.Vector3(
      (start[0] + end[0]) / 2,
      Math.max(start[1], end[1]) + 0.5,
      (start[2] + end[2]) / 2
    );
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      mid,
      new THREE.Vector3(...end)
    );
    return curve.getPoints(32);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (!animate || !ref.current) return;
    ref.current.material.dashOffset -= delta * (active ? 0.6 : 0.2);
  });

  return (
    <Line
      ref={ref}
      points={points}
      color={color}
      lineWidth={1.4}
      dashed
      dashSize={0.12}
      gapSize={0.1}
      transparent
      opacity={active ? 0.85 : 0.3}
    />
  );
}

/* ---------------------------------------------------------------------
 * A minimal isometric car — rounded body + cabin, no wheels. Reads as an
 * abstract "parked vehicle" rather than a literal model, keeping the lot
 * calm so the sensor network stays the focal point.
 * ------------------------------------------------------------------- */
function Car({
  position,
  rotationY = 0,
  color,
}: {
  position: [number, number, number];
  rotationY?: number;
  color: string;
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <RoundedBox args={[0.95, 0.32, 0.5]} radius={0.08} smoothness={4} position={[0, 0.2, 0]}>
        <meshStandardMaterial color={color} roughness={0.45} metalness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.5, 0.22, 0.42]} radius={0.07} smoothness={4} position={[-0.05, 0.42, 0]}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} transparent opacity={0.92} />
      </RoundedBox>
    </group>
  );
}

/* ---------------------------------------------------------------------
 * Sensor puck above a bay — bright + pulsing when available, dim and
 * still when occupied.
 * ------------------------------------------------------------------- */
function Sensor({
  position,
  color,
  active,
  animate,
}: {
  position: [number, number, number];
  color: string;
  active: boolean;
  animate: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!animate || !active || !ref.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.18;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref} position={position}>
      <cylinderGeometry args={[0.09, 0.09, 0.05, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={active ? 1.1 : 0.15}
        roughness={0.4}
      />
    </mesh>
  );
}

/* ---------------------------------------------------------------------
 * Floor + bay markings, built from thin strips rather than a texture so
 * everything stays crisp at any resolution.
 * ------------------------------------------------------------------- */
function Lot({ asphalt, line }: { asphalt: string; line: string }) {
  const colX = [-1.6, 0, 1.6];

  return (
    <group>
      <RoundedBox args={[5.6, 0.08, 3.6]} radius={0.18} smoothness={4} position={[0, -0.04, 0]}>
        <meshStandardMaterial color={asphalt} roughness={0.9} />
      </RoundedBox>

      {/* bay dividers — two rows facing a center drive aisle */}
      {[-1.05, 1.05].map((rowZ) =>
        [-0.8, 0.8].map((offsetX) => (
          <mesh
            key={`${rowZ}-${offsetX}`}
            position={[offsetX, 0.005, rowZ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.04, 1.5]} />
            <meshBasicMaterial color={line} transparent opacity={0.6} />
          </mesh>
        ))
      )}

      {/* dashed center markings along the drive aisle */}
      {colX.map((x) => (
        <mesh key={`aisle-${x}`} position={[x, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.7, 0.04]} />
          <meshBasicMaterial color={line} transparent opacity={0.35} />
        </mesh>
      ))}

      {/* soft contact shadow, grounds the lot on a light card background */}
      <mesh position={[0, -0.085, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.1, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.07} />
      </mesh>
    </group>
  );
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  const theme = useThemeColors();
  const root = useRef<THREE.Group>(null);
  const hub = useRef<THREE.Mesh>(null);
  const hubPosition: [number, number, number] = [0, 2.4, 0];

  const bays = useMemo(
    () => [
      { pos: [-1.6, 0, -1.1] as [number, number, number], rotY: Math.PI, occupied: true, color: theme.primary },
      { pos: [0, 0, -1.1] as [number, number, number], rotY: Math.PI, occupied: false, color: theme.accent },
      { pos: [1.6, 0, -1.1] as [number, number, number], rotY: Math.PI, occupied: true, color: theme.secondary },
      { pos: [-1.6, 0, 1.1] as [number, number, number], rotY: 0, occupied: true, color: theme.border },
      { pos: [0, 0, 1.1] as [number, number, number], rotY: 0, occupied: false, color: theme.accent },
      { pos: [1.6, 0, 1.1] as [number, number, number], rotY: 0, occupied: true, color: theme.primary },
    ],
    [theme]
  );

  useFrame((_, delta) => {
    if (reducedMotion) return;
    if (root.current) root.current.rotation.y += delta * 0.06;
    if (hub.current) {
      hub.current.position.y = hubPosition[1] + Math.sin(performance.now() * 0.0012) * 0.08;
    }
  });

  return (
    <group ref={root}>
      <Lot asphalt={theme.muted} line={theme.border} />

      {bays.map((bay, i) => {
        const sensorPos: [number, number, number] = [bay.pos[0], 0.95, bay.pos[2]];
        const lineColor = bay.occupied ? theme.border : theme.accent;
        return (
          <group key={i}>
            {bay.occupied ? (
              <Car position={bay.pos} rotationY={bay.rotY} color={bay.color} />
            ) : (
              <mesh position={[bay.pos[0], 0.01, bay.pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.42, 0.5, 32]} />
                <meshBasicMaterial color={theme.accent} transparent opacity={0.55} />
              </mesh>
            )}
            <Sensor
              position={sensorPos}
              color={bay.occupied ? theme.border : theme.accent}
              active={!bay.occupied}
              animate={!reducedMotion}
            />
            <DataLine
              start={sensorPos}
              end={hubPosition}
              color={lineColor}
              active={!bay.occupied}
              animate={!reducedMotion}
            />
          </group>
        );
      })}

      {/* cloud / hub node — the "smart cloud integration" the badge promises */}
      <mesh ref={hub} position={hubPosition}>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshStandardMaterial
          color={theme.primary}
          emissive={theme.secondary}
          emissiveIntensity={0.5}
          roughness={0.25}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

export function ParkingScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full h-full min-h-[350px] lg:min-h-[500px]">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [4.6, 3.8, 4.6], fov: 32 }}
        onCreated={({ camera }) => camera.lookAt(0, 0.5, 0)}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 3]} intensity={1} />
        <directionalLight position={[-3, 2, -4]} intensity={0.3} />
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}