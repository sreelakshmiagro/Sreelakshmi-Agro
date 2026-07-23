import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";

export default async function AdminTopbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-border-light shadow-sm">
      <div className="flex-1 px-4 flex justify-between md:justify-end">
        <div className="ml-4 flex items-center md:ml-6">
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-text-primary font-inter">
                {user?.email || "Admin User"}
              </span>
              <span className="text-xs text-text-secondary capitalize font-inter">
                Super Admin
              </span>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
              <User className="h-5 w-5 text-brand-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
