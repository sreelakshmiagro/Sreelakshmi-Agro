import type { Metadata } from "next";
import BecomeDistributorForm from "@/features/distributor/BecomeDistributorForm";
import { ShieldCheck, TrendingUp, BarChart, Truck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Become a Distributor",
  description: "Partner with Sreelakshmi Agro Industries. Explore bulk FMCG business opportunities, stable supplies, and competitive margins on our premium products.",
  keywords: ["FMCG Distributor", "Broken Wheat Distributor", "Agro Business Opportunity", "Bulk Wheat Supplies"],
  alternates: {
    canonical: "https://sreelakshmiagro.com/become-distributor",
  },
};

const advantages = [
  {
    icon: TrendingUp,
    title: "High Business Growth",
    desc: "Targeting high-demand dietary grain segments, ensuring fast turnarounds and repeating client purchases.",
  },
  {
    icon: Truck,
    title: "Reliable Bulk Supply",
    desc: "State-of-the-art milling systems ensure consistent product batches and on-time shipments throughout the year.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Food Quality",
    desc: "Strict adherence to ISO 22000 hygiene and parboiling rules builds instant brand authority with your retail chains.",
  },
  {
    icon: BarChart,
    title: "Competitive Margins",
    desc: "Excellent pricing structures optimized to grant healthy profit margins for wholesale partners and super stockists.",
  },
];

const steps = [
  { number: "01", title: "Submit Enquiry", desc: "Fill out our structured digital questionnaire detailing your business footprint." },
  { number: "02", title: "Profile Auditing", desc: "Our corporate development team reviews your credentials and expected volumes." },
  { number: "03", title: "Commercial Alignment", desc: "We discuss regional stock allocations, shipping timelines, and pricing catalogs." },
  { number: "04", title: "Onboarding Approval", desc: "Finalize compliance checks, verify credentials, and dispatch the first shipment." },
];

export default function BecomeDistributorPage() {
  return (
    <div className="bg-bg-secondary min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-20 overflow-hidden border-b border-border-light/60">
        <div className="absolute inset-0 opacity-30 pointer-events-none select-none">
          <div className="absolute top-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cream/40 blur-[90px]" />
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center relative z-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-5 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Business Opportunities
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
              Grow Your Agribusiness with Sreelakshmi Agro
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              We invite super stockists, food wholesalers, and grain distributors to join our expanding regional sales network, distributing our flagship Samba Broken Wheat.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Why Partner */}
      <section className="py-20 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <h2 className="font-serif text-3xl text-text-primary leading-tight">
              The Advantage of Sreelakshmi Agro Partnerships
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed">
              We support our distributor network with high-quality guarantees, logistics, and promotional aid.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
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
                      {adv.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="py-20 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <h2 className="font-serif text-3xl text-text-primary leading-tight">
              Our Onboarding Process
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed">
              A transparent, streamlined workflow to kickstart your distribution operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((st, index) => (
              <div key={index} className="relative flex flex-col gap-3 p-6 bg-bg-secondary rounded-xl border border-border-light">
                <span className="font-serif text-4xl font-extrabold text-brand-primary/10">
                  {st.number}
                </span>
                <h3 className="font-serif text-lg font-bold text-text-primary">
                  {st.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Questionnaire Form */}
      <section id="inquiry-form" className="py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <BecomeDistributorForm />
        </div>
      </section>
    </div>
  );
}
