'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Copy, Trash2, Edit2, Check, X } from 'lucide-react';
import { deleteMedia, updateMediaAltText } from '@/app/(admin)/admin/actions/media';
import { useToast } from '@/components/admin/ui/Toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';

interface MediaItem {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string;
  file_size: number;
  alt_text: string;
  folder: string;
  created_at: string;
}

interface MediaGridProps {
  initialMedia: MediaItem[];
}

export function MediaGrid({ initialMedia }: MediaGridProps) {
  const [media, setMedia] = useState(initialMedia);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAlt, setEditAlt] = useState('');
  const [deletingItem, setDeletingItem] = useState<MediaItem | null>(null);
  const toast = useToast();

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const handleStartEdit = (item: MediaItem) => {
    setEditingId(item.id);
    setEditAlt(item.alt_text || '');
  };

  const handleSaveAlt = async (id: string) => {
    try {
      await updateMediaAltText(id, editAlt);
      setMedia(media.map(item => item.id === id ? { ...item, alt_text: editAlt } : item));
      setEditingId(null);
      toast.success('Alt text updated');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    
    try {
      await deleteMedia(deletingItem.id, deletingItem.file_path);
      setMedia(media.filter(item => item.id !== deletingItem.id));
      toast.success('Media deleted successfully');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeletingItem(null);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-border-light">
        <p className="text-gray-500">No media files found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {media.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-border-light overflow-hidden shadow-sm group">
            <div className="aspect-square relative bg-gray-100 flex items-center justify-center">
              {item.file_type.startsWith('image/') ? (
                <Image 
                  src={item.file_url} 
                  alt={item.alt_text || item.file_name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="text-gray-400 text-sm">{item.file_type.split('/')[1]?.toUpperCase() || 'FILE'}</div>
              )}
              
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={() => handleCopyUrl(item.file_url)}
                  className="p-2 bg-white rounded-full text-gray-700 hover:text-brand-primary"
                  title="Copy URL"
                >
                  <Copy size={16} />
                </button>
                <button 
                  onClick={() => setDeletingItem(item)}
                  className="p-2 bg-white rounded-full text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-3">
              <p className="text-xs font-medium text-gray-900 truncate" title={item.file_name}>
                {item.file_name}
              </p>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-500">
                <span>{formatSize(item.file_size)}</span>
                <span className="capitalize">{item.folder}</span>
              </div>
              
              <div className="mt-2 pt-2 border-t border-gray-100">
                {editingId === item.id ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="text" 
                      value={editAlt}
                      onChange={(e) => setEditAlt(e.target.value)}
                      className="text-xs w-full border-gray-300 rounded px-1 py-1"
                      placeholder="Alt text"
                    />
                    <button onClick={() => handleSaveAlt(item.id)} className="text-green-600">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-gray-400">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between group/alt">
                    <p className="text-xs text-gray-600 truncate mr-2" title={item.alt_text}>
                      {item.alt_text || 'No alt text'}
                    </p>
                    <button 
                      onClick={() => handleStartEdit(item)}
                      className="text-gray-400 hover:text-brand-primary opacity-0 group-hover/alt:opacity-100"
                    >
                      <Edit2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={!!deletingItem}
        title="Delete Media"
        message={`Are you sure you want to delete "${deletingItem?.file_name}"? This action cannot be undone and might break pages where this image is used.`}
        onConfirm={handleDelete}
        onClose={() => setDeletingItem(null)}
      />
    </>
  );
}
