"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If already authenticated, redirect directly to dashboard
    if (authService.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all credentials.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.login(email, password);
      // Success, route to dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background radial effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Floating Back to Home Link */}
      <Link
        href="/"
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-body text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <span className="font-heading font-black text-3xl tracking-wider text-white">
              SPORT<span className="text-secondary">SYNC</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          </Link>
          <p className="font-body text-xs text-gray-400">
            Sign in to manage and reserve your parking spot
          </p>
        </div>

        {/* Form panel */}
        <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl bg-gray-950/20 backdrop-blur-md space-y-6">
          <h2 className="font-heading text-xl font-bold text-white text-center">
            Welcome Back
          </h2>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 font-body text-center"
            >
              {errorMsg}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <div className="space-y-1.5">
              <label className="font-body text-xs text-gray-400 font-medium">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.morgan@sportsync.io"
                  className="w-full pl-10 pr-4 py-3 bg-[#0b0f19]/80 border border-white/5 focus:border-secondary/50 rounded-xl outline-none font-body text-sm text-white placeholder-gray-600 transition-colors"
                  required
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-body text-xs text-gray-400 font-medium">Password</label>
                <span className="font-body text-[10px] text-secondary hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#0b0f19]/80 border border-white/5 focus:border-secondary/50 rounded-xl outline-none font-body text-sm text-white placeholder-gray-600 transition-colors"
                  required
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-600" />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-body text-sm font-semibold bg-primary hover:bg-primary/95 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-primary/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Prompt to register */}
          <div className="text-center pt-2 border-t border-white/5 text-xs font-body text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-secondary hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
