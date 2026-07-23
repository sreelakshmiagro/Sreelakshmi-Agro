'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSettings() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('site_settings').select('*')
  if (error) throw error
  return data
}

export async function upsertSetting(key: string, value: string, category: string, setting_type: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('site_settings')
    .upsert({ setting_key: key, setting_value: value, category, setting_type, updated_at: new Date().toISOString() }, { onConflict: 'setting_key' })
  if (error) throw error
  revalidatePath('/admin/settings')
}
