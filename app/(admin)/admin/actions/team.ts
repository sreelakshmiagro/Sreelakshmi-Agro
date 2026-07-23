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

export async function saveTeamMember(data: any) {
  const supabase = await createClient();
  
  if (data.id) {
    const { error } = await supabase.from('team_members').update(data).eq('id', data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from('team_members').insert([data]);
    if (error) throw new Error(error.message);
  }
  
  revalidatePath('/admin/team');
  return { success: true };
}

export async function updateTeamMemberOrder(updates: { id: string; sort_order: number }[]) {
  const supabase = await createClient();
  
  for (const update of updates) {
    const { error } = await supabase.from('team_members').update({ sort_order: update.sort_order }).eq('id', update.id);
    if (error) throw new Error(error.message);
  }
  
  revalidatePath('/admin/team');
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('team_members').delete().eq('id', id);
  if (error) throw new Error(error.message);
  revalidatePath('/admin/team');
  return { success: true };
}
