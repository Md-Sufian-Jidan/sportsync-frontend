"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

// Lazy load Three.js component to prevent SSR hydration mismatch
const ParkingScene = dynamic(
  () => import("./ParkingScene").then((mod) => mod.ParkingScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center bg-gray-950/20 rounded-2xl border border-white/5 backdrop-blur-sm">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-body text-xs text-gray-500">Initializing 3D Parking Simulator...</p>
        </div>
      </div>
    ),
  }
);

// Framer motion animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function Hero() {
  // Generate particles for floating visual depth
  const particles = Array.from({ length: 15 });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#030712]"
    >
      {/* Background Animated Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Floating Particles in Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/10"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Side: Copywriting Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-secondary/20 bg-secondary/5 text-xs text-secondary font-body font-semibold tracking-wide uppercase">
            <span>Powered by Smart Cloud Integration</span>
            <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-ping"></span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white leading-tight"
          >
            Smart Parking <br className="hidden md:inline" />
            Management{" "}
            <span className="text-gradient-blue-cyan block sm:inline">
              Made Simple
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-gray-400 font-body max-w-xl mx-auto lg:mx-0"
          >
            Reserve parking spots instantly, manage parking zones, and monitor
            reservations with a secure cloud platform. Built for modern venues and busy drivers.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto font-body text-sm font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 py-6 px-8 rounded-full flex items-center justify-center gap-2 group transition-all duration-300">
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <a href="#dashboard-preview" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto font-body text-sm font-semibold border-white/10 hover:bg-white/5 py-6 px-8 rounded-full flex items-center justify-center gap-2 text-white transition-all"
              >
                <Code className="h-4 w-4 text-secondary" />
                Explore Demo
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Animated 3D simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="lg:col-span-5 w-full relative group"
        >
          {/* Glass background backing for the 3D frame */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gray-950/40 backdrop-blur-md">
            <ParkingScene />
          </div>

          {/* Glowing float tag */}
          <div className="absolute -bottom-4 -left-4 glass py-2.5 px-4 rounded-xl shadow-lg border border-white/10 flex items-center space-x-2.5 animate-bounce" style={{ animationDuration: '4s' }}>
            <div className="h-2.5 w-2.5 rounded-full bg-accent"></div>
            <span className="font-body text-xs text-gray-300 font-medium">Real-time availability visualizer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
