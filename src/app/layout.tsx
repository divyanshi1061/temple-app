import type { Metadata, Viewport } from "next";
import { Inter, Cinzel, Outfit } from "next/font/google";
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
  weight: ["400", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

// Removed Cormorant_Garamond (5 weights, ~70KB) and Playball (~20KB) — barely used.
// Total font savings: ~150KB+ fewer downloads on first load.

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.panditmaabaglamukhi.com'),
  title: {
    default: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    template: "%s | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit Nalkheda"
  },
  description:
    "Consult Pandit Maa Baglamukhi expert Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) for authentic Havans, Pujas & Anusthans at the ancient Siddh Peeth in Nalkheda Dham. Resolve legal disputes, enemies, or financial issues with complete scriptural purity.",
  keywords: [
    // Brand & Person keywords
    "Pandit Maa Baglamukhi", "Maa Bagalamukhi Pandit", "Pandit Maa Bagalamukhi Nalkheda", "Maa Bagalamukhi Pandit Nalkheda",
    "Pt Rudraksh Rajpurohit", "Acharya Pt Rudraksh Rajpurohit", "Rudraksh Rajpurohit Nalkheda",
    "Maa Baglamukhi Pandit Nalkheda", "Baglamukhi Mandir Pujari",
    "Siddh Peeth Nalkheda Dham", "Maa Baglamukhi Havan Nalkheda",
    "Lal Mirchi Havan Nalkheda", "Court Case Victory Puja",
    "Shatru Stambhan Puja", "Maa Baglamukhi Sawa Lakh Jaap",
    "Maha Mrityunjay Anusthan Nalkheda", "Nav Graha Shanti Puja",
    "Vastu Shastra Consultation", "Vedic Pandit booking Nalkheda",
    "बगलामुखी पंडित नलखेड़ा", "बगलामुखी हवन नलखेड़ा",
    "आचार्य रुद्राक्ष राजपुरोहित", "नलखेड़ा मंदिर पंडित जी",
    "लाल मिर्ची हवन विधि", "कोर्ट केस विजय पूजा",
    "शत्रु स्तंभन अनुष्ठान", "बगलामुखी सिद्ध पीठ नलखेड़ा"
  ].join(", "),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com",
      "hi-IN": "https://www.panditmaabaglamukhi.com",
    },
  },
  openGraph: {
    title: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    description:
      "Connect with Pandit Maa Baglamukhi expert Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) for authentic Havans, Pujas & Anusthans at the ancient Siddh Peeth in Nalkheda Dham, Madhya Pradesh. Experience pure Vedic rituals for protection, peace, and prosperity.",
    url: "https://www.panditmaabaglamukhi.com",
    siteName: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Acharya Pt. Rudraksh Rajpurohit conducting rituals at Nalkheda Dham",
      }
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit - Pt. Rudraksh Rajpurohit",
    description: "Book authentic Vedic Havans, Pujas & Anusthans with Pandit Maa Baglamukhi expert Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) at Siddh Peeth Nalkheda Dham.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
        <link rel="manifest" href="/manifest.json" />
        <meta name="google-site-verification" content="7_S9yO97cQVDJYkkx0yKx-ptQACVyyVP3S-GBn3-gNg" />
        {/* Preload the LCP hero image so it starts downloading immediately */}
        <link rel="preload" href="/acharya-new.webp" as="image" type="image/webp" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${outfit.variable} ${cinzel.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-K3Z6K5PBDY'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
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
