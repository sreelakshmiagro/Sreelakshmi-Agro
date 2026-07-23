'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';

interface TestimonialsClientProps {
  testimonials: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function TestimonialsClient({ testimonials, currentPage, totalPages }: TestimonialsClientProps) {
  const columns = [
    {
      key: 'customer_name',
      title: 'Customer Name',
      sortable: true,
      render: (t: any) => (
        <Link href={`/admin/testimonials/${t.id}`} className="text-brand-primary hover:underline font-medium">
          {t.customer_name}
        </Link>
      ),
    },
    { key: 'company', title: 'Company', sortable: true },
    { key: 'rating', title: 'Rating', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (t: any) => <StatusBadge status={t.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (t: any) => (
        <Link href={`/admin/testimonials/${t.id}`} className="text-sm text-gray-500 hover:text-brand-primary flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      ),
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Link>
      </div>
      
      <DataTable
        data={testimonials}
        columns={columns}
        searchKey="customer_name"
        searchPlaceholder="Search testimonials..."
      />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/testimonials" />
    </div>
  );
}
