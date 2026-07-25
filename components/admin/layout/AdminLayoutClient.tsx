"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";

export default function AdminLayoutClient({
  children,
  topbar,
}: {
  children: React.ReactNode;
  topbar: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin_sidebar_collapsed");
    if (saved === "true") setIsCollapsed(true);
  }, []);

  const handleToggle = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-bg-secondary flex">
      <AdminSidebar isCollapsed={isCollapsed} onToggle={handleToggle} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "md:pl-20" : "md:pl-64"}`}>
        {topbar}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
