import React from "react";
import { Navbar } from "@/components/modules/shared/Navbar";
import { Hero } from "@/components/modules/home/Hero";
import { About } from "@/components/modules/home/About";
import { Features } from "@/components/modules/home/Features";
import { ParkingZones } from "@/components/modules/home/ParkingZones";
import { Workflow } from "@/components/modules/home/Workflow";
import { DashboardPreview } from "@/components/modules/home/DashboardPreview";
import { TechStack } from "@/components/modules/home/TechStack";
import { Faq } from "@/components/modules/home/Faq";
import { Contact } from "@/components/modules/home/Contact";
import { Footer } from "@/components/modules/shared/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712] text-white flex flex-col justify-between">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. About SportSync */}
        <About />

        {/* 4. Features */}
        <Features />

        {/* 5. Parking Zones */}
        <ParkingZones />

        {/* 6. Reservation Workflow */}
        <Workflow />

        {/* 7. Dashboard Preview */}
        <DashboardPreview />

        {/* 8. Tech Stack */}
        <TechStack />

        {/* 9. FAQ Accordion */}
        <Faq />

        {/* 10. Contact / CTA */}
        <Contact />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
