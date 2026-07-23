import type { Metadata } from "next";
import { getPublishedJobs } from "@/lib/data";
import CareersPortal from "@/features/careers/CareersPortal";
import { TrendingUp, BookOpen, Heart, Sparkles, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Sreelakshmi Agro Industries. Explore exciting job openings, work culture, learning growth, and careers in FMCG food processing.",
  keywords: ["Agro Careers", "Food Technologist Jobs", "Milling Jobs", "Sreelakshmi Openings"],
  alternates: {
    canonical: "https://sreelakshmiagro.com/careers",
  },
};

const culturalPillars = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    desc: "Active support structures, training programs, and promotion paths to expand your operational talents.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    desc: "Hands-on exposure to advanced food safety, machinery parboiling automation, and logistics systems.",
  },
  {
    icon: Heart,
    title: "Supportive Culture",
    desc: "A cooperative work environment focused on team safety, mutual respect, and work-life balance.",
  },
  {
    icon: Sparkles,
    title: "Process Innovation",
    desc: "Encouraging employees to propose cleaning, packaging, and QA enhancements that optimize production.",
  },
];

export default async function CareersPage() {
  const jobs = await getPublishedJobs();

  return (
    <div className="bg-bg-secondary min-h-screen">
      
      {/* Section 1: Hero Banner */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-12 overflow-hidden border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Grow With Us
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
              Careers at Sreelakshmi Agro
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              We are constantly seeking motivated professionals to join our corporate office, production floor, and regional logistics depots.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why Work With Us */}
      <section className="py-20 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <h2 className="font-serif text-3xl text-text-primary leading-tight">
              Our Professional Environment
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed">
              We offer resources, safety compliance, and direct mentors to help you build a solid agricultural industry career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {culturalPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-bg-secondary p-6 rounded-xl border border-border-light flex flex-col gap-4 shadow-sm hover:shadow transition-shadow group"
                >
                  <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-lg w-max transition-colors group-hover:bg-brand-primary group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-lg font-bold text-text-primary">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Openings and Application Form */}
      <section className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <CareersPortal jobs={jobs} />
        </div>
      </section>

    </div>
  );
}
