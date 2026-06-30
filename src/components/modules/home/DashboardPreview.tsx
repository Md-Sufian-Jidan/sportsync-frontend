"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, DollarSign, Calendar, Compass, ShieldCheck } from "lucide-react";

// Count Up Component
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1.5; // seconds
    const range = end - start;
    const increment = end > 100 ? Math.ceil(range / 60) : 1;
    const stepTime = Math.abs(Math.floor((duration * 1000) / (range / increment)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function DashboardPreview() {
  const recentBookings = [
    { name: "John Miller", slot: "EV-03", zone: "EV Charging", price: "$18.00", status: "Approved", time: "14:30 - 18:30" },
    { name: "Sarah Connor", slot: "VIP-01", zone: "VIP Parking", price: "$32.00", status: "Pending", time: "12:00 - 16:00" },
    { name: "David Miller", slot: "PR-28", zone: "Premium Parking", price: "$15.00", status: "Completed", time: "09:00 - 12:00" },
  ];

  // SVG Chart data path coordinates (representing booking growth)
  const linePath = "M 20 180 Q 90 140 160 160 T 300 80 T 440 100 T 580 40";
  const linePathLength = 650;

  return (
    <section
      id="dashboard-preview"
      className="relative py-24 bg-[#030712] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 w-full relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.h4
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-xs font-bold uppercase tracking-widest text-secondary"
          >
            Management Dashboard
          </motion.h4>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-heading font-black text-white"
          >
            SaaS Platform Preview
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-sm md:text-base text-gray-400"
          >
            Take a look at the comprehensive admin portal where you can monitor active zones, view financial stats, and handle bookings.
          </motion.p>
        </div>

        {/* Dashboard Frame */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-5xl mx-auto rounded-2xl border border-white/10 bg-gray-950/40 backdrop-blur-lg shadow-2xl overflow-hidden p-6 md:p-8"
        >
          {/* Dashboard Window Header (SaaS Window feel) */}
          <div className="flex items-center justify-between border-b border-white/5 pb-6 mb-6">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs text-gray-500 font-body ml-4">dashboard.sportsync.io/overview</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-[10px] text-accent font-body font-semibold uppercase tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping"></span>
                <span>Live Feed</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30">
              <div className="flex items-center justify-between text-gray-500 text-xs font-body mb-2">
                <span>Active Slots</span>
                <Compass className="h-4 w-4 text-secondary" />
              </div>
              <p className="font-heading text-xl md:text-2xl font-black text-white">
                <AnimatedCounter value={107} />
              </p>
              <p className="text-[10px] text-accent font-body mt-1">+12% from last week</p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30">
              <div className="flex items-center justify-between text-gray-500 text-xs font-body mb-2">
                <span>Monthly Bookings</span>
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <p className="font-heading text-xl md:text-2xl font-black text-white">
                <AnimatedCounter value={2450} />
              </p>
              <p className="text-[10px] text-accent font-body mt-1">+8% from last week</p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30">
              <div className="flex items-center justify-between text-gray-500 text-xs font-body mb-2">
                <span>Daily Revenue</span>
                <DollarSign className="h-4 w-4 text-accent" />
              </div>
              <p className="font-heading text-xl md:text-2xl font-black text-white">
                <AnimatedCounter value={1280} prefix="$" />
              </p>
              <p className="text-[10px] text-accent font-body mt-1">+15% from yesterday</p>
            </div>

            <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30">
              <div className="flex items-center justify-between text-gray-500 text-xs font-body mb-2">
                <span>Valet Operators</span>
                <Users className="h-4 w-4 text-gray-400" />
              </div>
              <p className="font-heading text-xl md:text-2xl font-black text-white">
                <AnimatedCounter value={16} />
              </p>
              <p className="text-[10px] text-gray-500 font-body mt-1">Fully staffed</p>
            </div>
          </div>

          {/* Graphs & Live Bookings columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Chart Area */}
            <div className="lg:col-span-7 p-4 rounded-xl border border-white/5 bg-[#0b0f19]/20 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-heading text-sm font-bold text-white">Reservation Trends</h3>
                <span className="text-xs text-gray-500 font-body">Last 7 days</span>
              </div>
              
              {/* Responsive SVG Chart */}
              <div className="relative w-full h-[180px]">
                <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Gradient fill */}
                  <defs>
                    <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Line path area */}
                  <path
                    d={`${linePath} L 600 200 L 20 200 Z`}
                    fill="url(#chart-grad)"
                  />

                  {/* Line Stroke */}
                  <motion.path
                    d={linePath}
                    fill="none"
                    stroke="url(#line-grad-color)"
                    strokeWidth="3"
                    initial={{ strokeDasharray: linePathLength, strokeDashoffset: linePathLength }}
                    whileInView={{ strokeDashoffset: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />

                  <defs>
                    <linearGradient id="line-grad-color" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2563EB" />
                      <stop offset="50%" stopColor="#06B6D4" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>

                  {/* Target data points */}
                  <circle cx="20" cy="180" r="4" fill="#2563EB" />
                  <circle cx="160" cy="160" r="4" fill="#2563EB" />
                  <circle cx="300" cy="80" r="4" fill="#06B6D4" />
                  <circle cx="440" cy="100" r="4" fill="#06B6D4" />
                  <circle cx="580" cy="40" r="4" fill="#10B981" />
                </svg>
              </div>
            </div>

            {/* Bookings Table Area */}
            <div className="lg:col-span-5 p-4 rounded-xl border border-white/5 bg-[#0b0f19]/20">
              <h3 className="font-heading text-sm font-bold text-white mb-4">Recent Bookings</h3>
              <div className="space-y-4">
                {recentBookings.map((b, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <p className="font-body text-xs font-semibold text-white">{b.name}</p>
                      <p className="font-body text-[10px] text-gray-500">{b.zone} • {b.slot}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-heading text-xs text-white font-bold">{b.price}</p>
                      <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-body font-bold ${
                        b.status === "Approved"
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : b.status === "Pending"
                          ? "bg-secondary/10 text-secondary border border-secondary/20"
                          : "bg-gray-800 text-gray-400 border border-gray-700"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
