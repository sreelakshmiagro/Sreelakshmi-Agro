"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Leaf, Users } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Premium Wheat Selection",
    desc: "Selecting only the highest-grade raw materials directly from the heart of Maharashtra's trusted growers.",
  },
  {
    icon: ShieldCheck,
    title: "Strict Processing Hygiene",
    desc: "Our manufacturing floor keeps raw grains protected from external contaminants and dust.",
  },
  {
    icon: Leaf,
    title: "100% Organic Purity",
    desc: "Free from artificial chemicals, preservatives, or color additives, offering clean health.",
  },
  {
    icon: Users,
    title: "End-to-End Trust",
    desc: "Verified network of dependable distributors, wholesalers, and retailers.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-10">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Operational Standards
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Why Choose Sreelakshmi Agro?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white p-8 rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
              >
                <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-lg w-max transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex flex-col gap-2">
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
