"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useDistributorModal } from "@/store/useDistributorModal";
import BecomeDistributorForm from "@/features/distributor/BecomeDistributorForm";
import { createClient } from "@/lib/supabase/client";

export default function DistributorModal() {
  const { isOpen, closeModal } = useDistributorModal();
  const [formConfig, setFormConfig] = useState<any>(null);

  // Fetch latest distributor form configuration when modal opens
  useEffect(() => {
    if (isOpen) {
      const supabase = createClient();
      supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "form_distributor_config")
        .single()
        .then(({ data }) => {
          if (data?.setting_value) {
            try {
              setFormConfig(JSON.parse(data.setting_value));
            } catch (e) {
              console.error("Failed to parse distributor form config:", e);
            }
          }
        });
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          {/* Backdrop click closer */}
          <div className="absolute inset-0" onClick={closeModal} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            data-lenis-prevent
            className="relative bg-white rounded-2xl w-full max-w-2xl border border-border-light shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
          >
            {/* Top close bar */}
            <div className="absolute top-6 right-6 z-20">
              <button
                onClick={closeModal}
                className="p-2 hover:bg-bg-secondary rounded-full transition-colors text-text-secondary hover:text-text-primary focus:outline-none"
                aria-label="Close distributor form"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Area */}
            <div className="overflow-y-auto p-1.5" data-lenis-prevent>
              <BecomeDistributorForm formConfig={formConfig} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
