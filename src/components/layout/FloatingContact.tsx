"use client";

import { FaWhatsapp, FaPhone } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingContact() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Namaste! I want to inquire about your services."
  )}`;

  return (
    <div className="sticky bottom-6 ml-auto mr-4 md:mr-6 z-50 flex flex-col items-center gap-3 w-fit float-right">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>

      <a
        href={`tel:${SITE_CONFIG.phone}`}
        className="flex items-center justify-center w-11 h-11 rounded-full bg-gold text-white shadow-lg shadow-gold/30 hover:shadow-gold/50 hover:scale-110 transition-all duration-200"
        aria-label="Call us"
      >
        <FaPhone size={18} />
      </a>
    </div>
  );
}
