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
  title: "Pandit Maa Baglamukhi | Maa Baglamukhi Dham, Nalkheda",
  description:
    "Divine Protection & Sacred Vedic Pujas by Acharya Pt. Rudraksh Rajpurohit at the sacred Nalkheda Dham.",
  keywords:
    "Pandit Maa Baglamukhi, Acharya Pt. Rudraksh Rajpurohit, Rudraksh Rajpurohit, Nalkheda Dham Priest, Maa Baglamukhi Havan, Online Puja Booking, Vedic Pandit Nalkheda, Tantra Sadhana",
  openGraph: {
    title: "Pandit Maa Baglamukhi | Maa Baglamukhi Dham, Nalkheda",
    description:
      "Vedic Priest Pt. Rudraksh Rajpurohit guides devotees in powerful Baglamukhi Havans, Anusthans, and Vedic Pujas at Nalkheda Dham.",
    type: "website",
    locale: "en_IN",
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
