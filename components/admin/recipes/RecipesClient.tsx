'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Copy } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';
import { useToast } from '@/components/admin/ui/Toast';
import { duplicateRecipe } from '@/app/(admin)/admin/actions/recipes';

interface RecipesClientProps {
  recipes: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function RecipesClient({ recipes, currentPage, totalPages }: RecipesClientProps) {
  const router = useRouter();
  const toast = useToast();

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
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              try {
                const res = await duplicateRecipe(r.id);
                toast.success('Recipe duplicated successfully as (Copy)');
                router.push(`/admin/recipes/${res.newId}`);
              } catch (err: any) {
                toast.error('Failed to duplicate recipe', err.message);
              }
            }}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            title="Duplicate Recipe"
          >
            <Copy className="w-3.5 h-3.5" /> Duplicate
          </button>
          <Link href={`/admin/recipes/${r.id}`} className="text-xs text-gray-500 hover:text-brand-primary font-medium flex items-center gap-1">
            <Edit className="w-3.5 h-3.5" /> Edit
          </Link>
        </div>
      ),
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
          <p className="text-xs text-gray-500 mt-1">Manage cooking recipes, dish photos, steps, and product links</p>
        </div>
        <Link
          href="/admin/recipes/new"
          className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 shadow-sm"
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
