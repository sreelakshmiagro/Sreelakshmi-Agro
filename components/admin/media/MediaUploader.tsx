'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { saveMediaMetadata } from '@/app/(admin)/admin/actions/media';
import { useToast } from '@/components/admin/ui/Toast';

interface MediaUploaderProps {
  onSuccess?: () => void;
}

export function MediaUploader({ onSuccess }: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [folder, setFolder] = useState('uploads');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFiles(e.target.files);
    }
  };

  const uploadFiles = async (files: FileList) => {
    setIsUploading(true);
    const supabase = createClient();
    
    let successCount = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const timestamp = new Date().getTime();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `${folder}/${timestamp}_${sanitizedName}`;
      
      try {
        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fsyqsenggdudvddekoij.supabase.co'}/storage/v1/object/public/media/${filePath}`;
        
        // Save metadata
        await saveMediaMetadata({
          file_name: file.name,
          file_path: filePath,
          file_url: url,
          file_type: file.type,
          file_size: file.size,
          folder: folder,
          alt_text: file.name.split('.')[0]
        });
        
        successCount++;
      } catch (err: any) {
        toast.error(`Failed to upload ${file.name}: ${err.message}`);
      }
    }
    
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s)`);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-border-light">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Folder</label>
        <select 
          value={folder}
          onChange={(e) => setFolder(e.target.value)}
          className="w-full sm:w-64 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
        >
          <option value="uploads">Uploads (Default)</option>
          <option value="products">Products</option>
          <option value="recipes">Recipes</option>
          <option value="gallery">Gallery</option>
          <option value="team">Team</option>
          <option value="pages">Pages</option>
        </select>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer
          ${isDragging ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-300 hover:border-brand-primary/50'}
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileSelect}
        />
        
        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-brand-primary animate-spin mb-4" />
            <p className="text-lg font-medium text-gray-900">Uploading files...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-1">Click or drag files to upload</p>
            <p className="text-sm text-gray-500">Supports JPG, PNG, GIF, SVG, WEBP up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
}
