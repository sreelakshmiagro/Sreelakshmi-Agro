'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, CheckSquare, Square, AlertTriangle, Copy } from 'lucide-react';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { Pagination } from '@/components/admin/ui/Pagination';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { useToast } from '@/components/admin/ui/Toast';
import { deleteProduct, deleteProducts, duplicateProduct } from '@/app/(admin)/admin/actions/products';

interface ProductsClientProps {
  products: any[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function ProductsClient({ products, currentPage, totalPages }: ProductsClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBulkDelete, setShowBulkDelete] = useState(false);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const isAllSelected = products.length > 0 && selectedIds.length === products.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(products.map((p) => p.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    setDeleting(true);
    try {
      const res = await deleteProducts(selectedIds);
      if (!res.success) {
        toast.error('Failed to delete products', res.error);
        return;
      }
      toast.success(`Successfully deleted ${selectedIds.length} product(s)`);
      setSelectedIds([]);
      setShowBulkDelete(false);
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to delete products', err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleSingleDelete = async () => {
    if (!singleDeleteId) return;
    setDeleting(true);
    try {
      const res = await deleteProduct(singleDeleteId);
      if (!res.success) {
        toast.error('Failed to delete product', res.error);
        return;
      }
      toast.success('Product deleted successfully');
      setSingleDeleteId(null);
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to delete product', err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-xs text-gray-500 mt-1">Manage catalog, category badges, FAQs, and specs</p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowBulkDelete(true)}
              className="inline-flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected ({selectedIds.length})
            </button>
          )}

          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Products Table with Checkboxes */}
      <div className="bg-white rounded-lg border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-border-light text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="p-4 w-10 text-center">
                  <button
                    type="button"
                    onClick={toggleSelectAll}
                    className="text-gray-400 hover:text-brand-primary focus:outline-none"
                    title={isAllSelected ? 'Deselect All' : 'Select All'}
                  >
                    {isAllSelected ? (
                      <CheckSquare className="w-4 h-4 text-brand-primary" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="p-4">Product</th>
                <th className="p-4">Category</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-sm text-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500">
                    No products found. Click &quot;Add Product&quot; to create one.
                  </td>
                </tr>
              ) : (
                products.map((p) => {
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      className={`hover:bg-gray-50/80 transition-colors ${
                        isSelected ? 'bg-brand-primary/5' : ''
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <td className="p-4 text-center">
                        <button
                          type="button"
                          onClick={() => toggleSelectRow(p.id)}
                          className="text-gray-400 hover:text-brand-primary focus:outline-none"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-brand-primary" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Name & Thumbnail */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded border border-gray-200 bg-gray-50 overflow-hidden shrink-0">
                            {p.hero_image ? (
                              <Image src={p.hero_image} alt={p.name} fill className="object-contain p-1" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="text-[10px]">No Img</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <Link
                              href={`/admin/products/${p.id}`}
                              className="font-semibold text-gray-900 hover:text-brand-primary transition-colors"
                            >
                              {p.name}
                            </Link>
                            {p.is_flagship && (
                              <span className="ml-2 inline-block px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                                Flagship
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                          {p.category || 'Wheat Grains'}
                        </span>
                      </td>

                      {/* Slug */}
                      <td className="p-4 font-mono text-xs text-gray-500">
                        {p.slug}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <StatusBadge status={p.status} />
                      </td>

                      {/* Actions */}
                      <td className="p-4 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                const res = await duplicateProduct(p.id);
                                toast.success('Product duplicated successfully as (Copy)');
                                router.push(`/admin/products/${res.newId}`);
                              } catch (err: any) {
                                toast.error('Failed to duplicate product', err.message);
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-sans text-xs font-semibold border border-indigo-200/60 shadow-2xs transition-all hover:scale-105 active:scale-95"
                            title="Duplicate Product"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>Duplicate</span>
                          </button>
                          <Link
                            href={`/admin/products/${p.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary font-sans text-xs font-semibold border border-brand-primary/20 shadow-2xs transition-all hover:scale-105 active:scale-95"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() => setSingleDeleteId(p.id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 font-sans text-xs font-semibold border border-rose-200/60 shadow-2xs transition-all hover:scale-105 active:scale-95"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl="/admin/products" />

      {/* Bulk Delete Confirm Modal */}
      <ConfirmDialog
        isOpen={showBulkDelete}
        onClose={() => setShowBulkDelete(false)}
        onConfirm={handleBulkDelete}
        title={`Delete ${selectedIds.length} Product(s)`}
        message={`Are you sure you want to delete ${selectedIds.length} selected product(s)? This will permanently delete them from the website.`}
      />

      {/* Single Delete Confirm Modal */}
      <ConfirmDialog
        isOpen={!!singleDeleteId}
        onClose={() => setSingleDeleteId(null)}
        onConfirm={handleSingleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
