"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus, Flame, Activity, ShieldCheck, Apple, ArrowRight, ChefHat } from "lucide-react";
import { useDistributorModal } from "@/store/useDistributorModal";

const allowedSlugs = ["samba-broken-wheat"];

const healthBenefits = [
  {
    icon: Activity,
    title: "High in Fiber, Vitamins & Minerals",
    desc: "Contains a rich natural density of dietary bran fibers, vitamins, and essential minerals that support digestion.",
  },
  {
    icon: Flame,
    title: "Lower Glycemic Index",
    desc: "Ideal for diabetes patients, promoting gradual energy release and supporting stable blood glucose levels.",
  },
  {
    icon: ShieldCheck,
    title: "Protein, Iron & Calcium Source",
    desc: "A wholesome grain offering natural plant proteins along with vital bone and hemoglobin-building minerals.",
  },
  {
    icon: Apple,
    title: "Lower Gluten Content",
    desc: "Contains lower gluten loads compared to regular commercially processed hybrid wheat varieties.",
  },
];

const nutritionData = [
  { name: "Energy / Calories", value: "342 Kcal" },
  { name: "Dietary Fibre", value: "11.2 g" },
  { name: "Proteins", value: "12.5 g" },
  { name: "Carbohydrates", value: "71.8 g" },
  { name: "Calcium", value: "32 mg" },
  { name: "Iron", value: "3.5 mg" },
  { name: "Fats", value: "1.2 g" },
];

const faqs = [
  { q: "Is Samba Broken Wheat gluten-free?", a: "No. Since it is processed from whole wheat grains, it contains natural gluten. It is not suitable for individuals with Celiac disease or gluten allergies." },
  { q: "What is the shelf life of this package?", a: "Samba Broken Wheat has a natural shelf life of 6 months. To maintain freshness, store in an airtight container in a cool, dry place after opening." },
  { q: "Can I prepare diabetic meals using broken wheat?", a: "Yes. Due to its high bran fiber content and low glycemic index (GI), it releases sugar slowly into the bloodstream, making it highly recommended for diabetic diets." },
];

