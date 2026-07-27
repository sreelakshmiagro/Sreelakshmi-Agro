'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getTestimonials(page = 1, pageSize = 20, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  try {
    let query = supabase.from('testimonials').select('*', { count: 'exact' });
    if (status) query = query.eq('status', status);

    const { data, count, error } = await query.range(start, end).order('created_at', { ascending: false });

    if (error) return { testimonials: [], total: 0, error: error.message };
    
    return { testimonials: data || [], total: count || 0 };
  } catch (err: any) {
    return { testimonials: [], total: 0, error: err.message };
  }
}

export async function getTestimonial(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function createTestimonial(formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('testimonials').insert([formData]);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateTestimonial(id: string, formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('testimonials').update(formData).eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
