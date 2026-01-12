"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";

export const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showHamburger, setShowHamburger] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const checkScreenWidth = () => {
      setShowHamburger(window.innerWidth < 600);
    };

    // Check on mount
    checkScreenWidth();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <nav>
      <div className="flex w-full px-1 lg:px-8 flex-row justify-between items-center py-2 relative bg-[#5A7863] text-[#EBF4DD] text-xl shadow-[inset_0px_-4px_13px_-44px_rgba(0,0,0,0.1)]">
        {/* Hamburger Menu Button */}
        {showHamburger && (
          <Button
            variant="ghost"
            className="mr-2 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="flex flex-col justify-center items-center w-6 h-6">
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  menuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-0.5"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-0.5"
                }`}
              ></span>
            </div>
          </Button>
        )}

        {/* Logo */}
        <div className="flex flex-1 justify-between items-center">
          <Button
            variant="none"
            className="text-4xl lg:text-2xl font-bold text-inherit"
            asChild
          >
            <Link href="/">Viral Audio</Link>
          </Button>
          {/* Page Navigation - Hidden on small screens when hamburger is shown */}
          {!showHamburger && (
            <div className="flex flex-1 justify-end items-center gap-4 px-2">
              <Button variant="link_inherit" asChild className="text-lg">
                <Link href="/plugins">Plugins</Link>
              </Button>
              <Button variant="link_inherit" asChild className="text-lg">
                <Link href="/editor">Editor</Link>
              </Button>
              <div className="flex gap-2 md:flex-row flex-col">
                {!showHamburger && (
                  <Button variant="link_inherit" asChild className="text-lg">
                    <Link href="/profile">
                      {session?.user ? "Profile" : "Log in"}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
          {/* Get Started Button - Always visible */}
        </div>

        {/* Vertical Dropdown Menu */}
        {menuOpen && showHamburger && (
          <div className="absolute top-full left-0 w-full shadow-lg z-50 border-t">
            <div className="flex flex-col p-4 gap-2 bg-[#5A7863]">
              <Button
                variant="link_inherit"
                asChild
                className="justify-start py-3"
              >
                <Link href="/materials" onClick={() => setMenuOpen(false)}>
                  Plugins
                </Link>
              </Button>
              <Button
                variant="link_inherit"
                asChild
                className="justify-start py-3"
              >
                <Link href="/materials" onClick={() => setMenuOpen(false)}>
                  Editor
                </Link>
              </Button>
              <Button
                variant="link_inherit"
                asChild
                className="justify-start py-3"
              >
                <Link href="/profile" onClick={() => setMenuOpen(false)}>
                  {session?.user ? "Profile" : "Log In"}
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
