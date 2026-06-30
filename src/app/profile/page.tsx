"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Camera, Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authService, User as AuthUser } from "@/services/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const u = authService.getCurrentUser();
    setUser(u);
    if (u) { setName(u.name); setEmail(u.email); }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const updated = authService.updateProfile(name, email, user?.avatar);
    setUser(updated);
    await new Promise(r => setTimeout(r, 800)); // Simulate save delay
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">

      {/* Back Button */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Avatar Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 rounded-2xl border border-border bg-card/50 flex flex-col sm:flex-row items-center sm:items-start gap-6"
      >
        <div className="relative flex-shrink-0">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name}
              className="h-20 w-20 rounded-2xl border-2 border-border object-cover" />
          ) : (
            <div className="h-20 w-20 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          )}
          <button className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shadow-md">
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="text-center sm:text-left space-y-1">
          <h2 className="font-heading text-xl font-bold text-foreground">{user.name}</h2>
          <p className="font-body text-sm text-muted-foreground">{user.email}</p>
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-body font-semibold border capitalize
            ${user.role === "admin"
              ? "bg-primary/10 text-primary border-primary/20"
              : "bg-secondary/10 text-secondary border-secondary/20"
            }`}>
            <Shield className="h-3 w-3" />
            {user.role}
          </span>
        </div>
      </motion.div>

      {/* Edit Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="p-6 rounded-2xl border border-border bg-card/50 space-y-6"
      >
        <h3 className="font-heading text-base font-bold text-foreground">Profile Information</h3>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-body text-xs text-muted-foreground font-medium">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl font-body text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                  required
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-body text-xs text-muted-foreground font-medium">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-xl font-body text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                  required
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Read-only Role field */}
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted-foreground font-medium">Role</label>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-muted/30 border border-border rounded-xl">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground capitalize">{user.role}</span>
              <span className="ml-auto text-[10px] text-muted-foreground font-body">Read-only</span>
            </div>
          </div>

          {/* User ID */}
          <div className="space-y-1.5">
            <label className="font-body text-xs text-muted-foreground font-medium">User ID</label>
            <div className="px-3 py-2.5 bg-muted/30 border border-border rounded-xl">
              <span className="font-body text-sm text-muted-foreground font-mono">{user.id}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={isSaving}
              className="font-body text-sm bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2.5 flex items-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
              ) : saved ? (
                <><Check className="h-4 w-4" /> Saved!</>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4"
      >
        <h3 className="font-heading text-base font-bold text-red-400">Danger Zone</h3>
        <p className="font-body text-sm text-muted-foreground">
          Logging out will clear your session and require re-authentication.
        </p>
        <Button
          onClick={() => { authService.logout(); window.location.href = "/"; }}
          className="font-body text-sm bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl px-4 py-2.5"
        >
          Sign Out
        </Button>
      </motion.div>

    </div>
  );
}
