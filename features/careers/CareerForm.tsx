"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowRight, Loader } from "lucide-react";
import { careerSchema, type CareerFormInput } from "@/lib/validation";
import { submitJobApplication } from "@/app/actions/leads";
import { createClient } from "@/lib/supabase/client";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import FormTextarea from "@/components/common/FormTextarea";
import FileUpload from "@/components/common/FileUpload";
import { useToast } from "@/components/admin/ui/Toast";

interface CareerFormProps {
  positions: { id: string; title: string }[];
  selectedPositionId?: string;
  onSuccess?: () => void;
  formConfig?: any;
}

const KNOWN_CAREER_KEYS = [
  "fullName", "positionId", "positionApplied", "phone", "email",
  "experienceYears", "qualification", "currentCompany", "expectedSalary",
  "noticePeriod", "resumeUpload", "resumePath", "coverLetter", "consent"
];

export default function CareerForm({ positions, selectedPositionId = "", onSuccess, formConfig: propFormConfig }: CareerFormProps) {
  const [clientConfig, setClientConfig] = useState<any>(null);

  useEffect(() => {
    if (!propFormConfig) {
      const supabase = createClient();
      supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "form_careers_config")
        .single()
        .then(({ data }) => {
          if (data?.setting_value) {
            try {
              setClientConfig(JSON.parse(data.setting_value));
            } catch (e) {}
          }
        });
    }
  }, [propFormConfig]);

  const cfg = propFormConfig || clientConfig || {
    title: "Submit Job Application",
    subtitle: "Fill in details and upload your CV (PDF or DOCX format only).",
    buttonText: "Submit Application",
    successMessage: "Thank you for applying. Our talent acquisition team will review your resume and experience matches, and contact you if there is a match.",
    fields: {
      fullName: { label: "FULL NAME", placeholder: "e.g., Robert Frost" },
      positionApplied: { label: "POSITION APPLIED FOR", placeholder: "Select Open Opening" },
      phone: { label: "MOBILE PHONE NUMBER", placeholder: "10-digit number" },
      email: { label: "EMAIL ADDRESS", placeholder: "you@domain.com" },
      experienceYears: { label: "TOTAL YEARS OF EXPERIENCE", placeholder: "0" },
      qualification: { label: "HIGHEST EDUCATIONAL QUALIFICATION", placeholder: "e.g., B.Tech Food Tech / MBA Operations" },
      currentCompany: { label: "CURRENT COMPANY (OPTIONAL)", placeholder: "e.g., FMCG Corp" },
      expectedSalary: { label: "EXPECTED SALARY (OPTIONAL)", placeholder: "e.g., 6,000,000 INR" },
      noticePeriod: { label: "NOTICE PERIOD (OPTIONAL)", placeholder: "e.g., Immediate / 30 Days" },
      resumeUpload: { label: "UPLOAD CV/RESUME", placeholder: "Drag & drop file or browse" },
      coverLetter: { label: "COVER LETTER / SUMMARY (OPTIONAL)", placeholder: "Tell us why you are a good fit for this position..." }
    }
  };

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

  // Position options combining DB active jobs + Admin configured dropdown options
  const configuredPositionOptions = cfg.fields?.positionApplied?.options || [];
  const displayPositions = positions && positions.length > 0
    ? positions
    : (configuredPositionOptions.length > 0 ? configuredPositionOptions.map((title: string) => ({ id: title, title })) : []);

  // Direct upload to Supabase Bucket or Base64 binary PDF fallback
  const handleResumeUpload = async (file: File): Promise<string> => {
    // 1. Convert file to Base64 Data URL first so binary content is 100% captured
    const base64Data: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop() || "pdf";
      const fileName = `${Math.random().toString(36).substring(2, 9)}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      // Upload to 'resumes' or 'media' bucket
      const { data, error } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (!error && data?.path) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://fsyqsenggdudvddekoij.supabase.co";
        return `${supabaseUrl}/storage/v1/object/public/resumes/${data.path}`;
      }

      console.warn("Storage upload warning, using Base64 PDF binary fallback:", error?.message);
    } catch (err) {
      console.warn("Resume upload error, using Base64 PDF binary fallback:", err);
    }

    // Always fallback to complete Base64 Data URL containing the exact file binary
    return base64Data;
  };

  const toast = useToast();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await submitJobApplication(data);
      if (response.success) {
        setSubmitState("success");
        toast.success("Job Application Submitted!", "Thank you for applying. Our HR team will evaluate your profile.");
        reset();
        if (onSuccess) onSuccess();
      } else {
        setSubmitState("error");
        const msg = response.error || "There was an issue processing your application. Please check form.";
        setErrorMessage(msg);
        toast.error("Application Submission Failed", msg);
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
      toast.error("Application Error", "An unexpected error occurred. Please try again.");
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
                {cfg.successMessage || "Thank you for applying. Our talent acquisition team will review your resume and experience matches, and contact you if there is a match."}
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
                {cfg.title || "Submit Job Application"}
              </h3>
              <p className="font-sans text-xs text-text-secondary mt-1">
                {cfg.subtitle || "Fill in details and upload your CV (PDF or DOCX format only)."}
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
                label={cfg.fields?.fullName?.label || "Full Name"}
                id="fullName"
                placeholder={cfg.fields?.fullName?.placeholder || "e.g., Robert Frost"}
                error={errors.fullName?.message}
                {...register("fullName")}
              />
              <div className="flex flex-col gap-1.5 w-full">
                <label
                  htmlFor="positionId"
                  className="font-sans text-xs font-semibold text-text-secondary uppercase tracking-wider"
                >
                  {cfg.fields?.positionApplied?.label || "Position Applied For"}
                </label>
                <select
                  id="positionId"
                  aria-invalid={errors.positionId ? "true" : "false"}
                  className={`w-full bg-white border rounded-md px-4 py-3 font-sans text-sm text-text-primary transition-all duration-200 focus:border-brand-primary appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat ${
                    errors.positionId ? "border-red-500 focus:ring-red-500/10" : "border-border-light focus:ring-brand-primary/10"
                  }`}
                  {...register("positionId")}
                >
                  <option value="" disabled>{cfg.fields?.positionApplied?.placeholder || "Select Open Opening"}</option>
                  {displayPositions.map((pos: any) => (
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
                label={cfg.fields?.phone?.label || "Mobile Phone Number"}
                id="phone"
                placeholder={cfg.fields?.phone?.placeholder || "10-digit number"}
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                label={cfg.fields?.email?.label || "Email Address"}
                id="email"
                type="email"
                placeholder={cfg.fields?.email?.placeholder || "you@domain.com"}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Grid 3: Experience & Qualification */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label={cfg.fields?.experienceYears?.label || "Total Years of Experience"}
                id="experienceYears"
                type="number"
                placeholder={cfg.fields?.experienceYears?.placeholder || "0"}
                error={errors.experienceYears?.message}
                {...register("experienceYears")}
              />
              <FormInput
                label={cfg.fields?.qualification?.label || "Highest Educational Qualification"}
                id="qualification"
                placeholder={cfg.fields?.qualification?.placeholder || "e.g., B.Tech Food Tech / MBA Operations"}
                error={errors.qualification?.message}
                {...register("qualification")}
              />
            </div>

            {/* Grid 4: Compensation & Salary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label={cfg.fields?.currentCompany?.label || "Current Company (Optional)"}
                id="currentCompany"
                placeholder={cfg.fields?.currentCompany?.placeholder || "e.g., FMCG Corp"}
                error={errors.currentCompany?.message}
                {...register("currentCompany")}
              />
              <FormInput
                label={cfg.fields?.expectedSalary?.label || "Expected Salary (Optional)"}
                id="expectedSalary"
                placeholder={cfg.fields?.expectedSalary?.placeholder || "e.g., 6,000,000 INR"}
                error={errors.expectedSalary?.message}
                {...register("expectedSalary")}
              />
              <FormInput
                label={cfg.fields?.noticePeriod?.label || "Notice Period (Optional)"}
                id="noticePeriod"
                placeholder={cfg.fields?.noticePeriod?.placeholder || "e.g., Immediate / 30 Days"}
                error={errors.noticePeriod?.message}
                {...register("noticePeriod")}
              />
            </div>

            <Controller
              name="resumePath"
              control={control}
              render={({ field }: any) => (
                <FileUpload
                  label={cfg.fields?.resumeUpload?.label || "Upload CV/Resume"}
                  id="resumePath"
                  value={field.value}
                  onChange={field.onChange}
                  onUpload={handleResumeUpload}
                  error={errors.resumePath?.message}
                />
              )}
            />

            <FormTextarea
              label={cfg.fields?.coverLetter?.label || "Cover Letter / Summary (Optional)"}
              id="coverLetter"
              placeholder={cfg.fields?.coverLetter?.placeholder || "Tell us why you are a good fit for this position..."}
              error={errors.coverLetter?.message}
              {...register("coverLetter")}
            />

            {/* Additional Custom Fields Dynamic Loop */}
            {Object.entries(cfg.fields || {})
              .filter(([key]) => !KNOWN_CAREER_KEYS.includes(key))
              .map(([key, f]: [string, any]) => (
                <div key={key} className="w-full">
                  {f.type === 'textarea' ? (
                    <FormTextarea
                      label={f.label}
                      id={key}
                      placeholder={f.placeholder}
                      {...register(key as any)}
                    />
                  ) : f.type === 'select' ? (
                    <FormSelect
                      label={f.label}
                      id={key}
                      options={(f.options || []).map((o: string) => ({ label: o, value: o }))}
                      {...register(key as any)}
                    />
                  ) : (
                    <FormInput
                      label={f.label}
                      id={key}
                      type={f.type || 'text'}
                      placeholder={f.placeholder}
                      {...register(key as any)}
                    />
                  )}
                </div>
              ))}

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
                  <span>{cfg.buttonText || "Submit Application"}</span>
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
