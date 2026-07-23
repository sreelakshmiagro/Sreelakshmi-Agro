"use client";

import { motion } from "framer-motion";
import { ArrowRight, Loader } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Raw Grain Sourcing",
    desc: "We handpick premium-grade Samba wheat grains directly from trusted farming partners who share our sustainability goals.",
  },
  {
    step: "02",
    title: "Multi-Stage Cleaning",
    desc: "Grains undergo advanced magnetic separators, gravity destoners, and aspirators to remove 100% of foreign impurities.",
  },
  {
    step: "03",
    title: "Calibrated Processing",
    desc: "Precise parboiling or roasting occurs under automated heat controls to preserve the wheat's natural taste and aroma.",
  },
  {
    step: "04",
    title: "State-of-the-Art Milling",
    desc: "Calibrated roller mills break grains into the perfect golden grit sizes, avoiding heat build-up that destroys nutrients.",
  },
  {
    step: "05",
    title: "Automated Inspections",
    desc: "Optical sorting cameras filter out size, density, and color defects to ensure absolute grain uniformity in every pack.",
  },
  {
    step: "06",
    title: "Hygienic Packaging",
    desc: "Moisture-barrier, food-grade packaging preserves crispness and aroma, sealing in freshness without chemical preservatives.",
  },
];

export default function ManufacturingSteps() {
  return (
    <section className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-16 max-w-3xl">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Production Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Our Manufacturing Journey
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed">
            We operate a clean processing floor where grain hygiene and safety are automated from harvest reception to final dispatch.
          </p>
        </div>

        {/* Manufacturing Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                className="relative bg-bg-secondary p-8 rounded-xl border border-border-light flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Step Connector Line for large screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[50%] right-[-16px] translate-y-[-50%] z-10 text-brand-cream/80 group-hover:text-brand-gold transition-colors duration-300">
                    {/* Only show connector if it is not the end of a row */}
                    {(index + 1) % 3 !== 0 && <ArrowRight className="w-6 h-6" />}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-extrabold text-brand-primary/15 group-hover:text-brand-primary/100 transition-colors duration-300">
                    {item.step}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold opacity-50 group-hover:scale-150 group-hover:opacity-100 transition-all duration-300" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-lg font-bold text-text-primary">
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
