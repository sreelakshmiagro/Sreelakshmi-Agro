"use server";

import { createClient } from "@/lib/supabase/server";
import { distributorSchema, contactSchema, careerSchema } from "@/lib/validation";

// Helper to strip simple HTML tags to prevent basic XSS
function sanitizeString(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

export async function submitDistributorInquiry(rawData: any) {
  // 1. Zod validation check
  const result = distributorSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const data = result.data;
  const supabase = await createClient();

  // 2. Map data with sanitization
  const payload = {
    company_name: sanitizeString(data.companyName),
    contact_person: sanitizeString(data.contactPerson),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    whatsapp: data.whatsapp ? data.whatsapp.trim() : null,
    state: sanitizeString(data.state),
    district: sanitizeString(data.district),
    city: sanitizeString(data.city),
    business_type: sanitizeString(data.businessType),
    years_in_business: data.yearsInBusiness,
    current_products: data.currentProducts ? sanitizeString(data.currentProducts) : null,
    expected_order_volume: sanitizeString(data.expectedOrderVolume),
    message: data.message ? sanitizeString(data.message) : null,
    status: "pending",
  };

  try {
    const { error } = await supabase.from("distributor_inquiries").insert(payload);
    if (error) throw error;
    
    // Future expansion: Trigger admin email notifications here
    
    return { success: true };
  } catch (error: any) {
    console.error("Database Insert Error:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again later." };
  }
}

export async function submitContactInquiry(rawData: any) {
  const result = contactSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const data = result.data;
  const supabase = await createClient();

  const payload = {
    name: sanitizeString(data.name),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    subject: sanitizeString(data.subject),
    message: sanitizeString(data.message),
    status: "unread",
  };

  try {
    // Note: 'contact_inquiries' matches the contact ingestion requirements
    const { error } = await supabase.from("contact_inquiries").insert(payload);
    if (error) throw error;
    
    return { success: true };
  } catch (error: any) {
    console.error("Database Insert Error:", error);
    return { success: false, error: "Failed to submit message. Please try again later." };
  }
}

export async function submitJobApplication(rawData: any) {
  const result = careerSchema.safeParse(rawData);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const data = result.data;
  const supabase = await createClient();

  const payload = {
    job_id: data.positionId,
    applicant_name: sanitizeString(data.fullName),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    resume_url: data.resumePath, // Links to file path in private storage bucket
    cover_letter: data.coverLetter ? sanitizeString(data.coverLetter) : null,
    status: "submitted",
  };

  try {
    const { error } = await supabase.from("job_applications").insert(payload);
    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Database Insert Error:", error);
    return { success: false, error: "Failed to submit application. Please try again later." };
  }
}
