"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope, FaFacebook } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading font-black text-xl tracking-wider text-foreground">
                SPORT<span className="text-secondary">SYNC</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            </Link>
            <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
              Empowering facilities and drivers with smart, automated, cloud-based parking solutions. Reserve, manage, and optimize spots in real time.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {[
                { icon: FaGithub, link: "https://github.com/Md-Sufian-Jidan", label: "GitHub" },
                { icon: FaLinkedin, link: "https://www.linkedin.com/in/md-abu-sufian-jidan/", label: "LinkedIn" },
                { icon: FaEnvelope, link: "mailto:support@sportsync.io", label: "Email" },
                { icon: FaFacebook, link: "https://www.facebook.com/profile.php?id=61580036619103", label: "Facebook" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={s.label}
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {["Home", "Features", "Parking Zones", "Overview Dashboard"].map((item) => (
                <li key={item}>
                  <Link href={`/${item === "Home" ? "#home" : item.toLowerCase().replace(" ", "-")}`} className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Support
            </h4>
            <ul className="space-y-2.5">
              {["Help Center", "Privacy Policy", "Terms of Service", "API Reference"].map((item) => (
                <li key={item} className="font-body text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright separator */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-muted-foreground">
          <p className="font-body text-xs">
            &copy; {new Date().getFullYear()} SportSync. All rights reserved.
          </p>
          <p className="font-body text-xs">
            Designed for performance & responsiveness
          </p>
        </div>
      </div>
    </footer>
  );
}