"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Check, BatteryCharging, Award, Sparkles, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { zonesService, ParkingZone } from "@/services/zones";

function ZoneModal({
  zone,
  onClose,
  onSave,
}: {
  zone: ParkingZone | null;
  onClose: () => void;
  onSave: (data: Omit<ParkingZone, "id">) => void;
}) {
  const [form, setForm] = useState({
    name: zone?.name ?? "",
    totalSpots: zone?.totalSpots ?? 20,
    availableSpots: zone?.availableSpots ?? 20,
    pricePerHour: zone?.pricePerHour ?? 3.0,
    description: zone?.description ?? "",
    features: zone?.features.join(", ") ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name: form.name,
      totalSpots: Number(form.totalSpots),
      availableSpots: Number(form.availableSpots),
      pricePerHour: Number(form.pricePerHour),
      description: form.description,
      features: form.features.split(",").map(f => f.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {zone ? "Edit Zone" : "Add New Zone"}
          </h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Zone Name", key: "name", type: "text", placeholder: "e.g. EV Charging Zone" },
            { label: "Total Spots", key: "totalSpots", type: "number", placeholder: "20" },
            { label: "Available Spots", key: "availableSpots", type: "number", placeholder: "15" },
            { label: "Price per Hour ($)", key: "pricePerHour", type: "number", placeholder: "3.00", step: "0.01" },
            { label: "Description", key: "description", type: "text", placeholder: "Zone description..." },
            { label: "Features (comma-separated)", key: "features", type: "text", placeholder: "CCTV, Covered, EV Ready" },
          ].map(({ label, key, type, placeholder, step }) => (
            <div key={key} className="space-y-1">
              <label className="font-body text-xs text-muted-foreground">{label}</label>
              <input
                type={type}
                step={step}
                value={(form as any)[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                required={key === "name"}
                className="w-full px-3 py-2 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}
              className="flex-1 font-body text-sm border-border text-muted-foreground hover:text-foreground rounded-xl">
              Cancel
            </Button>
            <Button type="submit"
              className="flex-1 font-body text-sm bg-primary hover:bg-primary/90 text-white rounded-xl">
              <Check className="h-4 w-4 mr-1.5" />
              {zone ? "Update Zone" : "Create Zone"}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function getZoneIcon(name: string) {
  const t = name.toLowerCase();
  if (t.includes("ev")) return BatteryCharging;
  if (t.includes("vip")) return Award;
  if (t.includes("premium")) return Sparkles;
  return UserIcon;
}

export default function ZonesPage() {
  const [zones, setZones] = useState<ParkingZone[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalZone, setModalZone] = useState<ParkingZone | null | "new">(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    const data = await zonesService.getZones();
    setZones(data);
    setIsLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const handleSave = async (data: Omit<ParkingZone, "id">) => {
    if (modalZone === "new") {
      await zonesService.createZone(data);
    } else if (modalZone) {
      await zonesService.updateZone(modalZone.id, data);
    }
    setModalZone(null);
    await refresh();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await zonesService.deleteZone(id);
    setDeletingId(null);
    await refresh();
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-bold text-foreground">Parking Zones</h2>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Manage zones, spot capacity, rates, and features.
          </p>
        </div>
        <Button
          onClick={() => setModalZone("new")}
          className="font-body text-sm bg-primary hover:bg-primary/90 text-white rounded-xl px-4 py-2.5 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Zone
        </Button>
      </div>

      {/* Zones Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="h-48 rounded-2xl bg-card/30 border border-border" />)}
        </div>
      ) : zones.length === 0 ? (
        <div className="py-24 text-center rounded-2xl border border-border border-dashed">
          <Map className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-40" />
          <p className="font-body text-sm text-muted-foreground">No parking zones found.</p>
          <Button onClick={() => setModalZone("new")} className="mt-4 font-body text-sm bg-primary text-white rounded-xl">
            Create Your First Zone
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {zones.map((zone, i) => {
              const Icon = getZoneIcon(zone.name);
              const pct = Math.round(((zone.totalSpots - zone.availableSpots) / zone.totalSpots) * 100);
              return (
                <motion.div
                  key={zone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="border border-border bg-card/50 rounded-2xl p-5 space-y-4 hover:border-primary/30 transition-colors">
                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-heading text-sm font-bold text-foreground">{zone.name}</h3>
                            <p className="font-body text-[11px] text-muted-foreground">
                              {zone.availableSpots}/{zone.totalSpots} spots available
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => setModalZone(zone)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(zone.id)}
                            disabled={deletingId === zone.id}
                            className="p-1.5 rounded-lg text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-muted/30">
                          <p className="font-body text-[10px] text-muted-foreground">Rate</p>
                          <p className="font-heading text-lg font-bold text-foreground">${zone.pricePerHour}/hr</p>
                        </div>
                        <div className="p-3 rounded-xl bg-muted/30">
                          <p className="font-body text-[10px] text-muted-foreground">Occupancy</p>
                          <p className="font-heading text-lg font-bold text-foreground">{pct}%</p>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${pct}%`, transition: "width 1s ease" }} />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {zone.features.slice(0, 3).map(f => (
                            <span key={f} className="text-[9px] px-1.5 py-0.5 rounded-md bg-secondary/10 text-secondary font-body">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalZone !== null && (
          <ZoneModal
            zone={modalZone === "new" ? null : modalZone}
            onClose={() => setModalZone(null)}
            onSave={handleSave}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

// Fix: re-export Map for empty state icon
function Map(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>;
}
