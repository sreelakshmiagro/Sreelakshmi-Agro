'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getRecipes(page = 1, pageSize = 20, status?: string) {
  const supabase = await createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  let query = supabase.from('recipes').select('*', { count: 'exact' });
  if (status) query = query.eq('status', status);

  const { data, count, error } = await query.range(start, end).order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  return { recipes: data, total: count || 0 };
}

export async function getRecipe(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createRecipe(formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('recipes').insert([formData]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/recipes');
  return { success: true };
}

export async function updateRecipe(id: string, formData: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('recipes').update(formData).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/recipes');
  return { success: true };
}

export async function deleteRecipe(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('recipes').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/recipes');
  return { success: true };
}
