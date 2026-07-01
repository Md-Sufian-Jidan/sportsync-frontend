import { Navbar } from "@/components/modules/shared/Navbar";
import { Hero } from "@/components/modules/home/Hero";
import { About } from "@/components/modules/home/About";
import { Features } from "@/components/modules/home/Features";
import { Workflow } from "@/components/modules/home/Workflow";
import { DashboardPreview } from "@/components/modules/home/DashboardPreview";
import { TechStack } from "@/components/modules/home/TechStack";
import { Faq } from "@/components/modules/home/Faq";
import { Contact } from "@/components/modules/home/Contact";
import { Footer } from "@/components/modules/shared/Footer";
import { getCurrentUser } from "@/services/authService";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Features />
      {/* <ParkingZones /> */}
      <Workflow />
      <DashboardPreview />
      <TechStack />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}
