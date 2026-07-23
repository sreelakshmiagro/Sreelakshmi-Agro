"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger";
import { AlertOctagon, RotateCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the unhandled client-side runtime error
    logger.error("Global Error boundary triggered", error);
  }, [error]);

  return (
    <div className="bg-bg-secondary min-h-[75vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl border border-border-light shadow-lg max-w-md w-full text-center flex flex-col items-center gap-6">
        
        {/* Error icon badge */}
        <div className="w-16 h-16 rounded-full bg-brand-primary/5 text-brand-primary flex items-center justify-center">
          <AlertOctagon className="w-9 h-9" />
        </div>

        {/* Content details */}
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[11px] font-bold text-brand-primary uppercase tracking-widest">
            System Alert
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-text-primary">
            Something Went Wrong
          </h2>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            An unexpected error occurred during rendering. Our monitoring systems have logged this incident.
          </p>
        </div>

        {/* Action button to attempt reset */}
        <button
          onClick={() => reset()}
          className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold py-3.5 rounded-md shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

      </div>
    </div>
  );
}
