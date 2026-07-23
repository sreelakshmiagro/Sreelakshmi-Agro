"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Leaf, Quote } from "lucide-react";

const principles = [
  {
    icon: ShieldCheck,
    title: "Quality Without Compromise",
    desc: "Every grain processed in our facility undergoes strict grading and quality tests before reaching the market.",
  },
  {
    icon: Leaf,
    title: "Natural Nutrition Heritage",
    desc: "We focus on preserving the high-fibre and nutrient-dense profiles of grains using natural processing methods.",
  },
  {
    icon: Award,
    title: "Honesty & Trust",
    desc: "Building reliable, long-term B2B and customer relationships through transparent business ethics.",
  },
];

export default function FounderProfile() {
  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Photo Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Elegant double border offset effect */}
            <div className="absolute top-4 left-4 right-[-16px] bottom-[-16px] border-2 border-brand-primary/20 rounded-xl pointer-events-none" />
            <div className="absolute top-[-12px] left-[-12px] w-24 h-24 border-t-2 border-l-2 border-brand-gold pointer-events-none" />
            
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl bg-white border border-brand-cream/80">
              <Image
                src="/assets/Founder.jpeg"
                alt="T A Girishkumar, Founder and Managing Director of Sreelakshmi Agro Industries"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
              />
            </div>

            {/* Float Badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-lg border border-border-light shadow-lg">
              <p className="font-serif text-lg font-bold text-text-primary">Shri. T. A. Girishkumar</p>
              <p className="font-sans text-xs font-semibold text-brand-primary uppercase tracking-wider mt-0.5">
                Our Beloved Founder
              </p>
            </div>
          </motion.div>

          {/* Right Column: Founder Vision & Core Philosophies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Our Legacy & Leadership
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
                Embracing the Founder's Dream
              </h2>
            </div>

            {/* Short Bio */}
            <div className="font-sans text-text-secondary text-base leading-relaxed flex flex-col gap-4">
              <p>
                Our founder, <strong>Shri. T. A. Girishkumar</strong>, was a true dreamer and believer. His vision gave birth to Sreelakshmi Agro Industries with the aim of providing high-quality, nutritious grain products while embracing modern food processing technologies. Following his untimely demise, his legacy continues through the dedicated leadership of his beloved wife <strong>Sajitha</strong>, whose unwavering commitment and perseverance have helped the company grow from strength to strength.
              </p>
            </div>

            {/* Stylized Quote Panel */}
            <div className="relative border-l-4 border-brand-primary pl-6 my-4">
              <Quote className="absolute right-0 top-0 w-12 h-12 text-brand-primary/5 pointer-events-none" />
              <p className="font-serif text-lg italic text-text-primary leading-relaxed relative z-10">
                "To accomplish great things, we must not only act, but also dream; not only plan, but also believe."
              </p>
            </div>

            {/* Core Leadership Principles */}
            <div className="flex flex-col gap-4 mt-2">
              <h3 className="font-serif text-xl text-text-primary font-semibold">
                Our Core Philosophies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {principles.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex gap-4 items-start group">
                      <div className="p-2.5 bg-white rounded-lg border border-border-light text-brand-primary shadow-sm transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-serif text-base font-semibold text-text-primary">
                          {item.title}
                        </h4>
                        <p className="font-sans text-sm text-text-secondary leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
