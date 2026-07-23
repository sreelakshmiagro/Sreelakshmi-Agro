'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';

interface RecipesClientProps {
  recipes: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function RecipesClient({ recipes, currentPage, totalPages }: RecipesClientProps) {
  const columns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (r: any) => (
        <Link href={`/admin/recipes/${r.id}`} className="text-brand-primary hover:underline font-medium">
          {r.name}
        </Link>
      ),
    },
    { key: 'difficulty', title: 'Difficulty', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (r: any) => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (r: any) => (
        <Link href={`/admin/recipes/${r.id}`} className="text-sm text-gray-500 hover:text-brand-primary flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      ),
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
        <Link
          href="/admin/recipes/new"
          className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Recipe
        </Link>
      </div>
      
      <DataTable
        data={recipes}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search recipes..."
      />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/recipes" />
    </div>
  );
}
