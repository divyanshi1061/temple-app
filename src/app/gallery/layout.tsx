import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maa Baglamukhi Temple Photos & Videos Gallery",
  description: "Watch recent video recordings of daily prayers, holy Havan ceremonies, and explore photographs of divine shringar from Siddh Peeth Maa Baglamukhi Temple, Nalkheda Dham.",
  keywords: [
    "Maa Baglamukhi Nalkheda videos",
    "Baglamukhi temple photo gallery",
    "daily shringar darshan Nalkheda",
    "Baglamukhi havan videos",
    "Siddh Peeth Nalkheda media"
  ].join(", "),
  alternates: {
    canonical: "https://rudrakshbaglamukhi.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
