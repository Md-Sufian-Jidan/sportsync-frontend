"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LayoutDashboard, Map, CalendarRange, Users, DollarSign,
  TrendingUp, Clock, CheckCircle2, XCircle, AlertCircle
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { zonesService, ParkingZone } from "@/services/zones";
import { reservationsService, Reservation } from "@/services/reservations";

// Animated counter hook
function useAnimatedCounter(target: number, isInView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target > 100 ? Math.ceil(target / 60) : 1;
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(interval); }
      else setCount(start);
    }, Math.abs(Math.floor(1500 / (target / increment))));
    return () => clearInterval(interval);
  }, [target, isInView]);
  return count;
}

function StatCard({ label, value, prefix = "", suffix = "", icon: Icon, trend, color }: {
  label: string; value: number; prefix?: string; suffix?: string;
  icon: React.ComponentType<any>; trend: string; color: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useAnimatedCounter(value, isInView);
  return (
    <div ref={ref} className="p-5 rounded-2xl border border-border bg-card/50 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-body text-xs text-muted-foreground">{label}</span>
        <div className={`p-2 rounded-lg bg-opacity-10 ${color}`}>
          <Icon className={`h-4 w-4`} />
        </div>
      </div>
      <div>
        <p className="font-heading text-2xl font-black text-foreground">
          {prefix}{count.toLocaleString()}{suffix}
        </p>
        <p className="font-body text-[11px] text-muted-foreground mt-1">{trend}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Reservation["status"] }) {
  const config = {
    approved: { label: "Approved", icon: CheckCircle2, cls: "bg-accent/10 text-accent border-accent/20" },
    pending: { label: "Pending", icon: AlertCircle, cls: "bg-secondary/10 text-secondary border-secondary/20" },
    completed: { label: "Completed", icon: CheckCircle2, cls: "bg-gray-500/10 text-gray-400 border-gray-500/20" },
    cancelled: { label: "Cancelled", icon: XCircle, cls: "bg-red-500/10 text-red-400 border-red-500/20" },
  };
  const { label, icon: Icon, cls } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-body font-bold border ${cls}`}>
      <Icon className="h-2.5 w-2.5" />
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const [zones, setZones] = useState<ParkingZone[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      zonesService.getZones(),
      reservationsService.getReservations(),
    ]).then(([z, r]) => {
      setZones(z);
      setReservations(r);
    }).finally(() => setIsLoading(false));
  }, []);

  const totalRevenue = reservations
    .filter(r => r.status === "completed" || r.status === "approved")
    .reduce((sum, r) => sum + r.price, 0);

  const activeReservations = reservations.filter(r => r.status === "approved").length;
  const totalSlots = zones.reduce((sum, z) => sum + z.totalSpots, 0);
  const availableSlots = zones.reduce((sum, z) => sum + z.availableSpots, 0);

  // SVG Chart data
  const barData = [65, 80, 45, 90, 120, 85, 100];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxBar = Math.max(...barData);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-28 rounded-2xl bg-card/30 border border-border" />
          ))}
        </div>
        <div className="h-64 rounded-2xl bg-card/30 border border-border" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard label="Total Parking Slots" value={totalSlots} icon={Map}
          trend={`${availableSlots} slots available now`} color="text-secondary" />
        <StatCard label="Active Reservations" value={activeReservations} icon={CalendarRange}
          trend="+8% from last week" color="text-primary" />
        <StatCard label="Total Revenue" value={Math.round(totalRevenue)} prefix="$" icon={DollarSign}
          trend="+15% vs yesterday" color="text-accent" />
        <StatCard label="Registered Users" value={284} icon={Users}
          trend="12 new this week" color="text-purple-400" />
      </motion.div>

      {/* Chart + Recent Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7 p-6 rounded-2xl border border-border bg-card/50 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-sm font-bold text-foreground">Weekly Bookings</h3>
              <p className="font-body text-xs text-muted-foreground">Reservations per day</p>
            </div>
            <span className="flex items-center gap-1 text-xs font-body text-accent">
              <TrendingUp className="h-3.5 w-3.5" /> +12% this week
            </span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-40 flex items-end gap-3 px-2">
            {barData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <motion.div
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-secondary"
                  initial={{ height: 0 }}
                  animate={{ height: `${(val / maxBar) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.07, ease: "easeOut" }}
                  style={{ minHeight: 4 }}
                />
                <span className="font-body text-[9px] text-muted-foreground">{dayLabels[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Zone Status Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 p-6 rounded-2xl border border-border bg-card/50 space-y-4"
        >
          <h3 className="font-heading text-sm font-bold text-foreground">Zone Occupancy</h3>
          <div className="space-y-4">
            {zones.map(zone => {
              const pct = Math.round(((zone.totalSpots - zone.availableSpots) / zone.totalSpots) * 100);
              return (
                <div key={zone.id} className="space-y-1.5">
                  <div className="flex justify-between font-body text-xs">
                    <span className="text-foreground font-medium truncate max-w-[140px]">{zone.name}</span>
                    <span className="text-muted-foreground">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* Recent Reservations Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card/50 overflow-hidden"
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-heading text-sm font-bold text-foreground">Recent Reservations</h3>
            <p className="font-body text-xs text-muted-foreground mt-0.5">Latest booking activity</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Updated live
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["ID", "User", "Zone", "Vehicle", "Time", "Price", "Status"].map(h => (
                  <th key={h} className="px-6 py-3 text-left font-body text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reservations.slice(0, 6).map((res, i) => (
                <motion.tr
                  key={res.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-3 font-body text-xs text-muted-foreground">{res.id}</td>
                  <td className="px-6 py-3 font-body text-xs text-foreground font-medium">{res.userName}</td>
                  <td className="px-6 py-3 font-body text-xs text-muted-foreground">{res.zoneName}</td>
                  <td className="px-6 py-3 font-body text-xs text-muted-foreground font-mono">{res.vehicleNumber}</td>
                  <td className="px-6 py-3 font-body text-xs text-muted-foreground">
                    {new Date(res.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </td>
                  <td className="px-6 py-3 font-heading text-xs text-foreground font-bold">${res.price.toFixed(2)}</td>
                  <td className="px-6 py-3"><StatusBadge status={res.status} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {reservations.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-body text-sm text-muted-foreground">No reservations found.</p>
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
}