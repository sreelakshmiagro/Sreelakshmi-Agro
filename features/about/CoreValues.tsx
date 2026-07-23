"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart, Sparkles, Users, Apple, Leaf, ClipboardCheck } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Quality & Food Safety",
    desc: "Unwavering commitment to quality standards and food safety across all processing levels.",
  },
  {
    icon: Sparkles,
    title: "Modern Technology",
    desc: "Adoption of modern processing and packaging technologies to maintain clean, hygienic outcomes.",
  },
  {
    icon: Leaf,
    title: "Natural Nutrition",
    desc: "Preservation of the grain's natural nutrition, rich bran fibers, and authentic traditional taste.",
  },
  {
    icon: Heart,
    title: "Trust & Satisfaction",
    desc: "Securing long-term customer trust and distributor satisfaction with batch-to-batch consistency.",
  },
  {
    icon: Users,
    title: "Innovation & Growth",
    desc: "Fostering sustainable growth and continuous processing innovations in the grain industry.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Our Guiding Pillars
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            The Values Behind Sreelakshmi Agro
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed max-w-2xl mx-auto">
            Our daily processing workflows and corporate choices are guided by core beliefs that preserve trust.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-white p-6 rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
              >
                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-lg w-max transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-serif text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
