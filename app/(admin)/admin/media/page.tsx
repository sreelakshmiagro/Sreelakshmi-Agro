import React from 'react';
import { getMedia } from '@/app/(admin)/admin/actions/media';
import { MediaUploader } from '@/components/admin/media/MediaUploader';
import { MediaGrid } from '@/components/admin/media/MediaGrid';

export const metadata = {
  title: 'Media Library | Admin',
};

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ folder?: string; search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const folder = resolvedParams.folder || 'all';
  const search = resolvedParams.search || '';
  
  const media = await getMedia(folder, search);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-lora font-bold text-brand-primary">Media Library</h1>
      </div>

      <MediaUploader />

      <div className="bg-white p-6 rounded-lg shadow border border-border-light space-y-4">
        <div className="flex gap-4 items-center">
          <form className="flex-1 flex gap-2">
            <select 
              name="folder"
              defaultValue={folder}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
            >
              <option value="all">All Folders</option>
              <option value="uploads">Uploads</option>
              <option value="products">Products</option>
              <option value="recipes">Recipes</option>
              <option value="gallery">Gallery</option>
              <option value="team">Team</option>
              <option value="pages">Pages</option>
            </select>
            <input 
              type="text" 
              name="search" 
              defaultValue={search} 
              placeholder="Search by filename..."
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
            />
            <button type="submit" className="px-4 py-2 bg-brand-primary text-white rounded-md">Filter</button>
          </form>
        </div>
        
        <MediaGrid initialMedia={media} />
      </div>
    </div>
  );
}
