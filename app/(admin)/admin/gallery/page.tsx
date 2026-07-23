import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit } from 'lucide-react';
import { getGalleryImages } from '@/app/(admin)/admin/actions/gallery';
import { StatusBadge } from '@/components/admin/ui/StatusBadge';

export const metadata = {
  title: 'Gallery Management | Admin',
};

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ album?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const album = resolvedParams.album || 'all';
  const category = resolvedParams.category || 'all';
  
  const images = await getGalleryImages(album, category);

  // Extract unique albums and categories for filters
  const allImages = await getGalleryImages();
  const albums = Array.from(new Set(allImages.map(img => img.album).filter(Boolean)));
  const categories = Array.from(new Set(allImages.map(img => img.category).filter(Boolean)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-lora font-bold text-brand-primary">Gallery Management</h1>
        <Link 
          href="/admin/gallery/new" 
          className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-primary/90 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={18} />
          Add Image
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border border-border-light mb-6">
        <form className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Album</label>
            <select name="album" defaultValue={album} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary">
              <option value="all">All Albums</option>
              {albums.map((a: any) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select name="category" defaultValue={category} className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary">
              <option value="all">All Categories</option>
              {categories.map((c: any) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button type="submit" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200">
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
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No gallery images found
                </td>
              </tr>
            ) : (
              images.map(image => (
                <tr key={image.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-12 w-16 flex-shrink-0 relative rounded overflow-hidden bg-gray-100">
                        {image.image_url ? (
                          <Image src={image.image_url} alt={image.alt_text || image.title || 'Gallery'} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{image.title || 'Untitled'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{image.album || '-'}</div>
                    <div className="text-sm text-gray-500">{image.category || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {image.sort_order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={image.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link 
                      href={`/admin/gallery/${image.id}`}
                      className="text-brand-primary hover:text-brand-primary/80"
                    >
                      <Edit size={16} />
                    </Link>
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
