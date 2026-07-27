import type { Metadata } from "next";
import { getPublishedTestimonials, getPublishedFAQs, getSeoMetaForPage } from "@/lib/data";
import Hero from "@/features/home/Hero";
import Introduction from "@/features/home/Introduction";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import FlagshipShowcase from "@/features/home/FlagshipShowcase";
import DistributorCTA from "@/features/home/DistributorCTA";
import Testimonials from "@/features/home/Testimonials";
import FAQPreview from "@/features/home/FAQPreview";
import FinalCTA from "@/features/home/FinalCTA";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetaForPage("home");

  const title = seo?.meta_title || "Sreelakshmi Agro Industries | Premium Food Processing & Wheat Products";
  const description = seo?.meta_description || "Sreelakshmi Agro Industries manufactures high-quality food products and our flagship Samba Broken Wheat.";

  return {
    title,
    description,
    keywords: seo?.focus_keyword ? [seo.focus_keyword, "Sreelakshmi Agro", "Samba Broken Wheat"] : undefined,
    alternates: {
      canonical: "https://sreelakshmiagro.com",
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: seo?.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}

export default async function HomePage() {
  const testimonials = await getPublishedTestimonials();
  const faqs = await getPublishedFAQs();

  return (
    <div className="flex flex-col">
      {/* 1. Cinematic Hero Fold */}
      <Hero />

      {/* 2. Company Narrative & Legacy Story */}
      <Introduction />

      {/* 3. Why Choose Us (Value propositions) */}
      <WhyChooseUs />

      {/* 4. Flagship Storytelling Showcase (Samba Broken Wheat) */}
      <FlagshipShowcase />

      {/* 8. B2B Onboarding CTA (Distributor trigger card) */}
      <DistributorCTA />

      {/* 9. Client & Distributor Testimonials Slider */}
      <Testimonials data={testimonials} />

      {/* 11. FAQ Accordions Preview */}
      <FAQPreview data={faqs} />

      {/* 12. Final High-Impact CTA Segment */}
      <FinalCTA />
    </div>
  );
}
