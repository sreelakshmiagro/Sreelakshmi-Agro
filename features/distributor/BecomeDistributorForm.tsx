"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowRight, Loader } from "lucide-react";
import { distributorSchema, type DistributorFormInput } from "@/lib/validation";
import { submitDistributorInquiry } from "@/app/actions/leads";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import FormTextarea from "@/components/common/FormTextarea";
import { ALL_INDIAN_STATES, getDistrictsForState } from "@/lib/indiaData";

const businessTypes = [
  { label: "Wholesaler / Trader", value: "Wholesaler" },
  { label: "Super Stockist", value: "Stockist" },
  { label: "Retail Chain Partner", value: "Retailer" },
  { label: "Agro-Inputs Distributor", value: "Distributor" },
];

const volumes = [
  { label: "Under 5 Tons / Month", value: "under-5" },
  { label: "5 - 15 Tons / Month", value: "5-15" },
  { label: "15 - 50 Tons / Month", value: "15-50" },
  { label: "Above 50 Tons / Month", value: "above-50" },
];

export default function BecomeDistributorForm({ formConfig }: { formConfig?: any }) {
  const cfg = formConfig || {
    title: "Distributor Inquiry Form",
    subtitle: "Please provide accurate commercial details to accelerate the onboarding check.",
    buttonText: "Submit Partner Inquiry",
    successMessage: "Thank you for your interest in Sreelakshmi Agro Industries. Our business development team will review your details and contact you within 24–48 hours."
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(distributorSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      phone: "",
      whatsapp: "",
      email: "",
      state: "",
      district: "",
      city: "",
      businessType: "",
      yearsInBusiness: 0,
      currentProducts: "",
      expectedOrderVolume: "",
      message: "",
      consent: undefined as any,
    },
  });

  const selectedState = watch("state");

  // Dynamic States & Districts list sorted alphabetically
  const stateOptionsFromConfig = cfg.fields?.state?.options?.length ? cfg.fields.state.options : ALL_INDIAN_STATES;
  const statesList = Array.from(new Set(stateOptionsFromConfig)).sort();
  const statesOptions = statesList.map((s: any) => ({ label: s, value: s }));

  const dynamicDistricts = getDistrictsForState(selectedState);
  const districtOptionsFromConfig = cfg.fields?.district?.options?.length ? cfg.fields.district.options : dynamicDistricts;
  const districtsList = Array.from(new Set(districtOptionsFromConfig)).sort();
  
  const districtsOptions = districtsList.length > 0
    ? districtsList.map((d: any) => ({ label: d, value: d }))
    : [{ label: selectedState ? "No districts found" : "-- Select State First --", value: "" }];

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setValue("state", val);
    setValue("district", ""); // Reset district when state changes
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await submitDistributorInquiry(data);
      if (response.success) {
        setSubmitState("success");
        reset();
      } else {
        setSubmitState("error");
        setErrorMessage(
          response.error || "There was a validation issue. Please check fields."
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
            transition={{ duration: 0.4 }}
            className="text-center py-12 flex flex-col items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 animate-pulse">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl font-bold text-text-primary">
                Inquiry Submitted Successfully
              </h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
                {cfg.successMessage || "Thank you for your interest in Sreelakshmi Agro Industries. Our business development team will review your details and contact you within 24–48 hours."}
              </p>
            </div>
            <button
              onClick={() => setSubmitState("idle")}
              className="mt-4 bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-6 py-3 rounded-md transition-colors"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-6"
          >
            <div className="border-b border-border-light pb-4">
              <h3 className="font-serif text-xl font-bold text-text-primary">
                {cfg.title || "Distributor Inquiry Form"}
              </h3>
              <p className="font-sans text-xs text-text-secondary mt-1">
                {cfg.subtitle || "Please provide accurate commercial details to accelerate the onboarding check."}
              </p>
            </div>

            {submitState === "error" && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 rounded-lg text-red-600 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Grid 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label={cfg.fields?.companyName?.label || "Company Name"}
                id="companyName"
                placeholder={cfg.fields?.companyName?.placeholder || "e.g., Sreelakshmi Distributors"}
                error={errors.companyName?.message}
                {...register("companyName")}
              />
              <FormInput
                label={cfg.fields?.contactPerson?.label || "Contact Person Name"}
                id="contactPerson"
                placeholder={cfg.fields?.contactPerson?.placeholder || "e.g., John Doe"}
                error={errors.contactPerson?.message}
                {...register("contactPerson")}
              />
            </div>

            {/* Grid 2: Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormInput
                label={cfg.fields?.phone?.label || "Mobile Phone Number"}
                id="phone"
                type="tel"
                placeholder={cfg.fields?.phone?.placeholder || "10-digit number"}
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                label={cfg.fields?.whatsapp?.label || "WhatsApp Number (Optional)"}
                id="whatsapp"
                type="tel"
                placeholder={cfg.fields?.whatsapp?.placeholder || "10-digit number"}
                error={errors.whatsapp?.message}
                {...register("whatsapp")}
              />
              <FormInput
                label={cfg.fields?.email?.label || "Email Address"}
                id="email"
                type="email"
                placeholder={cfg.fields?.email?.placeholder || "info@company.com"}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            {/* Grid 3: Locations (All India States & Cascading Districts) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormSelect
                label={cfg.fields?.state?.label || "State"}
                id="state"
                options={statesOptions}
                error={errors.state?.message}
                {...register("state")}
                onChange={handleStateChange}
              />
              <FormSelect
                label={cfg.fields?.district?.label || "District"}
                id="district"
                options={districtsOptions}
                error={errors.district?.message}
                {...register("district")}
              />
              <FormInput
                label={cfg.fields?.city?.label || "City / Town"}
                id="city"
                placeholder={cfg.fields?.city?.placeholder || "e.g., City Center"}
                error={errors.city?.message}
                {...register("city")}
              />
            </div>

            {/* Grid 4: Business Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormSelect
                label={cfg.fields?.businessType?.label || "Business Type"}
                id="businessType"
                options={businessTypes}
                error={errors.businessType?.message}
                {...register("businessType")}
              />
              <FormSelect
                label={cfg.fields?.expectedOrderVolume?.label || "Expected Order Volume"}
                id="expectedOrderVolume"
                options={volumes}
                error={errors.expectedOrderVolume?.message}
                {...register("expectedOrderVolume")}
              />
            </div>

            <FormInput
              label={cfg.fields?.currentProducts?.label || "Current Brands / Products Handled"}
              id="currentProducts"
              placeholder={cfg.fields?.currentProducts?.placeholder || "e.g., Brand X Flour, Brand Y Rice"}
              error={errors.currentProducts?.message}
              {...register("currentProducts")}
            />

            <FormTextarea
              label={cfg.fields?.message?.label || "Additional Message / Enquiries"}
              id="message"
              placeholder={cfg.fields?.message?.placeholder || "Tell us about your distribution footprint..."}
              error={errors.message?.message}
              {...register("message")}
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
                  I consent to Sreelakshmi Agro Industries storing my commercial data and contacting me via phone, email, or WhatsApp for business onboarding reviews.
                </label>
              </div>
              {errors.consent && (
                <span role="alert" className="font-sans text-xs text-red-600 font-medium">
                  {errors.consent.message}
                </span>
              )}
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans text-base font-semibold py-4 rounded-md shadow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing Application...</span>
                </>
              ) : (
                <>
                  <span>{cfg.buttonText || "Submit Partner Inquiry"}</span>
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
