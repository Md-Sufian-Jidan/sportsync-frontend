"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { LogIn, Map, Calendar, CheckCircle2, Car } from "lucide-react";

export function Workflow() {
  const steps = [
    { step: "01", title: "Login", description: "Access your dashboard instantly via encrypted secure JWT credentials.", icon: LogIn },
    { step: "02", title: "Choose Zone", description: "Pick your preferred area based on EV needs, VIP spacing, or budget rates.", icon: Map },
    { step: "03", title: "Reserve Spot", description: "Select booking times and submit with secure double-booking protection.", icon: Calendar },
    { step: "04", title: "Get Confirmation", description: "Receive instant receipt validation and active digital gate pass code.", icon: CheckCircle2 },
    { step: "05", title: "Park Vehicle", description: "Arrive at your spot, scan, and park hassle-free in your reserved slot.", icon: Car },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="workflow" className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-secondary">How it works</h4>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">Simple Reservation Workflow</h2>
          <p className="font-body text-sm md:text-base text-muted-foreground">
            Follow our streamlined flow to reserve, arrive, and secure your spot without stress.
          </p>
        </div>

        {/* Timeline container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-4 w-full"
        >
          {/* Connector Line (Desktop Horizontal) */}
          <div className="absolute top-10 left-10 right-10 h-0.5 bg-border hidden lg:block z-0"></div>
          {/* Connector Line (Mobile Vertical) */}
          <div className="absolute left-[39px] top-10 bottom-10 w-0.5 bg-border lg:hidden z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center w-full max-w-md lg:max-w-none group"
              >
                <div className="flex-shrink-0 h-16 w-16 rounded-2xl bg-card border border-border flex items-center justify-center relative shadow-sm transition-colors duration-300">
                  <Icon className="h-6 w-6 text-primary" />
                  <span className="absolute -top-2 -right-2 font-heading text-[10px] font-bold bg-secondary text-secondary-foreground rounded-full h-5 w-5 flex items-center justify-center">
                    {step.step}
                  </span>
                </div>

                <div className="ml-6 lg:ml-0 lg:mt-6 space-y-2">
                  <h3 className="font-heading text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[200px] lg:max-w-[180px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}