import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Maa Baglamukhi Dham & Acharya Pt. Rudraksh Rajpurohit | Nalkheda",
  description:
    "Learn about the ancient Siddh Peeth Maa Baglamukhi Temple at Nalkheda Dham, its Pandava-era history, the sacred Lakhundar River, and the revered priest Acharya Pt. Rudraksh Rajpurohit.",
  keywords: [
    "Maa Baglamukhi Pandit Nalkheda",
    "Ma Baglamukhi Pandit Nalkheda",
    "Pandit Maa Baglamukhi",
    "Bagalamukhi Pandit",
    "Mandir Pujari",
    "Baglamukhi Pujari",
    "Nalkheda temple pujari",
    "Maa Baglamukhi Temple Nalkheda history",
    "Acharya Pt Rudraksh Rajpurohit biography",
    "Siddh Peeth Nalkheda Dham",
    "Baglamukhi Devi temple Agar Malwa",
    "Lakhundar River temple",
    "Pandava era temple Madhya Pradesh",
    "Vedic priest Nalkheda",
    "Bagalmukhi Sadhak",
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/about",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/about",
      "hi-IN": "https://www.panditmaabaglamukhi.com/about",
    },
  },
  openGraph: {
    title: "About Maa Baglamukhi Dham & Acharya Pt. Rudraksh | Nalkheda",
    description:
      "Discover the 500+ year old Siddh Peeth Maa Baglamukhi Temple, its Pandava-era origins, and the spiritual legacy of Acharya Pt. Rudraksh Rajpurohit at Nalkheda Dham.",
    url: "https://www.panditmaabaglamukhi.com/about",
    siteName: "Maa Baglamukhi Nalkheda Dham",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pandit Maa Baglamukhi Nalkheda Dham",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Maa Baglamukhi Dham & Acharya Pt. Rudraksh | Nalkheda",
    description:
      "Discover the sacred Siddh Peeth Maa Baglamukhi Temple and its history at Nalkheda Dham, Madhya Pradesh.",
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
