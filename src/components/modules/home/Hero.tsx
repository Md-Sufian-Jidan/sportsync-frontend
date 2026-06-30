"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const ParkingScene = dynamic(
  () => import("./ParkingScene").then((mod) => mod.ParkingScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[350px] lg:min-h-[500px] flex items-center justify-center bg-muted rounded-2xl border border-border">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-body text-xs text-muted-foreground">Initializing 3D Parking Simulator...</p>
        </div>
      </div>
    ),
  }
);

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Side: Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-secondary/20 bg-secondary/10 text-xs text-secondary font-body font-semibold tracking-wide uppercase">
            <span>Powered by Smart Cloud Integration</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground leading-tight"
          >
            Smart Parking <br className="hidden md:inline" />
            Management{" "}
            <span className="text-primary block sm:inline">Made Simple</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground font-body max-w-xl mx-auto lg:mx-0"
          >
            Reserve parking spots instantly, manage parking zones, and monitor reservations with a secure cloud platform. Built for modern venues and busy drivers.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
          >
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto font-body text-sm font-semibold shadow-md py-6 px-8 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <a href="#dashboard-preview" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto font-body text-sm font-semibold py-6 px-8 rounded-full flex items-center justify-center gap-2 border-slate-200 cursor-pointer">
                <Code className="h-4 w-4 text-secondary" />
                Explore Demo
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="lg:col-span-5 w-full relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white">
            <ParkingScene />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white border border-slate-200 shadow-lg py-2.5 px-4 rounded-xl flex items-center space-x-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-accent"></div>
            <span className="font-body text-xs text-slate-600 font-medium">Real-time availability visualizer</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}