import { getSEOMeta } from '@/app/(admin)/admin/actions/seo'
import Link from 'next/link'
import { Edit } from 'lucide-react'

export const metadata = {
  title: 'SEO Management | Admin Panel',
}

export default async function SEOPage() {
  const seoData = await getSEOMeta()

  const calculateHealth = (row: any) => {
    let score = 0
    if (row.meta_title) score += 20
    if (row.meta_description) score += 20
    if (row.focus_keyword) score += 15
    if (row.og_title) score += 15
    if (row.og_description) score += 15
    if (row.og_image) score += 15
    return score
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-lora font-bold text-[var(--color-text-primary)]">SEO Management</h1>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-[var(--color-border-light)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-[var(--color-border-light)]">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">Page</th>
              <th className="text-left p-4 font-medium text-gray-600">Meta Title</th>
              <th className="text-left p-4 font-medium text-gray-600">Health Score</th>
              <th className="text-left p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-light)]">
            {(seoData || []).map((row: any) => {
              const score = calculateHealth(row)
              return (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium capitalize">{row.page_slug}</td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">{row.meta_title || '—'}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 inline-flex text-xs rounded-full font-medium ${
                      score >= 80 ? 'bg-green-100 text-green-800' : 
                      score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {score}/100
                    </span>
                  </td>
                  <td className="p-4">
                    <Link href={`/admin/seo/${row.page_slug}`} className="text-[var(--color-brand-primary)] hover:underline flex items-center gap-1 w-fit">
                      <Edit className="w-4 h-4" /> Edit
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
