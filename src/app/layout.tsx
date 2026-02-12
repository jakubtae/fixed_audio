import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigations/PageNavigation";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          <div className="fixed bottom-0 left-0 w-full h-20 bg-[#181818] border-t border-neutral-800 flex items-center px-6 z-50">
            <div className="flex w-full items-center justify-between">
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neutral-700 rounded-md" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Currently Playing
                  </span>
                  <span className="text-xs text-neutral-400">Artist Name</span>
                </div>
              </div>

              {/* Center */}
              <div className="flex items-center gap-6">
                <button className="text-xl">⏮</button>
                <button className="text-2xl">▶</button>
                <button className="text-xl">⏭</button>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 w-40">
                <span>🔊</span>
                <input type="range" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
