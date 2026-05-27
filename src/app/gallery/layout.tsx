import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Gallery & Videos | Maa Baglamukhi Temple Nalkheda Dham",
  description:
    "View stunning photos and videos of Maa Baglamukhi Temple, sacred Havans, divine Darshan, Shringar, and Aarti ceremonies at Siddh Peeth Nalkheda Dham, Agar Malwa.",
  keywords: [
    "Pandit Maa Baglamukhi",
    "Bagalamukhi Pandit",
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
    title: "Gallery & Videos | Maa Baglamukhi Temple Nalkheda",
    description:
      "Explore divine photos and ritual videos from the sacred Siddh Peeth Maa Baglamukhi Temple at Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/gallery",
    siteName: "Maa Baglamukhi Nalkheda Dham",
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
    title: "Gallery & Videos | Maa Baglamukhi Temple Nalkheda",
    description:
      "Explore photos and ritual videos from Siddh Peeth Nalkheda Dham.",
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
