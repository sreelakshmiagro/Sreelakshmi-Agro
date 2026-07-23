'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getJobs(page = 1, pageSize = 20, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase.from('jobs').select('*, job_applications(count)', { count: 'exact' });
  if (status) query = query.eq('status', status);

  const { data, count, error } = await query.range(start, end).order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { jobs: data, total: count || 0 };
}

export async function getJob(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createJob(formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('jobs').insert([formData]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/careers');
  return { success: true };
}

export async function updateJob(id: string, formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('jobs').update(formData).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/careers');
  return { success: true };
}

export async function deleteJob(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/careers');
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

export async function updateJobApplicationStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('job_applications').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/forms/applications');
  return { success: true };
}
