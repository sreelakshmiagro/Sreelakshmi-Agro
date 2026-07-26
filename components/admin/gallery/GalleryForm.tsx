'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveGalleryImage, deleteGalleryImage } from '@/app/(admin)/admin/actions/gallery';
import { useToast } from '@/components/admin/ui/Toast';
import { ImageUploader } from '@/components/admin/ui/ImageUploader';
import { Trash2 } from 'lucide-react';

export function GalleryForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    title: initialData?.title || '',
    alt_text: initialData?.alt_text || '',
    image_url: initialData?.image_url || '',
    album: initialData?.album || 'general',
    category: initialData?.category || '',
    status: initialData?.status || 'published',
    sort_order: initialData?.sort_order || 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url) {
      toast.error('Image is required', 'Please upload an image or enter an image URL');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const dataToSave = { ...formData };
      if (!dataToSave.id) delete dataToSave.id;
      
      const res = await saveGalleryImage(dataToSave);
      if (!res.success) {
        toast.error('Failed to save image', res.error || 'Validation error');
        setIsSubmitting(false);
        return;
      }
      toast.success('Gallery image saved successfully');
      router.push('/admin/gallery');
      router.refresh();
    } catch (err: any) {
      toast.error('Submission error', err.message);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.id) return;
    if (!confirm(`Are you sure you want to delete this gallery image?`)) return;

    setIsDeleting(true);
    try {
      const res = await deleteGalleryImage(formData.id);
      if (!res.success) {
        toast.error('Failed to delete image', res.error);
        setIsDeleting(false);
        return;
      }
      toast.delete('Image Deleted', 'Gallery image removed successfully');
      router.push('/admin/gallery');
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to delete image', err.message);
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow border border-border-light max-w-4xl">
      {/* Drag and Drop Image Uploader (Auto WebP) */}
      <div className="bg-gray-50/60 p-4 rounded-lg border border-gray-200">
        <ImageUploader
          label="Gallery Image (Drag & Drop or Browse)"
          value={formData.image_url}
          onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
          altText={formData.alt_text}
          onAltTextChange={(alt) => setFormData(prev => ({ ...prev, alt_text: alt }))}
          placeholder="Drag & drop gallery photo here, or click to upload"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Image Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Modern Parboiling Machinery Facility"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">SEO Alt Text</label>
          <input
            type="text"
            name="alt_text"
            value={formData.alt_text}
            onChange={handleChange}
            placeholder="e.g. Sreelakshmi Agro parboiling unit and grain quality check"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Album Name</label>
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            placeholder="e.g. Factory, Events, Certifications"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary text-sm"
          />
        </div>
        
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Processing, Packaging, Team"
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
              <span>{isDeleting ? 'Deleting...' : 'Delete Image'}</span>
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/gallery')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50"
          >
            {isSubmitting ? 'Saving Image...' : 'Save Gallery Image'}
          </button>
        </div>
      </div>
    </form>
  );
}
