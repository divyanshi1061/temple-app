"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";

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
    url: "/mrityunjay-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maha Mrityunjay Anusthan",
    titleHi: "महामृत्युंजय अनुष्ठान",
    descEn: "Pt. Rudraksh Rajpurohit conducting the sacred Maha Mrityunjay Anusthan for health, healing, and longevity.",
    descHi: "स्वास्थ्य, आरोग्य और दीर्घायु के लिए पं. रुद्राक्ष राजपुरोहित द्वारा पवित्र महामृत्युंजय अनुष्ठान का संपादन।"
  },
  {
    id: "home-g-2",
    url: "/acharya-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Pt. Rudraksh Rajpurohit",
    titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
    descEn: "Pt. Rudraksh Rajpurohit in deep meditation and divine guidance at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में गहरे ध्यान और दिव्य मार्गदर्शन में पं. रुद्राक्ष राजपुरोहित।"
  },
  {
    id: "home-g-3",
    url: "/mata-idol-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Baglamukhi Sanctum",
    titleHi: "माँ बगलामुखी गर्भगृह",
    descEn: "The divine golden idol of Maa Baglamukhi Devi at Nalkheda Dham Temple.",
    descHi: "नलखेड़ा धाम मंदिर में माँ बगलामुखी देवी की दिव्य स्वर्ण प्रतिमा।"
  },
  {
    id: "home-g-4",
    url: "/new-havan-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Siddh Peeth Puja",
    titleHi: "सिद्ध पीठ पूजा",
    descEn: "Intricate arrangements during a special puja ritual at the temple.",
    descHi: "मंदिर में एक विशेष पूजा अनुष्ठान के दौरान जटिल व्यवस्था।"
  },
  {
    id: "home-g-5",
    url: "/real-havan-kund.jpg",
    aspect: "aspect-[4/3]",
    titleEn: "Agni Dev - Havan Fire",
    titleHi: "अग्नि देव - हवन कुंड",
    descEn: "The sacred fire consuming offerings in the central Havan Kund.",
    descHi: "मुख्य हवन कुंड में आहुति ग्रहण करती पवित्र अग्नि।"
  },
  {
    id: "home-g-6",
    url: "/temple-entrance-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Entrance Gates",
    titleHi: "मंदिर प्रवेश द्वार",
    descEn: "The decorative and grand entrance welcoming devotees into the temple.",
    descHi: "भक्तों का मंदिर में स्वागत करता हुआ भव्य और कलात्मक प्रवेश द्वार।"
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
      className="relative section-padding overflow-hidden bg-white border-t border-gray-100 sacred-pattern"
      style={{
        backgroundImage: "url('/hero-spiritual-bg.png')",
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
          className="text-center mb-20" 
          variants={fadeInUp} 
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm">
            {lang === 'en' ? 'Sacred Moments' : 'पवित्र पल'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-6 mb-6 font-bold tracking-tight text-gray-900 font-cinzel">
            {lang === 'en' ? 'Gallery' : 'गैलरी'}
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Clean, Staggered Grid Layout (Staggered aspect ratios, grayscale hover, borderless) */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 max-w-5xl mx-auto">
          {SHOWCASE_PHOTOS.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="break-inside-avoid mb-6 group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300 rounded-lg"
              whileHover={{ scale: 0.995 }}
              transition={{ duration: 0.4 }}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden`}>
                <img
                  src={item.url}
                  alt={lang === "en" ? item.titleEn : item.titleHi}
                  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery Link */}
        <motion.div 
          className="mt-16 flex justify-center" 
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
                className="max-h-[55vh] md:max-h-[70vh] max-w-full md:max-w-[50%] overflow-hidden shadow-2xl bg-gray-50"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 15, opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <img
                  src={selectedPhoto.url}
                  alt={lang === "en" ? selectedPhoto.titleEn : selectedPhoto.titleHi}
                  className="w-full h-full object-contain"
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
                <h3 className="text-2xl md:text-3xl font-cormorant font-normal italic tracking-wide text-gray-900 mb-4">
                  {lang === "en" ? selectedPhoto.titleEn : selectedPhoto.titleHi}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide mb-6 text-justify sm:text-left">
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
