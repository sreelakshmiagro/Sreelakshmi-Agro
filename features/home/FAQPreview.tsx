"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What makes Samba Broken Wheat different from white rice?",
    a: "Samba Broken Wheat retains the fiber-rich bran and wheat germ layers which are removed in polished white rice. This grants 3x more dietary fiber, clean plant protein, and a lower Glycemic Index, facilitating steady blood sugar levels.",
  },
  {
    q: "Are your products free from preservatives and bleach?",
    a: "Yes. Sreelakshmi Agro Industries does not use chemical bleach, coloring agents, or synthetic preservatives. Freshness is maintained naturally using strict moisture controls and double-sealed packing structures.",
  },
  {
    q: "How can I apply for a regional distributorship?",
    a: "You can apply by filling out the Partner Questionnaire on our Become a Distributor page. Our sales team reviews credentials, state coverage, and order estimates to finalize stocking territories.",
  },
];

interface FAQData {
  question: string;
  answer: string;
}

export default function FAQPreview({ data }: { data?: FAQData[] }) {
  const displayFaqs = data && data.length > 0
    ? data.map(f => ({ q: f.question, a: f.answer }))
    : faqs;
    
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-4 flex flex-col gap-5 text-left">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Support Hub
              </span>
              <h2 className="font-serif text-3xl text-text-primary leading-tight">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          {/* Right Column: Accordion Grid */}
          <div className="lg:col-span-8 flex flex-col gap-4 w-full">
            {displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-text-primary group-hover:text-brand-primary">
                      {faq.q}
                    </span>
                    <div className="p-1 bg-bg-secondary rounded-full text-text-secondary">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-border-light/60 font-sans text-sm text-text-secondary leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
