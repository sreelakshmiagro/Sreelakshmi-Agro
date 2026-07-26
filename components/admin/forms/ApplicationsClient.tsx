'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { updateJobApplication, deleteJobApplication } from '@/app/(admin)/admin/actions/forms';
import { DataTable } from '@/components/admin/ui/DataTable';
import { useToast } from '@/components/admin/ui/Toast';
import { Download, Trash2, Calendar, Briefcase, GraduationCap, Building2, DollarSign, Clock, FileText, Mail, Phone, MapPin, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ApplicationsClient({ data }: { data: any[] }) {
  const toast = useToast();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Close modal on Escape key
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
      await updateJobApplication(id, { status });
      toast.success('Application Status Updated', `Status changed to ${status}`);
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem({ ...selectedItem, status });
      }
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to update status', err.message);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete application from ${name}?`)) return;
    setDeletingId(id);
    try {
      await deleteJobApplication(id);
      toast.delete('Application Deleted', `Application for ${name} removed`);
      if (selectedItem && selectedItem.id === id) {
        setSelectedItem(null);
      }
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to delete application', err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDownloadResume = (e: React.MouseEvent, applicantName: string, resumePath?: string) => {
    e.preventDefault();
    if (!resumePath) {
      toast.warning('No Resume File', 'No resume file attached to this application.');
      return;
    }

    const safeName = (applicantName || 'Candidate').replace(/\s+/g, '_');

    // 1. Base64 Data URL
    if (resumePath.startsWith('data:')) {
      const mimeMatch = resumePath.match(/^data:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
      const ext = mime.includes('word') || mime.includes('document') ? 'docx' : 'pdf';

      const a = document.createElement('a');
      a.href = resumePath;
      a.download = `${safeName}_Resume.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Resume Downloaded', `Downloaded original CV for ${applicantName}`);
      return;
    }

    // 2. Full HTTP/HTTPS URL
    if (resumePath.startsWith('http://') || resumePath.startsWith('https://')) {
      fetch(resumePath)
        .then((res) => {
          if (!res.ok) throw new Error('File not found in storage');
          return res.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${safeName}_Resume.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.success('Resume Downloaded', `Downloaded CV for ${applicantName}`);
        })
        .catch(() => {
          window.open(resumePath, '_blank');
        });
      return;
    }

    // 3. Storage Relative Path
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fsyqsenggdudvddekoij.supabase.co';
    const cleanPath = resumePath.replace(/^local-/, '').replace(/^\/+/, '');
    const targetUrl = cleanPath.startsWith('resumes/') || cleanPath.startsWith('media/')
      ? `${supabaseUrl}/storage/v1/object/public/${cleanPath}`
      : `${supabaseUrl}/storage/v1/object/public/resumes/${cleanPath}`;

    fetch(targetUrl)
      .then((res) => {
        if (!res.ok) throw new Error('File not found in storage');
        return res.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${safeName}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Resume Downloaded', `Downloaded CV for ${applicantName}`);
      })
      .catch(() => {
        window.open(targetUrl, '_blank');
      });
  };

  const columns = [
    {
      key: 'applicant_name',
      title: 'Applicant Name',
      sortable: true,
      render: (d: any) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{d.applicant_name}</span>
          <span className="text-xs text-gray-500">{new Date(d.created_at).toLocaleDateString()}</span>
        </div>
      )
    },
    { key: 'email', title: 'Email Address', sortable: true },
    {
      key: 'job_title',
      title: 'Job Position',
      render: (d: any) => (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-primary/10 text-brand-primary">
          {d.jobs?.title || 'General Opening'}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (d: any) => (
        <select
          value={d.status || 'submitted'}
          onChange={(e) => handleStatusChange(d.id, e.target.value)}
          className={`rounded-lg border text-xs font-semibold px-2.5 py-1.5 focus:ring-2 focus:ring-brand-primary/20 ${
            d.status === 'hired'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : d.status === 'shortlisted'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : d.status === 'rejected'
              ? 'bg-red-50 text-red-700 border-red-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}
        >
          <option value="submitted">Submitted</option>
          <option value="unread">Unread</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="hired">Hired</option>
        </select>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (d: any) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedItem(d)}
            className="text-xs font-semibold text-brand-primary hover:text-brand-secondary underline"
          >
            View Full Profile
          </button>

          <button
            onClick={() => handleDelete(d.id, d.applicant_name)}
            disabled={deletingId === d.id}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <DataTable
        data={data}
        columns={columns}
        searchKey="applicant_name"
        searchPlaceholder="Search candidates by name, email..."
      />

      {/* Candidate Profile Modal Popup */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* Backdrop Closer */}
            <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              data-lenis-prevent
              className="relative bg-white rounded-2xl w-full max-w-4xl border border-border-light shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10"
            >
              {/* Modal Sticky Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/80 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-base font-serif">
                    {selectedItem.applicant_name ? selectedItem.applicant_name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 font-serif leading-snug">{selectedItem.applicant_name}</h3>
                    <p className="text-xs text-gray-500">
                      Applied for <span className="font-semibold text-brand-primary">{selectedItem.jobs?.title || 'Open Position'}</span> on {new Date(selectedItem.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {selectedItem.resume_url && (
                    <button
                      onClick={(e) => handleDownloadResume(e, selectedItem.applicant_name, selectedItem.resume_url)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-white text-xs font-semibold rounded-xl shadow transition-all duration-200 hover:scale-[1.02] shrink-0"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Resume</span>
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Content Body */}
              <div className="overflow-y-auto p-6 space-y-6" data-lenis-prevent>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Candidate Full Profile</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Location (State / District)</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">
                          {selectedItem.state || selectedItem.district || selectedItem.city
                            ? [selectedItem.city, selectedItem.district, selectedItem.state].filter(Boolean).join(", ")
                            : 'Not specified'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <Briefcase className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Years of Experience</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.experience_years ? `${selectedItem.experience_years} Years` : 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <GraduationCap className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Highest Qualification</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.qualification || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Current Company</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.current_company || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <DollarSign className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Expected Salary</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.expected_salary || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <Clock className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Notice Period</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">{selectedItem.notice_period || 'Not specified'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bg-secondary border border-border-light flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-brand-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-[11px] font-semibold text-gray-500 uppercase">Application Date</p>
                        <p className="text-xs font-medium text-gray-900 mt-0.5">{new Date(selectedItem.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter Section */}
                {selectedItem.cover_letter && (
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-700" />
                      Cover Letter / Professional Summary
                    </h4>
                    <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">{selectedItem.cover_letter}</p>
                  </div>
                )}

                {/* Custom Fields (If Any) */}
                {selectedItem.custom_fields && Object.keys(selectedItem.custom_fields).length > 0 && (
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Custom Form Answers</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(selectedItem.custom_fields).map(([k, v]: [string, any]) => (
                        <div key={k} className="text-xs">
                          <span className="font-semibold text-gray-700 uppercase">{k}: </span>
                          <span className="text-gray-900">{String(v)}</span>
                        </div>
                      ))}
                    </div>
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