export default function ProductDetail({ product }: { product?: any }) {
  const openModal = useDistributorModal((state) => state.openModal);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayProduct = product || {
    name: "Samba Broken Wheat",
    long_description: `<p>Samba Broken Wheat is a wholesome and nutritious cereal made from carefully selected whole samba wheat grains that are cleaned and coarsely broken to retain their natural goodness. Rich in dietary fiber, protein, vitamins, and essential minerals, it offers a healthy alternative to refined grains. Owing to its whole grain nature and higher fiber content, Samba Broken Wheat generally has a lower glycemic response compared to refined cereals, helping in the gradual release of energy and supporting better blood sugar management as part of a balanced diet. Its slightly nutty flavor and chewy texture make it ideal for preparing a variety of dishes such as upma, porridge, khichdi, pulao, payasam(kheer) and desserts. Free from added preservatives and artificial ingredients, it is a nourishing choice for health-conscious consumers and the entire family.</p><p><strong>About the Main Ingredient (Samba Wheat):</strong> Popularly known as 'Samba' or 'Emmer', Khapli wheat is a long, versatile and nutritious variety of wheat which is mostly available in broken or cracked form. It is commonly used in Indian cuisine, to make a variety of dishes such as porridges, upma, soups, and sweet dishes like payasam (kheer).</p>`,
    hero_image: "/assets/samba_wheat.png",
    benefits: healthBenefits,
    nutrition_table: nutritionData,
    faqs: faqs
  };

  return (
    <div className="bg-bg-secondary min-h-screen">
      
      {/* SECTION 2: Product Overview & Image */}
      <section className="py-16 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Story text */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              <span className="font-sans text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/5 border border-brand-primary/10 px-3.5 py-1 rounded-full w-max">
                Flagship Product
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
                {displayProduct.name}
              </h1>
              <h2 className="font-serif text-xl sm:text-2xl text-brand-primary leading-tight font-medium">
                Purity You Can Trust, Value You Can Taste
              </h2>
              <div 
                className="font-sans text-text-secondary text-base leading-relaxed flex flex-col gap-4"
                dangerouslySetInnerHTML={{ __html: displayProduct.long_description }}
              />
            </div>

            {/* Right Column: 3D Standalone Product Image & Key facts */}
            <div className="lg:col-span-5 flex flex-col gap-6 items-center">
              <div className="relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center select-none py-2">
                {/* 3D Soft Radial Glow */}
                <div className="absolute inset-0 bg-radial-gradient from-brand-gold/25 via-brand-cream/30 to-transparent scale-125 pointer-events-none blur-2xl rounded-full" />
                
                {/* Standalone PNG with 3D Drop Shadow */}
                <div className="relative w-full h-full drop-shadow-[0_25px_30px_rgba(0,0,0,0.22)] hover:drop-shadow-[0_32px_45px_rgba(126,26,37,0.32)] transition-all duration-500 hover:scale-[1.03]">
                  <Image
                    src={displayProduct.hero_image || "/assets/samba_wheat.png"}
                    alt={`${displayProduct.name} Product Package`}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-3">
                <div className="p-4 bg-bg-secondary rounded-xl border border-border-light flex gap-3.5 items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-text-primary">100% Whole Wheat</h3>
                    <p className="font-sans text-xs text-text-secondary">Processed from pure harvests with zero polishing.</p>
                  </div>
                </div>
                <div className="p-4 bg-bg-secondary rounded-xl border border-border-light flex gap-3.5 items-center">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-text-primary">Zero Chemical Bleach</h3>
                    <p className="font-sans text-xs text-text-secondary">No artificial coatings, glosses, or preservatives added.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Health Benefits Cards */}
      <section className="py-20 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-16">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Nutritional Value
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-text-primary leading-tight">
              Nutritional Benefits of {displayProduct.name}
            </h2>
            <p className="font-sans text-text-secondary text-base leading-relaxed max-w-xl mx-auto">
              A nutrient-dense grain alternative that brings pure health and natural vitality back to your daily plate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayProduct.benefits || healthBenefits).map((item: any, index: number) => {
              const Icon = item.icon || Activity;
              return (
                <div
                  key={index}
                  className="bg-bg-secondary p-6 rounded-xl border border-border-light flex flex-col gap-4 shadow-sm"
                >
                  <div className="p-3 bg-brand-primary/5 text-brand-primary rounded-lg w-max">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-serif text-base font-bold text-text-primary">{item.title}</h3>
                    <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: Dedicated Recipes Teaser Link */}

      {/* SECTION 5: Dedicated Recipes Teaser Link */}
      <section className="py-16 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="bg-bg-secondary border border-border-light rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0 hidden sm:block">
                <ChefHat className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-2xl font-bold text-text-primary">Delicious Samba Broken Wheat Recipes</h3>
                <p className="font-sans text-sm text-text-secondary">Discover step-by-step cooking methods for Upma, Porridge, Khichdi, and healthy daily meals.</p>
              </div>
            </div>
            <Link
              href="/recipes"
              className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-7 py-3.5 rounded-lg shadow transition-all shrink-0 flex items-center gap-2"
            >
              <span>Explore Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQs Accordion */}
      <section className="py-20 bg-white border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4 flex flex-col gap-4 text-left">
              <h2 className="font-serif text-3xl text-text-primary leading-tight">
                Product FAQ Hub
              </h2>
              <p className="font-sans text-sm text-text-secondary leading-relaxed">
                Quick answers regarding dietary usage, celiac guidelines, and regional distributor allocations.
              </p>
            </div>

            <div className="lg:col-span-8 flex flex-col gap-4 w-full">
              {(displayProduct.faqs || faqs).map((faq: any, idx: number) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="bg-bg-secondary rounded-lg border border-border-light overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex justify-between items-center text-left focus:outline-none"
                    >
                      <span className="font-serif text-base font-bold text-text-primary">{faq.q}</span>
                      <div>{isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-5 pb-5 pt-1 font-sans text-sm text-text-secondary border-t border-border-light/50"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: Partner CTA */}
      <section className="py-20 bg-brand-primary text-white text-center relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-serif text-3xl sm:text-4xl">Distribute {displayProduct.name}</h2>
          <p className="font-sans text-white/80 text-sm sm:text-base max-w-xl">
            Sreelakshmi Agro Industries supports stockists with competitive pricing and steady parboiling supplies. Become a partner.
          </p>
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            <button
              onClick={openModal}
              className="bg-white text-brand-primary hover:bg-brand-cream font-sans text-sm sm:text-base font-semibold px-8 py-3.5 rounded-md shadow transition-all duration-300 hover:scale-[1.02]"
            >
              Become a Distributor
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
