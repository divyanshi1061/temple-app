import BookingSection from "@/components/home/BookingSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book Pujas & Havans Online | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
  description: "Book authentic Vedic Pujas, Havans, and Anusthans at Siddh Peeth Nalkheda Dham with Pandit Maa Baglamukhi expert, Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit).",
  keywords: [
    "Pandit Maa Baglamukhi",
    "Maa Bagalamukhi Pandit",
    "Pandit Maa Baglamukhi Nalkheda",
    "Maa Bagalamukhi Pandit Nalkheda",
    "Mandir Pujari",
    "Baglamukhi Pujari",
    "Maa Baglamukhi Havan booking",
    "online puja booking",
    "Nalkheda Dham book puja",
    "Pt Rudraksh Rajpurohit consultation"
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/book",
    languages: {
      "en-IN": "https://www.panditmaabaglamukhi.com/book",
      "hi-IN": "https://www.panditmaabaglamukhi.com/book",
    },
  },
};

export default function BookPage() {
  return (
    <main className="min-h-screen bg-sacred-white pt-24 pb-16">
      <div className="container-sacred">
        <Suspense fallback={<div className="text-center py-10 text-gold font-cinzel">Loading Booking Details...</div>}>
          <BookingSection />
        </Suspense>
      </div>
    </main>
  );
}
