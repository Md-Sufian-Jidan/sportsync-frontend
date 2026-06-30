"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Map, CalendarRange, User, Home, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { authService } from "@/services/auth";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push("/login");
    }
  }, [router]);

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Parking Zones", href: "/dashboard/zones", icon: Map },
    { name: "Reservations", href: "/dashboard/reservations", icon: CalendarRange },
    { name: "My Profile", href: "/profile", icon: User },
  ];

  const handleLogout = () => {
    authService.logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-card">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading font-black text-lg text-foreground">
              SPORT<span className="text-secondary">SYNC</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks.map(({ name, href, icon: Icon }) => (
            <Link key={name} href={href}
              className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-2">
          <Link href="/" className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
            <Home className="h-5 w-5" />
            <span>Back to Site</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-body text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-64 bg-card border-r border-border h-full flex flex-col p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-heading font-black text-xl text-foreground">SPORT<span className="text-secondary">SYNC</span></span>
              <button onClick={() => setIsMobileOpen(false)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link key={name} href={href} onClick={() => setIsMobileOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-body text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors">
                  <Icon className="h-5 w-5" />
                  <span>{name}</span>
                </Link>
              ))}
            </nav>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-body text-red-500 hover:bg-red-500/10">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileOpen(true)} className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent">
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-heading text-base font-bold text-foreground">Profile Settings</h1>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-xl text-muted-foreground hover:bg-sidebar-accent cursor-pointer transition-colors">
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
