'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Command, ArrowRight, Settings, Package, Utensils, HelpCircle, Briefcase, FileText, Image as ImageIcon, Users, Activity, Sparkles, X } from 'lucide-react';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  icon: any;
  keywords: string[];
}

const SEARCH_INDEX: SearchItem[] = [
  // Navigation Modules
  { id: 'dash', title: 'Dashboard Overview', category: 'Navigation', description: 'View analytics, stats, and recent activity log', href: '/admin', icon: Activity, keywords: ['dashboard', 'home', 'stats', 'analytics', 'overview'] },
  { id: 'products', title: 'Product Catalog Management', category: 'Navigation', description: 'Manage products, categories, specs, and nutrition tables', href: '/admin/products', icon: Package, keywords: ['products', 'catalog', 'samba wheat', 'broken wheat', 'items', 'nutrition', 'facts'] },
  { id: 'add-product', title: 'Add New Product', category: 'Quick Action', description: 'Create a new product listing with auto SEO', href: '/admin/products/new', icon: Package, keywords: ['add product', 'create product', 'new product'] },
  { id: 'recipes', title: 'Recipe Hub Management', category: 'Navigation', description: 'Manage cooking recipes, prep times, and ingredients', href: '/admin/recipes', icon: Utensils, keywords: ['recipes', 'cooking', 'upma', 'dishes', 'food'] },
  { id: 'add-recipe', title: 'Add New Recipe', category: 'Quick Action', description: 'Create a new recipe page with JSON-LD schema', href: '/admin/recipes/new', icon: Utensils, keywords: ['add recipe', 'create recipe', 'new recipe'] },
  { id: 'testimonials', title: 'Customer Testimonials', category: 'Navigation', description: 'Manage homepage review cards and ratings', href: '/admin/testimonials', icon: Sparkles, keywords: ['testimonials', 'reviews', 'ratings', 'customers'] },
  { id: 'faqs', title: 'FAQ Management', category: 'Navigation', description: 'Manage questions and answers across the site', href: '/admin/faqs', icon: HelpCircle, keywords: ['faqs', 'questions', 'answers', 'support'] },
  { id: 'careers', title: 'Career Openings & Jobs', category: 'Navigation', description: 'Manage job postings, locations, and candidate forms', href: '/admin/careers', icon: Briefcase, keywords: ['careers', 'jobs', 'openings', 'hiring', 'applications'] },
  { id: 'forms', title: 'Form Submissions Inbox', category: 'Navigation', description: 'View distributor applications and contact messages', href: '/admin/forms', icon: FileText, keywords: ['forms', 'inbox', 'messages', 'distributors', 'inquiries', 'contacts'] },
  { id: 'distributors', title: 'Distributor Applications Inbox', category: 'Form Inbox', description: 'Review wholesale distributor partnership requests', href: '/admin/forms/distributors', icon: FileText, keywords: ['distributor', 'wholesale', 'applications', 'partner'] },
  { id: 'contacts', title: 'Contact Messages Inbox', category: 'Form Inbox', description: 'View general customer and corporate messages', href: '/admin/forms/contacts', icon: FileText, keywords: ['contact', 'email', 'messages', 'inquiries'] },
  { id: 'applications', title: 'Job Applications Inbox', category: 'Form Inbox', description: 'Review resumes and job candidate submissions', href: '/admin/forms/applications', icon: Briefcase, keywords: ['job applications', 'resumes', 'candidates'] },
  { id: 'media', title: 'Media Library & Uploads', category: 'Navigation', description: 'Browse and upload site images and WebP assets', href: '/admin/media', icon: ImageIcon, keywords: ['media', 'images', 'upload', 'assets', 'library', 'gallery'] },
  { id: 'pages', title: 'Page CMS Editor', category: 'Navigation', description: 'Edit page hero sections and custom page content', href: '/admin/pages', icon: FileText, keywords: ['pages', 'cms', 'editor', 'sections', 'hero'] },
  { id: 'seo', title: 'SEO & Meta Tags Manager', category: 'Navigation', description: 'Configure page meta titles, descriptions, and OpenGraph', href: '/admin/seo', icon: Sparkles, keywords: ['seo', 'meta', 'title', 'google', 'search', 'keywords'] },
  { id: 'menus', title: 'Header & Navigation Menu Manager', category: 'Navigation', description: 'Add or remove links from the site navbar menu', href: '/admin/menus', icon: Settings, keywords: ['menus', 'header', 'navigation', 'links', 'navbar'] },
  { id: 'settings', title: 'General & Site Settings', category: 'Settings', description: 'Manage site phone, address, favicon logo, and mobile header title', href: '/admin/settings', icon: Settings, keywords: ['settings', 'general', 'favicon', 'logo', 'phone', 'address', 'email', 'mobile header', 'branding'] },
  { id: 'setting-favicon', title: 'Website Favicon & Logo Setting', category: 'Settings Shortcut', description: 'Upload dynamic website favicon icon in Settings', href: '/admin/settings', icon: Settings, keywords: ['favicon', 'logo', 'icon', 'branding', 'upload favicon'] },
  { id: 'setting-mobile-title', title: 'Mobile Header Title Setting', category: 'Settings Shortcut', description: 'Change mobile header center title text in Settings', href: '/admin/settings', icon: Settings, keywords: ['mobile title', 'mobile header', 'header text', 'sreelakshmi agro'] },
  { id: 'users', title: 'Admin User Management', category: 'Settings', description: 'Manage administrative accounts and passwords', href: '/admin/users', icon: Users, keywords: ['users', 'accounts', 'passwords', 'admins'] },
  { id: 'activity', title: 'System Activity Log', category: 'Settings', description: 'Audit admin updates, log-ins, and file edits', href: '/admin/activity', icon: Activity, keywords: ['activity', 'audit', 'logs', 'history'] },
];

