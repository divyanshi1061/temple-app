"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const REEL_IMAGES = [
  { src: "/mata-baglamukhi.jpg", alt: "Maa Baglamukhi Divine Idol" },
  { src: "/acharya-new.jpg", alt: "Acharya Pt. Rudraksh Rajpurohit" },
  { src: "/real-havan-kund.jpg", alt: "Sacred Havan Kund" },
  { src: "/real-puja-plate.jpg", alt: "Divine Puja Plate" },
  { src: "/mata-temple-exterior.jpg", alt: "Maa Baglamukhi Temple Exterior" },
  { src: "/havan-upload-1.jpg", alt: "Sacred Havan Fire" },
  { src: "/havan-upload-2.jpg", alt: "Maa Baglamukhi Havan Ritual" },
  { src: "/havan-upload-3.jpg", alt: "Lal Mirchi Havan" },
  { src: "/shatru-stambhan.png", alt: "Tantric Havan Puja" },
  { src: "/gallery-1.png", alt: "Maa Baglamukhi Shringar" },
  { src: "/gallery-4.png", alt: "Mata Rani Bhog" },
  { src: "/gallery-5.png", alt: "Purnahuti Ceremony" },
  { src: "/vashikaran-akarshan.png", alt: "Vashikaran & Akarshan" },
  { src: "/nyayalay-vijay.png", alt: "Nyayalay Vijay" },
  { src: "/nav-graha-shanti.png", alt: "Nav Graha Shanti" },
  { src: "/pitra-kaal-sarp.png", alt: "Pitra Dosh & Kaal Sarp" },
  { src: "/santan-prapti.png", alt: "Santan Prapti" },
  { src: "/vyavahik-badha.png", alt: "Vyavahik Badha" },
  { src: "/vyapar-vraddhi.png", alt: "Vyapar Vraddhi" },
  { src: "/lakshmi-prapti.png", alt: "Lakshmi Prapti" },
  { src: "/vastu-shastra.png", alt: "Vastu Shastra" },
  { src: "/moh-ucchatan.png", alt: "Moh Ucchatan" },
  { src: "/new-havan-1.jpg", alt: "Sacred Ritual" },
  { src: "/new-havan-2.jpg", alt: "Pandit Ji at Havan" },
  { src: "/new-havan-3.jpg", alt: "Divine Havan" },
  { src: "/new-havan-4.png", alt: "Maa Baglamukhi Darshan" },
  { src: "/new-havan-5.jpg", alt: "Maa Baglamukhi Idol" },
  { src: "/new-upload-6.jpg", alt: "Maa Baglamukhi Ritual" },
  { src: "/new-upload-7.jpg", alt: "Pandit Rudraksh Rajpurohit" },
  { src: "/new-upload-8.jpg", alt: "Sacred Temple Fire" },
  { src: "/new-upload-9.jpg", alt: "Vedic Puja Session" },
  { src: "/new-upload-10.jpg", alt: "Divine Havan" },
];

export default function ImageReel() {
  // Duplicate images list to create seamless infinite loop
  const doubledImages = [...REEL_IMAGES, ...REEL_IMAGES];

  return (
    <div className="w-full overflow-hidden py-12 relative z-20 select-none">
      {/* Scoped CSS marquee styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-loop {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-loop:hover {
          animation-play-state: paused;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
      `}} />

      {/* Main Reels Slider */}
      <div className="mask-fade-edges w-full overflow-hidden flex">
        <div className="animate-marquee-loop gap-6 flex">
          {doubledImages.map((img, index) => (
            <div
              key={`${img.src}-${index}`}
              className="relative w-64 h-44 md:w-80 md:h-52 rounded-[1.75rem] overflow-hidden border border-gold/15 bg-white shadow-md hover:shadow-2xl hover:border-gold/50 hover:scale-[1.03] transition-all duration-500 cursor-pointer group shrink-0"
            >
              {/* Gold outer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/60" />
              
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 256px, 320px"
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
