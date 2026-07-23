import React from 'react';
import { RecipeForm } from '@/components/admin/recipes/RecipeForm';

export const metadata = {
  title: 'New Recipe | Admin',
};

export default function NewRecipePage() {
  return <RecipeForm />;
}
