import type { Metadata } from "next";
import { Suspense } from "react";
import { getPublishedRecipes } from "@/lib/data";
import RecipesShowcase from "@/features/recipes/RecipesShowcase";

export const metadata: Metadata = {
  title: "Recipes",
  description: "Delicious and healthy recipes using Samba Broken Wheat.",
  alternates: {
    canonical: "https://sreelakshmiagro.com/recipes",
  },
};

export default async function RecipesPage() {
  const recipes = await getPublishedRecipes();
  return (
    <Suspense fallback={<div className="p-12 text-center text-text-secondary">Loading recipes...</div>}>
      <RecipesShowcase recipesData={recipes} />
    </Suspense>
  );
}
