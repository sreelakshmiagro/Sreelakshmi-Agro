'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';

interface ProductsClientProps {
  products: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function ProductsClient({ products, currentPage, totalPages }: ProductsClientProps) {
  const columns = [
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      render: (p: any) => (
        <Link href={`/admin/products/${p.id}`} className="text-brand-primary hover:underline font-medium">
          {p.name}
        </Link>
      ),
    },
    { key: 'slug', title: 'Slug', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (p: any) => <StatusBadge status={p.status} />,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (p: any) => (
        <Link href={`/admin/products/${p.id}`} className="text-sm text-gray-500 hover:text-brand-primary flex items-center gap-1">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      ),
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>
      
      <DataTable
        data={products}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search products..."
      />
      
      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/products" />
    </div>
  );
}
