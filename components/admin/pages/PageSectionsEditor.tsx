'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { savePageSection, deletePageSection } from '@/app/(admin)/admin/actions/pages';
import { useToast } from '@/components/admin/ui/Toast';

export function PageSectionsEditor({ pageSlug, initialSections }: { pageSlug: string, initialSections: any[] }) {
  const router = useRouter();
  const toast = useToast();
  
  const [sections, setSections] = useState(
    initialSections.length > 0 ? initialSections : [
      { page_slug: pageSlug, section_key: 'hero', heading: '', description: '', sort_order: 0, status: 'active' }
    ]
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleAddSection = () => {
    setSections([...sections, { 
      page_slug: pageSlug, 
      section_key: `section_${Date.now()}`, 
      heading: '', 
      description: '', 
      sort_order: sections.length,
      status: 'active'
    }]);
  };

  const handleRemoveSection = async (index: number) => {
    const section = sections[index];
    if (section.id) {
      if (!confirm('Are you sure you want to delete this section?')) return;
      try {
        await deletePageSection(section.id, pageSlug);
        toast.success('Section deleted');
      } catch (err: any) {
        toast.error(err.message);
        return;
      }
    }
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      for (const section of sections) {
        await savePageSection(section);
      }
      toast.success('All sections saved successfully');
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;
    
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;
    
    // Update sort_orders
    newSections.forEach((sec, i) => {
      sec.sort_order = i;
    });
    
    setSections(newSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-brand-primary/90 disabled:opacity-50 font-medium"
        >
          {isSaving ? 'Saving...' : 'Save All Sections'}
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow border border-border-light relative">
            <div className="absolute top-4 right-4 flex gap-2">
              <button type="button" onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronUp size={20} /></button>
              <button type="button" onClick={() => moveSection(index, 'down')} disabled={index === sections.length - 1} className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronDown size={20} /></button>
              <button type="button" onClick={() => handleRemoveSection(index)} className="p-1 text-red-400 hover:text-red-700 ml-2"><Trash2 size={20} /></button>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Section {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Key (Unique)</label>
                <input
                  type="text"
                  value={section.section_key}
                  onChange={(e) => handleChange(index, 'section_key', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
                <input
                  type="text"
                  value={section.heading || ''}
                  onChange={(e) => handleChange(index, 'heading', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subheading</label>
                <input
                  type="text"
                  value={section.subheading || ''}
                  onChange={(e) => handleChange(index, 'subheading', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={section.description || ''}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={section.image || ''}
                  onChange={(e) => handleChange(index, 'image', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={section.bg_image || ''}
                  onChange={(e) => handleChange(index, 'bg_image', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                <input
                  type="text"
                  value={section.button_text || ''}
                  onChange={(e) => handleChange(index, 'button_text', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Button URL</label>
                <input
                  type="text"
                  value={section.button_url || ''}
                  onChange={(e) => handleChange(index, 'button_url', e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddSection}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-brand-primary hover:text-brand-primary flex justify-center items-center gap-2"
      >
        <Plus size={20} /> Add New Section
      </button>
    </div>
  );
}
