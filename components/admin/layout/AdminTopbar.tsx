import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import { AdminGlobalSearch } from "./AdminGlobalSearch";
import { AdminNotificationBell } from "./AdminNotificationBell";

export default async function AdminTopbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="sticky top-0 z-20 flex-shrink-0 flex h-16 bg-white border-b border-border-light shadow-sm">
      <div className="flex-1 px-4 flex items-center justify-between">
        
        {/* Left Side: Global Command Palette Search */}
        <div className="flex items-center gap-3">
          <AdminGlobalSearch />
        </div>

        {/* Right Side: Notification Bell & Admin Profile */}
        <div className="flex items-center gap-4">
          <AdminNotificationBell />

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold text-text-primary font-inter">
                {user?.email || "Admin User"}
              </span>
              <span className="text-[11px] text-brand-primary font-semibold uppercase tracking-wider font-inter">
                Super Admin
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20 shrink-0">
              <User className="h-5 w-5 text-brand-primary" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
