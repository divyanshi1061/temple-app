import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | Pandit Maa Baglamukhi Nalkheda Dham",
  description:
    "Read our cancellation and refund policy for Vedic Puja, Havan, and Anusthan bookings at Pandit Maa Baglamukhi, Siddh Peeth Nalkheda Dham.",
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/refund-policy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
