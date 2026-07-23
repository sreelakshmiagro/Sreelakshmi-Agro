'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getUsers() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateUserStatus(id: string, is_active: boolean) {
  const supabase = await createClient()
  const { error } = await supabase.from('user_profiles').update({ is_active }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/users')
}

export async function updateUserRole(id: string, role: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('user_profiles').update({ role }).eq('id', id)
  if (error) throw error
  revalidatePath('/admin/users')
}
