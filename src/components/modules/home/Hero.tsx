"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
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

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.16 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-background"
    >
      {/* Ambient brand wash — quiet, lives behind everything. Uses the
          existing bg-secondary/bg-primary utilities (not hand-written
          hsl()/oklch() strings) so it stays correct regardless of which
          color format the theme tokens are defined in. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 z-0 h-[520px] w-[520px] rounded-full bg-secondary/20 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12%] -left-24 z-0 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Side: Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-center lg:text-left space-y-6"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-secondary/20 bg-secondary/10 text-xs text-secondary font-body font-semibold tracking-wide uppercase"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-secondary" />
            </span>
            <span>Powered by Smart Cloud Integration</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground leading-[1.05]"
          >
            Every Parking Spot,
            <br className="hidden md:inline" />{" "}
            <span className="text-primary">Tracked in Real Time</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-base md:text-lg leading-relaxed text-muted-foreground font-body max-w-xl mx-auto lg:mx-0"
          >
            Reserve a spot in seconds, manage zones across every venue, and watch
            availability update the moment it changes — all from one secure cloud
            platform.
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
              <Button
                variant="outline"
                className="w-full sm:w-auto font-body text-sm font-semibold py-6 px-8 rounded-full flex items-center justify-center gap-2 border-border cursor-pointer"
              >
                <PlayCircle className="h-4 w-4 text-secondary" />
                Explore Demo
              </Button>
            </a>
          </motion.div>

          <motion.p variants={fadeInUp} className="text-xs text-muted-foreground font-body pt-1">
            Built for venue operators — and the drivers who park with them.
          </motion.p>
        </motion.div>

        {/* Right Side: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="lg:col-span-5 w-full relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-xl bg-white">
            <ParkingScene />
          </div>

          {/* Floating chip: live availability label */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute -bottom-4 -left-4 bg-white border border-border shadow-lg py-2.5 px-4 rounded-xl flex items-center gap-2.5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="font-body text-xs text-muted-foreground font-medium">
              Real-time availability visualizer
            </span>
          </motion.div>

          {/* Floating chip: illustrative reservation toast — shows the
              product doing the thing the subhead promises */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="absolute -top-4 -right-3 bg-white border border-border shadow-lg py-2 px-3.5 rounded-xl flex items-center gap-2"
          >
            <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" />
            <span className="font-body text-xs text-muted-foreground font-medium">
              Spot A-12 reserved
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}