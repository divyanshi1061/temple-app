import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pandit Maa Baglamukhi & Maa Bagalamukhi Pandit | Pt. Rudraksh Rajpurohit",
  description:
    "Discover the history of Siddh Peeth Maa Baglamukhi Temple in Nalkheda, MP and learn about the spiritual path of Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
  keywords: [
    "Pandit Maa Baglamukhi", "Maa Bagalamukhi Pandit", "Pandit Maa Baglamukhi Nalkheda",
    "Maa Bagalamukhi Pandit Nalkheda", "Acharya Pt Rudraksh Rajpurohit",
    "Siddh Peeth Nalkheda History", "Baglamukhi Mandir Pujari",
    "Lakhundar River temple history", "Pandava era temple Nalkheda",
    "Vedic priest Nalkheda", "Maa Baglamukhi Sadhak"
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/about",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/about",
      "hi-IN": "https://www.panditmaabaglamukhi.com/about",
    },
  },
  openGraph: {
    title: "About Pandit Maa Baglamukhi & Maa Bagalamukhi Pandit | Pt. Rudraksh Rajpurohit",
    description:
      "Explore the history of Siddh Peeth Nalkheda Dham and the devotional services guided by Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
    url: "https://www.panditmaabaglamukhi.com/about",
    siteName: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acharya Pt. Rudraksh Rajpurohit at Nalkheda Dham",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pandit Maa Baglamukhi & Maa Bagalamukhi Pandit | Pt. Rudraksh Rajpurohit",
    description:
      "Explore the history of Siddh Peeth Nalkheda Dham and the devotional services guided by Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
    images: ["/og-image.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
