import {
  LayoutDashboard,
  Package,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Inbox,
  Image as ImageIcon,
  FileText,
  Search,
  MenuSquare,
  Settings,
  Users,
  Activity,
  UsersRound,
  GalleryVerticalEnd,
} from "lucide-react";
import { NavItem } from "./types";

export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EDITOR: "editor",
} as const;

export const ADMIN_NAV_ITEMS: NavItem[] = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Recipes", href: "/admin/recipes", icon: BookOpen },
  { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { title: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { title: "Careers", href: "/admin/careers", icon: Briefcase },
  { title: "Form Submissions", href: "/admin/forms", icon: Inbox },
  { title: "Team Members", href: "/admin/team", icon: UsersRound },
  { title: "Gallery", href: "/admin/gallery", icon: GalleryVerticalEnd },
  { title: "Media", href: "/admin/media", icon: ImageIcon },
  { title: "Pages", href: "/admin/pages", icon: FileText },
  { title: "SEO", href: "/admin/seo", icon: Search },
  { title: "Menus", href: "/admin/menus", icon: MenuSquare },
  { title: "Settings", href: "/admin/settings", icon: Settings },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Activity Log", href: "/admin/activity", icon: Activity },
];
