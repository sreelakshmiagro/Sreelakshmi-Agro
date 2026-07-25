import { headers } from "next/headers";
import AdminLayoutClient from "@/components/admin/layout/AdminLayoutClient";
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
    <AdminLayoutClient topbar={<AdminTopbar />}>
      {children}
    </AdminLayoutClient>
  );
}
