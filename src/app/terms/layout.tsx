import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Pandit Maa Baglamukhi Nalkheda Dham",
  description:
    "Read the terms and conditions for booking Vedic Pujas, Havans, and Anusthan services at Pandit Maa Baglamukhi, Siddh Peeth Nalkheda Dham.",
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
