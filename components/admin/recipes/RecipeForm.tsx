'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createRecipe, updateRecipe, getRecipe, deleteRecipe } from '@/app/(admin)/admin/actions/recipes';
import { useToast } from '@/components/admin/ui/Toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function RecipeForm({ recipeId }: { recipeId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!recipeId);
  const [showDelete, setShowDelete] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    prep_time: '',
    cook_time: '',
    difficulty: 'Medium',
    status: 'draft',
  });

  useEffect(() => {
    if (recipeId) {
      getRecipe(recipeId).then((data: any) => {
        setFormData(data);
        setInitialLoading(false);
      }).catch((err: any) => {
        toast.error('Failed to load recipe', err.message);
        router.push('/admin/recipes');
      });
    }
  }, [recipeId, router]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, name, slug: prev.slug || slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (recipeId) {
        await updateRecipe(recipeId, formData);
        toast.success('Recipe updated successfully');
      } else {
        await createRecipe(formData);
        toast.success('Recipe created successfully');
      }
      router.push('/admin/recipes');
    } catch (err: any) {
      toast.error('Failed to save recipe', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!recipeId) return;
    try {
      await deleteRecipe(recipeId);
      toast.success('Recipe deleted successfully');
      router.push('/admin/recipes');
    } catch (err: any) {
      toast.error('Failed to delete recipe', err.message);
    }
  };

  if (initialLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-3xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/recipes" className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {recipeId ? 'Edit Recipe' : 'New Recipe'}
          </h1>
        </div>
        {recipeId && (
          <button
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border-light bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input
              required
              type="text"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prep Time</label>
            <input
              type="text"
              value={formData.prep_time}
              onChange={e => setFormData({ ...formData, prep_time: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Difficulty</label>
            <select
              value={formData.difficulty}
              onChange={e => setFormData({ ...formData, difficulty: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={formData.status}
            onChange={e => setFormData({ ...formData, status: e.target.value })}
            className="mt-1 block w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Link
            href="/admin/recipes"
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Recipe'}
          </button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Recipe"
        message="Are you sure you want to delete this recipe? This action cannot be undone."
      />
    </div>
  );
}
