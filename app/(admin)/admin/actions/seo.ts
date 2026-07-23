'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getSEOMeta() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('seo_meta').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function getSEOMetaBySlug(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.from('seo_meta').select('*').eq('page_slug', slug).single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function upsertSEOMeta(slug: string, payload: any) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('seo_meta')
    .upsert({ page_slug: slug, ...payload, updated_at: new Date().toISOString() }, { onConflict: 'page_slug' })
  if (error) throw error
  revalidatePath('/admin/seo')
  revalidatePath(`/admin/seo/${slug}`)
}

export async function generateSEOTemplate(pageName: string) {
  return {
    meta_title: `${pageName} | Sreelakshmi Agro Industries`,
    meta_description: `Discover ${pageName} at Sreelakshmi Agro Industries. Quality agricultural products and reliable services.`,
    focus_keyword: pageName.toLowerCase(),
    og_title: `${pageName} | Sreelakshmi Agro Industries`,
    og_description: `Discover ${pageName} at Sreelakshmi Agro Industries. Quality agricultural products and reliable services.`
  }
}
