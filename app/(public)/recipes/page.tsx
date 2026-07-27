import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedRecipes, getSeoMetaForPage } from "@/lib/data";
import RecipesShowcase from "@/features/recipes/RecipesShowcase";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetaForPage("recipes");
  const title = seo?.meta_title || "Healthy Recipes | Sreelakshmi Agro Industries";
  const description = seo?.meta_description || "Discover delicious and nutritious recipes made with Samba Broken Wheat.";

  return {
    title,
    description,
    keywords: seo?.focus_keyword ? [seo.focus_keyword, "broken wheat recipes", "samba wheat upma"] : undefined,
    alternates: {
      canonical: "https://sreelakshmiagro.com/recipes",
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: seo?.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}

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
