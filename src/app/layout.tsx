// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Player } from "@/components/navigations/Player";
import { DesktopNavigationClient } from "@/components/navigations/DesktopNavigationClient";
import { MobileNavigationClient } from "@/components/navigations/MobileNavigationClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NBS",
  description: "Viral audio in your hand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
      </head>

      <body
        className={`${montserrat.variable} antialiased text-[#EBF4DD] bg-[#202020] overflow-hidden`}
      >
        <div className="flex flex-col h-screen">
          {/* Main content area */}
          <div className="flex flex-1 overflow-hidden">
            {/* Desktop Navigation - rendered conditionally on client */}
            <DesktopNavigationClient />

            {/* Mobile Navigation Overlay - rendered conditionally on client */}
            <MobileNavigationClient />

            {/* Main content - always full width on mobile, adjusted on desktop */}
            <main className="flex-1 overflow-y-auto p-4 h-full">
              <ScrollArea className="flex-1 w-full h-full">
                {children}
              </ScrollArea>
            </main>
          </div>

          {/* Fixed Bottom Player */}
          <Player />
        </div>
      </body>
    </html>
  );
}
