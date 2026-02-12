"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";
import Image from "next/image";
import { Menu } from "lucide-react";

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
        ${collapsed ? "w-20" : "w-64"}
      `}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-800">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <Image src="/nbs.png" alt="Logo" width={90} height={50} />
          </Link>
        )}

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
        <NavItem href="/search" collapsed={collapsed}>
          Search
        </NavItem>

        <NavItem href="/profile" collapsed={collapsed}>
          {session?.user ? "Profile" : "Log In"}
        </NavItem>
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
  children,
  collapsed,
}: {
  href: string;
  children: React.ReactNode;
  collapsed: boolean;
}) => {
  return (
    <Button
      variant="ghost"
      className={`justify-start w-full ${
        collapsed ? "px-2 justify-center" : ""
      }`}
      asChild
    >
      <Link href={href}>
        {collapsed ? (
          <span className="text-lg">•</span>
        ) : (
          <span>{children}</span>
        )}
      </Link>
    </Button>
  );
};
