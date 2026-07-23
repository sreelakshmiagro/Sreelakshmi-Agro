'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';

interface CareersClientProps {
  jobs: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function CareersClient({ jobs, currentPage, totalPages }: CareersClientProps) {
  const columns = [
    {
      key: 'title',
      title: 'Job Title',
      sortable: true,
      render: (j: any) => (
        <Link href={`/admin/careers/${j.id}`} className="text-brand-primary hover:underline font-medium">
          {j.title}
        </Link>
      ),
    },
    { key: 'department', title: 'Department', sortable: true },
    { key: 'location', title: 'Location', sortable: true },
    {
      key: 'applications',
      title: 'Applications',
      render: (j: any) => j.job_applications?.[0]?.count || 0,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (j: any) => <StatusBadge status={j.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (j: any) => (
        <Link href={`/admin/careers/${j.id}`} className="text-sm text-gray-500 hover:text-brand-primary flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      ),
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Careers</h1>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </Link>
      </div>
      
      <DataTable
        data={jobs}
        columns={columns}
        searchKey="title"
        searchPlaceholder="Search jobs..."
      />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/careers" />
    </div>
  );
}
