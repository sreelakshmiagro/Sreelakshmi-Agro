import { LucideIcon } from "lucide-react";

export type AdminRole = "super_admin" | "admin" | "editor";

export interface AdminUser {
  id: string;
  email: string;
  role: AdminRole;
  created_at: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  roles?: AdminRole[];
}

export interface DashboardStats {
  products: number;
  recipes: number;
  testimonials: number;
  gallery: number;
  careers: number;
  applications: number;
  distributorEnquiries: number;
  contactEnquiries: number;
}
