"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-8 w-full">

        {/* Main CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border border-border bg-card p-8 md:p-16 text-center space-y-8 shadow-sm"
        >
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="font-body text-xs font-bold uppercase tracking-widest text-secondary">
              Get Started Today
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-foreground leading-tight">
              Ready to Modernize <br />
              <span className="text-primary">Parking Logistics?</span>
            </h2>
            <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed">
              Join hundreds of venues, commercial districts, and busy facilities using SportSync to simplify reservation logistics, optimize empty spaces, and skyrocket customer satisfaction rates.
            </p>
          </div>

          {/* Buttons List */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button className="w-full sm:w-auto font-body text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 py-6 px-8 rounded-full flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <a href="#dashboard-preview">
              <Button
                variant="outline"
                className="w-full sm:w-auto font-body text-sm font-semibold border-border py-6 px-8 rounded-full flex items-center gap-2"
              >
                <Code className="h-4 w-4 text-secondary" />
                Explore API
              </Button>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="w-full sm:w-auto font-body text-sm font-semibold border-border py-6 px-8 rounded-full flex items-center gap-2"
              >
                GitHub
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}