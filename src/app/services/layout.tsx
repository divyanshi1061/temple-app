import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Vedic Services & Rituals | Maa Baglamukhi Havan Nalkheda",
  description:
    "Explore 19+ authentic Vedic Pujas, Tantric Havans, and powerful Anusthans. Book Baglamukhi Havan, Lal Mirchi Havan, Court Case Victory Puja, Shatru Stambhan & more at Siddh Peeth Nalkheda Dham.",
  keywords: [
    "Pandit Maa Baglamukhi",
    "Bagalamukhi Pandit",
    "Mandir Pujari",
    "Baglamukhi Pujari",
    "Nalkheda temple pujari",
    "Maa Baglamukhi Havan services",
    "Vedic puja booking online",
    "Lal Mirchi Havan Nalkheda",
    "Court case victory puja",
    "Shatru Stambhan",
    "Baglamukhi Anusthan",
    "Nav Graha Shanti puja",
    "Maha Mrityunjay Anusthan",
    "Vyapar Vraddhi puja",
    "Santan Prapti puja",
    "Vashikaran Anusthan",
    "Vastu Shastra consultation",
    "Tantric rituals Nalkheda",
    "Pt Rudraksh Rajpurohit services",
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/services",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/services",
      "hi-IN": "https://www.panditmaabaglamukhi.com/services",
    },
  },
  openGraph: {
    title: "Sacred Services & Rituals | Maa Baglamukhi Nalkheda",
    description:
      "Book authentic Vedic Pujas, Tantric Havans & powerful Anusthans by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/services",
    siteName: "Maa Baglamukhi Nalkheda Dham",
    images: [
      {
        url: "/havan-upload-1.webp",
        width: 800,
        height: 600,
        alt: "Sacred Vedic Havan at Nalkheda Dham",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacred Services & Rituals | Maa Baglamukhi Nalkheda",
    description:
      "Book authentic Maa Baglamukhi Havans & Pujas at Siddh Peeth Nalkheda Dham.",
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
