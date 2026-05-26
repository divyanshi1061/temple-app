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
    default: "Vedic Maa Baglamukhi Havan & Puja | Acharya Pt. Rudraksh",
    template: "%s | Maa Baglamukhi Nalkheda Dham"
  },
  description:
    "Book authentic Maa Baglamukhi Havan, Vedic Pujas & Anusthans by Acharya Pt. Rudraksh at Siddh Peeth Nalkheda Dham. Consult for victory & protection. 🙏",
  keywords: [
    "Maa Baglamukhi Havan Nalkheda", 
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
    "Tantra Sadhana",
    "Maa Baglamukhi Siddh Peeth",
    "Nalkheda Dham Puja"
  ].join(", "),
  alternates: {
    canonical: "https://rudrakshbaglamukhi.com",
  },
  openGraph: {
    title: "Vedic Maa Baglamukhi Havan & Puja | Acharya Pt. Rudraksh",
    description:
      "Book authentic Maa Baglamukhi Havan, Vedic Pujas & Anusthans by Acharya Pt. Rudraksh at Siddh Peeth Nalkheda Dham. Consult for victory & protection. 🙏",
    url: "https://rudrakshbaglamukhi.com",
    siteName: "Maa Baglamukhi Nalkheda Dham",
    images: [
      {
        url: "/logo.png",
        width: 500,
        height: 500,
        alt: "Pandit Maa Baglamukhi Logo",
      }
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vedic Maa Baglamukhi Havan & Puja | Acharya Pt. Rudraksh",
    description: "Book authentic Maa Baglamukhi Havan, Vedic Pujas & Anusthans by Acharya Pt. Rudraksh at Siddh Peeth Nalkheda Dham. Consult for victory & protection. 🙏",
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
