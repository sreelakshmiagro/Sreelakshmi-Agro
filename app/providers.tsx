"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "@/components/admin/ui/Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="flex-grow flex flex-col"
      >
        {children}
        <ToastContainer />
      </motion.div>
    </AnimatePresence>
  );
}
