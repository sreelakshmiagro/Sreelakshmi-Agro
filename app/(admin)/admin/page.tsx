import { createClient } from "@/lib/supabase/server";
import { Package, BookOpen, MessageSquare, Briefcase, Image as ImageIcon, Inbox, Users, FileText } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Parallel fetch counts - using correct table names
  const [
    { count: productsCount },
    { count: recipesCount },
    { count: testimonialsCount },
    { count: galleryCount },
    { count: careersCount },
    { count: applicationsCount },
    { count: distributorEnquiriesCount },
    { count: contactEnquiriesCount }
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("recipes").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }),
    supabase.from("jobs").select("*", { count: "exact", head: true }).eq('status', 'published'),
    supabase.from("job_applications").select("*", { count: "exact", head: true }),
    supabase.from("distributor_inquiries").select("*", { count: "exact", head: true }),
    supabase.from("contact_inquiries").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { name: "Total Products", value: productsCount || 0, icon: Package, href: "/admin/products", color: "bg-blue-50 text-blue-600" },
    { name: "Recipes", value: recipesCount || 0, icon: BookOpen, href: "/admin/recipes", color: "bg-green-50 text-green-600" },
    { name: "Testimonials", value: testimonialsCount || 0, icon: MessageSquare, href: "/admin/testimonials", color: "bg-purple-50 text-purple-600" },
    { name: "Gallery Images", value: galleryCount || 0, icon: ImageIcon, href: "/admin/gallery", color: "bg-amber-50 text-amber-600" },
    { name: "Open Jobs", value: careersCount || 0, icon: Briefcase, href: "/admin/careers", color: "bg-indigo-50 text-indigo-600" },
    { name: "Job Applications", value: applicationsCount || 0, icon: Inbox, href: "/admin/forms/applications", color: "bg-pink-50 text-pink-600" },
    { name: "Distributor Enquiries", value: distributorEnquiriesCount || 0, icon: Users, href: "/admin/forms/distributors", color: "bg-teal-50 text-teal-600" },
    { name: "Contact Enquiries", value: contactEnquiriesCount || 0, icon: FileText, href: "/admin/forms/contacts", color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary font-lora mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white overflow-hidden shadow-sm rounded-lg border border-border-light hover:shadow-md transition-shadow group"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-text-secondary truncate font-inter">
                        {stat.name}
                      </dt>
                      <dd>
                        <div className="text-2xl font-bold text-text-primary font-inter">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold text-text-primary font-lora mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/products/new" className="bg-white shadow-sm rounded-lg border border-border-light p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Package className="h-5 w-5 text-brand-primary" />
              <span className="font-medium text-sm">Add New Product</span>
            </div>
          </Link>
          <Link href="/admin/recipes/new" className="bg-white shadow-sm rounded-lg border border-border-light p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-brand-primary" />
              <span className="font-medium text-sm">Add New Recipe</span>
            </div>
          </Link>
          <Link href="/admin/careers/new" className="bg-white shadow-sm rounded-lg border border-border-light p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-brand-primary" />
              <span className="font-medium text-sm">Post New Job</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
