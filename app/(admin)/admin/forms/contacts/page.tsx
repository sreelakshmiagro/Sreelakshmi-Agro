import React from 'react';
import { getContactInquiries } from '../../actions/forms';
import { ContactsClient } from '@/components/admin/forms/ContactsClient';
import { Pagination } from '@/components/admin/ui/Pagination';

export const metadata = {
  title: 'Contact Submissions | Admin',
};

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const { inquiries, total } = await getContactInquiries(page, 20);
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
        <p className="mt-1 text-sm text-gray-500">Manage messages from the contact page.</p>
      </div>

      <ContactsClient data={inquiries} />
      
      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/admin/forms/contacts" />
    </div>
  );
}
