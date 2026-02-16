// components/navigations/DesktopNavigationClient.tsx
"use client";

import { useState, useEffect } from "react";
import { Navigation } from "./PageNavigation";

export const DesktopNavigationClient = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render on mobile - mobile navigation is handled separately
  if (isMobile) return null;

  return (
    <aside className="h-full shrink-0">
      <Navigation />
    </aside>
  );
};
