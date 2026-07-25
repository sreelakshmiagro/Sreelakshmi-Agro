import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getFormConfigs } from '@/app/(admin)/admin/actions/forms';
import { FormTemplatesClient } from '@/components/admin/forms/FormTemplatesClient';

export const metadata = {
  title: 'Edit Form Templates | Admin',
};

export default async function FormTemplatesPage() {
  const configs = await getFormConfigs();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/forms" className="text-gray-500 hover:text-gray-900 transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Form Templates & Field Management</h1>
          <p className="text-xs text-gray-500">Edit form headings, instructions, button text, field labels, and placeholders for Careers, Distributor, and Contact forms</p>
        </div>
      </div>

      <FormTemplatesClient initialConfigs={configs} />
    </div>
  );
}
