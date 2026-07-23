"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

const list = [
  {
    quote: "We have partnered with Sreelakshmi Agro as a distributor since 2018. Their parboiled Samba wheat maintains uniform grit sizing and zero dust, resulting in repeat consumer retail demand.",
    author: "R. K. Radhakrishnan",
    role: "MD, Radhakrishnan Wholesale Groceries",
    rating: 5,
  },
  {
    quote: "Our retail stores saw a marked increase in grain category purchases after introducing Samba Broken Wheat. The moisture-barrier double sealing holds freshness, keeping customer feedback excellent.",
    author: "Meenakshi Sundaram",
    role: "Category Manager, Green Grocery Stores",
    rating: 5,
  },
  {
    quote: "As a health-conscious family, Samba Broken Wheat has become our primary breakfast option. It cooks evenly, tastes organic and natural, and helps manage my daily glycemic levels.",
    author: "Sreejith Govindan",
    role: "Premium Retail Customer",
    rating: 5,
  },
];

interface TestimonialData {
  customer_name: string;
  designation: string;
  company: string;
  review: string;
  rating: number;
}

export default function Testimonials({ data }: { data?: TestimonialData[] }) {
  const displayList = data && data.length > 0 
    ? data.map(t => ({
        quote: t.review,
        author: t.customer_name,
        role: `${t.designation}${t.company ? `, ${t.company}` : ''}`,
        rating: t.rating
      }))
    : list;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % displayList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + displayList.length) % displayList.length);
  };

  return (
    <section className="py-24 bg-bg-secondary border-b border-border-light overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
          <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
            Client Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
            Trusted by Distributors & Customers
          </h2>
        </div>

        {/* Testimonial Slider Wrapper */}
        <div className="relative max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-border-light shadow-md min-h-[300px] flex flex-col justify-between">
          <Quote className="absolute right-8 top-8 w-16 h-16 text-brand-cream/35 pointer-events-none" />
          
          <div className="relative flex-grow">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col gap-5"
              >
                {/* Rating stars */}
                <div className="flex gap-1">
                  {Array.from({ length: displayList[index].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand-gold fill-brand-gold" />
                  ))}
                </div>

                <p className="font-serif text-lg md:text-xl text-text-primary leading-relaxed italic">
                  "{displayList[index].quote}"
                </p>

                <div className="flex flex-col mt-2">
                  <span className="font-sans text-base font-bold text-brand-primary">
                    {displayList[index].author}
                  </span>
                  <span className="font-sans text-xs text-text-secondary mt-0.5">
                    {displayList[index].role}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-end gap-3 mt-8 border-t border-border-light/60 pt-6">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-border-light bg-white hover:bg-bg-secondary text-text-secondary hover:text-brand-primary transition-colors shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-border-light bg-white hover:bg-bg-secondary text-text-secondary hover:text-brand-primary transition-colors shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
