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
    default: "Maa Baglamukhi Havan & Puja | Nalkheda Dham | Book Now",
    template: "%s | Maa Baglamukhi Nalkheda Dham"
  },
  description:
    "Book authentic Maa Baglamukhi Havan, Vedic Puja & Anusthan at Siddh Peeth Nalkheda. Expert guidance by Acharya Pt. Rudraksh for victory & protection. 🙏",
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
    "Tantra Sadhana"
  ].join(", "),
  alternates: {
    canonical: "https://rudrakshbaglamukhi.com",
  },
  openGraph: {
    title: "Maa Baglamukhi Havan & Puja | Nalkheda Dham",
    description:
      "Book authentic Maa Baglamukhi Havan, Vedic Puja & Anusthan at Siddh Peeth Nalkheda. Expert guidance by Acharya Pt. Rudraksh for victory & protection. 🙏",
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
    title: "Maa Baglamukhi Havan & Puja | Nalkheda Dham",
    description: "Book authentic Maa Baglamukhi Havan, Vedic Puja & Anusthan at Siddh Peeth Nalkheda. Expert guidance by Acharya Pt. Rudraksh for victory & protection. 🙏",
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
