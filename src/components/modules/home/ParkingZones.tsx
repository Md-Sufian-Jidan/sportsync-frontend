"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BatteryCharging, Award, User, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { zonesService, ParkingZone } from "@/services/zones";

export function ParkingZones() {
  const [zones, setZones] = useState<ParkingZone[]>([]);

  useEffect(() => {
    zonesService.getZones().then(data => {
      setZones(data);
    });
  }, []);

  const getZoneIcon = (name: string) => {
    const title = name.toLowerCase();
    if (title.includes("ev") || title.includes("electric")) return BatteryCharging;
    if (title.includes("vip")) return Award;
    if (title.includes("premium")) return Sparkles;
    return User;
  };

  const getZoneColors = (name: string) => {
    const title = name.toLowerCase();
    if (title.includes("ev")) return { color: "text-accent", progress: "bg-accent", glow: "hover:border-accent/30" };
    if (title.includes("vip")) return { color: "text-primary", progress: "bg-primary", glow: "hover:border-primary/30" };
    if (title.includes("premium")) return { color: "text-secondary", progress: "bg-secondary", glow: "hover:border-secondary/30" };
    return { color: "text-gray-400", progress: "bg-gray-400", glow: "hover:border-gray-400/30" };
  };

  return (
    <section id="zones" className="relative py-24 bg-[#030712] overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">

        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <motion.h4
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-xs font-bold uppercase tracking-widest text-secondary"
            >
              Active Zones
            </motion.h4>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-heading font-black text-white"
            >
              Tailored Parking Zones
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-body text-sm md:text-base text-gray-400"
            >
              Select from dedicated zones built specifically around your vehicle requirements and parking expectations.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/register">
              <Button className="font-body text-sm font-semibold border border-secondary/30 bg-secondary/5 text-secondary hover:bg-secondary/15 rounded-full px-6 py-5 flex items-center gap-2 group transition-all duration-300">
                Book a Spot
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {zones.map((zone, i) => {
            const Icon = getZoneIcon(zone.name);
            const { color, progress, glow } = getZoneColors(zone.name);
            const fillPercentage = ((zone.totalSpots - zone.availableSpots) / zone.totalSpots) * 100;
            const isFull = zone.availableSpots === 0;

            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`glass-card border border-white/5 bg-gray-950/20 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between h-full ${glow}`}>
                  <CardContent className="p-0 space-y-6">
                    {/* Header: Title + Icon */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-heading text-lg font-bold text-white tracking-wide">
                          {zone.name}
                        </h3>
                        <p className="font-body text-xs text-gray-500">
                          {zone.features[0] || "Standard Parking"}
                        </p>
                      </div>
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="flex items-baseline justify-between border-t border-white/5 pt-4">
                      <div>
                        <p className="font-body text-xs text-gray-500">Hourly Rate</p>
                        <p className="font-heading text-2xl font-black text-white">
                          ${zone.pricePerHour.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-xs text-gray-500">Available</p>
                        <p className={`font-heading text-lg font-bold ${isFull ? "text-red-500" : "text-white"}`}>
                          {zone.availableSpots} <span className="text-xs font-normal text-gray-500">/ {zone.totalSpots}</span>
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar / Occupancy indicator */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-body">
                        <span className="text-gray-400">Occupancy</span>
                        <span className="text-gray-300 font-semibold">{fillPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${progress}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fillPercentage}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
