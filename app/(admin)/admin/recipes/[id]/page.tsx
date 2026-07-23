import React from 'react';
import { RecipeForm } from '@/components/admin/recipes/RecipeForm';

export const metadata = {
  title: 'Edit Recipe | Admin',
};

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RecipeForm recipeId={id} />;
}
