"use server";

import { createClient } from "@/lib/supabase/server";

// ─── Products ───────────────────────────────────────────
export async function getPublishedProducts() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

// ─── Recipes ────────────────────────────────────────────
export async function getPublishedRecipes() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

// ─── Testimonials ───────────────────────────────────────
export async function getPublishedTestimonials() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

// ─── FAQs ───────────────────────────────────────────────
export async function getPublishedFAQs(category?: string) {
  const supabase = await createClient();
  let query = supabase
    .from("faqs")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return data || [];
}

// ─── Team Members ───────────────────────────────────────
export async function getPublishedTeamMembers() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

// ─── Jobs ───────────────────────────────────────────────
export async function getPublishedJobs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  return data || [];
}

// ─── Gallery ────────────────────────────────────────────
export async function getPublishedGallery() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
}

// ─── Site Settings ──────────────────────────────────────
export async function getSiteSettings() {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  const settings: Record<string, string> = {};
  (data || []).forEach((s: any) => {
    settings[s.setting_key] = s.setting_value || "";
  });
  return settings;
}

// ─── Menu Items ─────────────────────────────────────────
export async function getMenuItems(location: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("menu_items")
    .select("*")
    .eq("menu_location", location)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return data || [];
}
