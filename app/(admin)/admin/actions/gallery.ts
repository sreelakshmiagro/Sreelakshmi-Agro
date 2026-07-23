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

export async function saveGalleryImage(data: any) {
  const supabase = await createClient();
  
  if (data.id) {
    const { error } = await supabase.from('gallery_images').update(data).eq('id', data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('gallery_images').insert([data]);
    if (error) throw new Error(error.message);
  }
  
  revalidatePath('/admin/gallery');
  return { success: true };
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('gallery_images').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/gallery');
  return { success: true };
}

export async function updateGalleryImageOrder(updates: { id: string; sort_order: number }[]) {
  const supabase = await createClient();
  
  for (const update of updates) {
    const { error } = await supabase.from('gallery_images').update({ sort_order: update.sort_order }).eq('id', update.id);
    if (error) throw new Error(error.message);
  }
  
  revalidatePath('/admin/gallery');
  return { success: true };
}
