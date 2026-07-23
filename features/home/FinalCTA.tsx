"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, PhoneCall } from "lucide-react";
import { useDistributorModal } from "@/store/useDistributorModal";

export default function FinalCTA() {
  const openModal = useDistributorModal((state) => state.openModal);

  return (
    <section className="relative py-20 bg-brand-primary text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] rounded-full bg-brand-gold blur-[120px]" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] rounded-full bg-white blur-[100px]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Headline details */}
          <div className="flex flex-col gap-3 max-w-2xl text-center lg:text-left">
            <span className="font-sans text-xs font-bold uppercase tracking-widest text-brand-gold">
              Partner Grid Onboarding
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Ready to Distribute Samba Broken Wheat?
            </h2>
            <p className="font-sans text-white/80 text-sm sm:text-base leading-relaxed max-w-xl">
              Apply for exclusive stocking rights in your territory. Join a reliable supply framework that values premium processing.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button
              onClick={openModal}
              className="w-full sm:w-auto bg-white hover:bg-brand-cream text-brand-primary font-sans text-base font-semibold px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Become a Partner</span>
              <ArrowRight className="w-4 h-4 text-brand-primary" />
            </button>
            
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white hover:bg-white/10 text-white font-sans text-base font-semibold px-8 py-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white/15" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
