"use client";

import React from "react";
import { motion } from "framer-motion";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiPostgresql, SiDocker, SiSwagger, SiJsonwebtokens } from "react-icons/si";
import { FaServer } from "react-icons/fa";
import { GiGears } from "react-icons/gi";
import { BsBoxSeam } from "react-icons/bs";

export function TechStack() {
  const stack = [
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "GORM", icon: GiGears },
    { name: "JWT", icon: SiJsonwebtokens },
    { name: "Echo", icon: FaServer },
    // { name: "Docker", icon: SiDocker },
    { name: "Render", icon: BsBoxSeam },
    { name: "Swagger", icon: SiSwagger },
  ];

  return (
    <section className="relative py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-secondary">Integrations</h4>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">Our Technology Stack</h2>
          <p className="font-body text-sm md:text-base text-muted-foreground">
            Engineered using standard modern technologies to ensure fast data processing, clean API layers, and absolute responsiveness.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
          {stack.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-all cursor-default"
              >
                <Icon className="h-4 w-4 text-secondary" />
                <span className="font-body text-xs font-semibold text-foreground">
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