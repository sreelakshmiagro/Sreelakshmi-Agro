import React from 'react';
import Link from 'next/link';
import { Edit } from 'lucide-react';
import { getPages } from '@/app/(admin)/admin/actions/pages';

export const metadata = {
  title: 'Pages CMS | Admin',
};

const SEEDED_PAGES = [
  'home', 'about', 'products', 'recipes', 'contact', 'careers', 'become-distributor'
];

export default async function PagesIndex() {
  const existingPages = await getPages();
  const allPages = Array.from(new Set([...SEEDED_PAGES, ...existingPages]));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-lora font-bold text-brand-primary">Pages CMS</h1>
      </div>

      <div className="bg-white rounded-lg border border-border-light shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Name (Slug)</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allPages.map(page => (
              <tr key={page} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 capitalize">{page.replace('-', ' ')}</div>
                  <div className="text-sm text-gray-500">/{page === 'home' ? '' : page}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`/admin/pages/${page}`}
                    className="text-brand-primary hover:text-brand-primary/80 inline-flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit Sections
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
