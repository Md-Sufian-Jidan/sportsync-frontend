"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Zap, ShieldAlert, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function About() {
  const cards = [
    {
      title: "Fast Reservation",
      description: "Book, secure, and navigate to your parking spot in under 30 seconds. Seamless digital validation on entry, with automated pricing calculation.",
      icon: Zap,
      color: "text-secondary",
    },
    {
      title: "Admin Dashboard",
      description: "Complete visual metrics, interactive control tables, dynamic pricing adjusting, and security management tools for parking coordinators.",
      icon: ShieldAlert,
      color: "text-primary",
    },
    {
      title: "Real-time Availability",
      description: "Immediate cloud synchronization. Never guess vacancy metrics again—see instantly updated slot statuses including EV outlets and VIP sections.",
      icon: Activity,
      color: "text-accent",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs font-bold uppercase tracking-widest text-secondary"
          >
            Introducing SportSync
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-black text-foreground"
          >
            Next-Generation Parking Logistics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-sm md:text-base text-muted-foreground leading-relaxed"
          >
            SportSync integrates cutting-edge IoT data channels with cloud scheduling interfaces, optimizing parking operations for commercial centers, stadiums, and individual motorists.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={i} variants={cardVariants} className="group relative">
                <Card className="h-full border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-2 rounded-2xl p-6">
                  <CardHeader className="p-0 pb-4 space-y-4">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                      <Icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                    <CardTitle className="font-heading text-lg font-bold text-foreground">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}