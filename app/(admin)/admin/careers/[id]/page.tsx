'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createJob, updateJob, getJob, deleteJob } from '../../actions/careers';
import { useToast } from '@/components/admin/ui/Toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { Save, Trash2, ArrowLeft, Plus, X, Briefcase, CheckSquare, Layers, HelpCircle } from 'lucide-react';

export default function CareerFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === 'new';
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNew);
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'requirements' | 'benefits'>('basic');
  
  const [formData, setFormData] = useState({
    title: '',
    department: 'Research & Development',
    location: 'Harvest Valley Facility (On-site)',
    employment_type: 'Full-Time',
    experience: '4 - 6 Years',
    salary_range: 'Competitive',
    description: '',
    status: 'published',
  });

  const [requirements, setRequirements] = useState<string[]>([
    'B.Tech / M.Tech in Food Technology or agricultural engineering.',
    'Thorough understanding of ISO 22000 and HACCP food safety standards.',
    'Experience auditing milling parameters and grain moisture thresholds.'
  ]);

  const [benefits, setBenefits] = useState<string[]>([
    'Competitive annual compensation package.',
    'Comprehensive medical safety insurances.',
    'Direct exposure to automated parboiling technologies.'
  ]);

  useEffect(() => {
    if (!isNew) {
      getJob(id)
        .then((data) => {
          setFormData({
            title: data.title || '',
            department: data.department || '',
            location: data.location || '',
            employment_type: data.employment_type || 'Full-Time',
            experience: data.experience || '',
            salary_range: data.salary_range || '',
            description: data.description || '',
            status: data.status || 'published',
          });

          if (Array.isArray(data.requirements)) {
            setRequirements(data.requirements);
          } else if (typeof data.requirements === 'string') {
            try { setRequirements(JSON.parse(data.requirements)); } catch { setRequirements([data.requirements]); }
          }

          if (Array.isArray(data.benefits)) {
            setBenefits(data.benefits);
          } else if (typeof data.benefits === 'string') {
            try { setBenefits(JSON.parse(data.benefits)); } catch { setBenefits([data.benefits]); }
          }

          setInitialLoading(false);
        })
        .catch((err) => {
          toast.error('Failed to load job', err.message);
          router.push('/admin/careers');
        });
    }
  }, [isNew, id, router]);

  const handleAddRequirement = () => setRequirements((prev) => [...prev, '']);
  const handleRemoveRequirement = (index: number) => setRequirements((prev) => prev.filter((_, i) => i !== index));

  const handleAddBenefit = () => setBenefits((prev) => [...prev, '']);
  const handleRemoveBenefit = (index: number) => setBenefits((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      requirements: requirements.filter((r) => r.trim()),
      benefits: benefits.filter((b) => b.trim()),
    };

    try {
      if (!isNew) {
        await updateJob(id, payload);
        toast.success('Job position updated successfully');
      } else {
        await createJob(payload);
        toast.success('New job position published successfully');
      }
      router.push('/admin/careers');
    } catch (err: any) {
      toast.error('Failed to save job', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isNew) return;
    try {
      await deleteJob(id);
      toast.success('Job position deleted successfully');
      router.push('/admin/careers');
    } catch (err: any) {
      toast.error('Failed to delete job', err.message);
    }
  };

  if (initialLoading) return <div className="p-6 text-gray-500 font-medium">Loading job details...</div>;

  return (
    <div className="max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/careers" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isNew ? 'New Job Opening' : `Edit: ${formData.title || 'Job Opening'}`}
            </h1>
            <p className="text-xs text-gray-500">Configure role requirements, perks, description, and status for website listing</p>
          </div>
        </div>
        {!isNew && (
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'basic' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Basic Info & Description
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('requirements')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'requirements' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <CheckSquare className="w-4 h-4" /> Key Requirements ({requirements.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('benefits')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'benefits' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Benefits & Perks ({benefits.length})
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border-light bg-white p-6 shadow-sm">
        
        {/* TAB 1: BASIC INFO & DESCRIPTION */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Title *</label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Senior Food Technologist"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Department *</label>
                <input
                  required
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Research & Development / Operations / Sales"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Location *</label>
                <input
                  required
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Harvest Valley Facility (On-site)"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Employment Type *</label>
                <select
                  value={formData.employment_type}
                  onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Experience Required *</label>
                <input
                  required
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g. 4 - 6 Years"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Job Description *</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                placeholder="We are seeking an experienced Food Technologist to lead quality parboiling audits, grain grading, and dynamic processing research..."
                className="mt-1 block w-full rounded-md border border-gray-300 p-3 text-sm leading-relaxed focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Listing Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="mt-1 block w-48 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              >
                <option value="published">Published (Visible on site)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="closed">Closed (Filled position)</option>
              </select>
            </div>
          </div>
        )}

        {/* TAB 2: KEY REQUIREMENTS */}
        {activeTab === 'requirements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Key Requirements Bullet Points</h3>
                <p className="text-xs text-gray-500">Add individual skill and qualification requirements for this position</p>
              </div>
              <button
                type="button"
                onClick={handleAddRequirement}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 text-xs font-bold"
              >
                <Plus className="w-4 h-4" /> Add Requirement
              </button>
            </div>

            <div className="space-y-3">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-400 w-6 text-right">#{idx + 1}</span>
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => {
                      const val = e.target.value;
                      setRequirements((prev) => prev.map((item, i) => (i === idx ? val : item)));
                    }}
                    placeholder="e.g. B.Tech / M.Tech in Food Technology or agricultural engineering."
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(idx)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: BENEFITS & PERKS */}
        {activeTab === 'benefits' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Benefits & Perks Bullet Points</h3>
                <p className="text-xs text-gray-500">Add compensation perks, health insurance, or work culture benefits</p>
              </div>
              <button
                type="button"
                onClick={handleAddBenefit}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 text-xs font-bold"
              >
                <Plus className="w-4 h-4" /> Add Benefit
              </button>
            </div>

            <div className="space-y-3">
              {benefits.map((ben, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-400 w-6 text-right">#{idx + 1}</span>
                  <input
                    type="text"
                    value={ben}
                    onChange={(e) => {
                      const val = e.target.value;
                      setBenefits((prev) => prev.map((item, i) => (i === idx ? val : item)));
                    }}
                    placeholder="e.g. Competitive annual compensation package."
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href="/admin/careers"
            className="rounded-md px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-50 shadow-sm"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Job Position'}
          </button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Job Opening"
        message="Are you sure you want to delete this job opening? This action cannot be undone."
      />
    </div>
  );
}
