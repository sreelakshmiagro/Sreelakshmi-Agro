"use client";

import { useState, useEffect, Suspense } from "react";
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

function NavigationEvents({ onNavigateComplete }: { onNavigateComplete: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onNavigateComplete();
  }, [pathname, searchParams, onNavigateComplete]);

  return null;
}

export default function GlobalPreloader() {
  const [loading, setLoading] = useState(true);
  const [navigating, setNavigating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initial load duration (1.0 second)
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRouteComplete = () => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      setNavigating(false);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  };

  // Listen to link clicks without blocking touch/scroll event propagation
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
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
            !e.ctrlKey &&
            !e.metaKey
          ) {
            setTimeout(() => {
              setNavigating(true);
            }, 0);
          }
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener("click", handleLinkClick, { passive: true });
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Suspense fallback={null}>
        <NavigationEvents onNavigateComplete={handleRouteComplete} />
      </Suspense>

      {/* Full Screen Classic Logo Preloader Overlay - pointer-events-none ensures scroll is never blocked */}
      <AnimatePresence>
        {(loading || navigating) && (
          <motion.div
            key="classic-logo-preloader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF8F2] pointer-events-none"
          >
            <PreloaderUI />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
