"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sprout, Flame, Sparkles } from "lucide-react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", { opacity: 0, y: 15, duration: 0.6 })
        .from(".hero-headline", { opacity: 0, y: 25, duration: 0.8 }, "-=0.4")
        .from(".hero-desc", { opacity: 0, y: 15, duration: 0.6 }, "-=0.5")
        .from(".hero-btn", { opacity: 0, y: 15, duration: 0.5 }, "-=0.4")
        .from(".hero-right-visuals", { opacity: 0, scale: 0.98, duration: 0.8 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-80px)] flex items-center bg-[#FAF4EA] overflow-hidden pt-12 pb-12 lg:pt-16"
    >
      {/* Background Soft Blobs */}
      <div className="absolute inset-0 opacity-70 pointer-events-none select-none z-0">
        <div className="absolute top-[10%] right-[5%] w-[450px] lg:w-[650px] aspect-square rounded-full bg-[#FAF4EA] blur-[50px]" />
        <div className="absolute bottom-[20%] left-[-5%] w-[350px] aspect-square rounded-full bg-[#FAF4EA] blur-[60px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 w-full z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Heading and CTAs */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-6 text-left order-1">
            
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-1.5 bg-[#FAF4EA] text-[#8C5319] border border-[#EFE9E0] px-3.5 py-1.5 rounded-full w-max shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-[#DF9820]" />
              <span className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                100% Natural & Pure
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#38271D] font-black">
              Wholesome <br />
              <span className="text-[#38271D]">Nutrition</span> <br />
              <span className="font-cursive text-[#DF9820] font-normal normal-case relative inline-block mt-2 tracking-wide text-5xl sm:text-6xl">
                in Every Grain
              </span>
            </h1>

            {/* Description */}
            <p className="hero-desc font-sans text-sm sm:text-base text-[#70655F] leading-relaxed max-w-[340px] sm:max-w-[380px] lg:max-w-[345px] xl:max-w-[380px] pr-4">
              Sreelakshmi Samba Broken Wheat is naturally nutritious, rich in fiber and gently processed to retain its goodness for your family's health.
            </p>

            {/* CTAs */}
            <div className="hero-btn mt-2">
              <Link
                href="/products/samba-broken-wheat"
                className="bg-[#7E1A25] hover:bg-[#9D222B] text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-widest px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] w-max group"
              >
                <span>View Product</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Right Column: Overlay Composition (Image Backdrop + Floating Benefits Overlap) */}
          <div className="hero-right-visuals col-span-1 lg:col-span-7 relative flex flex-col items-center justify-center order-2 w-full max-w-[640px] lg:max-w-none mx-auto">
            
            {/* Blended Product Stack Backdrop */}
            <div className="relative w-full aspect-[4/3] rounded-3xl sm:rounded-[48px] overflow-hidden select-none shadow-[0_12px_40px_-12px_rgba(56,39,29,0.12)]">
              <Image
                src="/assets/hero_bg.png"
                alt="Sreelakshmi Samba Broken Wheat composition"
                fill
                className="object-cover object-[80%_center] lg:object-right"
                priority
                sizes="(max-width: 1024px) 100vw, 700px"
              />
              {/* Left Edge Fade: Blends image background into the page background */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#FAF4EA] to-transparent pointer-events-none z-10" />
            </div>

            {/* Overlapping Vertical Benefits List - Absolute on all screens */}
            <div className="absolute -left-2 xs:-left-4 sm:-left-6 md:-left-10 lg:-left-14 xl:-left-16 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 xs:gap-2 sm:gap-3 w-[145px] xs:w-[170px] sm:w-[240px] md:w-[260px] lg:w-[275px] text-left">
              
              {/* Benefit 1 */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#EFE9E0] rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3.5 flex gap-1.5 sm:gap-4 items-center shadow-[0_4px_15px_-4px_rgba(56,39,29,0.06)] hover:scale-[1.01] transition-transform duration-300">
                <div className="p-1 xs:p-1.5 sm:p-2.5 bg-[#FAF4EA] text-[#8C5319] rounded-full border border-[#EFE9E0] shrink-0">
                  <Sprout className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-serif text-[9px] xs:text-[10px] sm:text-[13px] font-bold text-[#38271D] leading-tight truncate">
                    High in Fiber
                  </h4>
                  <span className="font-sans text-[7px] xs:text-[8px] sm:text-[10px] text-[#70655F] leading-tight mt-0.5 truncate">
                    Vitamins & Minerals Lock
                  </span>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#EFE9E0] rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3.5 flex gap-1.5 sm:gap-4 items-center shadow-[0_4px_15px_-4px_rgba(56,39,29,0.06)] hover:scale-[1.01] transition-transform duration-300">
                <div className="p-1 xs:p-1.5 sm:p-2.5 bg-[#FAF4EA] text-[#8C5319] rounded-full border border-[#EFE9E0] shrink-0">
                  <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-serif text-[9px] xs:text-[10px] sm:text-[13px] font-bold text-[#38271D] leading-tight truncate">
                    Lower Glycemic Index
                  </h4>
                  <span className="font-sans text-[7px] xs:text-[8px] sm:text-[10px] text-[#70655F] leading-tight mt-0.5 truncate">
                    Ideal for Diabetes Patients
                  </span>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#EFE9E0] rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3.5 flex gap-1.5 sm:gap-4 items-center shadow-[0_4px_15px_-4px_rgba(56,39,29,0.06)] hover:scale-[1.01] transition-transform duration-300">
                <div className="p-1 xs:p-1.5 sm:p-2.5 bg-[#FAF4EA] text-[#8C5319] rounded-full border border-[#EFE9E0] shrink-0">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-serif text-[9px] xs:text-[10px] sm:text-[13px] font-bold text-[#38271D] leading-tight truncate">
                    Essential Protein
                  </h4>
                  <span className="font-sans text-[7px] xs:text-[8px] sm:text-[10px] text-[#70655F] leading-tight mt-0.5 truncate">
                    Iron & Calcium Source
                  </span>
                </div>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white/95 backdrop-blur-sm border border-[#EFE9E0] rounded-xl sm:rounded-2xl p-1.5 xs:p-2 sm:p-3.5 flex gap-1.5 sm:gap-4 items-center shadow-[0_4px_15px_-4px_rgba(56,39,29,0.06)] hover:scale-[1.01] transition-transform duration-300">
                <div className="p-1 xs:p-1.5 sm:p-2.5 bg-[#FAF4EA] text-[#8C5319] rounded-full border border-[#EFE9E0] shrink-0">
                  <Sprout className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-serif text-[9px] xs:text-[10px] sm:text-[13px] font-bold text-[#38271D] leading-tight truncate">
                    Lower Gluten Content
                  </h4>
                  <span className="font-sans text-[7px] xs:text-[8px] sm:text-[10px] text-[#70655F] leading-tight mt-0.5 truncate">
                    Compared to Regular Wheat
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
