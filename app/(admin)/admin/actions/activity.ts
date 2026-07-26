'use server';

import { createClient } from '@/lib/supabase/server';

export async function getActivityLogs(page = 1, limit = 20, entityType?: string) {
  const supabase = await createClient();
  
  try {
    let query = supabase.from('activity_log').select('*', { count: 'exact' });
    
    if (entityType && entityType.trim() !== '' && entityType !== 'all') {
      query = query.eq('entity_type', entityType);
    }
    
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, count, error } = await query.order('created_at', { ascending: false }).range(from, to);
    if (error) {
      console.error('getActivityLogs Error:', error.message);
      return { data: [], count: 0 };
    }
    
    return { data: data || [], count: count || 0 };
  } catch (err: any) {
    console.error('getActivityLogs Exception:', err);
    return { data: [], count: 0 };
  }
}

export async function logActivity(action: string, entity_type: string, entity_id: string, details?: any) {
  const supabase = await createClient();
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    await supabase.from('activity_log').insert([{
      user_id: user?.id || null,
      action,
      entity_type,
      entity_id,
      details,
      created_at: new Date().toISOString()
    }]);
  } catch (err) {
    console.error('logActivity Error:', err);
  }
}
