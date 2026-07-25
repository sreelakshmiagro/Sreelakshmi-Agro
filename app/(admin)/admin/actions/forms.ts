'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getDistributorInquiries(page = 1, pageSize = 20) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, count, error } = await supabase
    .from('distributor_inquiries')
    .select('*', { count: 'exact' })
    .range(start, end)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { inquiries: data, total: count || 0 };
}

export async function updateDistributorInquiry(id: string, updates: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('distributor_inquiries').update(updates).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/forms/distributors');
  return { success: true };
}

export async function getContactInquiries(page = 1, pageSize = 20) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, count, error } = await supabase
    .from('contact_inquiries')
    .select('*', { count: 'exact' })
    .range(start, end)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { inquiries: data, total: count || 0 };
}

export async function updateContactInquiry(id: string, updates: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('contact_inquiries').update(updates).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/forms/contacts');
  return { success: true };
}

export async function getJobApplications(page = 1, pageSize = 20) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, count, error } = await supabase
    .from('job_applications')
    .select('*, jobs(title)', { count: 'exact' })
    .range(start, end)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { applications: data, total: count || 0 };
}

export async function updateJobApplication(id: string, updates: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('job_applications').update(updates).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/forms/applications');
  return { success: true };
}

export async function getFormCounts() {
  const supabase = await createClient();
  
  const [distributors, contacts, applications] = await Promise.all([
    supabase.from('distributor_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
    supabase.from('job_applications').select('*', { count: 'exact', head: true }).eq('status', 'unread')
  ]);
  
  return {
    distributors: distributors.count || 0,
    contacts: contacts.count || 0,
    applications: applications.count || 0
  };
}

export async function getFormConfigs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .in('setting_key', ['form_careers_config', 'form_distributor_config', 'form_contact_config']);
  
  const configs: Record<string, any> = {};
  (data || []).forEach((row) => {
    try {
      configs[row.setting_key] = JSON.parse(row.setting_value);
    } catch {
      configs[row.setting_key] = null;
    }
  });
  return configs;
}

export async function saveFormConfig(settingKey: string, configObj: any) {
  const supabase = await createClient();
  const jsonValue = JSON.stringify(configObj);

  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .eq('setting_key', settingKey)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('site_settings')
      .update({ setting_value: jsonValue })
      .eq('setting_key', settingKey);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from('site_settings')
      .insert([{ setting_key: settingKey, setting_value: jsonValue }]);
    if (error) throw new Error(error.message);
  }

  revalidatePath('/admin/forms');
  revalidatePath('/admin/forms/templates');
  revalidatePath('/careers');
  revalidatePath('/contact');
  revalidatePath('/become-distributor');
  return { success: true };
}
