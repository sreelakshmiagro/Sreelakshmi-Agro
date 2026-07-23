"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Apple, Heart, Activity, ShieldCheck, Flame, Compass, Smile } from "lucide-react";

const benefits = [
  {
    icon: Activity,
    title: "High in Fiber, Vitamins & Minerals",
    desc: "Contains a rich natural density of dietary bran fibers, vitamins, and essential minerals that support digestion.",
  },
  {
    icon: Flame,
    title: "Lower Glycemic Index",
    desc: "Ideal for diabetes patients, promoting gradual energy release and supporting stable blood glucose levels.",
  },
  {
    icon: ShieldCheck,
    title: "Protein, Iron & Calcium Source",
    desc: "A wholesome grain offering natural plant proteins along with vital bone and hemoglobin-building minerals.",
  },
  {
    icon: Apple,
    title: "Lower Gluten Content",
    desc: "Contains lower gluten loads compared to regular commercially processed hybrid wheat varieties.",
  },
];

export default function Benefits() {
  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Nutritional Value
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Nutritional Benefits of Samba Broken Wheat
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
            A nutrient-dense grain alternative that brings pure health and natural vitality back to your daily plate.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="bg-white p-6 rounded-xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 group"
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
