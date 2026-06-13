import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery & Videos | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
  description:
    "View photos and videos of Siddh Peeth Nalkheda Dham rituals guided by Pandit Maa Baglamukhi expert Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
  keywords: [
    "Pandit Maa Baglamukhi",
    "Maa Bagalamukhi Pandit",
    "Pandit Maa Baglamukhi Nalkheda",
    "Maa Bagalamukhi Pandit Nalkheda",
    "Mandir Pujari",
    "Baglamukhi Pujari",
    "Maa Baglamukhi Temple photos",
    "Nalkheda Dham gallery",
    "Baglamukhi Havan videos",
    "Temple Darshan images",
    "Maa Baglamukhi Aarti video",
    "Nalkheda Temple night view",
    "Vedic Havan fire ritual photos",
    "Maa Baglamukhi Shringar",
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/gallery",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/gallery",
      "hi-IN": "https://www.panditmaabaglamukhi.com/gallery",
    },
  },
  openGraph: {
    title: "Gallery & Videos | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
    description:
      "Explore photos and ritual videos from Nalkheda Dham under the guidance of Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
    url: "https://www.panditmaabaglamukhi.com/gallery",
    siteName: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    images: [
      {
        url: "/temple-night-1.webp",
        width: 1024,
        height: 576,
        alt: "Maa Baglamukhi Temple at Night",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery & Videos | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
    description:
      "Explore photos and ritual videos from Nalkheda Dham under the guidance of Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
    images: ["/temple-night-1.webp"],
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
