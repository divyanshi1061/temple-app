"use client";

import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

export default function FloatingContact() {

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
    "Namaste! I want to inquire about your services."
  )}`;

  return (
    <div className="sticky bottom-6 ml-auto mr-4 md:mr-6 z-50 flex flex-col items-center gap-3 w-fit float-right">
      <a
        href={SITE_CONFIG.socials?.facebook || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-full bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/30 hover:shadow-[#1877F2]/50 hover:scale-110 transition-all duration-200"
        aria-label="Facebook"
      >
        <FaFacebookF size={18} />
      </a>

      <a
        href={SITE_CONFIG.socials?.instagram || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-lg shadow-[#e6683c]/30 hover:shadow-[#e6683c]/50 hover:scale-110 transition-all duration-200"
        aria-label="Instagram"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30" />
      </a>
    </div>
  );
}
