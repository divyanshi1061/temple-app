import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Pujas, Havans & Rituals | Maa Baglamukhi Nalkheda",
  description:
    "Explore authentic Vedic Pujas and powerful Havans performed at Nalkheda Dham. Acharya Pt. Rudraksh Rajpurohit guides custom rituals like the Maa Baglamukhi Havan, Lal Mirchi Havan, and Shatru Stambhan following strict scriptural guidelines.",
  keywords: [
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
    title: "Vedic Pujas, Havans & Rituals | Maa Baglamukhi Nalkheda",
    description:
      "Select and book authentic Vedic Pujas and powerful Havans guided by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/services",
    siteName: "Maa Baglamukhi Nalkheda Dham",
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
    title: "Vedic Pujas, Havans & Rituals | Maa Baglamukhi Nalkheda",
    description:
      "Discover the custom Vedic Pujas and Havans offered at Siddh Peeth Maa Baglamukhi Temple, Nalkheda.",
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
