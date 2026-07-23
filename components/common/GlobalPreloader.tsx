"use client";

import { useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobalPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after initial load & minimum animation display time
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false);
      }, 900);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDF8F2] pointer-events-auto"
        >
          <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
            <DotLottieReact
              src="/assets/K67zZn97rq.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
