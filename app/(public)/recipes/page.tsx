import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedRecipes } from "@/lib/data";
import RecipesShowcase from "@/features/recipes/RecipesShowcase";

export const metadata: Metadata = {
  title: "Recipes | Samba Broken Wheat Cooking Guide",
  description: "Explore traditional and modern healthy recipes using Sreelakshmi Samba Broken Wheat.",
  alternates: {
    canonical: "https://sreelakshmiagro.com/recipes",
  },
};

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();

  const recipesJsonLd = (recipes || []).map((recipe: any) => ({
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.title || recipe.name,
    "image": recipe.image || recipe.image_url,
    "description": recipe.description || recipe.short_description,
    "prepTime": recipe.prep_time || "PT10M",
    "cookTime": recipe.cook_time || "PT20M",
    "recipeYield": recipe.servings || "4 servings",
    "recipeCategory": recipe.category || "Main Course",
    "author": {
      "@type": "Organization",
      "name": "Sreelakshmi Agro Industries"
    }
  }));

  return (
    <>
      {recipesJsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recipesJsonLd) }}
        />
      )}
      <Suspense fallback={<div className="p-12 text-center text-text-secondary">Loading recipes...</div>}>
        <RecipesShowcase recipesData={recipes} />
      </Suspense>
    </>
  );
}
