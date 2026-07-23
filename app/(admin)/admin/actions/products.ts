'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getProducts(page = 1, pageSize = 20, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase.from('products').select('*', { count: 'exact' });
  if (status) query = query.eq('status', status);

  const { data, count, error } = await query.range(start, end).order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { products: data, total: count || 0 };
}

export async function getProduct(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').insert([formData]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateProduct(id: string, formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').update(formData).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  return { success: true };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/products');
  return { success: true };
}
