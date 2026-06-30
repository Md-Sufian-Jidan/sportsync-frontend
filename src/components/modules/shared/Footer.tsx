import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030712] py-12 md:py-16 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-heading font-black text-xl tracking-wider text-white">
                SPORT<span className="text-secondary">SYNC</span>
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
            </Link>
            <p className="font-body text-sm text-gray-400 max-w-sm leading-relaxed">
              Empowering facilities and drivers with smart, automated, cloud-based parking solutions. Reserve, manage, and optimize spots in real time.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="mailto:support@sportsync.io"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/#home" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#features" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#zones" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                  Parking Zones
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="font-body text-sm text-gray-400 hover:text-white transition-colors">
                  Overview Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="font-body text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                  Help Center
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="font-body text-sm text-gray-400 hover:text-white cursor-pointer transition-colors">
                  API Reference
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright separator */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="font-body text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SportSync. All rights reserved. Built for modern parking ecosystems.
          </p>
          <p className="font-body text-xs text-gray-500 flex items-center">
            Designed for performance & responsiveness
          </p>
        </div>
      </div>
    </footer>
  );
}
