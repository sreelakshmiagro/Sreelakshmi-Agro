'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateContactInquiry } from '@/app/(admin)/admin/actions/forms';
import { DataTable } from '@/components/admin/ui/DataTable';
import { useToast } from '@/components/admin/ui/Toast';
import { Mail, Phone, User, MessageSquare, X, Calendar } from 'lucide-react';

export function ContactsClient({ data }: { data: any[] }) {
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
      await updateContactInquiry(id, { status });
      toast.success('Status updated');
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status });
      }
    } catch (err: any) {
      toast.error('Failed to update status', err.message);
    }
  };

  const columns = [
    { key: 'name', title: 'Name', sortable: true },
    { key: 'email', title: 'Email Address', sortable: true },
    { key: 'subject', title: 'Subject' },
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
          View Message
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
        searchPlaceholder="Search messages by name, email..."
      />

      {/* Message Modal Popup */}
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
              className="relative bg-white rounded-2xl w-full max-w-xl border border-border-light shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-base font-serif">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-serif">{selectedItem.name}</h3>
                    <p className="text-xs text-gray-500">
                      Contact Message sent on {new Date(selectedItem.created_at).toLocaleString()}
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

              <div className="overflow-y-auto p-6 space-y-5" data-lenis-prevent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <Mail className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Email Address</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.email}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] font-semibold text-gray-500 uppercase">Mobile Phone</p>
                      <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-amber-700" />
                    Subject: {selectedItem.subject}
                  </h4>
                  <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedItem.message}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
