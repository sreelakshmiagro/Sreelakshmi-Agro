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

export async function getProductOptions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug')
    .order('name', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
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

export async function duplicateRecipe(id: string) {
  const supabase = await createClient();
  
  // 1. Fetch original recipe
  const { data: original, error: fetchError } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !original) throw new Error(fetchError?.message || 'Recipe not found');

  // 2. Prepare cloned object
  const { id: _, created_at: __, updated_at: ___, ...rest } = original;
  const newName = `${original.name} (Copy)`;
  const newSlug = `${original.slug}-copy-${Math.random().toString(36).substring(2, 6)}`;

  const duplicateData = {
    ...rest,
    name: newName,
    slug: newSlug,
    status: 'draft',
  };

  // 3. Insert duplicate
  const { data: newRcp, error: insertError } = await supabase
    .from('recipes')
    .insert([duplicateData])
    .select('id')
    .single();

  if (insertError) throw new Error(insertError.message);

  revalidatePath('/admin/recipes');
  return { success: true, newId: newRcp.id };
}
