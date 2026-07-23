'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getMenusByLocation(location: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('menu_location', location)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return data
}

export async function upsertMenuItem(payload: any) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('menu_items')
    .upsert({ ...payload, updated_at: new Date().toISOString() })
  if (error) throw error
  revalidatePath('/admin/menus')
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) throw error
  revalidatePath('/admin/menus')
}

export async function updateMenuOrder(items: {id: string, sort_order: number}[]) {
  const supabase = await createClient()
  for (const item of items) {
    await supabase.from('menu_items').update({ sort_order: item.sort_order }).eq('id', item.id)
  }
  revalidatePath('/admin/menus')
}
