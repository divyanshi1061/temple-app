import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, Cormorant_Garamond, Outfit, Playball } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.panditmaabaglamukhi.com'),
  title: {
    default: "Maa Baglamukhi Havan & Pujas | Pt Rudraksh Nalkheda",
    template: "%s | Siddh Peeth Nalkheda"
  },
  description:
    "Book authentic Maa Baglamukhi Havan, Vedic Pujas & Anusthans by Pt Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham. 🙏",
  keywords: [
    "Maa Baglamukhi Havan Nalkheda", 
    "Acharya Pt Rudraksh Rajpurohit", 
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
    canonical: "https://www.panditmaabaglamukhi.com",
  },
  openGraph: {
    title: "Maa Baglamukhi Havan & Pujas | Pt Rudraksh Nalkheda",
    description:
      "Book authentic Maa Baglamukhi Havan, Vedic Pujas & Anusthans by Pt Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham. 🙏",
    url: "https://www.panditmaabaglamukhi.com",
    siteName: "Maa Baglamukhi Nalkheda Dham",
    images: [
      {
        url: "/logo.webp",
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
    title: "Maa Baglamukhi Havan & Pujas | Pt Rudraksh Nalkheda",
    description: "Book authentic Maa Baglamukhi Havan, Vedic Pujas & Anusthans by Pt Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham. 🙏",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/logo.webp",
    shortcut: "/logo.webp",
    apple: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${cinzel.variable} ${cormorant.variable} ${playball.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-K3Z6K5PBDY'}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-K3Z6K5PBDY'}');
          `}
        </Script>
        <LanguageProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
