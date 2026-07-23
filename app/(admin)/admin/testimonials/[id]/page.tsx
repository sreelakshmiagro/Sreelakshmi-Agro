'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { createTestimonial, updateTestimonial, getTestimonial, deleteTestimonial } from '../../actions/testimonials';
import { useToast } from '@/components/admin/ui/Toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TestimonialFormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === 'new';
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNew);
  const [showDelete, setShowDelete] = useState(false);
  
  const [formData, setFormData] = useState({
    customer_name: '',
    designation: '',
    company: '',
    review: '',
    rating: 5,
    status: 'draft',
    is_featured: false,
  });

  useEffect(() => {
    if (!isNew) {
      getTestimonial(id).then(data => {
        setFormData(data);
        setInitialLoading(false);
      }).catch(err => {
        toast.error('Failed to load testimonial', err.message);
        router.push('/admin/testimonials');
      });
    }
  }, [isNew, id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isNew) {
        await updateTestimonial(id, formData);
        toast.success('Testimonial updated successfully');
      } else {
        await createTestimonial(formData);
        toast.success('Testimonial created successfully');
      }
      router.push('/admin/testimonials');
    } catch (err: any) {
      toast.error('Failed to save testimonial', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isNew) return;
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted successfully');
      router.push('/admin/testimonials');
    } catch (err: any) {
      toast.error('Failed to delete testimonial', err.message);
    }
  };

  if (initialLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/testimonials" className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {isNew ? 'New Testimonial' : 'Edit Testimonial'}
          </h1>
        </div>
        {!isNew && (
          <button
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border-light bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input
              required
              type="text"
              value={formData.customer_name}
              onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={e => setFormData({ ...formData, company: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Review</label>
            <textarea
              required
              rows={4}
              value={formData.review}
              onChange={e => setFormData({ ...formData, review: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value })}
              className="mt-1 block w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/admin/testimonials"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </div>
  );
}
