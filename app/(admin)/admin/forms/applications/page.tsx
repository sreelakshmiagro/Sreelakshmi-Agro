import React from 'react';
import { getJobApplications } from '../../actions/forms';
import { ApplicationsClient } from '@/components/admin/forms/ApplicationsClient';
import { Pagination } from '@/components/admin/ui/Pagination';

export const metadata = {
  title: 'Job Applications | Admin',
};

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const { applications, total } = await getJobApplications(page, 20);
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
        <p className="mt-1 text-sm text-gray-500">Manage candidate applications.</p>
      </div>

      <ApplicationsClient data={applications} />
      
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/admin/forms/applications" />
    </div>
  );
}
