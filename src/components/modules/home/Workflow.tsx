"use client";

import React from "react";
import { motion } from "framer-motion";
import { LogIn, Map, Calendar, CheckCircle2, Car } from "lucide-react";

export function Workflow() {
  const steps = [
    {
      step: "01",
      title: "Login",
      description: "Access your dashboard instantly via encrypted secure JWT credentials.",
      icon: LogIn,
    },
    {
      step: "02",
      title: "Choose Zone",
      description: "Pick your preferred area based on EV needs, VIP spacing, or budget rates.",
      icon: Map,
    },
    {
      step: "03",
      title: "Reserve Spot",
      description: "Select booking times and submit with secure double-booking protection.",
      icon: Calendar,
    },
    {
      step: "04",
      title: "Get Confirmation",
      description: "Receive instant receipt validation and active digital gate pass code.",
      icon: CheckCircle2,
    },
    {
      step: "05",
      title: "Park Vehicle",
      description: "Arrive at your spot, scan, and park hassle-free in your reserved slot.",
      icon: Car,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="workflow"
      className="relative py-24 bg-[#030712] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs font-bold uppercase tracking-widest text-secondary"
          >
            How it works
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-black text-white"
          >
            Simple Reservation Workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-sm md:text-base text-gray-400"
          >
            Follow our streamlined flow to reserve, arrive, and secure your spot without stress.
          </motion.p>
        </div>

        {/* Timeline container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-4 w-full"
        >
          {/* Connector Line (Desktop Horizontal) */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-primary/10 via-secondary/35 to-accent/10 hidden lg:block -translate-y-1/2 z-0"></div>

          {/* Connector Line (Mobile Vertical) */}
          <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/10 via-secondary/35 to-accent/10 lg:hidden z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative z-10 flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center w-full max-w-md lg:max-w-none group"
              >
                {/* Number / Icon Frame */}
                <div className="flex-shrink-0 h-16 w-16 lg:h-20 lg:w-20 rounded-2xl bg-[#0b0f19]/80 border border-white/5 group-hover:border-secondary/35 backdrop-blur-md flex items-center justify-center relative shadow-lg shadow-black/40 transition-colors duration-300">
                  <Icon className="h-6 w-6 lg:h-8 lg:w-8 text-secondary group-hover:text-white transition-colors duration-300" />
                  <span className="absolute -top-2.5 -right-2.5 font-heading text-xs font-bold bg-[#030712] border border-white/5 rounded-full h-6 w-6 flex items-center justify-center text-gray-400">
                    {step.step}
                  </span>
                </div>

                {/* Text Content */}
                <div className="ml-6 lg:ml-0 lg:mt-6 space-y-2">
                  <h3 className="font-heading text-base md:text-lg font-bold text-white group-hover:text-secondary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs md:text-sm text-gray-400 max-w-xs leading-relaxed">
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
