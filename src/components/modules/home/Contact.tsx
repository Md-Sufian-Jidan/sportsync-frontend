"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 bg-[#030712] overflow-hidden"
    >
      {/* Decorative backdrop gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(37,99,235,0.08),transparent)]"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-8 w-full relative z-10">

        {/* Main CTA Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden border border-white/10 p-8 md:p-12 lg:p-16 text-center space-y-8 bg-gradient-to-b from-[#0b0f19]/80 to-[#030712]/90 backdrop-blur-md shadow-2xl"
        >
          {/* Subtle glow border */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-secondary">
              Get Started Today
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
              Ready to Modernize <br />
              <span className="text-gradient-blue-cyan">Parking Logistics?</span>
            </h2>
            <p className="font-body text-sm md:text-base text-gray-400 leading-relaxed">
              Join hundreds of venues, commercial districts, and busy facilities using SportSync to simplify reservation logistics, optimize empty spaces, and skyrocket customer satisfaction rates.
            </p>
          </div>

          {/* Buttons List */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto">
            <Link href="/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto font-body text-sm font-semibold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 py-6 px-8 rounded-full flex items-center justify-center gap-2 group transition-all duration-300">
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
                Explore API
              </Button>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto font-body text-sm font-semibold border-white/10 hover:bg-white/5 py-6 px-6 rounded-full flex items-center justify-center gap-2 text-white transition-all"
              >
                {/* <Github className="h-4 w-4 text-gray-400" /> */}
                GitHub
              </Button>
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
