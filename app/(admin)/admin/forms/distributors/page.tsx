import React from 'react';
import { getDistributorInquiries } from '../../actions/forms';
import { DistributorClient } from '@/components/admin/forms/DistributorClient';
import { Pagination } from '@/components/admin/ui/Pagination';

export const metadata = {
  title: 'Distributor Enquiries | Admin',
};

export default async function DistributorsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const { inquiries, total } = await getDistributorInquiries(page, 20);
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Distributor Enquiries</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and respond to prospective distributors.</p>
      </div>

      <DistributorClient data={inquiries} />
      
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/admin/forms/distributors" />
    </div>
  );
}
