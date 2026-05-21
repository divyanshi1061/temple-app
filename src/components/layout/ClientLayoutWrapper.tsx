"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
const LoadingScreen = dynamic(() => import("@/components/layout/LoadingScreen"), { ssr: false });
const FloatingContact = dynamic(() => import("@/components/layout/FloatingContact"), { ssr: false });
const SpiritualMusicPlayer = dynamic(() => import("@/components/layout/SpiritualMusicPlayer"), { ssr: false });

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
      <SpiritualMusicPlayer />
    </>
  );
}
