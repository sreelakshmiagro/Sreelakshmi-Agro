"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2011",
    title: "Company Foundation",
    desc: "Sreelakshmi Agro Industries was founded by T A Girishkumar with a focused mission to process pure, healthy grains.",
  },
  {
    year: "2014",
    title: "Milling Upgrades",
    desc: "Expanded facility size and installed automated gravity pre-cleaning lines to double operational sorting limits.",
  },
  {
    year: "2017",
    title: "Samba Broken Wheat Launch",
    desc: "Introduced our flagship storytelling broken wheat packaging, targeting premium health-centric consumer retail groups.",
  },
  {
    year: "2020",
    title: "Food Safety ISO Certification",
    desc: "Successfully achieved ISO 22000 and HACCP compliance certifications, implementing zero-touch automated packaging systems.",
  },
  {
    year: "2023",
    title: "500+ Distributor Landmark",
    desc: "Expanded our regional logistical networks, growing partnerships to over 500 active B2B distributors across states.",
  },
  {
    year: "2026",
    title: "Enterprise Modernization",
    desc: "Digital scaling, modernizing brand touchpoints, and layout expansion to prepare for upcoming organic agribusiness portfolios.",
  },
];

export default function Milestones() {
  return (
    <section className="py-20 bg-white border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Brand Growth
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Our Historic Milestones
          </h2>
          <p className="font-sans text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
            From a regional sorting unit to an audited agro-inputs and food processing manufacturer.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-brand-cream md:border-l-0 md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-[50%] md:before:w-[2px] md:before:bg-brand-cream max-w-4xl mx-auto flex flex-col gap-12 md:gap-16 pl-6 md:pl-0">
          {milestones.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-12 items-start md:items-center ${
                  isLeft ? "md:text-right" : "md:text-left"
                }`}
              >
                {/* Timeline node dot */}
                <div className="absolute left-[-31px] md:left-[50%] md:translate-x-[-50%] w-[12px] h-[12px] rounded-full bg-brand-gold border-2 border-white shadow-sm ring-4 ring-brand-cream/40 z-10" />

                {/* Left Side Container (for Even index items) */}
                <div className={`w-full ${isLeft ? "md:order-1" : "md:order-2"}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -35 : 35 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-bg-secondary p-6 rounded-xl border border-border-light shadow-sm flex flex-col gap-2 hover:border-brand-primary transition-colors"
                  >
                    <span className="font-serif text-2xl font-bold text-brand-primary">
                      {item.year}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-text-primary">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Empty column balance helper for desktop */}
                <div className={`hidden md:block w-full ${isLeft ? "md:order-2" : "md:order-1"}`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
