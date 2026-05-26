import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Pujas, Havans & Anusthans by Acharya Pt Rudraksh Rajpurohit",
  description: "Browse the complete range of sacred Vedic Pujas, Havans, and Anusthans personally conducted by Acharya Pt Rudraksh Rajpurohit at Siddh Peeth Maa Baglamukhi Temple, Nalkheda Dham.",
  keywords: [
    "Vedic Puja services Nalkheda",
    "Maa Baglamukhi Havan booking",
    "Court case victory puja",
    "Vyavahik Badha Nivaran",
    "Santan Prapti Anusthan",
    "Lakshmi Prapti Puja",
    "Vastu Shastra consultation"
  ].join(", "),
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
