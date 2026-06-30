"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Settings, CalendarRange, Lock, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Reusable Tilt Card Component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  index: number;
}

function TiltCard({ title, description, icon: Icon, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Normalize and scale coordinates to max 12 deg tilt
    const rotX = -(mouseY / (height / 2)) * 12;
    const rotY = (mouseX / (width / 2)) * 12;
    
    setCoords({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ rotateX: 0, rotateY: 0 });
  };

  const glowColors = [
    "rgba(37,99,235,0.15)", // Primary blue
    "rgba(6,182,212,0.15)", // Secondary cyan
    "rgba(16,185,129,0.15)", // Accent green
  ];
  const activeGlow = glowColors[index % 3];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="h-full cursor-pointer select-none transition-all duration-300 ease-out"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.03, 1.03, 1.03)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
    >
      <Card
        className="h-full glass-card border border-white/5 bg-gray-950/20 backdrop-blur-md rounded-2xl p-6 relative overflow-hidden transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? `0 12px 32px -4px ${activeGlow}, 0 4px 12px -2px rgba(0,0,0,0.4)`
            : "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {/* Hover Radial Background Gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle 120px at ${coords.rotateY * 15 + 100}px ${-coords.rotateX * 15 + 100}px, ${activeGlow}, transparent)`,
          }}
        ></div>

        <CardHeader className="p-0 pb-4 space-y-3 relative z-10">
          <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:text-white transition-colors duration-300">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="font-heading text-base font-semibold text-white tracking-wide">
            {title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 relative z-10">
          <p className="font-body text-xs md:text-sm text-gray-400 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Features() {
  const featuresList = [
    {
      title: "JWT Authentication",
      description: "Secure cryptographic session tokens with local encryption. Supports persistent claims and automatic token refresh protocols.",
      icon: ShieldCheck,
    },
    {
      title: "Role Based Authorization",
      description: "Granular access matrices separating standard drivers (booking operations) and administrators (zone management, reports).",
      icon: UserCheck,
    },
    {
      title: "Parking Zone Management",
      description: "Control layout profiles, configure availability constraints, and dynamically adjust prices per hour on the fly.",
      icon: Settings,
    },
    {
      title: "Reservation System",
      description: "Fast schedules matching. Reserve parking slots with calendar overlays, booking confirmations, and active timer alerts.",
      icon: CalendarRange,
    },
    {
      title: "Concurrency Safe Booking",
      description: "Engineered database locking safeguards to completely prevent race conditions and double-booking errors.",
      icon: Lock,
    },
    {
      title: "REST API Platform",
      description: "Fully versioned and documented developer API endpoints. Readily integrated with corporate structures and valet systems.",
      icon: Database,
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 bg-[#030712] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs font-bold uppercase tracking-widest text-secondary"
          >
            Core Competencies
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-black text-white"
          >
            Powerful Features for Modern Venues
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-sm md:text-base text-gray-400"
          >
            Our architecture guarantees high performance, security validation, and intuitive accessibility on all screens.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <TiltCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={i}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
