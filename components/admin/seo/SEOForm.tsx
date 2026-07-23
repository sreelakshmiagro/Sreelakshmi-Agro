'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { upsertSEOMeta, generateSEOTemplate } from '@/app/(admin)/admin/actions/seo'
import { useToast } from '@/components/admin/ui/Toast'
import { Save, Wand2 } from 'lucide-react'

export default function SEOForm({ initialData, pageSlug }: { initialData?: any, pageSlug: string }) {
  const [formData, setFormData] = useState(initialData || {
    meta_title: '',
    meta_description: '',
    focus_keyword: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    no_index: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setFormData((prev: any) => ({ ...prev, [name]: val }))
  }

  const handleGenerate = async () => {
    const template = await generateSEOTemplate(pageSlug)
    setFormData((prev: any) => ({ ...prev, ...template }))
    toast.success('SEO Template generated!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await upsertSEOMeta(pageSlug, formData)
      toast.success('SEO data saved successfully')
      router.refresh()
    } catch (error) {
      toast.error('Error saving SEO data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Editing SEO for /{pageSlug}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={handleGenerate} className="px-4 py-2 bg-[var(--color-bg-secondary)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] rounded flex items-center gap-2 hover:bg-gray-100 transition-colors">
            <Wand2 className="w-4 h-4" /> AI Generate
          </button>
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[var(--color-brand-primary)] text-white rounded flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-colors">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Meta Title</label>
            <input name="meta_title" value={formData.meta_title || ''} onChange={handleChange} className="w-full p-2 border border-[var(--color-border-light)] rounded bg-white text-[var(--color-text-primary)]" maxLength={60} />
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{formData.meta_title?.length || 0} / 60 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Meta Description</label>
            <textarea name="meta_description" value={formData.meta_description || ''} onChange={handleChange} className="w-full p-2 border border-[var(--color-border-light)] rounded bg-white text-[var(--color-text-primary)] h-24" maxLength={160} />
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">{formData.meta_description?.length || 0} / 160 characters</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Focus Keyword</label>
            <input name="focus_keyword" value={formData.focus_keyword || ''} onChange={handleChange} className="w-full p-2 border border-[var(--color-border-light)] rounded bg-white text-[var(--color-text-primary)]" />
          </div>
        </div>
        
        <div className="space-y-4 border p-4 rounded bg-gray-50">
          <h3 className="font-medium text-[var(--color-text-primary)]">Google Search Preview</h3>
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="text-sm text-[#202124] mb-1">sreelakshmiagro.com › {pageSlug}</div>
            <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer truncate mb-1">
              {formData.meta_title || 'Page Title - Sreelakshmi Agro Industries'}
            </div>
            <div className="text-sm text-[#4d5156] line-clamp-2">
              {formData.meta_description || 'Page description will appear here in search results. Make it descriptive and compelling.'}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[var(--color-border-light)]">
            <h3 className="font-medium text-[var(--color-text-primary)] mb-4">Open Graph (Social)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">OG Title</label>
                <input name="og_title" value={formData.og_title || ''} onChange={handleChange} className="w-full p-2 border border-[var(--color-border-light)] rounded bg-white text-[var(--color-text-primary)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">OG Description</label>
                <textarea name="og_description" value={formData.og_description || ''} onChange={handleChange} className="w-full p-2 border border-[var(--color-border-light)] rounded bg-white text-[var(--color-text-primary)] h-20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
