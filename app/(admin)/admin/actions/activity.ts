'use server'

import { createClient } from '@/lib/supabase/server'

export async function getActivityLogs(page = 1, limit = 50, entityType?: string) {
  const supabase = await createClient()
  let query = supabase.from('activity_log').select(`*, user_profiles(full_name)`, { count: 'exact' })
  
  if (entityType) {
    query = query.eq('entity_type', entityType)
  }
  
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to)
  if (error) throw error
  
  return { data, count }
}

export async function logActivity(action: string, entity_type: string, entity_id: string, details?: any) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  
  await supabase.from('activity_log').insert({
    user_id: user.id,
    action,
    entity_type,
    entity_id,
    details
  })
}
