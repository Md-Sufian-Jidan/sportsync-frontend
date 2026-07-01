"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { LayoutDashboard, Map, CalendarRange, User, Home, LogOut, Menu, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getCurrentUser, logout } from "@/services/authService";
import { User as AuthUser } from '@/types/authTypes'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Parking Zones", href: "/dashboard/zones", icon: Map },
    { name: "Reservations", href: "/dashboard/reservations", icon: CalendarRange },
    { name: "My Profile", href: "/profile", icon: User },
  ];

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard Overview";
    if (pathname === "/dashboard/zones") return "Zone Logistics";
    if (pathname === "/dashboard/reservations") return "Reservation Manager";
    if (pathname === "/profile") return "Profile Settings";
    return "SportSync Admin Portal";
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-300">

      {/* 1. Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 relative z-30 ${isSidebarCollapsed ? "w-20" : "w-64"
          }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          {!isSidebarCollapsed ? (
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading font-black text-lg tracking-wider text-foreground">
                SPORT<span className="text-secondary">SYNC</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
            </Link>
          ) : (
            <span className="font-heading font-black text-sm text-secondary mx-auto">S.S</span>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navLinks?.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-body transition-colors ${isActive
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                  }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-body text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
          >
            <Home className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span>Back to Site</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-body text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>

        {/* Collapse Handle */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute top-20 -right-3 h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground shadow-sm cursor-pointer z-40"
        >
          {isSidebarCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* 2. Mobile Sidebar Overlay Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-64 bg-card border-r border-border h-full flex flex-col p-6 space-y-6 relative animate-in slide-in-from-left duration-250">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2 pb-4 border-b border-border">
              <span className="font-heading font-black text-xl tracking-wider text-foreground">
                SPORT<span className="text-secondary">SYNC</span>
              </span>
              <span className="h-2 w-2 rounded-full bg-accent"></span>
            </div>

            <nav className="flex-1 space-y-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-body transition-colors ${isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-sidebar-accent"
                      }`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border pt-4 space-y-2">
              <Link
                href="/"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-body text-muted-foreground hover:bg-sidebar-accent"
              >
                <Home className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-body text-red-500 hover:bg-red-500/10"
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Main Workspace Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-heading text-base md:text-lg font-bold text-foreground">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">

            {/* Profile Menu Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2.5 focus:outline-none cursor-pointer group"
              >
                <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="font-body text-xs font-semibold text-foreground leading-tight">
                    {currentUser?.name || "Alex Morgan"}
                  </p>
                  <p className="font-body text-[10px] text-muted-foreground capitalize">
                    {currentUser?.role || "Admin"}
                  </p>
                </div>
              </button>

              {/* Profile Dropdown list */}
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute right-0 mt-3 w-48 rounded-xl border border-border bg-card shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-body text-muted-foreground hover:bg-sidebar-accent hover:text-foreground transition-colors"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-body text-red-500 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Children Page content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-background/50">
          {children}
        </main>
      </div>

    </div>
  );
}
