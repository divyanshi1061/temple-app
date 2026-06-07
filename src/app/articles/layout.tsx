import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Guidance & Spiritual Wisdom | Maa Baglamukhi Temple",
  description:
    "Read authentic articles on the history of Siddh Peeth Maa Baglamukhi Temple, the deep meaning of sacred mantras, step-by-step Havan processes, and travel guidelines for Nalkheda Dham.",
  keywords: [
    "Maa Baglamukhi Temple history", "Baglamukhi mantra meaning",
    "How to reach Nalkheda Dham", "Vedic Havan process",
    "Maa Baglamukhi Pandit", "Acharya Pt Rudraksh Rajpurohit articles"
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/articles",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/articles",
      "hi-IN": "https://www.panditmaabaglamukhi.com/articles",
    },
  },
  openGraph: {
    title: "Vedic Guidance & Spiritual Wisdom | Maa Baglamukhi Temple",
    description:
      "Explore deep spiritual insights, temple chronicles, and practical guides for visiting Siddh Peeth Maa Baglamukhi Temple at Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/articles",
    siteName: "Maa Baglamukhi Nalkheda Dham",
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
    title: "Vedic Guidance & Spiritual Wisdom | Maa Baglamukhi Temple",
    description:
      "Read authentic articles on the history of Siddh Peeth Maa Baglamukhi Temple, mantra meanings, and travel guides.",
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
