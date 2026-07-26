import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import ProductDetail from "@/features/products/ProductDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.short_description,
    alternates: {
      canonical: `https://sreelakshmiagro.com/products/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${product.name} | Sreelakshmi Agro Industries`,
      description: product.short_description,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image || (product.media && product.media[0]),
    "description": product.short_description || product.description,
    "brand": {
      "@type": "Brand",
      "name": "Sreelakshmi Agro Industries"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://sreelakshmiagro.com/products/${resolvedParams.slug}`,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
