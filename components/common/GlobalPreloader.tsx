"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function PreloaderUI() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-6">
      {/* Spinning Brand Ring */}
      <div className="relative flex items-center justify-center w-28 h-28 sm:w-36 sm:h-36">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#DF9820] opacity-60"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute inset-2 rounded-full border border-dotted border-[#7E1A25] opacity-40"
        />
        
        {/* Static Brand Logo inside center */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center opacity-100 scale-100">
          <Image
            src="/assets/Sreelakshmiagro logo.png"
            alt="Sreelakshmi Agro"
            width={80}
            height={80}
            className="object-contain opacity-100"
            priority
          />
        </div>
      </div>

      {/* Typography & Pulsing Loading Bar */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#7E1A25]">
          SREELAKSHMI AGRO
        </span>
        <div className="w-32 h-1 bg-[#EFE9E0] rounded-full overflow-hidden relative">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            className="w-full h-full bg-[#DF9820] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default function GlobalPreloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initial load duration (0.7 second) - only on initial site visit/refresh
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="initial-logo-preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF8F2] pointer-events-none"
      >
        <PreloaderUI />
      </motion.div>
    </AnimatePresence>
  );
}
