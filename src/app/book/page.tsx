import BookingSection from "@/components/home/BookingSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book Online Puja & Havan | Acharya Pt. Rudraksh Rajpurohit",
  description: "Book authentic Maa Baglamukhi Pujas, intense Havans, and sacred Vedic Anusthans at Siddh Peeth Nalkheda Dham, guided by Acharya Pt. Rudraksh Rajpurohit.",
  alternates: {
    canonical: "/book",
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
