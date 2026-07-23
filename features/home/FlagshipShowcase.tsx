"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Award, Zap, Heart } from "lucide-react";

export default function FlagshipShowcase() {
  return (
    <section className="py-24 bg-white overflow-hidden border-b border-border-light">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Storytelling Pack */}
          <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
            {/* Visual shine behind package */}
            <div className="absolute inset-0 bg-radial-gradient from-brand-cream/40 via-transparent to-transparent scale-125 pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative w-[280px] sm:w-[340px] xl:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden border border-brand-cream/80 bg-white shadow-2xl transition-all duration-300"
            >
              <Image
                src="/assets/samba_wheat.png"
                alt="Samba Broken Wheat Flagship Package"
                fill
                className="object-contain p-5 sm:p-7"
                sizes="(max-width: 640px) 280px, (max-width: 1280px) 340px, 380px"
              />
            </motion.div>
            
            {/* Floating Quality Badge */}
            <div className="absolute top-[10%] right-[-10px] sm:right-[30px] bg-white border border-border-light shadow-lg px-4 py-3 rounded-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-gold shrink-0" />
              <div className="flex flex-col text-left">
                <span className="font-serif text-xs font-bold text-text-primary">100% Purity</span>
                <span className="font-sans text-[10px] text-text-secondary">Pesticide Free</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative and Specifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2"
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
                Our Flagship Product
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
                Samba Broken Wheat
              </h2>
            </div>

            <div className="font-sans text-text-secondary text-base leading-relaxed flex flex-col gap-4">
              <p>
                Samba Broken Wheat is a wholesome and nutritious cereal made from carefully selected whole samba wheat grains that are cleaned and coarsely broken to retain their natural goodness. Rich in dietary fiber, protein, vitamins, and essential minerals, it offers a healthy alternative to refined grains.
              </p>
              <p>
                Owing to its whole grain nature and higher fiber content, it generally has a lower glycemic response compared to refined cereals, helping in the gradual release of energy and supporting better blood sugar management, making it a great alternative of regular wheat for people with diabetes.
              </p>
            </div>

            {/* Visual checks grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-brand-primary/10 text-brand-primary rounded shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-text-primary">Fiber & Vitamins Lock</span>
                  <span className="font-sans text-xs text-text-secondary">High in natural fibers, vitamins and essential minerals</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-brand-primary/10 text-brand-primary rounded shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-text-primary">Lower Glycemic Index</span>
                  <span className="font-sans text-xs text-text-secondary">Gradual energy release, ideal for diabetes patients</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-brand-primary/10 text-brand-primary rounded shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-text-primary">Rich in Minerals</span>
                  <span className="font-sans text-xs text-text-secondary">Good source of plant protein, iron, and calcium</span>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-1 bg-brand-primary/10 text-brand-primary rounded shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-text-primary">Digestive Support</span>
                  <span className="font-sans text-xs text-text-secondary">Lower gluten content compared to regular wheat varieties</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-4 flex items-center gap-4">
              <Link
                href="/products/samba-broken-wheat"
                className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm sm:text-base font-semibold px-8 py-3.5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group hover:scale-[1.02] w-max"
              >
                <span>View Product Details</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
