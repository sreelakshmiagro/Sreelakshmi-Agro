'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getGalleryImages(album?: string, category?: string) {
  const supabase = await createClient();
  let query = supabase.from('gallery_images').select('*').order('sort_order', { ascending: true });
  
  if (album && album !== 'all') query = query.eq('album', album);
  if (category && category !== 'all') query = query.eq('category', category);
  
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getGalleryImage(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('gallery_images').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function saveGalleryImage(rawData: any) {
  const supabase = await createClient();
  
  let statusVal = rawData.status || 'published';
  if (statusVal === 'active') statusVal = 'published';
  if (statusVal === 'inactive') statusVal = 'draft';

  const payload: any = {
    title: rawData.title ? String(rawData.title).trim() : '',
    alt_text: rawData.alt_text ? String(rawData.alt_text).trim() : '',
    image_url: rawData.image_url ? String(rawData.image_url).trim() : '',
    album: rawData.album ? String(rawData.album).trim() : 'general',
    category: rawData.category ? String(rawData.category).trim() : 'General',
    status: statusVal,
    sort_order: Number(rawData.sort_order) || 0,
    updated_at: new Date().toISOString(),
  };

  try {
    if (rawData.id && String(rawData.id).trim() !== '') {
      const { error } = await supabase
        .from('gallery_images')
        .update(payload)
        .eq('id', rawData.id);

      if (error) return { success: false, error: error.message };
    } else {
      payload.created_at = new Date().toISOString();
      const { error } = await supabase
        .from('gallery_images')
        .insert([payload]);

      if (error) return { success: false, error: error.message };
    }

    revalidatePath('/admin/gallery');
    revalidatePath('/about');
    return { success: true };
  } catch (err: any) {
    console.error('saveGalleryImage Error:', err);
    return { success: false, error: err.message || 'Failed to save gallery image' };
  }
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('gallery_images').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/gallery');
  revalidatePath('/about');
  return { success: true };
}

export async function updateGalleryImageOrder(updates: { id: string; sort_order: number }[]) {
  const supabase = await createClient();
  
  for (const update of updates) {
    const { error } = await supabase.from('gallery_images').update({ sort_order: Number(update.sort_order) || 0 }).eq('id', update.id);
    if (error) return { success: false, error: error.message };
  }
  
  revalidatePath('/admin/gallery');
  revalidatePath('/about');
  return { success: true };
}
