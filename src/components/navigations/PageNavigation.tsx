// components/navigations/PageNavigation.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { authClient } from "@/auth-client";
import Image from "next/image";
import {
  Heart,
  Home,
  Info,
  LogIn,
  LogOut,
  Menu,
  SearchIcon,
  Settings,
  X,
} from "lucide-react";

interface NavigationProps {
  onClose?: () => void;
  isMobile?: boolean;
}

export const Navigation = ({ onClose, isMobile = false }: NavigationProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = authClient.useSession();

  // Handle link click - close mobile nav
  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const logOut = async () => {
    try {
      await authClient.signOut();
    } catch (error: any) {
      alert("Error logging out: " + error.message);
    }
  };

  // For desktop, we still want the collapse functionality
  // For mobile, we want a fixed width (not collapsed)
  const navWidth = isMobile ? "w-64" : collapsed ? "w-16" : "w-64";

  return (
    <aside
      className={`
        h-full bg-[#121212] text-[#EBF4DD]
        flex flex-col
        transition-all duration-300
        ${navWidth}
        ${isMobile ? "shadow-2xl" : ""}
      `}
    >
      {/* Top Section */}
      <div
        className={`flex items-center justify-between border-b border-neutral-800 ${
          collapsed && !isMobile ? "flex-col py-2" : "p-4"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={handleLinkClick}
        >
          <Image
            src="/nbs.png"
            alt="Logo"
            width={collapsed && !isMobile ? 40 : 90}
            height={collapsed && !isMobile ? 40 : 50}
            className="transition-all"
          />
        </Link>

        {/* Close button for mobile, collapse for desktop */}
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className={collapsed && !isMobile ? "mt-2" : ""}
          >
            <X size={20} />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu size={20} />
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-2 p-3 flex-1">
        <NavItem
          href="/"
          icon={<Home />}
          label="Home"
          collapsed={collapsed && !isMobile}
          onClick={handleLinkClick}
        />

        <NavItem
          href="/search"
          icon={<SearchIcon />}
          label="Search"
          collapsed={collapsed && !isMobile}
          onClick={handleLinkClick}
        />

        <NavItem
          href="/liked"
          icon={<Heart />}
          label="Liked"
          collapsed={collapsed && !isMobile}
          onClick={handleLinkClick}
        />
      </div>
      <div className="flex-col gap-2 p-3 pb-24">
        {session?.user && (
          <NavItem
            href="/profile"
            icon={<Settings />}
            label={"Settings"}
            collapsed={collapsed && !isMobile}
            onClick={handleLinkClick}
          />
        )}
        <NavItem
          href="/legals"
          icon={<Info />}
          label="Help & Support"
          collapsed={collapsed && !isMobile}
          onClick={handleLinkClick}
        />
        {!session?.user ? (
          <NavItem
            href="/profile"
            icon={<LogOut className="text-blue-500" />}
            label="Log In"
            style={{ color: "Blue" }}
            collapsed={collapsed && !isMobile}
            onClick={handleLinkClick}
          />
        ) : (
          <NavItem
            href="/"
            icon={<LogOut className="text-red-500" />}
            label="Log Out"
            style={{ color: "red" }}
            collapsed={collapsed && !isMobile}
            onClick={logOut}
          />
        )}
      </div>

      {/* Bottom Section - only show on desktop when not collapsed */}
      <div className="p-3 border-t border-neutral-800">
        {!collapsed && !isMobile && (
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
  style,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      className={`w-full ${
        collapsed ? "justify-center px-2" : "justify-start"
      }`}
      style={style}
      asChild
      onClick={onClick}
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
