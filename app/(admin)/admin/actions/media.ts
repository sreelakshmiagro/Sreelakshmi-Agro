'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getMedia(folder?: string, search?: string) {
  const supabase = await createClient();
  let query = supabase.from('media_library').select('*').order('created_at', { ascending: false });
  
  if (folder && folder !== 'all') {
    query = query.eq('folder', folder);
  }
  
  if (search) {
    query = query.ilike('file_name', `%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function saveMediaMetadata(data: any) {
  const supabase = await createClient();
  const { error } = await supabase.from('media_library').insert([data]);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/media');
  return { success: true };
}

export async function deleteMedia(id: string, filePath: string) {
  const supabase = await createClient();
  
  // First delete from storage
  const { error: storageError } = await supabase.storage.from('media').remove([filePath]);
  if (storageError) throw new Error(storageError.message);
  
  // Then delete from database
  const { error: dbError } = await supabase.from('media_library').delete().eq('id', id);
  if (dbError) throw new Error(dbError.message);
  
  revalidatePath('/admin/media');
  return { success: true };
}

export async function updateMediaAltText(id: string, altText: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('media_library').update({ alt_text: altText }).eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/media');
  return { success: true };
}
