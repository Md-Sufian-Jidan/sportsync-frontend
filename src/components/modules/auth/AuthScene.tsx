"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    Sparkles,
    MeshTransmissionMaterial,
    Environment,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * AuthBackground
 * Ambient 3D backdrop for login / register pages.
 *
 * Signature element: a faceted glass icosahedron (a "vault" motif —
 * trust, structure, precision) inside a slowly counter-rotating
 * wireframe shell, drifting in a field of warm dust particles.
 * Deep teal + champagne instead of the default indigo/blue gradient.
 *
 * Usage:
 *   <div className="relative min-h-screen">
 *     <AuthBackground />
 *     <YourLoginForm className="relative z-10" />
 *   </div>
 */

const PALETTE = {
    core: "#0f766e", // deep teal — the glass material's base tint
    rim: "#5eead4", // pale teal rim light, lifts the glass from behind
    shell: "#94a3b8", // slate wireframe shell
    dust: "#e9c9a6", // warm champagne particles
    key: "#f8fafc", // near-white key light
};

type AuthBackgroundProps = {
    /** Extra classes on the wrapping div (e.g. to override z-index). */
    className?: string;
    /**
     * Adds an HDRI environment map for richer glass reflections.
     * Off by default to avoid a network fetch on the auth page's critical path.
     */
    environment?: boolean;
};

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

/** Tracks the cursor across the whole window (not just the canvas), so the
 *  scene still reacts to the user's mouse while pointer events pass through
 *  to the form sitting on top of it. */
function usePointer() {
    const pointer = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    return pointer;
}

function Scene({ reducedMotion }: { reducedMotion: boolean }) {
    const group = useRef<THREE.Group>(null);
    const shell = useRef<THREE.Mesh>(null);
    const pointer = usePointer();

    useFrame((_, delta) => {
        if (reducedMotion) return;

        if (group.current) {
            const targetY = pointer.current.x * 0.22;
            const targetX = pointer.current.y * 0.12;
            const ease = Math.min(delta * 2, 1);
            group.current.rotation.y += (targetY - group.current.rotation.y) * ease;
            group.current.rotation.x += (targetX - group.current.rotation.x) * ease;
        }

        if (shell.current) {
            shell.current.rotation.y -= delta * 0.08;
            shell.current.rotation.x += delta * 0.03;
        }
    });

    return (
        <group ref={group}>
            <Float
                speed={1.4}
                rotationIntensity={reducedMotion ? 0 : 0.3}
                floatIntensity={reducedMotion ? 0 : 0.6}
            >
                <mesh>
                    <icosahedronGeometry args={[1.4, 1]} />
                    <MeshTransmissionMaterial
                        color={PALETTE.core}
                        thickness={0.6}
                        roughness={0.08}
                        transmission={1}
                        ior={1.3}
                        chromaticAberration={0.04}
                        anisotropy={0.3}
                        distortion={0.15}
                        distortionScale={0.3}
                        temporalDistortion={reducedMotion ? 0 : 0.1}
                        clearcoat={1}
                    />
                </mesh>
            </Float>

            {/* Counter-rotating wireframe shell — adds depth and a "perimeter" cue */}
            <mesh ref={shell} scale={1.85}>
                <icosahedronGeometry args={[1.4, 1]} />
                <meshBasicMaterial
                    color={PALETTE.shell}
                    wireframe
                    transparent
                    opacity={0.18}
                />
            </mesh>

            <Sparkles
                count={90}
                scale={[7, 5, 5]}
                size={2.4}
                speed={reducedMotion ? 0 : 0.25}
                color={PALETTE.dust}
                opacity={0.6}
            />
        </group>
    );
}

export default function AuthBackground({
    className = "",
    environment = false,
}: AuthBackgroundProps) {
    const reducedMotion = useReducedMotion();

    return (
        <div
            className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <Canvas
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true }}
                camera={{ position: [0, 0, 6.2], fov: 32 }}
            >
                <ambientLight intensity={0.5} color={PALETTE.key} />
                <directionalLight position={[4, 6, 5]} intensity={1.1} color={PALETTE.key} />
                <pointLight position={[-4, -3, -4]} intensity={0.8} color={PALETTE.rim} />

                <Suspense fallback={null}>
                    <Scene reducedMotion={reducedMotion} />
                    {environment && <Environment preset="city" />}
                </Suspense>
            </Canvas>

            {/* Soft vignette keeps the form legible above the animation */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(120% 90% at 50% 40%, transparent 35%, rgba(15,23,42,0.35) 100%)",
                }}
            />
        </div>
    );
}