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

  if (error) return { recipes: [], total: 0, error: error.message };
  
  return { recipes: data || [], total: count || 0 };
}

export async function getRecipe(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function getProductOptions() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug')
    .order('name', { ascending: true });
  if (error) return [];
  return data || [];
}

export async function createRecipe(formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('recipes').insert([formData]);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/recipes');
    revalidatePath('/recipes');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateRecipe(id: string, formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('recipes').update(formData).eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/recipes');
    revalidatePath('/recipes');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteRecipe(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('recipes').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/recipes');
    revalidatePath('/recipes');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function duplicateRecipe(id: string) {
  const supabase = await createClient();
  
  try {
    const { data: original, error: fetchError } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !original) return { success: false, error: fetchError?.message || 'Recipe not found' };

    const { id: _, created_at: __, updated_at: ___, ...rest } = original;
    const newName = `${original.name} (Copy)`;
    const newSlug = `${original.slug}-copy-${Math.random().toString(36).substring(2, 6)}`;

    const duplicateData = {
      ...rest,
      name: newName,
      slug: newSlug,
      status: 'draft',
    };

    const { data: newRcp, error: insertError } = await supabase
      .from('recipes')
      .insert([duplicateData])
      .select('id')
      .single();

    if (insertError) return { success: false, error: insertError.message };

    revalidatePath('/admin/recipes');
    revalidatePath('/recipes');
    return { success: true, newId: newRcp.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
