"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowRight, Loader } from "lucide-react";
import { careerSchema, type CareerFormInput } from "@/lib/validation";
import { submitJobApplication } from "@/app/actions/leads";
import { createClient } from "@/lib/supabase/client";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import FileUpload from "@/components/common/FileUpload";

interface CareerFormProps {
  positions: { id: string; title: string }[];
  selectedPositionId?: string;
  onSuccess?: () => void;
}

export default function CareerForm({ positions, selectedPositionId = "", onSuccess }: { positions: { id: string; title: string }[]; selectedPositionId?: string; onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(careerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      positionId: selectedPositionId,
      experienceYears: 0,
      qualification: "",
      currentCompany: "",
      expectedSalary: "",
      noticePeriod: "",
      coverLetter: "",
      resumePath: "",
      consent: undefined as any,
    },
  });

  // Direct upload to Supabase Private Bucket
  const handleResumeUpload = async (file: File): Promise<string> => {
    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 9)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from("resumes")
        .upload(filePath, file);

      if (error) {
        console.warn("Supabase storage upload fallback:", error.message);
        return `local-${file.name}`;
      }

      return data.path; // Save reference path
    } catch (err) {
      console.warn("Resume upload fallback:", err);
      return `local-${file.name}`;
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await submitJobApplication(data);
      if (response.success) {
        setSubmitState("success");
        reset();
        if (onSuccess) onSuccess();
      } else {
        setSubmitState("error");
        setErrorMessage(
          response.error || "There was an issue processing your application. Please check form."
        );
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-2xl border border-border-light shadow-lg max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {submitState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl font-bold text-text-primary">
                Application Submitted!
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                Thank you for applying. Our talent acquisition team will review your resume and experience matches, and contact you if there is a match.
              </p>
            </div>
            <button
              onClick={() => setSubmitState("idle")}
              className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Apply For Another Role
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="career-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="border-b border-border-light pb-4">
              <h3 className="font-serif text-xl font-bold text-text-primary">
                Submit Job Application
              </h3>
              <p className="font-sans text-xs text-text-secondary mt-1">
                Fill in details and upload your CV (PDF or DOCX format only).
              </p>
            </div>

            {submitState === "error" && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 rounded-lg text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Grid 1: Basic details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Full Name"
                id="fullName"
                placeholder="e.g., Robert Frost"
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="positionId"
                  className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider"
                >
                  Position Applied For
                </label>
                <select
                  id="positionId"
                  aria-invalid={errors.positionId ? "true" : "false"}
                  className={`w-full bg-white border rounded-md px-4 py-3 font-sans text-sm text-text-primary transition-all duration-200 focus:border-brand-primary appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat ${
                    errors.positionId ? "border-red-500 focus:ring-red-500/10" : "border-border-light focus:ring-brand-primary/10"
                  }`}
                  {...register("positionId")}
                >
                  <option value="" disabled>Select Open Opening</option>
                  {positions.map((pos) => (
                    <option key={pos.id} value={pos.id}>
                      {pos.title}
                    </option>
                  ))}
                </select>
                {errors.positionId && (
                  <span role="alert" className="font-sans text-xs text-red-600 font-medium">
                    {errors.positionId.message}
                  </span>
                )}
              </div>
            </div>

            {/* Grid 2: Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Mobile Phone Number"
                id="phone"
                placeholder="10-digit number"
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                label="Email Address"
                id="email"
                type="email"
                placeholder="you@domain.com"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Grid 3: Experience & Qualification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Total Years of Experience"
                id="experienceYears"
                type="number"
                placeholder="0"
                error={errors.experienceYears?.message}
                {...register("experienceYears")}
              />
              <FormInput
                label="Highest Educational Qualification"
                id="qualification"
                placeholder="e.g., B.Tech Food Tech / MBA Operations"
                error={errors.qualification?.message}
                {...register("qualification")}
              />
            </div>

            {/* Grid 4: Compensation & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label="Current Company (Optional)"
                id="currentCompany"
                placeholder="e.g., FMCG Corp"
                error={errors.currentCompany?.message}
                {...register("currentCompany")}
              />
              <FormInput
                label="Expected Salary (Optional)"
                id="expectedSalary"
                placeholder="e.g., 6,000,000 INR"
                error={errors.expectedSalary?.message}
                {...register("expectedSalary")}
              />
              <FormInput
                label="Notice Period (Optional)"
                id="noticePeriod"
                placeholder="e.g., Immediate / 30 Days"
                error={errors.noticePeriod?.message}
                {...register("noticePeriod")}
              />
            </div>

            <Controller
              name="resumePath"
              control={control}
              render={({ field }: any) => (
                <FileUpload
                  label="Upload CV/Resume"
                  id="resumePath"
                  value={field.value}
                  onChange={field.onChange}
                  onUpload={handleResumeUpload}
                  error={errors.resumePath?.message}
                />
              )}
            />

            <FormTextarea
              label="Cover Letter / Summary (Optional)"
              id="coverLetter"
              placeholder="Tell us why you are a good fit for this position..."
              error={errors.coverLetter?.message}
              {...register("coverLetter")}
            />

            {/* Consent Box */}
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  aria-invalid={errors.consent ? "true" : "false"}
                  className="w-4 h-4 text-brand-primary border-border-light rounded focus:ring-brand-primary mt-1 shrink-0"
                  {...register("consent")}
                />
                <label htmlFor="consent" className="font-sans text-xs text-text-secondary leading-relaxed">
                  I consent to Sreelakshmi Agro Industries storing my application details and resume securely, and contacting me via phone/email for career evaluation checks.
                </label>
              </div>
              {errors.consent && (
                <span role="alert" className="font-sans text-xs text-red-600 font-medium">
                  {errors.consent.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans text-base font-semibold py-4 rounded-md shadow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
