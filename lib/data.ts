"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

// ─── Products ───────────────────────────────────────────
export const getPublishedProducts = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
});

export const getProductBySlug = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
});

// ─── Recipes ────────────────────────────────────────────
export const getPublishedRecipes = cache(async (productSlug?: string) => {
  const supabase = await createClient();
  let query = supabase
    .from("recipes")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (productSlug) {
    query = query.eq("related_product_slug", productSlug);
  }

  const { data } = await query;
  return data || [];
});

// ─── Testimonials ───────────────────────────────────────
export const getPublishedTestimonials = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
});

// ─── FAQs ───────────────────────────────────────────────
export const getPublishedFAQs = cache(async (category?: string) => {
  const supabase = await createClient();
  let query = supabase
    .from("faqs")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true });
  if (category) query = query.eq("category", category);
  const { data } = await query;
  return data || [];
});

// ─── Team Members ───────────────────────────────────────
export const getPublishedTeamMembers = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("team_members")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });
  return data || [];
});

// ─── Jobs ───────────────────────────────────────────────
export const getPublishedJobs = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  return data || [];
});

// ─── Gallery ────────────────────────────────────────────
export const getPublishedGallery = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .in("status", ["active", "published"])
    .order("sort_order", { ascending: true });
  return data || [];
});

// ─── Site Settings ──────────────────────────────────────
export const getSiteSettings = cache(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("*");
  const settings: Record<string, string> = {};
  (data || []).forEach((s: any) => {
    settings[s.setting_key] = s.setting_value || "";
  });
  return settings;
});

// ─── Menu Items ─────────────────────────────────────────
export const getMenuItems = cache(async (location: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("menu_items")
    .select("*")
    .eq("menu_location", location)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  return data || [];
});

// ─── Page Sections ──────────────────────────────────────
export const getPageSections = cache(async (pageSlug: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_slug", pageSlug)
    .eq("status", "active")
    .order("sort_order", { ascending: true });
  return data || [];
});

// ─── Form Configurations ───────────────────────────────
export const getFormConfig = cache(async (key: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("setting_value")
    .eq("setting_key", key)
    .single();
  if (data?.setting_value) {
    try {
      return JSON.parse(data.setting_value);
    } catch {
      return null;
    }
  }
  return null;
});
