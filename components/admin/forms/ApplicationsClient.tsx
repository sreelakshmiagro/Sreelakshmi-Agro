'use client';

import React, { useState } from 'react';
import { updateJobApplication } from '@/app/(admin)/admin/actions/forms';
import { DataTable } from '@/components/admin/ui/DataTable';
import { useToast } from '@/components/admin/ui/Toast';
import { ExternalLink } from 'lucide-react';

export function ApplicationsClient({ data }: { data: any[] }) {
  const toast = useToast();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateJobApplication(id, { status });
      toast.success('Status updated');
    } catch (err: any) {
      toast.error('Failed to update status', err.message);
    }
  };

  const columns = [
    { key: 'applicant_name', title: 'Applicant', sortable: true },
    { key: 'email', title: 'Email', sortable: true },
    { 
      key: 'job_title', 
      title: 'Job Position',
      render: (d: any) => d.jobs?.title || 'Unknown Position'
    },
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
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
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
        searchKey="applicant_name"
        searchPlaceholder="Search applicants..."
      />

      {expandedId && (
        <div className="rounded-lg border border-border-light bg-gray-50 p-6 mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Application Details</h3>
          {(() => {
            const d = data.find(item => item.id === expandedId);
            if (!d) return null;
            return (
              <div className="text-sm space-y-4">
                <div><strong>Phone:</strong> {d.phone}</div>
                {d.resume_url && (
                  <div>
                    <strong>Resume:</strong>{' '}
                    <a href={d.resume_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-brand-primary hover:underline">
                      View Resume <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {d.cover_letter && (
                  <div>
                    <strong>Cover Letter:</strong>
                    <p className="mt-1 text-gray-600 whitespace-pre-wrap">{d.cover_letter}</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
