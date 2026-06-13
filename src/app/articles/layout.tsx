import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Guidance & Articles | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
  description:
    "Read spiritual guides and articles by Pandit Maa Baglamukhi expert Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) on mantras, Havans, and Nalkheda Dham history.",
  keywords: [
    "Pandit Maa Baglamukhi", "Maa Bagalamukhi Pandit", "Pandit Maa Baglamukhi Nalkheda", "Maa Bagalamukhi Pandit Nalkheda",
    "Maa Baglamukhi Temple history", "Baglamukhi mantra meaning",
    "How to reach Nalkheda Dham", "Vedic Havan process",
    "Acharya Pt Rudraksh Rajpurohit articles"
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/articles",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/articles",
      "hi-IN": "https://www.panditmaabaglamukhi.com/articles",
    },
  },
  openGraph: {
    title: "Vedic Guidance & Articles | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
    description:
      "Read spiritual guides and articles by Pandit Maa Baglamukhi expert Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) on mantras, Havans, and Nalkheda Dham history.",
    url: "https://www.panditmaabaglamukhi.com/articles",
    siteName: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pandit Maa Baglamukhi Spiritual Wisdom",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Guidance & Articles | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
    description:
      "Read spiritual guides and articles by Pandit Maa Baglamukhi expert Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) on mantras, Havans, and Nalkheda Dham history.",
    images: ["/og-image.png"],
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
