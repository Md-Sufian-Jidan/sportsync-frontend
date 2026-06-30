import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "SportSync - Smart Parking Management Made Simple",
  description: "Reserve parking spots instantly, manage parking zones, and monitor reservations with a secure cloud platform.",
  openGraph: {
    title: "SportSync - Smart Parking Management",
    description: "Reserve parking spots instantly, manage parking zones, and monitor reservations with a secure cloud platform.",
    url: "https://sportsync.vercel.app",
    siteName: "SportSync",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SportSync - Smart Parking Management",
    description: "Reserve parking spots instantly, manage parking zones, and monitor reservations with a secure cloud platform.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", merriweather.variable)}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-white">
        {children}
      </body>
    </html>
  );
}
