import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Maa Baglamukhi Dham & Pt. Rudraksh Rajpurohit",
  description:
    "Learn about the ancient history of the Siddh Peeth Maa Baglamukhi Temple in Nalkheda, Madhya Pradesh, its Pandava-era origins, and the spiritual path of Acharya Pt. Rudraksh Rajpurohit, who personally guides devotees in Vedic pujas.",
  keywords: [
    "Acharya Pt Rudraksh Rajpurohit", "Maa Baglamukhi Pandit Nalkheda",
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
    title: "About Maa Baglamukhi Dham & Pt. Rudraksh Rajpurohit",
    description:
      "Explore the Pandava-era legacy of the Siddh Peeth Maa Baglamukhi Temple in Nalkheda, and the devotional services guided by Acharya Pt. Rudraksh Rajpurohit.",
    url: "https://www.panditmaabaglamukhi.com/about",
    siteName: "Maa Baglamukhi Nalkheda Dham",
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
    title: "About Maa Baglamukhi Dham & Pt. Rudraksh Rajpurohit",
    description:
      "Explore the ancient history of Siddh Peeth Maa Baglamukhi Temple and the spiritual legacy of Acharya Pt. Rudraksh Rajpurohit in Nalkheda.",
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
