import { getActivityLogs } from '@/app/(admin)/admin/actions/activity'

export const metadata = {
  title: 'Activity Log | Admin Panel',
}

export default async function ActivityPage({ searchParams }: { searchParams: Promise<{ page?: string, entity_type?: string }> }) {
  const resolvedParams = await searchParams
  const page = Number(resolvedParams.page) || 1
  const limit = 20
  const entityType = resolvedParams.entity_type

  const { data, count } = await getActivityLogs(page, limit, entityType)

  const filterOptions = [
    { value: '', label: 'All Entities' },
    { value: 'product', label: 'Products' },
    { value: 'recipe', label: 'Recipes' },
    { value: 'settings', label: 'Settings' },
    { value: 'seo', label: 'SEO' },
    { value: 'user', label: 'Users' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-lora font-bold text-[var(--color-text-primary)]">Activity Log</h1>
        
        <form className="flex gap-2 items-center">
          <label className="text-sm font-medium">Filter by Entity:</label>
          <select 
            name="entity_type" 
            defaultValue={entityType || ''}
            className="border border-[var(--color-border-light)] rounded p-2 text-sm bg-white"
          >
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button type="submit" className="px-3 py-2 text-sm bg-[var(--color-brand-primary)] text-white rounded hover:opacity-90 transition">Filter</button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[var(--color-border-light)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-[var(--color-border-light)]">
            <tr>
              <th className="text-left p-4 font-medium text-gray-600">Timestamp</th>
              <th className="text-left p-4 font-medium text-gray-600">Action</th>
              <th className="text-left p-4 font-medium text-gray-600">Entity Type</th>
              <th className="text-left p-4 font-medium text-gray-600">Entity ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-light)]">
            {(data || []).length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">No activity logs yet.</td>
              </tr>
            ) : (
              (data || []).map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-4 text-gray-500 text-xs">{new Date(row.created_at).toLocaleString()}</td>
                  <td className="p-4 font-medium">{row.action}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                      {row.entity_type || '—'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-500">{row.entity_id || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {(count || 0) > limit && (
          <div className="p-4 border-t border-[var(--color-border-light)] flex justify-center gap-2">
            {page > 1 && (
              <a href={`/admin/activity?page=${page - 1}${entityType ? `&entity_type=${entityType}` : ''}`} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Previous</a>
            )}
            <span className="px-3 py-1 text-sm text-gray-500">Page {page} of {Math.ceil((count || 0) / limit)}</span>
            {page < Math.ceil((count || 0) / limit) && (
              <a href={`/admin/activity?page=${page + 1}${entityType ? `&entity_type=${entityType}` : ''}`} className="px-3 py-1 text-sm border rounded hover:bg-gray-50">Next</a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