export function AdminGlobalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredItems = query.trim() === ''
    ? SEARCH_INDEX.slice(0, 8)
    : SEARCH_INDEX.filter((item) => {
        const q = query.toLowerCase().trim();
        return (
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      });

  const handleSelect = (item: SearchItem) => {
    setIsOpen(false);
    router.push(item.href);
  };

  const handleKeyDownModal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  return (
    <>
      {/* Topbar Search Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200/80 border border-gray-200 px-3.5 py-1.5 rounded-lg text-xs text-gray-500 font-sans transition-colors w-48 sm:w-64 md:w-80 justify-between shrink-0"
      >
        <div className="flex items-center gap-2 truncate">
          <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="truncate">Search settings, products...</span>
        </div>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-bold bg-white border border-gray-300 px-1.5 py-0.5 rounded text-gray-500 shadow-2xs">
          <Command className="w-3 h-3" /> K
        </kbd>
      </button>

      {/* Command Palette Overlay Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150">
          <div
            className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-xl overflow-hidden flex flex-col max-h-[80vh]"
            onKeyDown={handleKeyDownModal}
          >
            {/* Input Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3 bg-gray-50/50">
              <Search className="w-5 h-5 text-brand-primary shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search settings, products, recipes, forms..."
                className="w-full text-sm font-sans text-gray-900 bg-transparent focus:outline-none placeholder:text-gray-400 font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results List */}
            <div className="overflow-y-auto p-2 divide-y divide-gray-100 flex-1">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500">
                  No matching settings or features found for &quot;{query}&quot;. Try searching &quot;favicon&quot;, &quot;product&quot;, or &quot;address&quot;.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected ? 'bg-brand-primary text-white' : 'hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-brand-primary/10 text-brand-primary'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs font-serif truncate">{item.title}</span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.2 rounded-full uppercase shrink-0 ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {item.category}
                            </span>
                          </div>
                          <p
                            className={`text-[11px] truncate mt-0.5 ${
                              isSelected ? 'text-white/80' : 'text-gray-500'
                            }`}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <ArrowRight
                        className={`w-4 h-4 shrink-0 ml-2 ${
                          isSelected ? 'text-white' : 'text-gray-400'
                        }`}
                      />
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 px-4">
              <span>Use <kbd className="font-mono bg-white px-1 border rounded">↑</kbd> <kbd className="font-mono bg-white px-1 border rounded">↓</kbd> to navigate</span>
              <span>Press <kbd className="font-mono bg-white px-1 border rounded">Enter</kbd> to select</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
