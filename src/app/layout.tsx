import type { Metadata } from "next";
import { Inter, Cinzel, Cormorant_Garamond, Outfit, Playball } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playball = Playball({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-playball",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rudrakshbaglamukhi.com'),
  title: {
    default: "Pandit Maa Baglamukhi | Acharya Pt. Rudraksh Rajpurohit | Nalkheda Dham",
    template: "%s | Pandit Maa Baglamukhi"
  },
  description:
    "Authentic Maa Baglamukhi Havan, Vedic Pujas, and Anusthans performed by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham. Consult for legal victory, business growth, and protection.",
  keywords: [
    "Pandit Maa Baglamukhi", 
    "Acharya Pt. Rudraksh Rajpurohit", 
    "Rudraksh Rajpurohit", 
    "Maa Baglamukhi Dham Nalkheda", 
    "Nalkheda temple pujari", 
    "Maa Baglamukhi Havan online booking", 
    "best pandit for baglamukhi havan in nalkheda", 
    "Maa Baglamukhi 36 Lakh Jaap", 
    "Sawa Lakh Jaap", 
    "Nyayalay Vijay Puja", 
    "Vastu Shastra Paramarsh", 
    "Vedic Pandit Nalkheda", 
    "Tantra Sadhana"
  ].join(", "),
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Pandit Maa Baglamukhi | Acharya Pt. Rudraksh Rajpurohit | Nalkheda Dham",
    description:
      "Authentic Maa Baglamukhi Havan, Vedic Pujas, and Anusthans performed by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham.",
    url: "https://rudrakshbaglamukhi.com",
    siteName: "Pandit Maa Baglamukhi",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Pandit Maa Baglamukhi Logo",
      }
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandit Maa Baglamukhi | Acharya Pt. Rudraksh Rajpurohit | Nalkheda Dham",
    description: "Authentic Maa Baglamukhi Havan, Vedic Pujas, and Anusthans performed by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${cinzel.variable} ${cormorant.variable} ${playball.variable} antialiased`}
      >
        <LanguageProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
