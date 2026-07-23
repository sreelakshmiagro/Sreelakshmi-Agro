"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

// Dynamically import DotLottieReact with SSR disabled to prevent WASM/Canvas hydration mismatches
const DotLottieReact = dynamic(
  () => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export function PreloaderUI() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-6">
      <div className="w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center">
        <DotLottieReact
          src="/assets/K67zZn97rq.lottie"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
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

  // Initial load duration
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRouteComplete = () => {
    if (!mounted) return;
    setTimeout(() => {
      setNavigating(false);
      setLoading(false);
    }, 600);
  };

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
      <Suspense fallback={null}>
        <NavigationEvents onNavigateComplete={handleRouteComplete} />
      </Suspense>

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

      {/* Full Screen Lottie Preloader overlay (Initial load & page transitions) */}
      <AnimatePresence>
        {(loading || navigating) && (
          <motion.div
            key="lottie-global-preloader"
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
