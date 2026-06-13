import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Pujas & Havans | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
  description:
    "Explore authentic Vedic Pujas and powerful Havans guided by Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) at Nalkheda Dham.",
  keywords: [
    "Pandit Maa Baglamukhi", "Maa Bagalamukhi Pandit", "Pandit Maa Baglamukhi Nalkheda", "Maa Bagalamukhi Pandit Nalkheda",
    "Acharya Pt Rudraksh Rajpurohit services", "Maa Baglamukhi Havan Nalkheda",
    "Lal Mirchi Havan", "Court case victory puja", "Shatru Stambhan ritual",
    "Vedic puja booking online", "Maha Mrityunjay Anusthan", "Nav Graha Shanti"
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/services",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/services",
      "hi-IN": "https://www.panditmaabaglamukhi.com/services",
    },
  },
  openGraph: {
    title: "Vedic Pujas & Havans | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
    description:
      "Select and book authentic Vedic Pujas and powerful Havans guided by Pandit Maa Baglamukhi expert Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) at Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/services",
    siteName: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    images: [
      {
        url: "/havan-upload-1.webp",
        width: 1024,
        height: 819,
        alt: "Sacred Vedic Havan at Nalkheda Dham",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Pujas & Havans | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
    description:
      "Select and book authentic Vedic Pujas and powerful Havans guided by Pandit Maa Baglamukhi expert Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) at Nalkheda Dham.",
    images: ["/havan-upload-1.webp"],
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
