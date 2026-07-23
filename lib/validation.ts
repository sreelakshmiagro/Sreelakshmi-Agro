import { z } from "zod";

// Phone validation pattern for Indian phone numbers (10 digits starting with 6-9)
const phoneRegex = /^[6-9]\d{9}$/;

export const distributorSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit mobile number"),
  whatsapp: z.string().regex(phoneRegex, "Please enter a valid 10-digit WhatsApp number").or(z.literal("")),
  email: z.string().email("Please enter a valid email address"),
  state: z.string().min(1, "Please select a state"),
  district: z.string().min(1, "Please select a district"),
  city: z.string().min(2, "City must be at least 2 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  yearsInBusiness: z.coerce.number().min(0, "Years in business must be 0 or more"),
  currentProducts: z.string().optional(),
  expectedOrderVolume: z.string().min(1, "Please select expected order volume"),
  message: z.string().max(1000, "Message cannot exceed 1000 characters").optional(),
  consent: z.boolean().refine((val) => val === true, "You must accept the terms to proceed"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const careerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  phone: z.string().regex(phoneRegex, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  positionId: z.string().uuid("Please select a valid position"),
  experienceYears: z.coerce.number().min(0, "Experience must be 0 or more"),
  qualification: z.string().min(2, "Qualification must be at least 2 characters"),
  currentCompany: z.string().optional(),
  expectedSalary: z.string().optional(),
  noticePeriod: z.string().optional(),
  coverLetter: z.string().max(1000, "Cover letter cannot exceed 1000 characters").optional(),
  resumePath: z.string().min(1, "Please upload your resume"),
  consent: z.boolean().refine((val) => val === true, "You must accept the terms to proceed"),
});

export type DistributorFormInput = z.infer<typeof distributorSchema>;
export type ContactFormInput = z.infer<typeof contactSchema>;
export type CareerFormInput = z.infer<typeof careerSchema>;
