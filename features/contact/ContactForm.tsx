"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, ArrowRight, Loader } from "lucide-react";
import { contactSchema, type ContactFormInput } from "@/lib/validation";
import { submitContactInquiry } from "@/app/actions/leads";
import { createClient } from "@/lib/supabase/client";
import FormInput from "@/components/common/FormInput";
import FormSelect from "@/components/common/FormSelect";
import FormTextarea from "@/components/common/FormTextarea";
import { useToast } from "@/components/admin/ui/Toast";

const KNOWN_CONTACT_KEYS = ["name", "phone", "email", "subject", "message"];

export default function ContactForm({ formConfig: propFormConfig }: { formConfig?: any }) {
  const [clientConfig, setClientConfig] = useState<any>(null);

  useEffect(() => {
    if (!propFormConfig) {
      const supabase = createClient();
      supabase
        .from("site_settings")
        .select("setting_value")
        .eq("setting_key", "form_contact_config")
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
    title: "Send Us a Quick Message",
    subtitle: "We generally respond to messages within 24 business hours.",
    buttonText: "Send Message →",
    successMessage: "Thank you for contacting us. Our operations team will get in touch with you shortly.",
    fields: {
      name: { label: "FULL NAME", placeholder: "e.g., Jane Smith" },
      phone: { label: "MOBILE NUMBER", placeholder: "10-digit number" },
      email: { label: "EMAIL ADDRESS", placeholder: "you@email.com" },
      subject: { label: "SUBJECT", placeholder: "e.g., Pricing Inquiry / Feedback" },
      message: { label: "YOUR MESSAGE", placeholder: "Provide complete details to help us assist you..." }
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const toast = useToast();

  const onSubmit = async (data: ContactFormInput) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await submitContactInquiry(data);
      if (response.success) {
        setSubmitState("success");
        toast.success("Message Sent Successfully!", "Our team will respond to your query within 24 business hours.");
        reset();
      } else {
        setSubmitState("error");
        const msg = response.error || "There was an issue processing your request. Please try again.";
        setErrorMessage(msg);
        toast.error("Message Failed to Send", msg);
      }
    } catch (err) {
      setSubmitState("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
      toast.error("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl border border-border-light shadow-md w-full">
      <AnimatePresence mode="wait">
        {submitState === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-xl font-bold text-text-primary">
                Message Sent Successfully
              </h3>
              <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
                {cfg.successMessage || "Thank you for contacting us. Our operations team will get in touch with you shortly."}
              </p>
            </div>
            <button
              onClick={() => setSubmitState("idle")}
              className="mt-2 bg-brand-primary hover:bg-brand-secondary text-white font-sans text-xs font-semibold px-4 py-2.5 rounded transition-colors"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="contact-form"
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-5"
          >
            <div>
              <h3 className="font-serif text-lg font-bold text-text-primary">
                {cfg.title || "Send Us a Quick Message"}
              </h3>
              <p className="font-sans text-xs text-text-secondary mt-0.5">
                {cfg.subtitle || "We generally respond to messages within 24 business hours."}
              </p>
            </div>

            {submitState === "error" && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 p-3 rounded text-red-600 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <FormInput
              label={cfg.fields?.name?.label || "Full Name"}
              id="name"
              placeholder={cfg.fields?.name?.placeholder || "e.g., Jane Smith"}
              error={errors.name?.message}
              {...register("name")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormInput
                label={cfg.fields?.phone?.label || "Mobile Number"}
                id="phone"
                type="tel"
                placeholder={cfg.fields?.phone?.placeholder || "10-digit number"}
                error={errors.phone?.message}
                {...register("phone")}
              />
              <FormInput
                label={cfg.fields?.email?.label || "Email Address"}
                id="email"
                type="email"
                placeholder={cfg.fields?.email?.placeholder || "you@email.com"}
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <FormInput
              label={cfg.fields?.subject?.label || "Subject"}
              id="subject"
              placeholder={cfg.fields?.subject?.placeholder || "e.g., Pricing Inquiry / Feedback"}
              error={errors.subject?.message}
              {...register("subject")}
            />

            <FormTextarea
              label={cfg.fields?.message?.label || "Your Message"}
              id="message"
              placeholder={cfg.fields?.message?.placeholder || "Provide complete details to help us assist you..."}
              error={errors.message?.message}
              {...register("message")}
            />

            {/* Additional Custom Fields Dynamic Loop */}
            {Object.entries(cfg.fields || {})
              .filter(([key]) => !KNOWN_CONTACT_KEYS.includes(key))
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold py-3.5 rounded shadow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:pointer-events-none hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <span>{cfg.buttonText || "Send Message"}</span>
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
