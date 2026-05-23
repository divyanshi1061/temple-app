import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Pujas, Havans & Anusthans Services | Nalkheda",
  description: "Browse the complete range of sacred Vedic and Tantric services personally conducted by Acharya Pt. Rudraksh Rajpurohit at Maa Baglamukhi Temple, Nalkheda Dham.",
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
    canonical: "/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
