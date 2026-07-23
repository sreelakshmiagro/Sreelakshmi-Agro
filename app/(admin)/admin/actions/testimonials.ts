'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getTestimonials(page = 1, pageSize = 20, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase.from('testimonials').select('*', { count: 'exact' });
  if (status) query = query.eq('status', status);

  const { data, count, error } = await query.range(start, end).order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { testimonials: data, total: count || 0 };
}

export async function getTestimonial(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('testimonials').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createTestimonial(formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('testimonials').insert([formData]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function updateTestimonial(id: string, formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('testimonials').update(formData).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/testimonials');
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('testimonials').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/testimonials');
  return { success: true };
}
