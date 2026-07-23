'use client';

import React, { useState } from 'react';
import { updateContactInquiry } from '@/app/(admin)/admin/actions/forms';
import { DataTable } from '@/components/admin/ui/DataTable';
import { useToast } from '@/components/admin/ui/Toast';

export function ContactsClient({ data }: { data: any[] }) {
  const toast = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateContactInquiry(id, { status });
      toast.success('Status updated');
    } catch (err: any) {
      toast.error('Failed to update status', err.message);
    }
  };

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { key: 'subject', title: 'Subject' },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (d: any) => (
        <select
          value={d.status}
          onChange={(e) => handleStatusChange(d.id, e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:border-brand-primary focus:ring-brand-primary"
        >
          <option value="unread">Unread</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      )
    },
    {
      key: 'actions',
      title: '',
      render: (d: any) => (
        <button
          onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
          className="text-sm text-brand-primary hover:underline"
        >
          {expandedId === d.id ? 'Hide Details' : 'View Details'}
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search names..."
      />

      {expandedId && (
        <div className="rounded-lg border border-border-light bg-gray-50 p-6 mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Message Details</h3>
          {(() => {
            const d = data.find(item => item.id === expandedId);
            if (!d) return null;
            return (
              <div className="text-sm">
                <div className="mb-4"><strong>Phone:</strong> {d.phone}</div>
                <div>
                  <strong>Message:</strong>
                  <p className="mt-1 text-gray-600 whitespace-pre-wrap">{d.message}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
