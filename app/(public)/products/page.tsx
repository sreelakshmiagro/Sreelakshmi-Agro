import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/data";
import ProductsGrid from "@/features/products/ProductsGrid";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore our range of premium whole grains, agricultural inputs, and food processing solutions.",
  alternates: {
    canonical: "https://sreelakshmiagro.com/products",
  },
};

export default async function ProductsPage() {
  const products = await getPublishedProducts();
  return <ProductsGrid products={products} />;
}
