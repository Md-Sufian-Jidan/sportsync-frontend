"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, Settings, CalendarRange, Lock, Database } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

function TiltCard({ title, description, icon: Icon }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotX = -((e.clientY - rect.top) / rect.height - 0.5) * 15;
    const rotY = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    setCoords({ rotateX: rotX, rotateY: rotY });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCoords({ rotateX: 0, rotateY: 0 }); }}
      className="h-full transition-all duration-300 ease-out"
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
      }}
    >
      <Card className="h-full border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 p-6 rounded-2xl">
        <CardHeader className="p-0 pb-4 space-y-3">
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="font-heading text-base font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function Features() {
  const featuresList = [
    { title: "JWT Authentication", description: "Secure cryptographic session tokens with local encryption. Supports persistent claims.", icon: ShieldCheck },
    { title: "Role Based Authorization", description: "Granular access matrices separating standard drivers and administrators.", icon: UserCheck },
    { title: "Parking Zone Management", description: "Control layout profiles, configure availability constraints, and adjust prices.", icon: Settings },
    { title: "Reservation System", description: "Fast schedules matching. Reserve parking slots with calendar overlays and alerts.", icon: CalendarRange },
    { title: "Concurrency Safe Booking", description: "Engineered database locking safeguards to prevent race conditions.", icon: Lock },
    { title: "REST API Platform", description: "Fully versioned and documented developer API endpoints for easy integration.", icon: Database },
  ];

  return (
    <section id="features" className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-secondary">Core Competencies</h4>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">Powerful Features</h2>
          <p className="font-body text-sm md:text-base text-muted-foreground">
            Our architecture guarantees high performance, security validation, and intuitive accessibility on all screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <TiltCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}