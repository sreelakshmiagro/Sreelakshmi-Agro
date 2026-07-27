'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.pdf', '.ico'];
const DANGEROUS_EXTENSIONS = ['.php', '.exe', '.sh', '.js', '.html', '.htm', '.bat', '.cmd', '.py', '.pl', '.cgi', '.jar'];

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
  if (error) return [];
  return data || [];
}

export async function saveMediaMetadata(data: any) {
  const supabase = await createClient();

  const fileName = (data.file_name || '').toLowerCase();
  const fileExt = fileName.substring(fileName.lastIndexOf('.'));

  if (DANGEROUS_EXTENSIONS.includes(fileExt)) {
    return { success: false, error: `Security Error: Extension "${fileExt}" is not allowed for security reasons.` };
  }

  if (!ALLOWED_EXTENSIONS.includes(fileExt) && fileExt !== '') {
    return { success: false, error: `Invalid File Type: Only images (JPG, PNG, WebP, SVG, GIF, ICO) and PDFs are allowed.` };
  }

  try {
    const { error } = await supabase.from('media_library').insert([data]);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteMedia(id: string, filePath: string) {
  const supabase = await createClient();
  
  try {
    const { error: storageError } = await supabase.storage.from('media').remove([filePath]);
    if (storageError) return { success: false, error: storageError.message };
    
    const { error: dbError } = await supabase.from('media_library').delete().eq('id', id);
    if (dbError) return { success: false, error: dbError.message };
    
    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateMediaAltText(id: string, altText: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('media_library').update({ alt_text: altText }).eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/media');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
