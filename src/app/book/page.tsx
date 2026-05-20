import BookingSection from "@/components/home/BookingSection";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Book Puja | Acharya Pt. Rudraksh Sharma",
  description: "Book sacred Maa Baglamukhi Pujas, Havan, and Anusthan performed online or offline at Siddh Peeth Nalkheda Dham.",
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
