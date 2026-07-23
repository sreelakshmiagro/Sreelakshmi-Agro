import type { Metadata } from "next";
import { Lora, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DistributorModal from "@/components/common/DistributorModal";

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

export const metadata: Metadata = {
  title: {
    template: "%s | Sreelakshmi Agro Industries",
    default: "Sreelakshmi Agro Industries | Premium Food Processing & Wheat Products",
  },
  description: "Sreelakshmi Agro Industries manufactures high-quality food products, organic inputs, and our flagship Samba Broken Wheat, bringing traditional health and modern purity to families.",
  metadataBase: new URL("https://sreelakshmiagro.com"),
  keywords: ["Sreelakshmi Agro", "Samba Broken Wheat", "Broken Wheat Upma", "Organic Fertilizers", "Agro Industries", "Healthy Wheat Products"],
  authors: [{ name: "Sreelakshmi Agro Industries" }],
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

import MotionProvider from "@/components/providers/MotionProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "light" }}
      className={`${lora.variable} ${inter.variable} ${dancingScript.variable} h-full antialiased light`}
    >
      <body style={{ colorScheme: "light" }} className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <Navbar />
        <MotionProvider>
          <main className="flex-grow pt-[80px]">
            <Providers>{children}</Providers>
          </main>
        </MotionProvider>
        <Footer />
        <DistributorModal />
      </body>
    </html>
  );
}
