import React from 'react';
import { getProducts } from '../actions/products';
import { ProductsClient } from '@/components/admin/products/ProductsClient';

export const metadata = {
  title: 'Products | Admin',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const status = resolvedParams.status;
  const { products, total } = await getProducts(page, 20, status);
  const totalPages = Math.ceil((total || 0) / 20);

  return (
    <ProductsClient
      products={products || []}
      total={total || 0}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
