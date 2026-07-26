'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { deleteGalleryImage } from '@/app/(admin)/admin/actions/gallery';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';
import { useToast } from '@/components/admin/ui/Toast';

export function GalleryClient({
  images,
  albums,
  categories,
  currentAlbum,
  currentCategory
}: {
  images: any[];
  albums: string[];
  categories: string[];
  currentAlbum: string;
  currentCategory: string;
}) {
  const router = useRouter();
  const toast = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title?: string) => {
    if (!confirm(`Are you sure you want to delete gallery image "${title || 'Untitled'}"?`)) return;

    setDeletingId(id);
    try {
      const res = await deleteGalleryImage(id);
      if (!res.success) {
        toast.error('Failed to delete gallery image', res.error);
        setDeletingId(null);
        return;
      }
      toast.delete('Image Deleted', `Gallery image "${title || 'Untitled'}" removed successfully`);
      router.refresh();
    } catch (err: any) {
      toast.error('Failed to delete image', err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-lora font-bold text-brand-primary">Gallery Management</h1>
        <Link 
          href="/admin/gallery/new" 
          className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-primary/90 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
        >
          <Plus size={18} />
          Add Image
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border border-border-light mb-6">
        <form className="flex gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Album</label>
            <select name="album" defaultValue={currentAlbum} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary text-sm">
              <option value="all">All Albums</option>
              {albums.map((a: any) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">Category</label>
            <select name="category" defaultValue={currentCategory} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary text-sm">
              <option value="all">All Categories</option>
              {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 text-sm font-medium">
            Filter
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg border border-border-light shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Album / Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sort Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {images.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                  No gallery images found
                </td>
              </tr>
            ) : (
              images.map(image => (
                <tr key={image.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-14 w-20 flex-shrink-0 relative rounded overflow-hidden bg-gray-100 border border-gray-200">
                        {image.image_url ? (
                          <Image src={image.image_url} alt={image.alt_text || image.title || 'Gallery'} fill className="object-cover" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-gray-900">{image.title || 'Untitled Image'}</div>
                        <div className="text-xs text-gray-400 font-mono truncate max-w-xs">{image.image_url}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{image.album || 'general'}</div>
                    <div className="text-xs text-gray-500">{image.category || 'General'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                    {image.sort_order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={image.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/admin/gallery/${image.id}`}
                        className="p-1 text-brand-primary hover:text-brand-secondary transition-colors"
                        title="Edit Image"
                      >
                        <Edit size={17} />
                      </Link>
                      <button
                        onClick={() => handleDelete(image.id, image.title)}
                        disabled={deletingId === image.id}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                        title="Delete Image"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
