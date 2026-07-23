import React from 'react';
import { ProductForm } from '@/components/admin/products/ProductForm';

export const metadata = {
  title: 'New Product | Admin',
};

export default function NewProductPage() {
  return <ProductForm />;
}
