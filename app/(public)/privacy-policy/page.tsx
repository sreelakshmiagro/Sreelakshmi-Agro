import type { Metadata } from "next";
import { getPageSections } from "@/lib/data";
import { ShieldCheck, Lock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and Data Protection guidelines for Sreelakshmi Agro Industries.",
  alternates: {
    canonical: "https://sreelakshmiagro.com/privacy-policy",
  },
};

const defaultPrivacySections = [
  {
    section_key: "hero",
    heading: "Privacy Policy",
    subheading: "Sreelakshmi Agro Industries",
    description: "Last updated: July 2026. Your privacy and data protection are fundamental priorities at Sreelakshmi Agro Industries.",
  },
  {
    section_key: "collection",
    heading: "1. Information We Collect",
    subheading: "Data Types & Submissions",
    description: "We collect personal information that you voluntarily provide when submitting business inquiries, distributor onboarding questionnaires, product catalog requests, or job applications. This may include your full name, business entity, phone number, email address, physical location, and uploaded documentation such as CVs or GST details.",
  },
  {
    section_key: "usage",
    heading: "2. How We Use Your Information",
    subheading: "Commercial & Logistics Use",
    description: "The information collected is strictly utilized to process distributor requests, schedule delivery logistics, audit quality compliance, verify job candidates, respond to customer inquiries, and ensure seamless commercial transactions. We do not sell, trade, or rent personal data to third parties for marketing purposes.",
  },
  {
    section_key: "security",
    heading: "3. Data Security & Storage",
    subheading: "Protection Protocols",
    description: "We implement robust technical and organizational security measures, including SSL encryption and secure database access protocols, to protect your personal data against unauthorized access, alteration, or disclosure. Standard browser cookies are used solely to enhance browsing performance and analyze website traffic.",
  },
  {
    section_key: "contact",
    heading: "4. Contact Us Regarding Privacy",
    subheading: "Compliance Inquiry",
    description: "If you have any questions, concerns, or requests regarding your personal data or this Privacy Policy, please contact our Compliance Officer at privacy@sreelakshmiagro.com or via our official contact form.",
  },
];

export default async function PrivacyPolicyPage() {
  const dbSections = await getPageSections("privacy-policy");
  const sections = dbSections && dbSections.length > 0 ? dbSections : defaultPrivacySections;
  const heroSection = sections.find((s) => s.section_key === "hero") || sections[0];
  const bodySections = sections.filter((s) => s.section_key !== "hero");

  return (
    <div className="bg-bg-secondary min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-12 overflow-hidden border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{heroSection.subheading || "Legal & Compliance"}</span>
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
              {heroSection.heading}
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              {heroSection.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Policy Content Container */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pt-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-border-light shadow-sm flex flex-col gap-10">
          
          <div className="flex items-center gap-3 border-b border-border-light pb-6 text-brand-primary">
            <Lock className="w-6 h-6 shrink-0" />
            <h2 className="font-serif text-xl font-bold text-text-primary">
              Data Privacy & Protection Statement
            </h2>
          </div>

          <div className="flex flex-col gap-10 font-sans text-base text-text-secondary leading-relaxed">
            {bodySections.map((sec, idx) => (
              <div key={sec.id || idx} className="flex flex-col gap-3 border-b border-border-light/40 pb-8 last:border-0 last:pb-0">
                {sec.heading && (
                  <h3 className="font-serif text-xl font-bold text-text-primary">
                    {sec.heading}
                  </h3>
                )}
                {sec.subheading && (
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                    {sec.subheading}
                  </span>
                )}
                {sec.description && (
                  <div
                    className="prose prose-stone max-w-none text-text-secondary leading-relaxed space-y-3"
                    dangerouslySetInnerHTML={{ __html: sec.description }}
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
