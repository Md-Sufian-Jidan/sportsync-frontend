"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiDocker, SiSwagger, SiJsonwebtokens } from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { BsBoxSeam } from "react-icons/bs";

export function TechStack() {
  const stack = [
    { name: "Next.js", icon: SiNextdotjs, color: "text-white", floatDuration: 4, floatDelay: 0 },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-400", floatDuration: 5, floatDelay: -0.8 },
    { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-400", floatDuration: 6, floatDelay: -1.6 },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-300", floatDuration: 4.5, floatDelay: -2.4 },
    { name: "GORM", icon: GiGears, color: "text-emerald-400", floatDuration: 5.5, floatDelay: -3.2 },
    { name: "JWT", icon: SiJsonwebtokens, color: "text-purple-400", floatDuration: 4, floatDelay: -4.0 },
    { name: "Echo", icon: FaServer, color: "text-teal-400", floatDuration: 6, floatDelay: -4.8 },
    { name: "Docker", icon: SiDocker, color: "text-blue-500", floatDuration: 5, floatDelay: -5.6 },
    { name: "Render", icon: BsBoxSeam, color: "text-white", floatDuration: 4.5, floatDelay: -6.4 },
    { name: "Swagger", icon: SiSwagger, color: "text-lime-400", floatDuration: 5.5, floatDelay: -7.2 },
  ];

  return (
    <section className="relative py-24 bg-[#030712] overflow-hidden border-y border-white/5">
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
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass py-3 px-5 rounded-full border border-white/5 bg-gray-950/20 hover:bg-gray-950/40 hover:border-secondary/30 transition-colors duration-300 flex items-center space-x-2.5 shadow-lg shadow-black/25 group"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: tech.floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: tech.floatDelay,
                  }}
                  className="flex items-center space-x-2.5"
                >
                  <Icon className={`h-5 w-5 ${tech.color} group-hover:scale-110 transition-transform`} />
                  <span className="font-body text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
