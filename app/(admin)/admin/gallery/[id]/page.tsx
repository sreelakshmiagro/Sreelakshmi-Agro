import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getGalleryImage } from '@/app/(admin)/admin/actions/gallery';
import { GalleryForm } from '@/components/admin/gallery/GalleryForm';

export const metadata = {
  title: 'Edit Gallery Image | Admin',
};

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const isNew = resolvedParams.id === 'new';
  let image = null;
  
  if (!isNew) {
    image = await getGalleryImage(resolvedParams.id);
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/gallery" className="text-gray-500 hover:text-gray-900">
          <ChevronLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-lora font-bold text-brand-primary">
            {isNew ? 'Add Gallery Image' : 'Edit Gallery Image'}
          </h1>
        </div>
      </div>

      <GalleryForm initialData={image} />
    </div>
  );
}
