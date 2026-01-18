import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigations/PageNavigation";
import Footer from "@/components/navigations/PageFooter";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" sizes="any" />
      </head>
      <body
        className={`${montserrat.variable} antialiased flex flex-col min-h-screen pb-2 text-[#EBF4DD] bg-[#202020]`}
      >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
