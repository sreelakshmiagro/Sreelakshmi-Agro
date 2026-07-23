"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, CheckCircle2, RefreshCw, BarChart2 } from "lucide-react";

const reasons = [
  {
    title: "Premium Raw Selection",
    desc: "We exclusively purchase premium crop harvests with uniform grain density and zero pesticide residues.",
  },
  {
    title: "Zero Human Contact",
    desc: "Our automated packing and sorting floor minimizes organic contamination risks, guaranteeing pure hygiene.",
  },
  {
    title: "Reliable B2B Deliveries",
    desc: "A highly coordinated logistic framework ensures on-time bulk shipments and distributor support.",
  },
];

const metrics = [
  { label: "Maximum Moisture Limit", value: "< 11.5%", note: "Prevents organic infestation & maintains shelf life" },
  { label: "Foreign Particles", value: "0.0%", note: "Absolute zero dust, mud, or stone contaminants" },
  { label: "Grit Size Uniformity", value: "> 98%", note: "Ensures even cooking times and perfect culinary texture" },
  { label: "Packaging Barrier", value: "Double Seal", note: "Moisture and aroma protection lock" },
];

export default function QualityCommitment() {
  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section 1: Why Choose Us */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Brand Integrity
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
              Why Partner with Sreelakshmi Agro?
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
              We stand apart through our commitment to grain purity, logistical efficiency, and technical processing precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reasons.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
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

        {/* Section 2: Quality Commitment & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-t border-border-light/60 pt-20">
          
          {/* Left Column: Text narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Hygiene Auditing
              </span>
              <h2 className="font-serif text-3xl text-text-primary leading-tight">
                Our Guarantee of Safety & Consistency
              </h2>
            </div>
            
            <div className="font-sans text-text-secondary text-base leading-relaxed flex flex-col gap-4">
              <p>
                Sreelakshmi Agro Industries complies with international hygiene and processing benchmarks. Our quality assurance team executes routine batch audits at every operational stage—from the analysis of raw incoming wheat shipments to final package sealing.
              </p>
              <p>
                Our standards protect the grain from dust, humidity, and trace contamination, ensuring that the package delivered to the consumer is as pure as nature intended.
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2 bg-white px-5 py-4 rounded-xl border border-border-light shadow-sm w-max">
              <ShieldCheck className="w-8 h-8 text-brand-primary shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-text-primary">ISO 22000 & HACCP Compliant</span>
                <span className="font-sans text-xs text-text-secondary">Audited Food Manufacturing Facility</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Specs Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metrics.map((item, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
                  className="bg-white p-6 rounded-xl border border-border-light shadow-sm flex flex-col gap-3 group hover:border-brand-gold transition-colors"
                >
                  <span className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="font-serif text-3xl font-extrabold text-brand-primary group-hover:text-brand-gold transition-colors">
                    {item.value}
                  </span>
                  <span className="font-sans text-xs text-text-secondary leading-relaxed border-t border-border-light/60 pt-2">
                    {item.note}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
