'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';

interface FaqsClientProps {
  faqs: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function FaqsClient({ faqs, currentPage, totalPages }: FaqsClientProps) {
  const columns = [
    {
      key: 'question',
      title: 'Question',
      sortable: true,
      render: (f: any) => (
        <Link href={`/admin/faqs/${f.id}`} className="text-brand-primary hover:underline font-medium">
          {f.question}
        </Link>
      ),
    },
    { key: 'category', title: 'Category', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (f: any) => <StatusBadge status={f.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (f: any) => (
        <Link href={`/admin/faqs/${f.id}`} className="text-sm text-gray-500 hover:text-brand-primary flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      ),
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">FAQs</h1>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add FAQ
        </Link>
      </div>
      
      <DataTable
        data={faqs}
        columns={columns}
        searchKey="question"
        searchPlaceholder="Search questions..."
      />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/faqs" />
    </div>
  );
}
