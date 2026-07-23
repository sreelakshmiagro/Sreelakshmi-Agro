import React from 'react';
import { getRecipes } from '../actions/recipes';
import { RecipesClient } from '@/components/admin/recipes/RecipesClient';

export const metadata = {
  title: 'Recipes | Admin',
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; status?: string }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const status = resolvedParams.status;
  const { recipes, total } = await getRecipes(page, 20, status);
  const totalPages = Math.ceil((total || 0) / 20);

  return (
    <RecipesClient
      recipes={recipes || []}
      total={total || 0}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}
