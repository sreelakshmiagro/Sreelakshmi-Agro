import React from 'react';
import { getFaqs } from '../actions/faqs';
import { FaqsClient } from '@/components/admin/faqs/FaqsClient';

export const metadata = {
  title: 'FAQs | Admin',
};

export default async function FaqsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const status = resolvedParams.status;
  const { faqs, total } = await getFaqs(page, 50, status);
  const totalPages = Math.ceil((total || 0) / 50);

  return (
    <FaqsClient
      faqs={faqs || []}
      total={total || 0}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
