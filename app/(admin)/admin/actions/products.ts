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

  if (error) return { products: [], total: 0, error: error.message };
  
  return { products: data || [], total: count || 0 };
}

export async function getProduct(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
  if (error) return null;
  return data;
}

export async function createProduct(formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('products').insert([formData]);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateProduct(id: string, formData: any) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('products').update(formData).eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProducts(ids: string[]) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('products').delete().in('id', ids);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function duplicateProduct(id: string) {
  const supabase = await createClient();
  
  try {
    const { data: original, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !original) return { success: false, error: fetchError?.message || 'Product not found' };

    const { id: _, created_at: __, updated_at: ___, ...rest } = original;
    const newName = `${original.name} (Copy)`;
    const newSlug = `${original.slug}-copy-${Math.random().toString(36).substring(2, 6)}`;

    const duplicateData = {
      ...rest,
      name: newName,
      slug: newSlug,
      status: 'draft',
      is_featured: false,
      is_flagship: false,
    };

    const { data: newProd, error: insertError } = await supabase
      .from('products')
      .insert([duplicateData])
      .select('id')
      .single();

    if (insertError) return { success: false, error: insertError.message };

    revalidatePath('/admin/products');
    revalidatePath('/products');
    return { success: true, newId: newProd.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
