"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpDown, ArrowRight, Award } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  thumbnail: string;
  shortDescription: string;
  isFeatured?: boolean;
  isFlagship?: boolean;
  isAvailable: boolean;
}

const productList: Product[] = [
  {
    id: "samba-wheat-id",
    name: "Samba Broken Wheat",
    slug: "samba-broken-wheat",
    category: "Wheat Grains",
    thumbnail: "/assets/samba_wheat.png",
    shortDescription: "Premium parboiled broken wheat grains rich in natural dietary fibers, iron, and proteins. Traditional health processed with modern hygiene safety standards.",
    isFeatured: true,
    isFlagship: true,
    isAvailable: true,
  },
  {
    id: "samba-flour-placeholder",
    name: "Premium Samba Wheat Flour",
    slug: "samba-wheat-flour",
    category: "Flour & Mixes",
    thumbnail: "/assets/samba_wheat.png",
    shortDescription: "Finely milled whole grain Samba wheat flour, perfect for soft rotis, chapatis, and high-fibre baking options. Preserving natural germ layers.",
    isAvailable: false, // Coming soon
  },
  {
    id: "organic-inputs-placeholder",
    name: "Natural Soil Bio-Nutrients",
    slug: "natural-soil-nutrients",
    category: "Agro Inputs",
    thumbnail: "/assets/samba_wheat.png",
    shortDescription: "Eco-friendly, certified organic soil conditioners and bio-fertilizers formulated to enhance root density and crop yield.",
    isAvailable: false, // Coming soon
  },
];

const categories = ["All Products", "Wheat Grains", "Flour & Mixes", "Agro Inputs"];

export default function ProductsGrid({ products = [] }: { products?: any[] }) {
  const displayProducts = products && products.length > 0 
    ? products.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category || "Wheat Grains",
        thumbnail: p.hero_image,
        shortDescription: p.short_description,
        isFeatured: p.is_featured,
        isFlagship: p.is_flagship,
        isAvailable: p.status === 'published'
      }))
    : productList;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("default"); // default, name-asc, name-desc

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return displayProducts
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All Products" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "name-desc") return b.name.localeCompare(a.name);
        return 0; // default
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="bg-bg-secondary min-h-screen pb-20">
      
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-12 overflow-hidden border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Our Products
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
              Sreelakshmi Agro Product Catalogue
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              Explore our range of premium whole grains, agricultural inputs, and food processing solutions built on trust and heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter & Grid Section */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 mt-12 z-10 relative">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Panel: Category Filter list */}
          <div className="w-full lg:w-64 bg-white p-6 rounded-xl border border-border-light shadow-sm flex flex-col gap-5 shrink-0">
            <h3 className="font-serif text-base font-bold text-text-primary border-b border-border-light pb-2 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-brand-primary" />
              <span>Filter Categories</span>
            </h3>
            
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2.5 rounded-md font-sans text-xs sm:text-sm font-semibold text-left transition-all duration-200 shrink-0 whitespace-nowrap lg:whitespace-normal w-max lg:w-full ${
                    selectedCategory === cat
                      ? "bg-brand-primary text-white shadow-sm"
                      : "bg-transparent text-text-secondary hover:bg-bg-secondary hover:text-brand-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Search, Sort, and Grid */}
          <div className="flex-grow flex flex-col gap-6 w-full">
            
            {/* Search and Sort controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-border-light shadow-sm">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-[50%] translate-y-[-50%] w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-bg-tertiary border border-border-light rounded-md font-sans text-sm text-text-primary placeholder:text-text-tertiary focus:border-brand-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                <ArrowUpDown className="w-4 h-4 text-text-secondary" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-bg-tertiary border border-border-light rounded px-3 py-2 font-sans text-xs sm:text-sm font-semibold text-text-secondary focus:outline-none"
                >
                  <option value="default">Default Sort</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center bg-white border border-border-light rounded-xl py-20 flex flex-col items-center gap-3"
                >
                  <p className="font-serif text-lg font-bold text-text-secondary">
                    No products found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All Products");
                      setSortBy("default");
                    }}
                    className="text-brand-primary font-sans text-sm font-semibold hover:underline"
                  >
                    Reset filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl border border-border-light overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group"
                    >
                      {/* Product Thumbnail wrapper */}
                      <div className="relative w-full aspect-[4/3] bg-bg-secondary border-b border-border-light flex items-center justify-center p-8 shrink-0 select-none">
                        <Image
                          src={product.thumbnail}
                          alt={product.name}
                          fill
                          className="object-cover p-6 transition-transform duration-500 group-hover:scale-103"
                          sizes="(max-width: 640px) 100vw, 380px"
                        />
                        
                        {/* Badges indicators */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {product.isFeatured && (
                            <span className="bg-brand-primary text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                              <Award className="w-3 h-3 text-brand-gold fill-brand-gold" />
                              <span>Flagship</span>
                            </span>
                          )}
                          {!product.isAvailable && (
                            <span className="bg-text-secondary text-white font-sans text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content block */}
                      <div className="p-6 flex flex-col flex-grow gap-2.5">
                        <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-wider">
                          {product.category}
                        </span>
                        
                        <h3 className="font-serif text-xl font-bold text-text-primary group-hover:text-brand-primary transition-colors">
                          {product.name}
                        </h3>

                        <p className="font-sans text-sm text-text-secondary leading-relaxed flex-grow">
                          {product.shortDescription}
                        </p>

                        <div className="mt-4 pt-4 border-t border-border-light/60 flex items-center justify-between shrink-0">
                          {product.isAvailable ? (
                            <Link
                              href={`/products/${product.slug}`}
                              className="text-brand-primary hover:text-brand-secondary font-sans text-sm font-semibold flex items-center gap-2 group/btn"
                            >
                              <span>Explore Details</span>
                              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                            </Link>
                          ) : (
                            <Link
                              href="/contact"
                              className="text-text-secondary hover:text-brand-primary font-sans text-sm font-semibold flex items-center gap-1.5"
                            >
                              <span>Enquire Priority Launch</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
