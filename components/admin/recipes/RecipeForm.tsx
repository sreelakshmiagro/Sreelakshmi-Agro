'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createRecipe, updateRecipe, getRecipe, deleteRecipe, getProductOptions } from '@/app/(admin)/admin/actions/recipes';
import { useToast } from '@/components/admin/ui/Toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { ImageUploader } from '@/components/admin/ui/ImageUploader';
import { Save, Trash2, ArrowLeft, Plus, X, ChefHat, Clock, Layers, Sparkles } from 'lucide-react';

interface ProductOption {
  id: string;
  name: string;
  slug: string;
}

export function RecipeForm({ recipeId }: { recipeId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!recipeId);
  const [showDelete, setShowDelete] = useState(false);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'ingredients' | 'steps'>('basic');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    prep_time: '5 Mins',
    cook_time: '20 Mins',
    servings: '4 Servings',
    difficulty: 'Easy',
    featured_image: '',
    related_product_id: '',
    related_product_slug: '',
    status: 'published',
    seo_title: '',
    seo_description: '',
  });

  const [ingredients, setIngredients] = useState<string[]>([
    '1 cup Samba Broken Wheat',
    '2 cups hot water',
    '1 chopped onion',
    '1 carrot',
    'Mustard seeds, curry leaves, salt'
  ]);

  const [stepsText, setStepsText] = useState(
    'Dry roast wheat grit for 3 minutes. Sauté spices and vegetables in oil or ghee. Add hot water, bring to boil, add wheat, cover, and simmer for 10 minutes until water is absorbed.'
  );

  useEffect(() => {
    // Load available products for related product selector dropdown
    getProductOptions()
      .then((products) => setProductOptions(products))
      .catch((err) => console.error("Failed to load products for recipe dropdown:", err));

    if (recipeId) {
      getRecipe(recipeId)
        .then((data: any) => {
          setFormData({
            name: data.name || '',
            slug: data.slug || '',
            short_description: data.short_description || '',
            prep_time: data.prep_time || '5 Mins',
            cook_time: data.cook_time || '20 Mins',
            servings: data.servings || '4 Servings',
            difficulty: data.difficulty || 'Easy',
            featured_image: data.featured_image || '',
            related_product_id: data.related_product_id || '',
            related_product_slug: data.related_product_slug || '',
            status: data.status || 'published',
            seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
          });

          if (data.slug) {
            setIsSlugManuallyEdited(true);
          }

          if (Array.isArray(data.ingredients)) {
            setIngredients(data.ingredients);
          }
          if (data.steps) {
            if (typeof data.steps === 'string') {
              setStepsText(data.steps);
            } else if (Array.isArray(data.steps)) {
              setStepsText(data.steps.join('\n\n'));
            }
          }
          setInitialLoading(false);
        })
        .catch((err: any) => {
          toast.error('Failed to load recipe', err.message);
          router.push('/admin/recipes');
        });
    }
  }, [recipeId, router]);

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const generatedSlug = slugify(name);

    setFormData((prev) => ({
      ...prev,
      name,
      slug: !isSlugManuallyEdited ? generatedSlug : prev.slug,
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setFormData({ ...formData, slug: e.target.value });
  };

  const handleRelatedProductChange = (productIdVal: string) => {
    const selectedProd = productOptions.find((p) => p.id === productIdVal);
    setFormData((prev) => ({
      ...prev,
      related_product_id: productIdVal,
      related_product_slug: selectedProd ? selectedProd.slug : '',
    }));
  };

  const handleAddIngredient = () => setIngredients((prev) => [...prev, '']);
  const handleRemoveIngredient = (index: number) => setIngredients((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const finalSlug = formData.slug ? slugify(formData.slug) : slugify(formData.name);

    const payload = {
      ...formData,
      slug: finalSlug,
      ingredients: ingredients.filter((ing) => ing.trim()),
      steps: stepsText.trim(),
    };

    try {
      if (recipeId) {
        await updateRecipe(recipeId, payload);
        toast.success('Recipe updated successfully');
      } else {
        await createRecipe(payload);
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

  if (initialLoading) return <div className="p-6 text-gray-500 font-medium">Loading recipe details...</div>;

  return (
    <div className="max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/recipes" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {recipeId ? `Edit: ${formData.name || 'Recipe'}` : 'New Recipe'}
            </h1>
            <p className="text-xs text-gray-500">Configure recipe instructions, ingredients, photo, and related product link</p>
          </div>
        </div>
        {recipeId && (
          <button
            type="button"
            onClick={() => setShowDelete(true)}
            className="inline-flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'basic' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Basic Details & Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ingredients')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'ingredients' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ChefHat className="w-4 h-4" /> Ingredients List ({ingredients.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('steps')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'steps' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4" /> Preparation Steps
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border-light bg-white p-6 shadow-sm">
        
        {/* TAB 1: BASIC DETAILS & DISH IMAGE & RELATED PRODUCT */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Recipe Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Classic Samba Wheat Upma"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">URL Slug *</label>
                  {isSlugManuallyEdited && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsSlugManuallyEdited(false);
                        setFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
                      }}
                      className="text-[11px] font-semibold text-brand-primary hover:underline"
                    >
                      Reset Auto-Sync
                    </button>
                  )}
                </div>
                <input
                  required
                  type="text"
                  value={formData.slug}
                  onChange={handleSlugChange}
                  placeholder="e.g. classic-samba-wheat-upma"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-brand-primary focus:outline-none bg-gray-50/50"
                />
              </div>
            </div>

            {/* Dish Image Uploader */}
            <ImageUploader
              label="Featured Recipe Dish Picture *"
              value={formData.featured_image}
              onChange={(url) => setFormData({ ...formData, featured_image: url })}
              placeholder="Drag & drop dish picture or upload photo of prepared meal"
            />

            {/* Related Product Link Dropdown (User Requirement) */}
            <div className="bg-brand-primary/5 border border-brand-primary/15 rounded-lg p-4 space-y-2">
              <label className="block text-xs font-bold text-brand-primary uppercase tracking-wider">
                Related Product Link (Optional)
              </label>
              <select
                value={formData.related_product_id}
                onChange={(e) => handleRelatedProductChange(e.target.value)}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm bg-white focus:border-brand-primary focus:outline-none"
              >
                <option value="">None (General Recipe for All Products)</option>
                {productOptions.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    📦 {prod.name} (/products/{prod.slug})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-600">
                If a related product is selected, clicking <strong>&quot;Explore Recipes&quot;</strong> on that product&apos;s detail page will highlight this recipe directly! If none selected, clicking Explore Recipes opens the full recipe collection.
              </p>
            </div>

            {/* Prep Time, Cook Time, Servings, Difficulty */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Prep Time</label>
                <input
                  type="text"
                  value={formData.prep_time}
                  onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
                  placeholder="e.g. 5 Mins"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Cook Time</label>
                <input
                  type="text"
                  value={formData.cook_time}
                  onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
                  placeholder="e.g. 20 Mins"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INGREDIENTS LIST */}
        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Ingredients List</h3>
                <p className="text-xs text-gray-500">Add individual items needed to prepare this dish</p>
              </div>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 text-xs font-bold"
              >
                <Plus className="w-4 h-4" /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ing, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-gray-400 w-6 text-right">#{idx + 1}</span>
                  <input
                    type="text"
                    value={ing}
                    onChange={(e) => {
                      const val = e.target.value;
                      setIngredients((prev) => prev.map((item, i) => (i === idx ? val : item)));
                    }}
                    placeholder="e.g. 1 cup Samba Broken Wheat"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="p-2 text-gray-400 hover:text-red-600 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PREPARATION STEPS */}
        {activeTab === 'steps' && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Step-by-Step Preparation Instructions
              </label>
              <textarea
                value={stepsText}
                onChange={(e) => setStepsText(e.target.value)}
                rows={8}
                placeholder="Dry roast wheat grit for 3 minutes. Sauté spices and vegetables in oil or ghee. Add hot water, bring to boil, add wheat, cover, and simmer for 10 minutes until water is absorbed."
                className="w-full rounded-md border border-gray-300 p-4 text-sm leading-relaxed focus:border-brand-primary focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter preparation steps clearly. You can write paragraphs or separate steps by line.
              </p>
            </div>
          </div>
        )}

        {/* Form Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href="/admin/recipes"
            className="rounded-md px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-brand-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-primary/90 disabled:opacity-50 shadow-sm"
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
