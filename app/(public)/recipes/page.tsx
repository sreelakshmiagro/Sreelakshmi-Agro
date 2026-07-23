import type { Metadata } from "next";
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
  return <RecipesShowcase recipesData={recipes} />;
}
