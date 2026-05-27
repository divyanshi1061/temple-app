import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vedic Guidance & Spiritual Knowledge Hub | Pandit Maa Baglamukhi",
  description:
    "Explore authentic articles on Maa Baglamukhi temple history, ritual benefits, mantra meanings, hawan processes, travel guides, and festival updates at Nalkheda Dham.",
  keywords: [
    "Maa Baglamukhi Pandit Nalkheda",
    "Ma Baglamukhi Pandit Nalkheda",
    "Pandit Maa Baglamukhi",
    "Bagalamukhi Pandit",
    "Nalkheda Pandit",
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/articles",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/articles",
      "hi-IN": "https://www.panditmaabaglamukhi.com/articles",
    },
  },
  openGraph: {
    title: "Vedic Guidance & Spiritual Knowledge Hub | Pandit Maa Baglamukhi",
    description:
      "Explore authentic articles on Maa Baglamukhi temple history, ritual benefits, mantra meanings, hawan processes, travel guides, and festival updates at Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/articles",
    siteName: "Maa Baglamukhi Nalkheda Dham",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pandit Maa Baglamukhi Spiritual Hub",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Guidance & Spiritual Knowledge Hub | Pandit Maa Baglamukhi",
    description:
      "Explore authentic articles on Maa Baglamukhi temple history, ritual benefits, mantra meanings, and travel guides.",
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
