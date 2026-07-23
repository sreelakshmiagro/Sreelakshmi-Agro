'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPages() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('page_sections').select('page_slug').order('page_slug');
  if (error) throw new Error(error.message);
  
  // Extract unique page slugs
  const pages = Array.from(new Set(data.map(item => item.page_slug)));
  return pages;
}

export async function getPageSections(pageSlug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('page_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .order('sort_order', { ascending: true });
    
  if (error) throw new Error(error.message);
  return data;
}

export async function savePageSection(data: any) {
  const supabase = await createClient();
  
  if (data.id) {
    const { error } = await supabase.from('page_sections').update(data).eq('id', data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('page_sections').insert([data]);
    if (error) throw new Error(error.message);
  }
  
  revalidatePath(`/admin/pages/${data.page_slug}`);
  revalidatePath('/admin/pages');
  return { success: true };
}

export async function deletePageSection(id: string, pageSlug: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('page_sections').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/pages/${pageSlug}`);
  return { success: true };
}
