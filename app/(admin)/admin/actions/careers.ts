'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getJobs(page = 1, pageSize = 20, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  try {
    let query = supabase.from('jobs').select('*', { count: 'exact' });
    if (status) query = query.eq('status', status);

    const { data, count, error } = await query.range(start, end).order('created_at', { ascending: false });

    if (error) return { jobs: [], total: 0, error: error.message };
    
    return { jobs: data || [], total: count || 0 };
  } catch (err: any) {
    return { jobs: [], total: 0, error: err.message };
  }
}

export async function getJob(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('jobs').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function createJob(formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('jobs').insert([formData]);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/careers');
    revalidatePath('/careers');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateJob(id: string, formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('jobs').update(formData).eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/careers');
    revalidatePath('/careers');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteJob(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/careers');
    revalidatePath('/careers');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getJobApplications(page = 1, pageSize = 20) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  try {
    const { data, count, error } = await supabase
      .from('job_applications')
      .select('*, jobs(title)', { count: 'exact' })
      .range(start, end)
      .order('created_at', { ascending: false });

    if (error) return { applications: [], total: 0, error: error.message };
    
    return { applications: data || [], total: count || 0 };
  } catch (err: any) {
    return { applications: [], total: 0, error: err.message };
  }
}

export async function updateJobApplicationStatus(id: string, status: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('job_applications').update({ status }).eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/forms/applications');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
