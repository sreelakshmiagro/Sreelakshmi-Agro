import type { Metadata } from "next";
import { Lora, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";
import { Suspense } from "react";
import GlobalPreloader from "@/components/common/GlobalPreloader";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";
import { getSiteSettings } from "@/lib/data";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const rawFavicon = settings.site_favicon || "/icon.png";
  const faviconUrl = encodeURI(rawFavicon);

  return {
    title: {
      template: "%s | Sreelakshmi Agro Industries",
      default: "Sreelakshmi Agro Industries | Premium Food Processing & Wheat Products",
    },
    description: "Sreelakshmi Agro Industries manufactures high-quality food products, organic inputs, and our flagship Samba Broken Wheat, bringing traditional health and modern purity to families.",
    metadataBase: new URL("https://sreelakshmiagro.com"),
    keywords: ["Sreelakshmi Agro", "Samba Broken Wheat", "Broken Wheat Upma", "Organic Fertilizers", "Agro Industries", "Healthy Wheat Products"],
    authors: [{ name: "Sreelakshmi Agro Industries" }],
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: faviconUrl, type: "image/png" }
      ],
      shortcut: ["/favicon.ico"],
      apple: ["/apple-icon.png"],
    },
    openGraph: {
      title: "Sreelakshmi Agro Industries | Premium Food Processing & Wheat Products",
      description: "Sreelakshmi Agro Industries manufactures high-quality food products, organic inputs, and our flagship Samba Broken Wheat.",
      url: "https://sreelakshmiagro.com",
      siteName: "Sreelakshmi Agro Industries",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Sreelakshmi Agro Industries | Premium Food Processing",
      description: "Discover pure nutrition and traditional wellness with Sreelakshmi Agro Industries' premium products.",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const rawFavicon = settings.site_favicon || "/icon.png";
  const faviconUrl = encodeURI(rawFavicon);

  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${lora.variable} ${inter.variable} ${dancingScript.variable} antialiased light`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href={faviconUrl} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body style={{ colorScheme: "light" }} className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Suspense fallback={null}>
          <GlobalPreloader />
        </Suspense>
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
