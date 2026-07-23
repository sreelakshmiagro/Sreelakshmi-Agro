import { headers } from "next/headers";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  
  // Conditionally render the admin layout wrapper to keep the login page standalone
  const isLoginPage = pathname.includes("/admin/login");

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg-secondary flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <AdminTopbar />
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
