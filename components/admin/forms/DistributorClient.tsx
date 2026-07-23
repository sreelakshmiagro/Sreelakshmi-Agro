'use client';

import React, { useState } from 'react';
import { updateDistributorInquiry } from '@/app/(admin)/admin/actions/forms';
import { DataTable } from '@/components/admin/ui/DataTable';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { useToast } from '@/components/admin/ui/Toast';
import { Download } from 'lucide-react';

export function DistributorClient({ data }: { data: any[] }) {
  const toast = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDistributorInquiry(id, { status });
      toast.success('Status updated');
    } catch (err: any) {
      toast.error('Failed to update status', err.message);
    }
  };

  const exportCSV = () => {
    if (!data.length) return;
    const headers = ['Company Name', 'Contact Person', 'Email', 'Phone', 'City', 'State', 'Status'];
    const rows = data.map(d => [
      d.company_name, d.contact_person, d.email, d.phone, d.city, d.state, d.status
    ]);
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'distributor_enquiries.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    { key: 'company_name', title: 'Company', sortable: true },
    { key: 'contact_person', title: 'Contact Person', sortable: true },
    { key: 'phone', title: 'Phone' },
    { key: 'city', title: 'City', sortable: true },
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
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <DataTable
        data={data}
        columns={columns}
        searchKey="company_name"
        searchPlaceholder="Search companies..."
      />

      {expandedId && (
        <div className="rounded-lg border border-border-light bg-gray-50 p-6 mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Inquiry Details</h3>
          {(() => {
            const d = data.find(item => item.id === expandedId);
            if (!d) return null;
            return (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Email:</strong> {d.email}</div>
                <div><strong>WhatsApp:</strong> {d.whatsapp}</div>
                <div><strong>State:</strong> {d.state}</div>
                <div><strong>District:</strong> {d.district}</div>
                <div><strong>Business Type:</strong> {d.business_type}</div>
                <div><strong>Years in Business:</strong> {d.years_in_business}</div>
                <div><strong>Expected Volume:</strong> {d.expected_order_volume}</div>
                <div className="col-span-2 mt-4">
                  <strong>Message:</strong>
                  <p className="mt-1 text-gray-600">{d.message}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
