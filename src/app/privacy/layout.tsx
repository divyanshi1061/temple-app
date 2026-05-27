import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Pandit Maa Baglamukhi Nalkheda Dham",
  description:
    "Read the privacy policy of Pandit Maa Baglamukhi website. Learn how we collect, use, and protect your personal data when booking Vedic Pujas and Havans.",
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
