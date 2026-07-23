"use client";

import { motion } from "framer-motion";
import { ArrowRight, Landmark, BadgePercent, ShieldCheck } from "lucide-react";
import { useDistributorModal } from "@/store/useDistributorModal";

const benefits = [
  {
    icon: BadgePercent,
    title: "Attractive Business Margins",
    desc: "Competitive pricing options designed to optimize profit allocations for wholesale stockists.",
  },
  {
    icon: Landmark,
    title: "Regional Exclusivity Rights",
    desc: "Qualifying distributors receive regional sales rights to safeguard their local stock investments.",
  },
  {
    icon: ShieldCheck,
    title: "Unmatched Supply Stability",
    desc: "Consistent batch parboiling keeps supply levels steady throughout all seasons of the year.",
  },
];

export default function DistributorCTA() {
  const openModal = useDistributorModal((state) => state.openModal);

  return (
    <section className="py-24 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Business Opportunities Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Partner with Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
                Become a Distribution Partner Today
              </h2>
              <p className="font-sans text-text-secondary text-base leading-relaxed mt-2">
                Sreelakshmi Agro Industries is expanding its wholesale and stockist networks. We provide premium grains, marketing assets, and strong client demand to secure your business growth.
              </p>
            </div>

            {/* Partner benefits list */}
            <div className="flex flex-col gap-5 mt-2">
              {benefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex gap-4 items-center group">
                    <div className="p-2.5 bg-bg-secondary text-brand-primary rounded-lg border border-border-light group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif text-base font-semibold text-text-primary">
                      {item.title}
                    </h4>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: High-Impact Card Trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="bg-bg-secondary p-8 rounded-2xl border border-brand-cream/70 shadow-lg text-center flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-cream/20 rounded-bl-[80px] pointer-events-none" />
              
              <h3 className="font-serif text-2xl font-bold text-text-primary">
                Submit Partner Questionnaire
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Provide your commercial distribution details, and our B2B coordinators will get in touch with you.
              </p>

              <button
                onClick={openModal}
                className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans text-base font-semibold py-4 rounded-md shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <span>Apply for Distributorship</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <span className="font-sans text-[11px] text-text-tertiary">
                Takes approximately 2 minutes to complete.
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
