"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
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
        
        {/* Brand Logo inside center */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.9, 1.05, 0.9], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-16 h-16 sm:w-20 sm:h-20 relative flex items-center justify-center"
        >
          <Image
            src="/assets/Sreelakshmiagro logo.png"
            alt="Sreelakshmi Agro"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </motion.div>
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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial load duration
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Hide loader on route change complete
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, mounted]);

  // Intercept internal link clicks to trigger loader instantly
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href) {
        const targetUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // If internal link to a different path/query
        if (
          targetUrl.origin === currentUrl.origin &&
          (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search) &&
          !anchor.target &&
          !e.ctrlKey &&
          !e.metaKey
        ) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => document.removeEventListener("click", handleAnchorClick, { capture: true });
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="classic-global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF8F2] pointer-events-auto"
        >
          <PreloaderUI />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
