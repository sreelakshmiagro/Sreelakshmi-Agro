"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Heart, Sparkles, Users, Apple } from "lucide-react";

const items = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Strict raw grain analysis and parboiling controls to deliver rich, natural nutrition.",
  },
  {
    icon: ShieldCheck,
    title: "Corporate Integrity",
    desc: "Operating with absolute transparency and fair ethical terms with farming and B2B partners.",
  },
  {
    icon: Heart,
    title: "Distributor Trust",
    desc: "Maintaining stable supply chains and batch consistency to protect stockist market presence.",
  },
  {
    icon: Sparkles,
    title: "Milling Innovation",
    desc: "Deploying automated pre-cleaning, gravity separating, and optoelectronic sorting systems.",
  },
  {
    icon: Users,
    title: "Customer First",
    desc: "Designing food products that honor our consumers' healthy lifestyle goals.",
  },
  {
    icon: Apple,
    title: "Wholesome Nutrition",
    desc: "Pioneering the preservation of vital dietary fibers, proteins, and bone-building minerals.",
  },
];

export default function Values() {
  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Corporate Culture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Our Core Corporate Values
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
            The principles guiding Sreelakshmi Agro Industries from grain sourcing to partner support.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.06 }}
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
