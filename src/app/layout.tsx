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
    default: "Maa Baglamukhi Pandit Nalkheda | Pt. Rudraksh Rajpurohit",
    template: "%s | Siddh Peeth Nalkheda"
  },
  description:
    "Acharya Pt. Rudraksh Rajpurohit is widely regarded as the best Maa Baglamukhi Pandit in Nalkheda. Book authentic Baglamukhi Havans, Anusthans & Vedic Pujas at Siddh Peeth Nalkheda Dham. 🙏",
  keywords: [
    // Brand & Person keywords
    "Maa Baglamukhi Pandit Nalkheda", "Maa Bagalamukhi Pandit Nalkheda",
    "Ma Baglamukhi Pandit Nalkheda", "Ma Bagalamukhi Pandit Nalkheda",
    "Baglamukhi Pandit Nalkheda", "Nalkheda Baglamukhi Pandit",
    "Pandit Maa Baglamukhi", "Pandit Maa Bagalamukhi", "Pandit Ma Baglamukhi",
    "Bagalamukhi Pandit", "Baglamukhi Pandit", "Ma Baglamukhi Pandit",
    "Acharya Pt Rudraksh Rajpurohit", "Rudraksh Rajpurohit",
    "Pt Rudraksh Rajpurohit Nalkheda",
    // Temple & Location keywords
    "Maa Baglamukhi Dham Nalkheda", "Maa Bagalamukhi Mandir Nalkheda",
    "Baglamukhi Temple Nalkheda", "Bagalamukhi Temple Nalkheda",
    "Nalkheda Mandir Pujari", "Nalkheda Temple Pujari",
    "Siddh Peeth Nalkheda", "Maa Baglamukhi Siddh Peeth",
    "Nalkheda Dham Madhya Pradesh", "Baglamukhi Mandir Agar Malwa",
    // Service keywords
    "Maa Baglamukhi Havan Nalkheda", "Maa Bagalamukhi Havan",
    "Baglamukhi Havan online booking", "Bagalamukhi Havan booking",
    "Maa Baglamukhi Havan online booking",
    "best pandit for baglamukhi havan", "best pandit for bagalamukhi havan",
    "Baglamukhi Havan vidhi", "Bagalamukhi puja vidhi",
    "Lal Mirchi Havan", "Court Case Victory Puja",
    "Nyayalay Vijay Puja", "Shatru Stambhan Puja",
    "Maa Baglamukhi 36 Lakh Jaap", "Sawa Lakh Jaap",
    "Maha Mrityunjay Anusthan", "Nav Graha Shanti Puja",
    "Vastu Shastra Paramarsh", "Santan Prapti Puja",
    "Vyapar Vraddhi Puja", "Rin Mukti Puja",
    "Vashikaran Anusthan", "Akarshan Anusthan",
    // Generic spiritual keywords
    "Vedic Pandit Nalkheda", "Tantra Sadhana",
    "Vedic Puja online", "Havan Puja near me",
    "online pandit booking", "Tantrik Pandit",
    "Baglamukhi Mantra Jaap", "Bagalamukhi Mantra",
    // Hindi keywords
    "बगलामुखी पंडित", "बगलामुखी हवन", "बगलामुखी मंदिर नलखेड़ा",
    "माँ बगलामुखी हवन", "माँ बगलामुखी पूजा",
    "नलखेड़ा धाम पूजारी", "नलखेड़ा मंदिर पंडित",
    "पंडित माँ बगलामुखी", "बगलामुखी सिद्ध पीठ",
    "रुद्राक्ष राजपुरोहित", "आचार्य रुद्राक्ष",
    "बगलामुखी अनुष्ठान", "लाल मिर्ची हवन",
    "कोर्ट केस विजय पूजा", "शत्रु स्तंभन",
    "न्यायालय विजय पूजा", "वशीकरण अनुष्ठान",
  ].join(", "),
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com",
      "hi-IN": "https://www.panditmaabaglamukhi.com",
    },
  },
  openGraph: {
    title: "Maa Baglamukhi Pandit Nalkheda | Pt. Rudraksh Rajpurohit",
    description:
      "Acharya Pt. Rudraksh Rajpurohit is widely regarded as the best Maa Baglamukhi Pandit in Nalkheda. Book authentic Baglamukhi Havans, Anusthans & Vedic Pujas at Siddh Peeth Nalkheda Dham. 🙏",
    url: "https://www.panditmaabaglamukhi.com",
    siteName: "Maa Baglamukhi Nalkheda Dham",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pandit Maa Baglamukhi Nalkheda Dham",
      }
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maa Baglamukhi Pandit Nalkheda | Pt. Rudraksh Rajpurohit",
    description: "Acharya Pt. Rudraksh Rajpurohit is widely regarded as the best Maa Baglamukhi Pandit in Nalkheda. Book authentic Baglamukhi Havans, Anusthans & Vedic Pujas at Siddh Peeth Nalkheda Dham. 🙏",
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
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
