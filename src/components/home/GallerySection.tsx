"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

type GalleryItem = {
  _id: string;
  title: string;
  url: string;
  category: string;
};

const DEFAULT_GALLERY = [
  { _id: "1", title: "", category: "gallery", url: "acharya-new.jpg" },
  { _id: "3", title: "", category: "gallery", url: "gallery-1.png" },
  { _id: "4", title: "", category: "gallery", url: "gallery-2.png" },
  { _id: "5", title: "", category: "gallery", url: "gallery-3.png" },
  { _id: "6", title: "", category: "gallery", url: "gallery-4.png" },
  { _id: "7", title: "", category: "gallery", url: "gallery-5.png" },
  { _id: "8", title: "", category: "gallery", url: "havan-upload-1.jpg" },
  { _id: "9", title: "", category: "gallery", url: "havan-upload-2.jpg" },
  { _id: "10", title: "", category: "gallery", url: "havan-upload-3.jpg" },
  { _id: "12", title: "", category: "gallery", url: "lakshmi-prapti.png" },
  { _id: "13", title: "", category: "gallery", url: "mata-baglamukhi.jpg" },
  { _id: "14", title: "", category: "gallery", url: "mata-idol-1.jpg" },
  { _id: "15", title: "", category: "gallery", url: "mata-idol-2.jpg" },
  { _id: "16", title: "", category: "gallery", url: "mata-temple-exterior.jpg" },
  { _id: "17", title: "", category: "gallery", url: "moh-ucchatan.png" },
  { _id: "18", title: "", category: "gallery", url: "nav-graha-shanti.png" },
  { _id: "19", title: "", category: "gallery", url: "new-havan-1.jpg" },
  { _id: "20", title: "", category: "gallery", url: "new-havan-2.jpg" },
  { _id: "21", title: "", category: "gallery", url: "new-havan-3.jpg" },
  { _id: "22", title: "", category: "gallery", url: "new-havan-4.png" },
  { _id: "23", title: "", category: "gallery", url: "new-havan-5.jpg" },
  { _id: "24", title: "", category: "gallery", url: "new-upload-10.jpg" },
  { _id: "25", title: "", category: "gallery", url: "new-upload-6.jpg" },
  { _id: "26", title: "", category: "gallery", url: "new-upload-7.jpg" },
  { _id: "27", title: "", category: "gallery", url: "new-upload-8.jpg" },
  { _id: "28", title: "", category: "gallery", url: "new-upload-9.jpg" },
  { _id: "29", title: "", category: "gallery", url: "nyayalay-vijay.png" },
  { _id: "30", title: "", category: "gallery", url: "pitra-kaal-sarp.png" },
  { _id: "31", title: "", category: "gallery", url: "real-gallery-1.jpg" },
  { _id: "32", title: "", category: "gallery", url: "real-gallery-2.jpg" },
  { _id: "34", title: "", category: "gallery", url: "real-gallery-4.jpg" },
  { _id: "35", title: "", category: "gallery", url: "real-gallery-5.jpg" },
  { _id: "36", title: "", category: "gallery", url: "real-havan-kund.jpg" },
  { _id: "37", title: "", category: "gallery", url: "real-puja-plate.jpg" },
  { _id: "38", title: "", category: "gallery", url: "santan-prapti.png" },
  { _id: "39", title: "", category: "gallery", url: "temple-bhog-area.jpg" },
  { _id: "40", title: "", category: "gallery", url: "temple-devotees-1.jpg" },
  { _id: "41", title: "", category: "gallery", url: "temple-dome-night.jpg" },
  { _id: "42", title: "", category: "gallery", url: "temple-entrance-1.jpg" },
  { _id: "43", title: "", category: "gallery", url: "temple-inside-1.jpg" },
  { _id: "44", title: "", category: "gallery", url: "temple-lion-gate.jpg" },
  { _id: "45", title: "", category: "gallery", url: "temple-night-1.jpg" },
  { _id: "46", title: "", category: "gallery", url: "temple-night-2.jpg" },
  { _id: "47", title: "", category: "gallery", url: "temple-side-1.jpg" },
  { _id: "48", title: "", category: "gallery", url: "temple-sunset.png" },
  { _id: "49", title: "", category: "gallery", url: "temple-tower.jpg" },
  { _id: "50", title: "", category: "gallery", url: "vashikaran-akarshan.png" },
  { _id: "51", title: "", category: "gallery", url: "vastu-shastra.png" },
  { _id: "52", title: "", category: "gallery", url: "vyapar-vraddhi.png" },
  { _id: "53", title: "", category: "gallery", url: "vyavahik-badha.png" },
  { _id: "54", title: "", category: "gallery", url: "temple-entrance-1.jpg" },
  { _id: "55", title: "", category: "gallery", url: "temple-devotees-1.jpg" },
  { _id: "56", title: "", category: "gallery", url: "temple-inside-1.jpg" },
  { _id: "57", title: "", category: "gallery", url: "temple-side-1.jpg" },
  { _id: "58", title: "", category: "gallery", url: "temple-night-1.jpg" },
  { _id: "59", title: "", category: "gallery", url: "temple-night-2.jpg" },
  { _id: "60", title: "", category: "gallery", url: "temple-dome-night.jpg" },
  { _id: "61", title: "", category: "gallery", url: "temple-tower.jpg" },
  { _id: "62", title: "", category: "gallery", url: "temple-lion-gate.jpg" },
  { _id: "63", title: "", category: "gallery", url: "temple-bhog-area.jpg" },
  { _id: "64", title: "", category: "gallery", url: "temple-sunset.png" },
  { _id: "65", title: "", category: "gallery", url: "new-havan-1.jpg" },
  { _id: "66", title: "", category: "gallery", url: "new-havan-2.jpg" },
  { _id: "67", title: "", category: "gallery", url: "new-havan-3.jpg" },
  { _id: "68", title: "", category: "gallery", url: "new-havan-4.png" },
  { _id: "69", title: "", category: "gallery", url: "new-havan-5.jpg" },
  { _id: "70", title: "", category: "gallery", url: "new-upload-6.jpg" },
  { _id: "71", title: "", category: "gallery", url: "new-upload-7.jpg" },
  { _id: "72", title: "", category: "gallery", url: "new-upload-8.jpg" },
  { _id: "73", title: "", category: "gallery", url: "new-upload-9.jpg" },
  { _id: "74", title: "", category: "gallery", url: "new-upload-10.jpg" },
  { _id: "75", title: "Maha Mrityunjay Anusthan", category: "gallery", url: "mrityunjay-new.jpg" },
  { _id: "76", title: "Maa Baglamukhi Anusthan", category: "gallery", url: "baglamukhi-anusthan-new.jpg" },
  { _id: "77", title: "Sacred Yajna Ceremony", category: "gallery", url: "gallery-new-3.jpg" }
];

