"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Our Genesis & Inspiration
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
                Crafting Wellness Through Pure Food Processing
              </h2>
            </div>

            <div className="font-sans text-text-secondary text-base leading-relaxed flex flex-col gap-4">
              <p>
                At Sreelakshmi Agro Industries, we believe that great achievements begin with a dream, are strengthened by vision, and are realized through dedication and hard work.
              </p>
              <p>
                Inspired by the words, "To accomplish great things, we must not only act, but also dream; not only plan, but also believe," our founder, Shri. T. A. Girishkumar, was a true dreamer and believer. His vision gave birth to Sreelakshmi Agro Industries with the aim of providing high-quality, nutritious grain products while embracing modern food processing technologies.
              </p>
              <p>
                From its inception, the company has been committed to maintaining the perfect balance between technological advancement and traditional goodness. By adopting advanced processing and hygienic packaging practices, we ensure that every product reaches consumers with its natural taste, nutritional value, and uncompromised quality intact.
              </p>
              <p>
                Following the untimely demise of our founder, his legacy continues through the dedicated leadership of his beloved wife Sajitha, whose unwavering commitment and perseverance have helped the company grow from strength to strength. Guided by the same values of integrity, quality, and customer trust, she continues to lead the organization toward new milestones.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Visual Product Showcase Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Visual offset frame */}
            <div className="absolute -inset-4 bg-brand-cream/30 rounded-2xl rotate-2 pointer-events-none" />
            
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-border-light bg-bg-secondary group">
              <Image
                src="/assets/premium_samba_wheat.jpg"
                alt="Sreelakshmi Agro Premium Samba Wheat Grains"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-103"
                sizes="(max-width: 640px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
