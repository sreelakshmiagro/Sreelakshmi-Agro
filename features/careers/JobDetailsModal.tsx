"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Briefcase, DollarSign, Calendar, CheckSquare } from "lucide-react";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
  onApply: (jobId: string) => void;
}

export default function JobDetailsModal({ isOpen, onClose, job, onApply }: JobDetailsModalProps) {
  if (!job) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-2xl w-full max-w-2xl border border-border-light shadow-2xl overflow-hidden flex flex-col max-h-[85vh] relative z-55"
          >
            {/* Modal Header */}
            <div className="bg-bg-secondary border-b border-border-light p-6 flex justify-between items-start shrink-0">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-widest">
                  {job.department}
                </span>
                <h3 className="font-serif text-2xl font-bold text-text-primary">
                  {job.title}
                </h3>
                
                {/* Badges line */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-text-secondary mt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-border-light rounded-full transition-colors text-text-secondary hover:text-text-primary"
                aria-label="Close Job Details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 font-sans text-sm text-text-secondary leading-relaxed" data-lenis-prevent>
              
              {/* Job Description */}
              <div className="flex flex-col gap-2">
                <h4 className="font-serif text-base font-bold text-text-primary">Job Description</h4>
                <p>{job.description}</p>
              </div>

              {/* Requirements List */}
              <div className="flex flex-col gap-2">
                <h4 className="font-serif text-base font-bold text-text-primary">Key Requirements</h4>
                <ul className="flex flex-col gap-2">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckSquare className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits List */}
              <div className="flex flex-col gap-2">
                <h4 className="font-serif text-base font-bold text-text-primary">Benefits & Perks</h4>
                <ul className="flex flex-col gap-2">
                  {job.benefits.map((ben, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckSquare className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer (Action Panel) */}
            <div className="bg-bg-secondary border-t border-border-light p-6 flex gap-4 justify-end items-center shrink-0">
              <button
                onClick={onClose}
                className="border border-border-light bg-white hover:bg-bg-secondary text-text-secondary font-sans text-sm font-semibold px-6 py-2.5 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onApply(job.id);
                  onClose();
                }}
                className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-6 py-2.5 rounded transition-all duration-300 shadow"
              >
                Apply for this Position
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
