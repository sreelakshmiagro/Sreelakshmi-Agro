import { getActivityLogs } from '@/app/(admin)/admin/actions/activity';
import { Activity, ShieldAlert, Filter } from 'lucide-react';

export const metadata = {
  title: 'Activity Log | Admin Panel',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ActivityPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; entity_type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = 20;
  const entityType = resolvedParams.entity_type || '';

  const { data, count } = await getActivityLogs(page, limit, entityType);

  const filterOptions = [
    { value: '', label: 'All Entities' },
    { value: 'product', label: 'Products' },
    { value: 'recipe', label: 'Recipes' },
    { value: 'gallery', label: 'Gallery' },
    { value: 'team', label: 'Team Members' },
    { value: 'forms', label: 'Form Submissions' },
    { value: 'settings', label: 'Site Settings' },
    { value: 'seo', label: 'SEO Configs' },
    { value: 'user', label: 'User Admin' },
  ];

  return (
    <div className="space-y-6 p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif flex items-center gap-2">
            <Activity className="w-6 h-6 text-brand-primary" />
            System Activity Log
          </h1>
          <p className="text-xs text-gray-500 mt-1">Audit trail of all administrative actions, content updates, and lead activities.</p>
        </div>

        <form className="flex items-center gap-2 bg-white p-2 rounded-lg border border-border-light shadow-sm">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
          <select 
            name="entity_type" 
            defaultValue={entityType}
            className="border-none text-xs font-semibold text-gray-700 bg-transparent focus:ring-0 cursor-pointer"
          >
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button type="submit" className="px-3 py-1.5 text-xs font-bold bg-brand-primary text-white rounded hover:bg-brand-primary/90 transition shadow-sm">
            Filter
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-border-light shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-border-light text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Action</th>
              <th className="p-4">Entity Type</th>
              <th className="p-4">Target ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {(!data || data.length === 0) ? (
              <tr>
                <td colSpan={4} className="p-12 text-center text-gray-400 font-sans">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldAlert className="w-8 h-8 text-gray-300" />
                    <p className="text-sm font-medium">No activity log entries found</p>
                    <p className="text-xs text-gray-400">Admin activities and updates will automatically register here.</p>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row: any) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 text-xs font-mono text-gray-500">
                    {new Date(row.created_at).toLocaleString()}
                  </td>
                  <td className="p-4 font-semibold text-gray-900 text-xs">
                    {row.action}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-primary/10 text-brand-primary capitalize">
                      {row.entity_type || 'System'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-500">
                    {row.entity_id || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {count > limit && (
          <div className="p-4 border-t border-border-light flex items-center justify-between text-xs text-gray-500">
            <div>
              Showing page {page} of {Math.ceil(count / limit)} ({count} total records)
            </div>
            <div className="flex items-center gap-2">
              {page > 1 && (
                <a
                  href={`/admin/activity?page=${page - 1}${entityType ? `&entity_type=${entityType}` : ''}`}
                  className="px-3 py-1.5 border rounded-md hover:bg-gray-50 font-medium text-gray-700"
                >
                  Previous
                </a>
              )}
              {page < Math.ceil(count / limit) && (
                <a
                  href={`/admin/activity?page=${page + 1}${entityType ? `&entity_type=${entityType}` : ''}`}
                  className="px-3 py-1.5 border rounded-md hover:bg-gray-50 font-medium text-gray-700"
                >
                  Next
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
