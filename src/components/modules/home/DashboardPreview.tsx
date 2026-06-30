"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, DollarSign, Calendar, Compass, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += Math.ceil(value / 60);
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function DashboardPreview() {
  const recentBookings = [
    { name: "John Miller", slot: "EV-03", zone: "EV Charging", price: "$18.00", status: "Approved" },
    { name: "Sarah Connor", slot: "VIP-01", zone: "VIP Parking", price: "$32.00", status: "Pending" },
    { name: "David Miller", slot: "PR-28", zone: "Premium Parking", price: "$15.00", status: "Completed" },
  ];

  return (
    <section id="dashboard-preview" className="relative py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h4 className="font-body text-xs font-bold uppercase tracking-widest text-secondary">Management Dashboard</h4>
          <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">SaaS Platform Preview</h2>
          <p className="font-body text-sm md:text-base text-muted-foreground">
            A comprehensive admin portal to monitor active zones, financial stats, and handle bookings in real-time.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-2xl border border-border bg-card shadow-lg p-6 md:p-8"
        >
          {/* Dashboard Header */}
          <div className="flex items-center justify-between border-b border-border pb-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1.5">
                <div className="h-3 w-3 rounded-full bg-destructive/50"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500/50"></div>
                <div className="h-3 w-3 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-[10px] text-primary font-bold uppercase">Live Feed</span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Slots", val: 107, icon: Compass },
              { label: "Monthly Bookings", val: 2450, icon: Calendar },
              { label: "Daily Revenue", val: 1280, icon: DollarSign, prefix: "$" },
              { label: "Valet Operators", val: 16, icon: Users },
            ].map((m, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-background">
                <div className="flex justify-between items-center text-muted-foreground text-xs mb-2">
                  <span>{m.label}</span>
                  <m.icon className="h-4 w-4" />
                </div>
                <p className="font-heading text-xl font-black text-foreground">
                  <AnimatedCounter value={m.val} prefix={m.prefix} />
                </p>
              </div>
            ))}
          </div>

          {/* Recent Bookings Table */}
          <div className="p-4 rounded-xl border border-border bg-background">
            <h3 className="font-heading text-sm font-bold text-foreground mb-4">Recent Bookings</h3>
            <div className="space-y-4">
              {recentBookings.map((b, i) => (
                <div key={i} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs font-bold text-foreground">{b.name}</p>
                    <p className="text-[10px] text-muted-foreground">{b.zone} • {b.slot}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-foreground">{b.price}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${b.status === "Approved" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                      }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}