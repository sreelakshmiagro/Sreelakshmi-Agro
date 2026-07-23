"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/admin/constants";
import { LogOut, Leaf } from "lucide-react";
import { logout } from "@/app/(admin)/admin/actions/auth";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-[#1A1A1A] border-r border-[#333333]">
      <div className="flex-1 flex flex-col min-h-0 bg-[#1A1A1A]">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-[#111111] border-b border-[#333333]">
          <Leaf className="w-8 h-8 text-brand-primary" />
          <span className="ml-3 text-white text-lg font-bold font-lora">
            SAI Admin
          </span>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
          <nav className="flex-1 px-2 space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors font-inter ${
                    isActive
                      ? "bg-brand-primary text-white"
                      : "text-gray-300 hover:bg-[#333333] hover:text-white"
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                  />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-[#333333] p-4 bg-[#111111]">
          <form action={logout} className="w-full">
            <button
              type="submit"
              className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-[#333333] hover:text-white transition-colors font-inter"
            >
              <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-white" />
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
