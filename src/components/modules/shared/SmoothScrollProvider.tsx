"use client";

import React, { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Only initialize Lenis on non-touch devices or screens wider than 1024px
        if (typeof window !== "undefined" && window.innerWidth > 1024) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                wheelMultiplier: 1,
                touchMultiplier: 2,
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                lenis.destroy();
            };
        }
    }, []);

    return <>{children}</>;
}
