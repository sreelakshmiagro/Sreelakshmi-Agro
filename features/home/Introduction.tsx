"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Introduction() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative group"
          >
            {/* Soft background shape */}
            <div className="absolute -inset-4 bg-brand-cream/40 rounded-2xl -rotate-2 scale-98 transition-transform duration-500 group-hover:rotate-0 group-hover:scale-100" />
            
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-brand-cream/80 bg-bg-secondary">
              <Image
                src="/assets/Founder.jpeg"
                alt="Founder of Sreelakshmi Agro Industries"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
              />
            </div>
            
            {/* Visual signature overlay */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur px-5 py-3 rounded-lg border border-border-light shadow-md max-w-xs">
              <p className="font-serif text-sm font-bold text-brand-primary">Sreelakshmi Agro Industries</p>
              <p className="font-sans text-xs text-text-secondary mt-0.5">Est. 2011</p>
            </div>
          </motion.div>

          {/* Right Column: Story & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Our Legacy & Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
                Every step forward is a tribute to where we began.
              </h2>
            </div>

            <div className="font-sans text-text-secondary text-base leading-relaxed flex flex-col gap-4">
              <p>
                At Sreelakshmi Agro Industries, we believe that great achievements begin with a dream, are strengthened by vision, and are realized through dedication and hard work. Guided by the dream of our founder, Shri. T. A. Girishkumar, we have consistently aimed to provide high-quality, nutritious grain products while embracing modern food processing technologies.
              </p>
              <p>
                Following his untimely demise, his legacy continues under the leadership of his beloved wife Sajitha, whose commitment has helped the company grow from strength to strength, guided by the values of integrity, quality, and customer trust.
              </p>
            </div>

            {/* Founder's Quote Card */}
            <div className="relative bg-bg-secondary p-6 rounded-xl border border-brand-cream/70 mt-4 overflow-hidden">
              <Quote className="absolute right-6 top-6 w-16 h-16 text-brand-cream/30 pointer-events-none" />
              <p className="font-serif text-base italic text-text-primary leading-relaxed relative z-10">
                "To accomplish great things, we must not only act, but also dream; not only plan, but also believe."
              </p>
              <div className="mt-4 flex flex-col">
                <span className="font-sans text-sm font-bold text-brand-primary">Shri. T. A. Girishkumar</span>
                <span className="font-sans text-xs text-text-secondary mt-0.5">Late Founder, Sreelakshmi Agro Industries</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
