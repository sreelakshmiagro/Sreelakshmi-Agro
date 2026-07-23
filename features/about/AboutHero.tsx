"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { gsap } from "gsap";

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".about-hero-sub", { opacity: 0, y: 15, duration: 0.6 })
        .from(".about-hero-title", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".about-hero-desc", { opacity: 0, y: 20, duration: 0.6 }, "-=0.5")
        .from(".about-hero-ctas", { opacity: 0, y: 15, duration: 0.5 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-gradient-to-b from-bg-secondary via-white to-white overflow-hidden py-16 md:py-24 border-b border-border-light"
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-45 pointer-events-none select-none">
        <div className="absolute top-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-brand-cream/50 blur-[90px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-cream/40 blur-[85px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 w-full text-center relative z-10">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 items-center">
          
          <div className="about-hero-sub inline-flex items-center gap-1.5 bg-brand-primary/5 text-brand-primary border border-brand-primary/10 px-4 py-1.5 rounded-full">
            <span className="font-sans text-xs font-bold uppercase tracking-widest">
              Our Journey Since 2011
            </span>
          </div>

          <h1 className="about-hero-title font-serif text-4xl sm:text-5xl md:text-6xl text-text-primary leading-[1.1] tracking-tight">
            Nourishing Communities <br />
            With <span className="text-brand-primary">Traditional Integrity</span>
          </h1>

          <p className="about-hero-desc font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            Sreelakshmi Agro Industries was founded with a singular commitment—to bridge traditional agricultural purity with state-of-the-art manufacturing processes. Learn about the standards guiding our brand.
          </p>

          <div className="about-hero-ctas flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link
              href="/distributor"
              className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm sm:text-base font-semibold px-8 py-3.5 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group hover:scale-[1.02]"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact"
              className="bg-white border border-border-light hover:border-brand-primary text-text-secondary hover:text-brand-primary font-sans text-sm sm:text-base font-semibold px-8 py-3.5 rounded-md transition-all duration-300 flex items-center gap-2 shadow-sm hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Us</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
