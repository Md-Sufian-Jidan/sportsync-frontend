"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService, User as AuthUser } from "@/services/auth";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Access current authenticated user
    setCurrentUser(authService.getCurrentUser());

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname !== "/") {
      router.push(`/${targetId}`);
      return;
    }

    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Parking Zones", href: "#zones" },
    { name: "Dashboard", href: "/dashboard", isExternal: true },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-navbar py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="font-heading font-black text-2xl tracking-wider text-white">
              SPORT<span className="text-secondary group-hover:text-accent transition-colors duration-300">SYNC</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.isExternal ? (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-body text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-body text-gray-300 hover:text-white transition-colors">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="h-7 w-7 rounded-full border border-secondary/50" />
                  ) : (
                    <User className="h-5 w-5 p-1 bg-gray-800 rounded-full border border-gray-700" />
                  )}
                  <span>Dashboard</span>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="font-body text-sm font-semibold text-gray-300 hover:text-white transition-colors py-2 px-4 rounded-full">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="font-body text-sm font-semibold bg-primary hover:bg-primary/95 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass shadow-2xl py-6 px-6 border-b border-white/5">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) =>
              link.isExternal ? (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-base font-medium text-gray-300 hover:text-white py-2 border-b border-white/5"
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-body text-base font-medium text-gray-300 hover:text-white py-2 border-b border-white/5 block"
                >
                  {link.name}
                </a>
              )
            )}
            <div className="pt-4 flex flex-col space-y-3">
              {currentUser ? (
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full justify-center bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2.5 rounded-full font-body font-semibold">
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 py-2.5 rounded-full font-body font-semibold text-white">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 py-2.5 rounded-full font-body font-semibold text-white">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
