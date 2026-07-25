'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { uploadProductMedia } from '@/app/(admin)/admin/actions/products';

interface ImageUploaderProps {
  label: string;
  value?: string;
  onChange: (url: string) => void;
  altText?: string;
  onAltTextChange?: (alt: string) => void;
  placeholder?: string;
  isOptional?: boolean;
}

export function ImageUploader({
  label,
  value,
  onChange,
  altText = '',
  onAltTextChange,
  placeholder = 'Drag & drop image here or click to browse',
  isOptional = false,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');

  const handleUploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG, JPG, WebP, SVG)');
      return;
    }

    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadProductMedia(formData);
      if (res && res.publicUrl) {
        onChange(res.publicUrl);
      } else {
        throw new Error('Failed to retrieve public URL');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          {label} {isOptional && <span className="text-gray-400 font-normal lowercase">(optional)</span>}
        </label>
      </div>

      {value ? (
        <div className="relative border border-border-light rounded-lg p-3 bg-gray-50 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-24 h-24 rounded-md overflow-hidden bg-white border border-gray-200 shrink-0">
            <Image src={value} alt={altText || 'Preview'} fill className="object-contain p-1" />
          </div>

          <div className="flex-1 w-full space-y-2">
            <p className="text-xs font-mono text-gray-500 truncate">{value}</p>
            {onAltTextChange && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase">Image Alt Text (SEO)</label>
                <input
                  type="text"
                  value={altText}
                  onChange={(e) => onAltTextChange(e.target.value)}
                  placeholder="e.g. Sreelakshmi Samba Broken Wheat 500g Package"
                  className="mt-0.5 w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-brand-primary focus:outline-none"
                />
              </div>
            )}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-brand-primary hover:underline"
              >
                Change Image
              </button>
              <span className="text-gray-300">|</span>
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ${
            isDragActive ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
              <span className="text-xs font-medium text-gray-600">Uploading image to storage...</span>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-gray-400" />
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">{placeholder}</p>
                <p className="text-xs text-gray-500 mt-0.5">Supports PNG, JPG, WebP (Max 5MB)</p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Manual URL Input fallback */}
      {!value && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            placeholder="Or paste external image URL (https://...)"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onChange((e.target as HTMLInputElement).value);
              }
            }}
            onBlur={(e) => {
              if (e.target.value) onChange(e.target.value);
            }}
            className="w-full rounded-md border border-gray-300 px-3 py-1.5 text-xs focus:border-brand-primary focus:outline-none"
          />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUploadFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}
