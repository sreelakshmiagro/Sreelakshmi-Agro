import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getPageSections } from '@/app/(admin)/admin/actions/pages';
import { PageSectionsEditor } from '@/components/admin/pages/PageSectionsEditor';

export const metadata = {
  title: 'Edit Page | Admin',
};

export default async function EditPagePage({
  params,
}: {
  params: Promise<{ pageSlug: string }>;
}) {
  const resolvedParams = await params;
  const pageSlug = resolvedParams.pageSlug;
  const sections = await getPageSections(pageSlug);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/pages" className="text-gray-500 hover:text-gray-900">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-lora font-bold text-brand-primary capitalize">
            Edit Page: {pageSlug.replace('-', ' ')}
          </h1>
          <p className="text-sm text-gray-500">Manage content sections for this page.</p>
        </div>
      </div>

      <PageSectionsEditor pageSlug={pageSlug} initialSections={sections} />
    </div>
  );
}
