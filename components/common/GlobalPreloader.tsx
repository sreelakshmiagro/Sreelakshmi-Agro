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
  const [navigating, setNavigating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initial load duration
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // When pathname or searchParams change, hold preloader for 600ms minimum transition
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setNavigating(false);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [pathname, searchParams, mounted]);

  // Intercept history.pushState and replaceState to catch Next.js router transitions instantly
  useEffect(() => {
    const originalPushState = window.history.pushState.bind(window.history);
    const originalReplaceState = window.history.replaceState.bind(window.history);

    window.history.pushState = function (...args) {
      setNavigating(true);
      return originalPushState(...args);
    };

    window.history.replaceState = function (...args) {
      setNavigating(true);
      return originalReplaceState(...args);
    };

    return () => {
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  // Intercept pointerdown and click events on internal links (instant 0ms trigger)
  useEffect(() => {
    const handleStartNavigation = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a");

      if (anchor && anchor.href) {
        try {
          const targetUrl = new URL(anchor.href, window.location.href);
          const currentUrl = new URL(window.location.href);

          if (
            targetUrl.origin === currentUrl.origin &&
            (targetUrl.pathname !== currentUrl.pathname || targetUrl.search !== currentUrl.search) &&
            !anchor.target &&
            !(e as MouseEvent).ctrlKey &&
            !(e as MouseEvent).metaKey
          ) {
            setNavigating(true);
          }
        } catch {
          // ignore invalid URLs
        }
      }
    };

    document.addEventListener("pointerdown", handleStartNavigation, { capture: true, passive: true });
    document.addEventListener("click", handleStartNavigation, { capture: true, passive: true });

    return () => {
      document.removeEventListener("pointerdown", handleStartNavigation, { capture: true });
      document.removeEventListener("click", handleStartNavigation, { capture: true });
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Top Progress Bar for Instant Touch/Click Nav Indicator */}
      <AnimatePresence>
        {navigating && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 0.8 }}
            exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "0%" }}
            className="fixed top-0 left-0 right-0 h-1.5 bg-[#DF9820] z-[100000] shadow-[0_0_10px_#DF9820]"
          />
        )}
      </AnimatePresence>

      {/* Full Screen Brand Preloader overlay (Initial load & page transitions) */}
      <AnimatePresence>
        {(loading || navigating) && (
          <motion.div
            key="classic-global-preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF8F2] pointer-events-auto"
          >
            <PreloaderUI />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
