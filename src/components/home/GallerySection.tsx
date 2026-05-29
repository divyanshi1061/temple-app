"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

type PhotoItem = {
  id: string;
  url: string;
  aspect: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
};

// Curated list of high-quality showcase images matching the gallery page
const SHOWCASE_PHOTOS: PhotoItem[] = [
  {
    id: "home-g-1",
    url: "/mrityunjay-new.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Maha Mrityunjay Anusthan",
    titleHi: "महामृत्युंजय अनुष्ठान",
    descEn: "Pt. Rudraksh Rajpurohit conducting the sacred Maha Mrityunjay Anusthan for health, healing, and longevity.",
    descHi: "स्वास्थ्य, आरोग्य और दीर्घायु के लिए पं. रुद्राक्ष राजपुरोहित द्वारा पवित्र महामृत्युंजय अनुष्ठान का संपादन।"
  },
  {
    id: "home-g-2",
    url: "/acharya-new.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Pt. Rudraksh Rajpurohit",
    titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
    descEn: "Pt. Rudraksh Rajpurohit in deep meditation and divine guidance at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में गहरे ध्यान और दिव्य मार्गदर्शन में पं. रुद्राक्ष राजपुरोहित।"
  },
  {
    id: "home-g-3",
    url: "/new-havan-2.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Havan Ritual 2",
    titleHi: "हवन अनुष्ठान 2",
    descEn: "A second sacred Havan ritual captured during the devotions at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में समर्पण के दौरान एक दूसरा पवित्र हवन अनुष्ठान।"
  },
  {
    id: "home-g-4",
    url: "/new-havan-1.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Siddh Peeth Puja",
    titleHi: "सिद्ध पीठ पूजा",
    descEn: "Intricate arrangements during a special puja ritual at the temple.",
    descHi: "मंदिर में एक विशेष पूजा अनुष्ठान के दौरान जटिल व्यवस्था।"
  },
  {
    id: "home-g-5",
    url: "/real-havan-kund.webp",
    aspect: "aspect-[4/3]",
    titleEn: "Agni Dev - Havan Fire",
    titleHi: "अग्नि देव - हवन कुंड",
    descEn: "The sacred fire consuming offerings in the central Havan Kund.",
    descHi: "मुख्य हवन कुंड में आहुति ग्रहण करती पवित्र अग्नि।"
  },
  {
    id: "home-g-6",
    url: "/temple-entrance-1.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Entrance Gates",
    titleHi: "मंदिर प्रवेश द्वार",
    descEn: "The decorative and grand entrance welcoming devotees into the temple.",
    descHi: "भक्तों का मंदिर में स्वागत करता हुआ भव्य और कलात्मक प्रवेश द्वार।"
  }
  ,
  {
    id: "home-g-7",
    url: "/mata-baglamukhi.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Baglamukhi",
    titleHi: "माँ बगलामुखी",
    descEn: "Revered portrait of Maa Baglamukhi from the temple gallery.",
    descHi: "मंदिर गैलरी से माँ बगलामुखी का पूजनीय चित्र।"
  },
  {
    id: "home-g-8",
    url: "/mata.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Maa (Devotional)",
    titleHi: "माँ (भक्ति)",
    descEn: "A devotional image used during special ceremonies.",
    descHi: "विशेष अनुष्ठानों के दौरान उपयोग किया जाने वाला भक्ति चित्र।"
  }
];

export default function GallerySection() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Custom scroll lock for lightbox
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPhoto]);

  return (
    <section
      id="gallery"
      className="relative py-10 md:py-20 overflow-hidden bg-white border-t border-gray-100 sacred-pattern"
      style={{
        backgroundImage: "url('/hero-spiritual-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="container-sacred relative z-10">
        
        {/* Gallery Header */}
        <motion.div 
          className="text-center mb-6 md:mb-10 max-w-3xl mx-auto" 
          variants={fadeInUp} 
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === 'en' ? 'Sacred Moments' : 'पवित्र पल'}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === 'en' ? 'Gallery' : 'गैलरी'}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2" />
        </motion.div>

        {/* Uniform 6-image gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {SHOWCASE_PHOTOS.slice(0, 6).map((item, index) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className={`group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 rounded-3xl ${
                index >= 4 ? "hidden sm:block" : ""
              }`}
              whileHover={{ scale: 0.995 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={item.url}
                  alt={lang === "en" ? item.titleEn : item.titleHi}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery Link */}
        <motion.div 
          className="mt-8 md:mt-16 flex justify-center" 
          variants={fadeInUp} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          <Link 
            href="/gallery" 
            className="group flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full shadow-sm hover:shadow-md hover:border-gold hover:text-gold transition-all duration-300"
          >
            {lang === 'en' ? 'Explore Full Gallery' : 'पूरी गैलरी देखें'}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal (Matching Gallery Page) */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-[#FAF8F5]/98 z-[200] flex flex-col justify-between p-6 md:p-12 cursor-zoom-out"
          >
            {/* Close Button */}
            <div className="w-full flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="text-gray-500 hover:text-gray-900 p-2 transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <IoCloseOutline size={28} />
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-5xl mx-auto w-full">
              {/* Image */}
              <motion.div 
                className="max-h-[55vh] md:max-h-[70vh] max-w-full md:max-w-[50%] overflow-hidden shadow-2xl bg-gray-50 relative aspect-[3/4] w-full"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <Image
                  src={selectedPhoto.url}
                  alt={lang === "en" ? selectedPhoto.titleEn : selectedPhoto.titleHi}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain" }}
                />
              </motion.div>

              {/* Text Description */}
              <motion.div 
                className="max-w-md text-left md:pt-0"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when text is clicked
              >
                <h3 className="text-xl md:text-2xl font-bold font-cinzel tracking-tight text-gray-900 mb-4">
                  {lang === "en" ? selectedPhoto.titleEn : selectedPhoto.titleHi}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide mb-6 text-justify">
                  {lang === "en" ? selectedPhoto.descEn : selectedPhoto.descHi}
                </p>

                <button
                  onClick={() => {
                    setSelectedPhoto(null);
                    router.push("/book");
                  }}
                  className="text-[10px] tracking-[0.25em] uppercase font-bold text-gray-900 border-b border-gray-900 pb-1 hover:text-orange-600 hover:border-orange-600 transition-colors"
                >
                  {lang === "en" ? "Consult About This Ritual" : "इस अनुष्ठान के बारे में परामर्श लें"}
                </button>
              </motion.div>
            </div>

            {/* Bottom spacer to align center */}
            <div className="hidden md:block h-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
