"use client";

import { motion } from "framer-motion";
import { Target, Compass, CheckCircle } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Card 1: Our Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-bg-secondary p-8 md:p-10 rounded-2xl border border-brand-cream/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-6 relative group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cream/10 rounded-bl-[100px] pointer-events-none group-hover:bg-brand-cream/20 transition-colors" />
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-primary">Our Mission</h3>
            </div>
            
            <p className="font-sans text-text-secondary text-base leading-relaxed">
              To supply premium, naturally rich food inputs to households and commercial bakeries by combining strict hygiene compliance with authentic processing values, ensuring absolute customer satisfaction.
            </p>
            
            <ul className="flex flex-col gap-3 font-sans text-sm text-text-secondary mt-2">
              <li className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% natural processing without preservatives</span>
              </li>
              <li className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Upholding fair trade and ethical partnerships</span>
              </li>
              <li className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Innovating processing systems to maximize nutrition</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: Our Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="bg-bg-secondary p-8 md:p-10 rounded-2xl border border-brand-cream/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-6 relative group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cream/10 rounded-bl-[100px] pointer-events-none group-hover:bg-brand-cream/20 transition-colors" />

            <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-gold/10 text-brand-wheat rounded-xl shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-text-primary">Our Vision</h3>
            </div>

            <p className="font-sans text-text-secondary text-base leading-relaxed">
              To establish Sreelakshmi Agro Industries as a leading national brand in healthy whole grains and organic agribusiness, recognized globally for agricultural innovation, processing excellence, and sustainability.
            </p>

            <ul className="flex flex-col gap-3 font-sans text-sm text-text-secondary mt-2">
              <li className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-brand-wheat shrink-0" />
                <span>Expanding dynamic distributor models nationwide</span>
              </li>
              <li className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-brand-wheat shrink-0" />
                <span>Setting benchmark standards for grain processing purity</span>
              </li>
              <li className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-brand-wheat shrink-0" />
                <span>Empowering farmers with modern agro-input frameworks</span>
              </li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
