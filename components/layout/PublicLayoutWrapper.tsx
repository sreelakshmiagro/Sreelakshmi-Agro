"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DistributorModal from "@/components/common/DistributorModal";
import MotionProvider from "@/components/providers/MotionProvider";
import Providers from "@/app/providers";

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <Providers>{children}</Providers>;
  }

  return (
    <>
      <Navbar />
      <MotionProvider>
        <main className="flex-grow pt-[80px]">
          <Providers>{children}</Providers>
        </main>
      </MotionProvider>
      <Footer />
      <DistributorModal />
    </>
  );
}
