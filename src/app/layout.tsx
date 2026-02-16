import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigations/PageNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Player } from "@/components/navigations/Player";

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

      {/* 🚨 Prevent body from scrolling */}
      <body
        className={`${montserrat.variable} antialiased text-[#EBF4DD] bg-[#202020] overflow-hidden`}
      >
        {/* Full viewport app container */}
        <div className="flex flex-col h-screen">
          {/* Sidebar + Main */}
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar (fixed height via parent) */}
            <aside className="h-full shrink-0">
              <Navigation />
            </aside>

            {/* ✅ ONLY this scrolls */}
            <main className="flex-1 overflow-y-auto p-4 pb-24 h-full flex">
              <ScrollArea className="flex-1 w-1">{children}</ScrollArea>
            </main>
          </div>

          {/* Fixed Bottom Player */}
          <Player />
        </div>
      </body>
    </html>
  );
}
