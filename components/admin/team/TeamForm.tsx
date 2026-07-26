'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveTeamMember, deleteTeamMember } from '@/app/(admin)/admin/actions/team';
import { useToast } from '@/components/admin/ui/Toast';
import { ImageUploader } from '@/components/admin/ui/ImageUploader';
import { Trash2 } from 'lucide-react';

export function TeamForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    name: initialData?.name || '',
    designation: initialData?.designation || '',
    image: initialData?.image || '',
    status: initialData?.status || 'published',
    sort_order: initialData?.sort_order || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) {
      toast.error('Required fields missing', 'Please enter candidate name and designation');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dataToSave = { ...formData };
      if (!dataToSave.id) delete dataToSave.id;
      
      const res = await saveTeamMember(dataToSave);
      if (!res.success) {
        toast.error('Failed to save team member', res.error || 'Check fields');
        setIsSubmitting(false);
        return;
      }

      toast.success('Team member saved successfully');
      router.push('/admin/team');
      router.refresh();
    } catch (err: any) {
      toast.error('Submission error', err.message);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) return;
    if (!confirm(`Are you sure you want to delete team member ${formData.name}?`)) return;

    setIsDeleting(true);
    try {
      const res = await deleteTeamMember(formData.id);
      if (!res.success) {
        toast.error('Failed to delete team member', res.error);
        setIsDeleting(false);
        return;
      }
      toast.delete('Team Member Deleted', `${formData.name} removed successfully`);
      router.push('/admin/team');
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to delete team member', err.message);
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border border-border-light max-w-4xl">
      {/* Drag & Drop WebP Image Uploader */}
      <div className="bg-gray-50/60 p-4 rounded-lg border border-gray-200">
        <ImageUploader
          label="Team Member Profile Photo (Drag & Drop or Browse)"
          value={formData.image}
          onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
          placeholder="Drag & drop member profile photo here, or click to upload"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Name *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Shri. T. A. Girishkumar"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Designation *</label>
          <input
            type="text"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            placeholder="e.g. Managing Director & Founder"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          >
            <option value="published">Published (Visible)</option>
            <option value="active">Active (Visible)</option>
            <option value="draft">Draft (Hidden)</option>
          </select>
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Display Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={formData.sort_order}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div>
          {formData.id && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 text-sm font-semibold transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isDeleting ? 'Deleting...' : 'Delete Member'}</span>
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/team')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Saving Member...' : 'Save Team Member'}
          </button>
        </div>
      </div>
    </form>
  );
}
