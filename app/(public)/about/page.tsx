import type { Metadata } from "next";
import { getPublishedTeamMembers, getPublishedTestimonials, getPublishedFAQs, getPublishedGallery, getSeoMetaForPage } from "@/lib/data";
import FounderProfile from "@/features/about/FounderProfile";
import MissionVision from "@/features/about/MissionVision";
import CoreValues from "@/features/about/CoreValues";
import TeamGrid from "@/features/about/TeamGrid";
import AboutGallery from "@/features/about/AboutGallery";
import Testimonials from "@/features/home/Testimonials";
import FAQPreview from "@/features/home/FAQPreview";
import FinalCTA from "@/features/home/FinalCTA";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetaForPage("about");
  const title = seo?.meta_title || "About Us | Sreelakshmi Agro Industries";
  const description = seo?.meta_description || "Learn about the legacy of Sreelakshmi Agro Industries. Discover our founder's vision and core values.";

  return {
    title,
    description,
    keywords: seo?.focus_keyword ? [seo.focus_keyword, "About Sreelakshmi", "Girishkumar Thrissur"] : undefined,
    alternates: {
      canonical: "https://sreelakshmiagro.com/about",
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: seo?.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}

export default async function AboutPage() {
  const [teamMembers, testimonials, faqs, galleryImages] = await Promise.all([
    getPublishedTeamMembers(),
    getPublishedTestimonials(),
    getPublishedFAQs(),
    getPublishedGallery(),
  ]);

  return (
    <div className="flex flex-col">
      {/* 3. Executive Leader Profile */}
      <FounderProfile />

      {/* 4. Target Goals & Corporate Vision */}
      <MissionVision />

      {/* 5. Guiding Value System */}
      <CoreValues />

      {/* 9. Leadership Team Grid */}
      <TeamGrid data={teamMembers} />

      {/* 10. Visual Image Gallery Lightbox */}
      <AboutGallery data={galleryImages} />

      {/* 11. Testimonials Slide */}
      <Testimonials data={testimonials} />

      {/* 12. collapsible FAQs */}
      <FAQPreview data={faqs} />

      {/* 13. High-impact Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
