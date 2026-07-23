import React from 'react';
import { getJobs } from '../actions/careers';
import { CareersClient } from '@/components/admin/careers/CareersClient';

export const metadata = {
  title: 'Careers | Admin',
};

export default async function CareersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const status = resolvedParams.status;
  const { jobs, total } = await getJobs(page, 20, status);
  const totalPages = Math.ceil((total || 0) / 20);

  return (
    <CareersClient
      jobs={jobs || []}
      total={total || 0}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
