import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maa Baglamukhi Temple Photos & Videos Gallery | Siddh Peeth Nalkheda Dham",
  description: "Watch video recordings of daily prayers, Havan ceremonies, and photos from Siddh Peeth Maa Baglamukhi Temple, Nalkheda Dham, guided by Acharya Pt Rudraksh Rajpurohit.",
  keywords: [
    "Maa Baglamukhi Nalkheda videos",
    "Baglamukhi temple photo gallery",
    "daily shringar darshan Nalkheda",
    "Baglamukhi havan videos",
    "Siddh Peeth Nalkheda media"
  ].join(", "),
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
