import React from 'react';
import { getGalleryImages } from '@/app/(admin)/admin/actions/gallery';
import { GalleryClient } from '@/components/admin/gallery/GalleryClient';

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
  const albums = Array.from(new Set(allImages.map(img => img.album).filter(Boolean))) as string[];
  const categories = Array.from(new Set(allImages.map(img => img.category).filter(Boolean))) as string[];

  return (
    <GalleryClient
      images={images || []}
      albums={albums}
      categories={categories}
      currentAlbum={album}
      currentCategory={category}
    />
  );
}
