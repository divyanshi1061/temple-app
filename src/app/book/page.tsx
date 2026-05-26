import BookingSection from "@/components/home/BookingSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book Online Puja & Havan | Acharya Pt Rudraksh Rajpurohit",
  description: "Book authentic Maa Baglamukhi Pujas, Havans, and Vedic Anusthans at Siddh Peeth Nalkheda Dham, guided by Acharya Pt Rudraksh Rajpurohit.",
  keywords: [
    "Maa Baglamukhi Havan booking",
    "online puja booking",
    "Nalkheda Dham book puja",
    "Pt Rudraksh Rajpurohit consultation"
  ],
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/book",
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