const CATEGORIES = [
  { id: "all", label: { en: "All", hi: "सभी" } },
  { id: "temple", label: { en: "Temple", hi: "मंदिर" } },
  { id: "ceremony", label: { en: "Ceremony", hi: "समारोह" } }
];

export default function GallerySection() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [images, setImages] = useState<GalleryItem[]>(DEFAULT_GALLERY);

  const filtered = activeCategory === "all" 
    ? images 
    : images.filter(g => g.category.toLowerCase() === activeCategory.toLowerCase());

  const displayImages = [...filtered].reverse().slice(0, 6);

  return (
    <section id="gallery" className="relative section-padding overflow-hidden bg-white border-t border-gray-100 sacred-pattern">
      <div className="container-sacred relative z-10">
        <motion.div className="text-center mb-20" variants={fadeInUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm">
            {lang === 'en' ? 'Sacred Moments' : 'पवित्र पल'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-6 mb-6 font-bold tracking-tight text-gray-900">
            {lang === 'en' ? 'Gallery' : 'गैलरी'}
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <motion.button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              suppressHydrationWarning={true}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-gold text-white border border-gold shadow-lg"
                  : "bg-white border border-gray-100 text-gold hover:text-gold-dim hover:border-gold/35"
              }`}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {cat.label[lang]}
            </motion.button>
          ))}
        </div>

          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              {displayImages.map((item, idx) => {
                const titleText = item.title;
                const imageSrc = item.url.startsWith('http') ? item.url : `/${item.url}`;
                
                // Genuine Pinterest Staggered heights
                let aspectClass = "aspect-[4/3]";
                if (idx % 3 === 0) aspectClass = "aspect-[3/4]";
                else if (idx % 3 === 1) aspectClass = "aspect-square";
                else if (idx % 3 === 2) aspectClass = "aspect-[4/5]";

                return (
                  <motion.div key={item._id} layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="break-inside-avoid mb-6 group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl border border-gray-100 transition-shadow duration-300 flex flex-col">

                    {/* Image Container with Staggered Aspect Height */}
                    <div className={`relative ${aspectClass} w-full overflow-hidden bg-gray-100`}>
                      <Image
                        src={imageSrc}
                        alt={`${titleText} - Sacred Maa Baglamukhi Temple Havan Puja Ceremony by Pt. Rudraksh Rajpurohit`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      {/* Ambient overlay */}
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                    </div>

                    {/* Simple, Highly Visible, and Readable Text Below Image */}
                    <div className="p-5 bg-white flex-1 border-t border-gray-50">
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                        {item.category === 'ceremony' ? (lang === 'en' ? 'Sacred Ceremony' : 'पवित्र समारोह') : (lang === 'en' ? 'Temple' : 'मंदिर')}
                      </p>
                      <h4 className="text-gray-900 text-base md:text-lg font-bold tracking-tight font-cinzel leading-snug group-hover:text-gold transition-colors duration-300">
                        {titleText}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        {/* View Full Gallery Link */}
        <motion.div className="mt-16 flex justify-center" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Link href="/gallery" className="group flex items-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold rounded-full shadow-sm hover:shadow-md hover:border-gold hover:text-gold transition-all duration-300">
            {lang === 'en' ? 'Explore Full Gallery' : 'पूरी गैलरी देखें'}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
