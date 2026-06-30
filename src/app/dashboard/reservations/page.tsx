"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, XCircle, AlertCircle, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reservationsService, Reservation } from "@/services/reservations";

type StatusFilter = "all" | Reservation["status"];

function StatusBadge({ status }: { status: Reservation["status"] }) {
  const config = {
    approved: { label: "Approved", icon: CheckCircle2, cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    pending: { label: "Pending", icon: AlertCircle, cls: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
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

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const refresh = async () => {
    setIsLoading(true);
    const data = await reservationsService.getReservations();
    setReservations(data);
    setIsLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const handleStatusChange = async (id: string, newStatus: Reservation["status"]) => {
    setProcessingId(id);
    await reservationsService.updateReservationStatus(id, newStatus);
    await refresh();
    setProcessingId(null);
  };

  const handleCancel = async (id: string) => {
    setProcessingId(id);
    await reservationsService.cancelReservation(id);
    await refresh();
    setProcessingId(null);
  };

  const filtered = reservations.filter(r => {
    const matchesFilter = filter === "all" || r.status === filter;
    const query = search.toLowerCase();
    const matchesSearch = !query || r.userName.toLowerCase().includes(query)
      || r.vehicleNumber.toLowerCase().includes(query)
      || r.zoneName.toLowerCase().includes(query)
      || r.id.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const filterLabels: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground">Reservations</h2>
        <p className="font-body text-sm text-muted-foreground mt-1">
          View, approve, and manage all parking reservations.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by user, vehicle, or zone..."
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl font-body text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <div className="flex gap-1.5 flex-wrap">
            {filterLabels.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`font-body text-xs px-3 py-1.5 rounded-lg transition-colors ${
                  filter === key
                    ? "bg-primary text-white font-semibold"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="rounded-2xl border border-border bg-card/50 overflow-hidden animate-pulse">
          {[1,2,3,4].map(i => <div key={i} className="h-14 border-b border-border" />)}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-muted/20">
                  {["Booking ID", "User", "Zone", "Vehicle", "Start Time", "Price", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-body text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <AnimatePresence>
                  {filtered.map((res, i) => (
                    <motion.tr
                      key={res.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-5 py-3.5 font-body text-xs text-muted-foreground font-mono">{res.id}</td>
                      <td className="px-5 py-3.5 font-body text-xs text-foreground font-medium">{res.userName}</td>
                      <td className="px-5 py-3.5 font-body text-xs text-muted-foreground">{res.zoneName}</td>
                      <td className="px-5 py-3.5 font-body text-xs text-muted-foreground font-mono">{res.vehicleNumber}</td>
                      <td className="px-5 py-3.5 font-body text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {new Date(res.startTime).toLocaleString([], {
                            month: "short", day: "numeric",
                            hour: "2-digit", minute: "2-digit"
                          })}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-heading text-xs text-foreground font-bold">${res.price.toFixed(2)}</td>
                      <td className="px-5 py-3.5"><StatusBadge status={res.status} /></td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          {res.status === "pending" && (
                            <Button
                              disabled={processingId === res.id}
                              onClick={() => handleStatusChange(res.id, "approved")}
                              className="font-body text-[10px] h-6 px-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 disabled:opacity-50"
                            >
                              Approve
                            </Button>
                          )}
                          {(res.status === "pending" || res.status === "approved") && (
                            <Button
                              disabled={processingId === res.id}
                              onClick={() => handleCancel(res.id)}
                              className="font-body text-[10px] h-6 px-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 disabled:opacity-50"
                            >
                              Cancel
                            </Button>
                          )}
                          {(res.status === "approved") && (
                            <Button
                              disabled={processingId === res.id}
                              onClick={() => handleStatusChange(res.id, "completed")}
                              className="font-body text-[10px] h-6 px-2.5 rounded-lg bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 border border-gray-500/20 disabled:opacity-50"
                            >
                              Complete
                            </Button>
                          )}
                          {(res.status === "completed" || res.status === "cancelled") && (
                            <span className="font-body text-[10px] text-muted-foreground">—</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-body text-sm text-muted-foreground">
                {search || filter !== "all" ? "No reservations match your search." : "No reservations found."}
              </p>
            </div>
          )}

          {/* Footer Count */}
          <div className="px-5 py-3 border-t border-border flex items-center justify-between">
            <p className="font-body text-xs text-muted-foreground">
              Showing {filtered.length} of {reservations.length} reservations
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
