"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/admin/constants";
import { LogOut, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { logout } from "@/app/(admin)/admin/actions/auth";

export default function AdminSidebar({
  isCollapsed,
  onToggle,
}: {
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (typeof isCollapsed === "boolean") {
      setCollapsed(isCollapsed);
    } else {
      const saved = localStorage.getItem("admin_sidebar_collapsed");
      if (saved === "true") setCollapsed(true);
    }
  }, [isCollapsed]);

  const handleToggle = () => {
    const nextState = !collapsed;
    setCollapsed(nextState);
    localStorage.setItem("admin_sidebar_collapsed", String(nextState));
    if (onToggle) onToggle();
  };

  return (
    <aside
      className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 bg-[#1A1A1A] border-r border-[#333333] z-30 transition-all duration-300 ${
        collapsed ? "md:w-20" : "md:w-64"
      }`}
    >
      <div className="flex-1 flex flex-col min-h-0 bg-[#1A1A1A]">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-[#111111] border-b border-[#333333]">
          <div className="flex items-center overflow-hidden">
            <Leaf className="w-8 h-8 text-brand-primary shrink-0" />
            {!collapsed && (
              <span className="ml-3 text-white text-lg font-bold font-lora truncate">
                SAI Admin
              </span>
            )}
          </div>
          <button
            onClick={handleToggle}
            className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-[#2A2A2A] transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 flex flex-col overflow-y-auto py-4 px-2 space-y-1" data-lenis-prevent>
          <nav className="flex-1 space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.title : undefined}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors font-inter ${
                    collapsed ? "justify-center" : ""
                  } ${
                    isActive
                      ? "bg-brand-primary text-white shadow"
                      : "text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`flex-shrink-0 h-5 w-5 ${
                      collapsed ? "" : "mr-3"
                    } ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                  />
                  {!collapsed && <span className="truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer / Logout */}
        <div className="flex-shrink-0 p-3 bg-[#111111] border-t border-[#333333]">
          <form action={logout} className="w-full">
            <button
              type="submit"
              title={collapsed ? "Sign Out" : undefined}
              className={`w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-300 hover:bg-red-900/40 hover:text-red-300 transition-colors font-inter ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <LogOut
                className={`flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-red-300 ${
                  collapsed ? "" : "mr-3"
                }`}
              />
              {!collapsed && <span>Sign Out</span>}
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
