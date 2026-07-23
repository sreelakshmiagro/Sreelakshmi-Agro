"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ArrowRight } from "lucide-react";
import JobDetailsModal from "./JobDetailsModal";
import CareerForm from "./CareerForm";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

const mockJobs: Job[] = [
  {
    id: "4a737f2d-8b01-4c4f-bf11-97b77e8a1d5a",
    title: "Senior Food Technologist",
    department: "Research & Development",
    location: "Harvest Valley Facility (On-site)",
    type: "Full-Time",
    experience: "4 - 6 Years",
    description: "We are seeking an experienced Food Technologist to lead quality parboiling audits, grain grading, and dynamic processing research for organic crop input derivatives and wheat portfolios.",
    requirements: [
      "B.Tech / M.Tech in Food Technology or agricultural engineering.",
      "Thorough understanding of ISO 22000 and HACCP food safety standards.",
      "Experience auditing milling parameters and grain moisture thresholds."
    ],
    benefits: [
      "Competitive annual compensation package.",
      "Comprehensive medical safety insurances.",
      "Direct exposure to automated parboiling technologies."
    ]
  },
  {
    id: "8c7a6e11-d009-411a-8cfa-555e7fa82f3a",
    title: "FMCG Area Sales Manager",
    department: "Business Development",
    location: "State HQ (Regional / Hybrid)",
    type: "Full-Time",
    experience: "5 - 8 Years",
    description: "Looking for a dynamic field manager to lead our regional distributor expansion, manage stockist allocations, and grow retail chain footprints.",
    requirements: [
      "MBA in Marketing or equivalent commercial degree.",
      "Proven network connections with state FMCG stockists and supermarkets.",
      "Strong negotiation, billing, and regional logistics coordination skills."
    ],
    benefits: [
      "Performance-linked sales incentives.",
      "Travel allowance and communication supports.",
      "Accelerated corporate promotion tracks."
    ]
  },
  {
    id: "1f9e8a77-bf01-447a-9cb8-66cf7da8d5e0",
    title: "Warehouse & Logistics Supervisor",
    department: "Operations",
    location: "Main Silos Complex (On-site)",
    type: "Full-Time",
    experience: "2 - 4 Years",
    description: "Manage packaging floors, maintain dynamic inventory ledgers, audit dispatch trucks, and secure grain raw inputs storage conditions.",
    requirements: [
      "Bachelor's degree in logistics, supply chain, or management.",
      "Proficient in inventory software database controls.",
      "Experience leading warehouse loading teams and safety guidelines."
    ],
    benefits: [
      "Standard paid leave benefits.",
      "Overtime work bonus options.",
      "Safe and certified manufacturing workspace."
    ]
  }
];

export default function CareersPortal({ jobs }: { jobs?: any[] }) {
  const displayJobs = jobs && jobs.length > 0
    ? jobs.map(j => ({
        id: j.id,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.employment_type || j.type,
        experience: j.experience,
        description: j.description,
        requirements: j.requirements || [],
        benefits: j.benefits || []
      }))
    : mockJobs;
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formPositionId, setFormPositionId] = useState("");

  const handleApply = (jobId: string) => {
    setFormPositionId(jobId);
    // Smooth scroll to application form anchor
    const formElement = document.getElementById("application-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-16">
      
      {/* Grid of Positions */}
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div className="border-b border-border-light pb-4">
          <h2 className="font-serif text-2xl font-bold text-text-primary">
            Active Job Openings
          </h2>
          <p className="font-sans text-sm text-text-secondary mt-1">
            Choose a position to view requirements and apply.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {displayJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -2 }}
              className="bg-white p-6 rounded-xl border border-border-light shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-primary transition-colors group"
            >
              <div className="flex flex-col gap-2">
                <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider">
                  {job.department}
                </span>
                <h3 className="font-serif text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                  {job.title}
                </h3>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-text-secondary">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{job.experience}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setIsModalOpen(true);
                  }}
                  className="w-full sm:w-auto text-center border border-border-light hover:border-brand-primary text-text-secondary hover:text-brand-primary font-sans text-sm font-semibold px-5 py-2.5 rounded transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApply(job.id)}
                  className="w-full sm:w-auto text-center bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-5 py-2.5 rounded shadow transition-all duration-300 flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dynamic Popups */}
      <JobDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
        onApply={handleApply}
      />

      {/* Application Form fold */}
      <div id="application-form" className="scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-3 mb-10">
          <h2 className="font-serif text-2xl font-bold text-text-primary">
            Career Onboarding Questionnaire
          </h2>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            Please fill out the following profile. Make sure to attach your current resume.
          </p>
        </div>

        <CareerForm
          positions={displayJobs.map((j) => ({ id: j.id, title: j.title }))}
          selectedPositionId={formPositionId}
        />
      </div>

    </div>
  );
}
