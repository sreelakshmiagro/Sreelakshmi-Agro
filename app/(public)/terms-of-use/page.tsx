import type { Metadata } from "next";
import { getPageSections } from "@/lib/data";
import { FileText, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use and Conditions of Service for Sreelakshmi Agro Industries.",
  alternates: {
    canonical: "https://sreelakshmiagro.com/terms-of-use",
  },
};

const defaultTermsSections = [
  {
    section_key: "hero",
    heading: "Terms of Use",
    subheading: "Terms & Conditions of Service",
    description: "Welcome to Sreelakshmi Agro Industries. By accessing or using our website, products, and partner services, you agree to comply with the following terms.",
  },
  {
    section_key: "ip",
    heading: "1. Intellectual Property & Trademarks",
    subheading: "Proprietary Rights",
    description: "All content, branding, logos, product graphics, processing specifications, and recipe media displayed on this website are the exclusive intellectual property of Sreelakshmi Agro Industries. Unauthorized reproduction, distribution, or commercial exploitation is strictly prohibited.",
  },
  {
    section_key: "distributor",
    heading: "2. Wholesale & Distributor Commitments",
    subheading: "Commercial Terms",
    description: "Distributor inquiries and wholesale bulk allocations submitted through our online portals are subject to commercial verification and formal contractual agreements. Prices, minimum order quantities (MOQs), and delivery terms are governed by official invoice terms issued by Sreelakshmi Agro Industries.",
  },
  {
    section_key: "disclaimer",
    heading: "3. Disclaimers & Limitation of Liability",
    subheading: "Liability Boundaries",
    description: "While we strive to maintain accurate product nutritional specs and processing standards on this platform, product availability and seasonal crop variations may apply. Sreelakshmi Agro Industries shall not be liable for any indirect or consequential loss arising from website downtime or unauthorized third-party site use.",
  },
  {
    section_key: "law",
    heading: "4. Governing Law",
    subheading: "Legal Jurisdiction",
    description: "These Terms of Use shall be governed by and construed in accordance with the laws of India. Any legal disputes shall fall under the exclusive jurisdiction of the competent courts in Kerala, India.",
  },
];

export default async function TermsOfUsePage() {
  const dbSections = await getPageSections("terms-of-use");
  const sections = dbSections && dbSections.length > 0 ? dbSections : defaultTermsSections;
  const heroSection = sections.find((s) => s.section_key === "hero") || sections[0];
  const bodySections = sections.filter((s) => s.section_key !== "hero");

  return (
    <div className="bg-bg-secondary min-h-screen pb-20">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-12 overflow-hidden border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              <span>{heroSection.subheading || "Legal Agreement"}</span>
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

      {/* Main Terms Content Container */}
      <section className="max-w-4xl mx-auto px-4 md:px-8 pt-16">
        <div className="bg-white p-8 md:p-12 rounded-2xl border border-border-light shadow-sm flex flex-col gap-10">
          
          <div className="flex items-center gap-3 border-b border-border-light pb-6 text-brand-primary">
            <FileText className="w-6 h-6 shrink-0" />
            <h2 className="font-serif text-xl font-bold text-text-primary">
              Terms & Conditions Agreement
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
