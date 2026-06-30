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
    zonesService.getZones().then((data) => setZones(data));
  }, []);

  const getZoneIcon = (name: string) => {
    const title = name.toLowerCase();
    if (title.includes("ev") || title.includes("charging")) return BatteryCharging;
    if (title.includes("vip")) return Award;
    if (title.includes("premium")) return Sparkles;
    return User;
  };

  const getZoneColors = (name: string) => {
    const title = name.toLowerCase();
    if (title.includes("ev") || title.includes("charging"))
      return { iconBg: "bg-accent/10", iconColor: "text-accent", progress: "bg-accent" };
    if (title.includes("vip"))
      return { iconBg: "bg-primary/10", iconColor: "text-primary", progress: "bg-primary" };
    if (title.includes("premium"))
      return { iconBg: "bg-secondary/10", iconColor: "text-secondary", progress: "bg-secondary" };
    return { iconBg: "bg-muted", iconColor: "text-muted-foreground", progress: "bg-muted-foreground" };
  };

  return (
    <section id="zones" className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <h4 className="font-body text-xs font-bold uppercase tracking-widest text-secondary">Active Zones</h4>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">Tailored Parking Zones</h2>
            <p className="font-body text-sm md:text-base text-muted-foreground">
              Select from dedicated zones built specifically around your vehicle requirements and parking expectations.
            </p>
          </div>
          <Link href="/register">
            <Button variant="outline" className="rounded-full px-6 py-5 gap-2 border-primary/20 text-primary hover:bg-primary/5">
              Book a Spot <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {zones.map((zone, i) => {
            const Icon = getZoneIcon(zone.name);
            const { iconBg, iconColor, progress } = getZoneColors(zone.name);
            const fillPercentage = ((zone.totalSpots - zone.availableSpots) / zone.totalSpots) * 100;

            return (
              <motion.div
                key={zone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-6">
                  <CardContent className="p-0 space-y-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-heading text-lg font-bold text-foreground">{zone.name}</h3>
                        <p className="font-body text-xs text-muted-foreground capitalize">{zone?.type} Parking</p>
                      </div>
                      <div className={`p-2.5 rounded-xl ${iconBg} ${iconColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-border pt-4">
                      <div>
                        <p className="font-body text-xs text-muted-foreground">Hourly Rate</p>
                        <p className="font-heading text-2xl font-black text-foreground">${zone.pricePerHour.toFixed(2)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-xs text-muted-foreground">Available</p>
                        <p className={`font-heading text-lg font-bold ${zone.availableSpots === 0 ? "text-destructive" : "text-foreground"}`}>
                          {zone.availableSpots} <span className="text-xs font-normal text-muted-foreground">/ {zone.totalSpots}</span>
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-body text-muted-foreground">
                        <span>Occupancy</span>
                        <span className="font-semibold text-foreground">{fillPercentage.toFixed(0)}%</span>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${progress}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${fillPercentage}%` }}
                          viewport={{ once: true }}
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