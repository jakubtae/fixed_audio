// components/navigations/MobileNavigationClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Navigation } from "./PageNavigation";
import { Menu } from "lucide-react";

export const MobileNavigationClient = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render anything on desktop - desktop navigation is handled separately
  if (!isMobile) return null;

  return (
    <>
      {/* Menu button - only on mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-[#121212] p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation drawer */}
      <div
        className={`
          fixed top-0 left-0 h-full z-50
          transform transition-transform duration-300 ease-in-out
          md:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Navigation onClose={() => setIsOpen(false)} isMobile={true} />
      </div>
    </>
  );
};
