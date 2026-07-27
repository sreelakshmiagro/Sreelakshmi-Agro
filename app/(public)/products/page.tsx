import type { Metadata } from "next";
import { getPublishedProducts, getSeoMetaForPage } from "@/lib/data";
import ProductsGrid from "@/features/products/ProductsGrid";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetaForPage("products");
  const title = seo?.meta_title || "Our Products | Sreelakshmi Agro Industries";
  const description = seo?.meta_description || "Explore our range of premium food products including Samba Broken Wheat and organic fertilizers.";

  return {
    title,
    description,
    keywords: seo?.focus_keyword ? [seo.focus_keyword, "Samba Broken Wheat", "Organic Fertilizers"] : undefined,
    alternates: {
      canonical: "https://sreelakshmiagro.com/products",
    },
    openGraph: {
      title: seo?.og_title || title,
      description: seo?.og_description || description,
      images: seo?.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}

export default async function ProductsPage() {
  const products = await getPublishedProducts();
  return <ProductsGrid products={products} />;
}
