'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProduct, updateProduct, getProduct, deleteProduct, duplicateProduct } from '@/app/(admin)/admin/actions/products';
import { useToast } from '@/components/admin/ui/Toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { ImageUploader } from '@/components/admin/ui/ImageUploader';
import { Save, Trash2, ArrowLeft, Plus, X, Layers, Image as ImageIcon, HelpCircle, Sparkles, Activity, Wand2, Copy } from 'lucide-react';

const CATEGORY_OPTIONS = [
  'Wheat Grains',
  'Flour & Mixes',
  'Agro Inputs',
  'Organic Bio-Nutrients',
  'Processed Grains',
];

interface FAQItem {
  q: string;
  a: string;
}

interface BenefitItem {
  title: string;
  desc: string;
}

interface NutritionItem {
  name: string;
  value: string;
}

export function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!productId);
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'media' | 'details' | 'faqs' | 'seo'>('basic');
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Wheat Grains',
    short_description: '',
    long_description: '',
    hero_image: '',
    status: 'published',
    is_featured: false,
    is_flagship: false,
    sort_order: 0,
    seo_title: '',
    seo_description: '',
    seo_keywords: '',
    og_image: '',
  });

  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [benefits, setBenefits] = useState<BenefitItem[]>([]);
  const [nutritionTable, setNutritionTable] = useState<NutritionItem[]>([]);

  useEffect(() => {
    if (productId) {
      getProduct(productId)
        .then((data: any) => {
          setFormData({
            name: data.name || '',
            slug: data.slug || '',
            category: data.category || 'Wheat Grains',
            short_description: data.short_description || '',
            long_description: data.long_description || '',
            hero_image: data.hero_image || '',
            status: data.status || 'published',
            is_featured: !!data.is_featured,
            is_flagship: !!data.is_flagship,
            sort_order: data.sort_order || 0,
            seo_title: data.seo_title || '',
            seo_description: data.seo_description || '',
            seo_keywords: data.seo_keywords || '',
            og_image: data.og_image || '',
          });

          // Mark slug as manually set if existing product
          if (data.slug) {
            setIsSlugManuallyEdited(true);
          }

          if (Array.isArray(data.faqs)) {
            setFaqs(data.faqs.map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '' })));
          }
          if (Array.isArray(data.benefits)) {
            setBenefits(data.benefits);
          }
          if (Array.isArray(data.nutrition_table)) {
            setNutritionTable(data.nutrition_table);
          }
          setInitialLoading(false);
        })
        .catch((err: any) => {
          toast.error('Failed to load product', err.message);
          router.push('/admin/products');
        });
    }
  }, [productId, router]);

  // Helper function to turn text into clean URL slug
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Requirement: DYNAMIC SLUG - updates in real time as name is typed
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const generatedSlug = slugify(name);

    setFormData((prev) => ({
      ...prev,
      name,
      slug: !isSlugManuallyEdited ? generatedSlug : prev.slug,
      seo_title: prev.seo_title ? prev.seo_title : `${name} | Sreelakshmi Agro`,
    }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true);
    setFormData({ ...formData, slug: e.target.value });
  };

  // Requirement: AUTO SEO GENERATOR
  const handleAutoGenerateSEO = () => {
    if (!formData.name) {
      toast.error('Please enter a product name first');
      return;
    }

    const autoTitle = `${formData.name} | Sreelakshmi Agro Industries`;
    const autoDesc = formData.short_description || `Discover premium ${formData.name} processed by Sreelakshmi Agro Industries. High quality, pure nutrition, and traditional trust.`;
    const autoKeywords = `${formData.name}, ${formData.category}, healthy wheat products, agro processing, Sreelakshmi Agro`;

    setFormData((prev) => ({
      ...prev,
      seo_title: autoTitle,
      seo_description: autoDesc,
      seo_keywords: autoKeywords,
    }));

    toast.success('SEO Metadata generated automatically!');
  };

  const handleAddFaq = () => setFaqs((prev) => [...prev, { q: '', a: '' }]);
  const handleRemoveFaq = (index: number) => setFaqs((prev) => prev.filter((_, i) => i !== index));

  const handleAddBenefit = () => setBenefits((prev) => [...prev, { title: '', desc: '' }]);
  const handleRemoveBenefit = (index: number) => setBenefits((prev) => prev.filter((_, i) => i !== index));

  const handleAddNutrition = () => setNutritionTable((prev) => [...prev, { name: '', value: '' }]);
  const handleRemoveNutrition = (index: number) => setNutritionTable((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const autoSeoTitle = formData.seo_title || `${formData.name} | Sreelakshmi Agro`;
    const autoSeoDesc = formData.seo_description || formData.short_description || `Buy ${formData.name} from Sreelakshmi Agro.`;
    const autoSeoKw = formData.seo_keywords || `${formData.name}, ${formData.category}, Sreelakshmi Agro`;
    const finalSlug = formData.slug ? slugify(formData.slug) : slugify(formData.name);

    const payload = {
      ...formData,
      slug: finalSlug,
      seo_title: autoSeoTitle,
      seo_description: autoSeoDesc,
      seo_keywords: autoSeoKw,
      faqs: faqs.filter((f) => f.q.trim() && f.a.trim()),
      benefits: benefits.filter((b) => b.title.trim()),
      nutrition_table: nutritionTable.filter((n) => n.name.trim() && n.value.trim()),
    };

    try {
      if (productId) {
        await updateProduct(productId, payload);
        toast.success('Product updated successfully');
      } else {
        await createProduct(payload);
        toast.success('Product created successfully');
      }
      router.push('/admin/products');
    } catch (err: any) {
      toast.error('Failed to save product', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) return;
    try {
      const res = await deleteProduct(productId);
      if (!res.success) {
        toast.error('Failed to delete product', res.error);
        return;
      }
      toast.success('Product deleted successfully');
      router.push('/admin/products');
    } catch (err: any) {
      toast.error('Failed to delete product', err.message);
    }
  };

  if (initialLoading) return <div className="p-6 text-gray-500 font-medium">Loading product details...</div>;

  return (
    <div className="max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {productId ? `Edit: ${formData.name || 'Product'}` : 'New Product'}
            </h1>
            <p className="text-xs text-gray-500">Configure catalog specs, images, categories, and FAQs</p>
          </div>
        </div>
        {productId && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={async () => {
                try {
                  const res = await duplicateProduct(productId);
                  toast.success('Product duplicated successfully as (Copy)');
                  router.push(`/admin/products/${res.newId}`);
                } catch (err: any) {
                  toast.error('Failed to duplicate product', err.message);
                }
              }}
              className="inline-flex items-center gap-2 rounded-md bg-indigo-50 border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-100 transition-colors"
            >
              <Copy className="h-4 w-4" />
              Duplicate
            </button>
            <button
              type="button"
              onClick={() => setShowDelete(true)}
              className="inline-flex items-center gap-2 rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'basic' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Layers className="w-4 h-4" /> Basic & Category
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'media' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Media & Image
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('details')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'details' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Activity className="w-4 h-4" /> Benefits & Nutrition (Optional)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'faqs' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Product FAQs ({faqs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
            activeTab === 'seo' ? 'bg-brand-primary text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Sparkles className="w-4 h-4" /> SEO
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-border-light bg-white p-6 shadow-sm">
        
        {/* TAB 1: BASIC INFO & DYNAMIC SLUG */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. Samba Broken Wheat"
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
                  placeholder="e.g. samba-broken-wheat"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-brand-primary focus:outline-none bg-gray-50/50"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  {!isSlugManuallyEdited
                    ? '✨ Dynamic: Auto-updating as you type product name'
                    : '✏️ Custom slug active. Click "Reset Auto-Sync" to re-enable dynamic updates.'}
                </p>
              </div>
            </div>

            {/* Category Option */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Or Custom Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Enter custom category name..."
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Short Summary</label>
              <textarea
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                rows={2}
                placeholder="Brief 1-2 sentence overview displayed on product catalog cards..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Detailed Description (HTML supported)</label>
              <textarea
                value={formData.long_description}
                onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                rows={6}
                placeholder="<p>Full story, processing details, whole grain benefits...</p>"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">Publish Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="mt-1 block w-40 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">Featured Product</label>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <input
                  type="checkbox"
                  id="is_flagship"
                  checked={formData.is_flagship}
                  onChange={(e) => setFormData({ ...formData, is_flagship: e.target.checked })}
                  className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                />
                <label htmlFor="is_flagship" className="text-sm font-medium text-gray-700">Flagship Product (Hero Badge)</label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA & DRAG AND DROP UPLOADER */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <ImageUploader
              label="Product Hero Package Image *"
              value={formData.hero_image}
              onChange={(url) => setFormData({ ...formData, hero_image: url })}
              altText={formData.seo_title || formData.name}
              onAltTextChange={(alt) => setFormData({ ...formData, seo_title: alt })}
              placeholder="Drag & drop product image file here or click to browse"
            />

            <div className="pt-4 border-t border-gray-100">
              <ImageUploader
                label="Social Share Image (OG)"
                isOptional={true}
                value={formData.og_image}
                onChange={(url) => setFormData({ ...formData, og_image: url })}
                placeholder="Upload optional preview image for WhatsApp / Facebook sharing"
              />
            </div>
          </div>
        )}

        {/* TAB 3: OPTIONAL HEALTH BENEFITS & NUTRITION TABLE */}
        {activeTab === 'details' && (
          <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-xs text-amber-800">
              <strong>Note:</strong> Health Benefits and Nutrition Table rows are completely <strong>optional</strong>. If left empty, these sections will not be shown on the product detail page.
            </div>

            {/* Health Benefits Repeater */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Health Benefits Cards (Optional)</h3>
                <button
                  type="button"
                  onClick={handleAddBenefit}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Benefit Card
                </button>
              </div>

              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50/50">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Benefit Title (e.g. High in Fiber & Minerals)"
                      value={benefit.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBenefits((prev) => prev.map((b, i) => (i === index ? { ...b, title: val } : b)));
                      }}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs font-bold focus:border-brand-primary focus:outline-none"
                    />
                    <textarea
                      placeholder="Description text..."
                      value={benefit.desc}
                      onChange={(e) => {
                        const val = e.target.value;
                        setBenefits((prev) => prev.map((b, i) => (i === index ? { ...b, desc: val } : b)));
                      }}
                      rows={2}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(index)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Nutrition Table Repeater */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Nutritional Facts (Per 100g) (Optional)</h3>
                  <p className="text-xs text-gray-500">If left empty, the Nutritional Facts table will be completely hidden on the website.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setNutritionTable([
                        { name: "Energy / Calories", value: "342 Kcal" },
                        { name: "Dietary Fibre", value: "11.2 g" },
                        { name: "Proteins", value: "12.5 g" },
                        { name: "Carbohydrates", value: "71.8 g" },
                        { name: "Calcium", value: "32 mg" },
                        { name: "Iron", value: "3.5 mg" },
                        { name: "Fats", value: "1.2 g" },
                      ]);
                      toast.success("Standard Nutritional Facts table loaded!");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Preset Standard Facts
                  </button>
                  <button
                    type="button"
                    onClick={handleAddNutrition}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Row
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {nutritionTable.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Nutrient Name (e.g. Dietary Fibre)"
                      value={item.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNutritionTable((prev) => prev.map((n, i) => (i === index ? { ...n, name: val } : n)));
                      }}
                      className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-xs font-medium focus:border-brand-primary focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 11.2 g)"
                      value={item.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNutritionTable((prev) => prev.map((n, i) => (i === index ? { ...n, value: val } : n)));
                      }}
                      className="w-40 rounded border border-gray-300 px-3 py-1.5 text-xs font-medium focus:border-brand-primary focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNutrition(index)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCT FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Product FAQ Hub Items (Optional)</h3>
                <p className="text-xs text-gray-500">Add individual FAQs displayed in the Product FAQ Hub section</p>
              </div>
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 text-xs font-bold"
              >
                <Plus className="w-4 h-4" /> Add FAQ Question
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brand-primary uppercase">FAQ #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(index)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Question</label>
                    <input
                      type="text"
                      placeholder="e.g. Is Samba Broken Wheat gluten-free?"
                      value={faq.q}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, q: val } : f)));
                      }}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs font-semibold focus:border-brand-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 uppercase mb-1">Answer</label>
                    <textarea
                      placeholder="Detailed answer text..."
                      value={faq.a}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFaqs((prev) => prev.map((f, i) => (i === index ? { ...f, a: val } : f)));
                      }}
                      rows={3}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AUTOMATIC SEO METADATA */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-brand-primary/5 p-4 rounded-lg border border-brand-primary/10">
              <div>
                <h4 className="text-xs font-bold text-brand-primary uppercase">Automatic SEO Generator</h4>
                <p className="text-xs text-gray-600 mt-0.5">Click to automatically generate SEO Title, Description, and Keywords based on Product Name & Summary</p>
              </div>
              <button
                type="button"
                onClick={handleAutoGenerateSEO}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand-primary text-white text-xs font-bold hover:bg-brand-primary/90 transition-colors shadow-sm shrink-0"
              >
                <Wand2 className="w-3.5 h-3.5 text-brand-gold" /> Auto-Generate SEO
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">SEO Title</label>
              <input
                type="text"
                value={formData.seo_title}
                onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                placeholder="e.g. Samba Broken Wheat 500g | Sreelakshmi Agro"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">SEO Description</label>
              <textarea
                value={formData.seo_description}
                onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                rows={3}
                placeholder="Search engine meta description snippet..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">SEO Keywords</label>
              <input
                type="text"
                value={formData.seo_keywords}
                onChange={(e) => setFormData({ ...formData, seo_keywords: e.target.value })}
                placeholder="Samba broken wheat, broken wheat upma, organic wheat, Sreelakshmi Agro"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-primary focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Form Actions Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Link
            href="/admin/products"
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
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>

      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
