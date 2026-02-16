"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";
import Image from "next/image";
import { Home, LogIn, Menu, SearchIcon, Settings } from "lucide-react";

export const Navigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <aside
      className={`
        h-screen bg-[#121212] text-[#EBF4DD]
        flex flex-col
        transition-all duration-300
        ${collapsed ? "px-1" : "w-64"}
      `}
    >
      {/* Top Section */}
      <div
        className={`flex items-center justify-between border-b border-neutral-800 ${
          collapsed ? "flex-col p-0 py-2" : "flex-row p-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/nbs.png"
            alt="Logo"
            width={collapsed ? 50 : 90}
            height={collapsed ? 50 : 50}
          />
        </Link>

        {/* Collapse Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <NavItem href="/" icon={<Home />} label="Home" collapsed={collapsed} />

        <NavItem
          href="/search"
          icon={<SearchIcon />}
          label="Search"
          collapsed={collapsed}
        />

        <NavItem
          href="/profile"
          icon={session?.user ? <Settings /> : <LogIn />}
          label={session?.user ? "Settings" : "Log in"}
          collapsed={collapsed}
        />
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-neutral-800">
        {!collapsed && (
          <p className="text-xs text-neutral-500">Viral audio in your hand</p>
        )}
      </div>
    </aside>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) => {
  return (
    <Button
      variant="ghost"
      className={`w-full ${
        collapsed ? "justify-center px-2" : "justify-start"
      }`}
      asChild
    >
      <Link
        href={href}
        className={`flex items-center ${collapsed ? "justify-center" : "gap-2"}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </Link>
    </Button>
  );
};
