'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateDistributorInquiry } from '@/app/(admin)/admin/actions/forms';
import { DataTable } from '@/components/admin/ui/DataTable';
import { useToast } from '@/components/admin/ui/Toast';
import { Download, X, Building2, User, Phone, Mail, MapPin, Briefcase, Calendar, MessageSquare, Layers } from 'lucide-react';

export function DistributorClient({ data }: { data: any[] }) {
  const toast = useToast();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateDistributorInquiry(id, { status });
      toast.success('Status updated');
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status });
      }
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
    { key: 'company_name', title: 'Company Name', sortable: true },
    { key: 'contact_person', title: 'Contact Person', sortable: true },
    { key: 'phone', title: 'Phone' },
    { key: 'city', title: 'City', sortable: true },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (d: any) => (
        <select
          value={d.status || 'submitted'}
          onChange={(e) => handleStatusChange(d.id, e.target.value)}
          className="rounded-md border-gray-300 text-xs font-semibold px-2 py-1 focus:border-brand-primary focus:ring-brand-primary"
        >
          <option value="submitted">Submitted</option>
          <option value="unread">Unread</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (d: any) => (
        <button
          onClick={() => setSelectedItem(d)}
          className="text-xs font-semibold text-brand-primary hover:underline"
        >
          View Full Details
        </button>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
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

      {/* Details Modal Popup */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              data-lenis-prevent
              className="relative bg-white rounded-2xl w-full max-w-2xl border border-border-light shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-base font-serif">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-serif">{selectedItem.company_name}</h3>
                    <p className="text-xs text-gray-500">
                      Distributor Enquiry submitted on {new Date(selectedItem.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 space-y-6" data-lenis-prevent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <User className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Contact Person</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.contact_person}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Mobile Phone</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.phone}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Email Address</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.email}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Location</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">
                        {[selectedItem.city, selectedItem.district, selectedItem.state].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Business Type</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.business_type || 'Not specified'}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <Layers className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Expected Order Volume</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.expected_order_volume || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {selectedItem.message && (
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-brand-primary" />
                      Inquiry Message / Commercial Background
                    </h4>
                    <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedItem.message}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
