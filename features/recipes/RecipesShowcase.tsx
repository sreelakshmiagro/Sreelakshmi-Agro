"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ChefHat } from "lucide-react";

const recipes = [
  {
    title: "Classic Samba Wheat Upma",
    time: "20 Mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Samba Broken Wheat",
      "2 cups hot water",
      "1 chopped onion",
      "1 carrot",
      "Mustard seeds, curry leaves, salt",
    ],
    instructions:
      "Dry roast wheat grit for 3 minutes. Sauté spices and vegetables in oil or ghee. Add hot water, bring to boil, add wheat, cover, and simmer for 10 minutes until water is absorbed.",
  },
  {
    title: "Healthy Wheat Porridge",
    time: "15 Mins",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1/2 cup Samba Broken Wheat",
      "2 cups milk or almond milk",
      "1 tbsp honey or jaggery",
      "Almonds, pistachios for garnish",
    ],
    instructions:
      "Pressure cook wheat grit with 1.5 cups water for 3 whistles. Whisk in hot milk and sweetener. Simmer for 3 minutes, garnish with crushed nuts, and serve warm.",
  },
  {
    title: "Samba Vegetable Khichdi",
    time: "25 Mins",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "1 cup Samba Broken Wheat",
      "1/2 cup moong dal",
      "Assorted vegetables",
      "Ghee, cumin, turmeric, ginger",
    ],
    instructions:
      "Sauté ginger, cumin, and chopped vegetables in ghee. Add washed wheat grit and moong dal. Pour 4 cups water, add turmeric/salt, and pressure cook for 4 whistles.",
  },
];

export default function RecipesShowcase({ recipesData = [] }: { recipesData?: any[] }) {
  const displayRecipes = recipesData && recipesData.length > 0
    ? recipesData.map(r => ({
        title: r.name,
        time: `${r.prep_time} + ${r.cook_time}`,
        difficulty: r.difficulty,
        image: r.featured_image,
        ingredients: r.ingredients || [],
        instructions: r.steps
      }))
    : recipes;

  const [activeRecipe, setActiveRecipe] = useState(0);

  return (
    <div className="bg-bg-secondary min-h-screen pb-20">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent pt-16 pb-12 overflow-hidden border-b border-border-light/60">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <div className="max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="font-sans text-xs sm:text-sm font-bold text-brand-primary uppercase tracking-widest">
              Healthy Cooking
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl text-text-primary leading-tight">
              Delicious Samba Wheat Recipes
            </h1>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              A highly versatile grain option. Explore quick, step-by-step methods to prepare healthy daily meals.
            </p>
          </div>
        </div>
      </section>

      {/* Main Recipe Tabs & Details Container */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Recipe Selection Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none">
            {displayRecipes.map((rcp, i) => (
              <button
                key={i}
                onClick={() => setActiveRecipe(i)}
                className={`px-5 py-4 rounded-xl font-sans text-sm font-semibold text-left transition-all shrink-0 whitespace-nowrap lg:whitespace-normal w-max lg:w-full border ${
                  activeRecipe === i
                    ? "bg-brand-primary text-white border-brand-primary shadow-md"
                    : "bg-white text-text-secondary border-border-light hover:bg-bg-secondary"
                }`}
              >
                {rcp.title}
              </button>
            ))}
          </div>

          {/* Right Column: Recipe Details Card */}
          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl border border-border-light shadow-sm flex flex-col md:flex-row gap-6 text-left">
            
            {/* Recipe Dish Image */}
            <div className="relative w-full md:w-64 h-56 md:h-auto rounded-xl overflow-hidden shrink-0 border border-border-light shadow-sm bg-bg-secondary">
              <Image
                src={displayRecipes[activeRecipe].image}
                alt={displayRecipes[activeRecipe].title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Recipe Details Content */}
            <div className="flex flex-col gap-4 flex-grow min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-light pb-3 gap-2">
                <h2 className="font-serif text-2xl font-bold text-text-primary">
                  {displayRecipes[activeRecipe].title}
                </h2>
                <div className="flex items-center gap-4 text-xs font-sans text-text-secondary shrink-0">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-primary" />
                    <strong>{displayRecipes[activeRecipe].time}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-brand-primary" />
                    <strong>{displayRecipes[activeRecipe].difficulty}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 font-sans text-sm text-text-secondary">
                <div className="flex flex-col gap-2">
                  <h3 className="font-serif text-sm font-bold text-text-primary">Ingredients:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside">
                    {displayRecipes[activeRecipe].ingredients.map((ing: string, k: number) => (
                      <li key={k}>{ing}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-2 border-t border-border-light/60 pt-4 mt-1">
                  <h3 className="font-serif text-sm font-bold text-text-primary">Preparation Steps:</h3>
                  <p className="leading-relaxed text-text-secondary">{displayRecipes[activeRecipe].instructions}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA to Product Page */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 mt-16 text-center">
        <div className="bg-bg-secondary border border-border-light rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-left">
            <h3 className="font-serif text-xl font-bold text-text-primary">Looking for Premium Samba Broken Wheat?</h3>
            <p className="font-sans text-sm text-text-secondary">Explore full nutritional specs, processing standards, and wholesale options.</p>
          </div>
          <Link
            href="/products/samba-broken-wheat"
            className="bg-brand-primary hover:bg-brand-secondary text-white font-sans text-sm font-semibold px-6 py-3 rounded-lg shadow-sm transition-all shrink-0 flex items-center gap-2"
          >
            <span>View Product Details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
