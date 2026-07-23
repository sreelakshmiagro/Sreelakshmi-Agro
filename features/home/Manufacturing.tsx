"use client";

import { motion } from "framer-motion";
import { ArrowRight, Settings, ShieldCheck, HelpCircle } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Raw Wheat Selection",
    desc: "Sourcing premium grain harvests directly from local farms auditing weight, moisture, and density parameters.",
  },
  {
    num: "02",
    title: "Double Cleaning Floor",
    desc: "Removing 100% of organic dust, mud particles, and stones using magnetic separators and gravity destoners.",
  },
  {
    num: "03",
    title: "Uniform Heat Milling",
    desc: "Milling grains into exact golden grits under low-temperature roller systems to lock in natural core nutrients.",
  },
  {
    num: "04",
    title: "Optoelectronic Grading",
    desc: "Multi-camera optical sensors review grit sizing and consistency to filter out defects dynamically.",
  },
];

export default function Manufacturing() {
  return (
    <section className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 max-w-3xl">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Audited Production
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Manufacturing Excellence & Food Safety
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed">
            Every batch of Sreelakshmi Agro products is processed under strict sanitary protocols, utilizing fully automated machinery.
          </p>
        </div>

        {/* Manufacturing Steps Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st, i) => {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="bg-bg-secondary p-6 rounded-xl border border-border-light flex flex-col gap-4 shadow-sm hover:shadow relative group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-serif text-4xl font-extrabold text-brand-primary/10 group-hover:text-brand-primary/100 transition-colors duration-300">
                    {st.num}
                  </span>
                  <div className="p-2 bg-white rounded-lg border border-border-light text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    <Settings className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-base font-bold text-text-primary">
                    {st.title}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {st.desc}
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
