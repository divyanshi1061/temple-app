"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SiteDataProvider } from "@/context/SiteDataContext";
const FloatingContact = dynamic(() => import("@/components/layout/FloatingContact"), { ssr: false });
const SpiritualMusicPlayer = dynamic(() => import("@/components/layout/SpiritualMusicPlayer"), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SiteDataProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
      <SpiritualMusicPlayer />
    </SiteDataProvider>
  );
}
