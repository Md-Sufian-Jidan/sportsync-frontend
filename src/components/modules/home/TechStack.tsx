"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiDocker, SiSwagger, SiRender, SiJsonwebtokens } from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { GiGears } from "react-icons/gi";

export function TechStack() {
  const stack = [
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-300" },
    { name: "GORM", icon: GiGears, color: "text-emerald-400" },
    { name: "JWT", icon: SiJsonwebtokens, color: "text-purple-400" },
    { name: "Echo", icon: FaServer, color: "text-teal-400" },
    { name: "Docker", icon: SiDocker, color: "text-blue-500" },
    { name: "Render", icon: SiRender, color: "text-white" },
    { name: "Swagger", icon: SiSwagger, color: "text-lime-400" },
  ];

  return (
    <section
      className="relative py-24 bg-[#030712] overflow-hidden border-y border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(37,99,235,0.05),transparent)]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-secondary">
            Integrations
          </h4>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-white">
            Our Technology Stack
          </h2>
          <p className="font-body text-sm md:text-base text-gray-400">
            Engineered using standard modern technologies to ensure fast data processing, clean API layers, and absolute responsiveness.
          </p>
        </div>

        {/* Logos container */}
        <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto">
          {stack.map((tech, i) => {
            const Icon = tech.icon;
            
            // Random parameters for floating motion offset
            const floatDuration = 4 + (i % 3);
            const floatDelay = -(i * 0.4);

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                animate={{
                  y: [0, -10, 0],
                }}
                style={{ originX: 0.5, originY: 0.5 }}
                // @ts-ignore
                transition={{
                  y: {
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: floatDelay,
                  }
                }}
                className="glass py-3 px-5 rounded-full border border-white/5 bg-gray-950/20 hover:bg-gray-950/40 hover:border-secondary/30 transition-colors duration-300 flex items-center space-x-2.5 shadow-lg shadow-black/25 group"
              >
                <Icon className={`h-5 w-5 ${tech.color} group-hover:scale-110 transition-transform`} />
                <span className="font-body text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
