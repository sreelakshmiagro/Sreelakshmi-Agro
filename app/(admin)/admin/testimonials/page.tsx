import React from 'react';
import { getTestimonials } from '../actions/testimonials';
import { TestimonialsClient } from '@/components/admin/testimonials/TestimonialsClient';

export const metadata = {
  title: 'Testimonials | Admin',
};

export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const status = resolvedParams.status;
  const { testimonials, total } = await getTestimonials(page, 20, status);
  const totalPages = Math.ceil((total || 0) / 20);

  return (
    <TestimonialsClient
      testimonials={testimonials || []}
      total={total || 0}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
