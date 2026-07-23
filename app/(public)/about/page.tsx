import type { Metadata } from "next";
import { getPublishedTeamMembers, getPublishedTestimonials, getPublishedFAQs } from "@/lib/data";
import FounderProfile from "@/features/about/FounderProfile";
import MissionVision from "@/features/about/MissionVision";
import CoreValues from "@/features/about/CoreValues";
import TeamGrid from "@/features/about/TeamGrid";
import AboutGallery from "@/features/about/AboutGallery";
import Testimonials from "@/features/home/Testimonials";
import FAQPreview from "@/features/home/FAQPreview";
import FinalCTA from "@/features/home/FinalCTA";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the legacy of Sreelakshmi Agro Industries. Discover our founder Shri. T. A. Girishkumar's vision, our core values, and our grain safety standards.",
  keywords: ["About Sreelakshmi", "Girishkumar Thrissur", "Sajitha Agro", "Samba Wheat Processing"],
  alternates: {
    canonical: "https://sreelakshmiagro.com/about",
  },
};

export default async function AboutPage() {
  const teamMembers = await getPublishedTeamMembers();
  const testimonials = await getPublishedTestimonials();
  const faqs = await getPublishedFAQs();

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
      <AboutGallery />

      {/* 11. Testimonials Slide */}
      <Testimonials data={testimonials} />

      {/* 12. collapsible FAQs */}
      <FAQPreview data={faqs} />

      {/* 13. High-impact Conversion CTA */}
      <FinalCTA />
    </div>
  );
}
