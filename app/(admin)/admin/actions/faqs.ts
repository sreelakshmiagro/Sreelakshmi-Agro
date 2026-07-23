'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getFaqs(page = 1, pageSize = 50, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase.from('faqs').select('*', { count: 'exact' });
  if (status) query = query.eq('status', status);

  const { data, count, error } = await query.range(start, end).order('display_order', { ascending: true });

  if (error) throw new Error(error.message);
  
  return { faqs: data, total: count || 0 };
}

export async function getFaq(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('faqs').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createFaq(formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('faqs').insert([formData]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function updateFaq(id: string, formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('faqs').update(formData).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/faqs');
  return { success: true };
}

export async function reorderFaqs(faqs: { id: string; display_order: number }[]) {
  const supabase = await createClient();
  
  for (const faq of faqs) {
    await supabase.from('faqs').update({ display_order: faq.display_order }).eq('id', faq.id);
  }
  
  revalidatePath('/admin/faqs');
  return { success: true };
}
