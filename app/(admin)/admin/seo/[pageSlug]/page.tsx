import { getSEOMetaBySlug } from '@/app/(admin)/admin/actions/seo'
import SEOForm from '@/components/admin/seo/SEOForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditSEOPage({ params }: { params: Promise<{ pageSlug: string }> }) {
  const resolvedParams = await params;
  const seoData = await getSEOMetaBySlug(resolvedParams.pageSlug)

  return (
    <div className="space-y-6">
      <Link href="/admin/seo" className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to SEO List
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-[var(--color-border-light)]">
        <SEOForm initialData={seoData} pageSlug={resolvedParams.pageSlug} />
      </div>
    </div>
  )
}
