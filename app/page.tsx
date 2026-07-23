import type { Metadata } from "next";
import { getPublishedTestimonials, getPublishedFAQs } from "@/lib/data";
import Hero from "@/features/home/Hero";
import Introduction from "@/features/home/Introduction";
import WhyChooseUs from "@/features/home/WhyChooseUs";
import FlagshipShowcase from "@/features/home/FlagshipShowcase";
import DistributorCTA from "@/features/home/DistributorCTA";
import Testimonials from "@/features/home/Testimonials";
import FAQPreview from "@/features/home/FAQPreview";
import FinalCTA from "@/features/home/FinalCTA";

export const metadata: Metadata = {
  title: "Sreelakshmi Agro Industries | Premium Food Processing & Wheat Products",
  description: "Sreelakshmi Agro Industries is a leading manufacturer of premium parboiled Samba Broken Wheat, organic crop inputs, and agricultural inputs, founded on trust and tradition since 2011.",
  alternates: {
    canonical: "https://sreelakshmiagro.com",
  },
};

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
