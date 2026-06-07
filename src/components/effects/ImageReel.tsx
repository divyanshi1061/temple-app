"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const REEL_IMAGES = [
  { src: "/mata-baglamukhi.webp", alt: "Maa Baglamukhi Divine Idol" },
  { src: "/acharya-new.webp", alt: "Acharya Pt. Rudraksh Rajpurohit" },
  { src: "/real-havan-kund.webp", alt: "Sacred Havan Kund" },
  { src: "/real-puja-plate.webp", alt: "Divine Puja Plate" },
  { src: "/mata-temple-exterior.webp", alt: "Maa Baglamukhi Temple Exterior" },
  { src: "/havan-upload-1.webp", alt: "Sacred Havan Fire" },
  { src: "/havan-upload-2.webp", alt: "Maa Baglamukhi Havan Ritual" },
  { src: "/havan-upload-3.webp", alt: "Lal Mirchi Havan" },
  { src: "/shatru-stambhan.webp", alt: "Tantric Havan Puja" },
  { src: "/gallery-4.webp", alt: "Mata Rani Bhog" },
  { src: "/gallery-5.webp", alt: "Purnahuti Ceremony" },
  { src: "/vashikaran-akarshan.webp", alt: "Vashikaran & Akarshan" },
  { src: "/nyayalay-vijay.webp", alt: "Nyayalay Vijay" },
  { src: "/nav-graha-shanti.webp", alt: "Nav Graha Shanti" },
  { src: "/pitra-kaal-sarp.webp", alt: "Pitra Dosh & Kaal Sarp" },
];

export default function ImageReel() {
  // Duplicate images list to create seamless infinite loop
  const doubledImages = [...REEL_IMAGES, ...REEL_IMAGES];

  return (
    <div className="w-full overflow-hidden py-4 md:py-8 relative z-20 select-none">
      {/* Marquee animations are defined in globals.css */}

      {/* Main Reels Slider */}
      <div className="mask-fade-edges w-full overflow-hidden flex">
        <div className="animate-marquee-loop gap-2.5 md:gap-4 flex">
          {doubledImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="relative w-28 h-20 sm:w-40 sm:h-28 md:w-52 md:h-36 rounded-lg md:rounded-[1rem] overflow-hidden border border-gold/15 bg-white shadow-sm hover:shadow-lg hover:border-gold/45 hover:scale-[1.02] transition-all duration-500 cursor-pointer group shrink-0"
            >
              {/* Gold outer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/60" />
              
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 112px, 208px"
                style={{ objectFit: "cover" }}
                className="transition-transform duration-700 group-hover:scale-105"
              />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
