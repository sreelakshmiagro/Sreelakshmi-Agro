'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getTeamMembers() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getTeamMember(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single();
  if (error) throw new Error(error.message);
  return data;
}

export async function saveTeamMember(rawData: any) {
  const supabase = await createClient();
  
  let statusVal = rawData.status || 'published';
  if (statusVal === 'active') statusVal = 'published';
  if (statusVal === 'inactive') statusVal = 'draft';

  const payload: any = {
    name: rawData.name ? String(rawData.name).trim() : '',
    designation: rawData.designation ? String(rawData.designation).trim() : '',
    image: rawData.image ? String(rawData.image).trim() : '',
    status: statusVal,
    sort_order: Number(rawData.sort_order) || 0,
    updated_at: new Date().toISOString(),
  };

  try {
    if (rawData.id && String(rawData.id).trim() !== '') {
      const { error } = await supabase
        .from('team_members')
        .update(payload)
        .eq('id', rawData.id);

      if (error) return { success: false, error: error.message };
    } else {
      payload.created_at = new Date().toISOString();
      const { error } = await supabase
        .from('team_members')
        .insert([payload]);

      if (error) return { success: false, error: error.message };
    }

    revalidatePath('/admin/team');
    revalidatePath('/about');
    return { success: true };
  } catch (err: any) {
    console.error('saveTeamMember Error:', err);
    return { success: false, error: err.message || 'Failed to save team member' };
  }
}

export async function updateTeamMemberOrder(updates: { id: string; sort_order: number }[]) {
  const supabase = await createClient();
  
  for (const update of updates) {
    const { error } = await supabase.from('team_members').update({ sort_order: Number(update.sort_order) || 0 }).eq('id', update.id);
    if (error) return { success: false, error: error.message };
  }
  
  revalidatePath('/admin/team');
  revalidatePath('/about');
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/team');
  revalidatePath('/about');
  return { success: true };
}
