"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";

import { ALL_PHOTOS, PhotoItem } from "@/lib/photos";

const YOUTUBE_VIDEOS = [
  {
    id: "1IQSzL-D78M",
    titleEn: "Maa Baglamukhi Maha Havan",
    titleHi: "माँ बगलामुखी महा हवन"
  },
  {
    id: "6nuT2qMTnK0",
    titleEn: "Maa Baglamukhi Darshan",
    titleHi: "माँ बगलामुखी दर्शन"
  },
  {
    id: "61ZxvQ1Ei9M",
    titleEn: "Maa Baglamukhi Divya Havan",
    titleHi: "माँ बगलामुखी दिव्य हवन"
  },
  {
    id: "latHG7htf1M",
    titleEn: "Maa Baglamukhi Shringar",
    titleHi: "माँ बगलामुखी श्रृंगार"
  },
  {
    id: "8KwG82gkkYA",
    titleEn: "Maa Baglamukhi Aarti",
    titleHi: "माँ बगलामुखी आरती"
  },
  {
    id: "C9iVhfuGFow",
    titleEn: "Maa Baglamukhi Sadhana",
    titleHi: "माँ बगलामुखी साधना"
  }
];

const chunkArray = <T,>(arr: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const getFlexClass = (rowIndex: number, colIndex: number, rowLength: number) => {
  if (rowLength === 1) return "";
  if (rowLength === 2) {
    return colIndex === 0 ? "flex-ratio-narrow" : "flex-ratio-wide";
  }
  const isEvenRow = rowIndex % 2 === 0;
  if (isEvenRow) {
    if (colIndex === 0) return "flex-ratio-narrow";
    if (colIndex === 1) return "flex-ratio-wide";
    return "flex-ratio-medium";
  } else {
    if (colIndex === 0) return "flex-ratio-wide";
    if (colIndex === 1) return "flex-ratio-medium";
    return "flex-ratio-narrow";
  }
};

export default function GalleryPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  
  // Lightbox Modal state
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Active videos map to lazy-load YouTube iframes
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  // Dynamic photos list starting with hardcoded values
  const [photos, setPhotos] = useState<PhotoItem[]>(ALL_PHOTOS);

  useEffect(() => {
    async function fetchDynamicPhotos() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${apiBase}/gallery?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const getAssetUrl = (url: string) => {
              if (!url) return "";
              if (url.startsWith("http://") || url.startsWith("https://")) return url;
              const host = apiBase.replace('/api', '');
              return `${host}${url}`;
            };
            const mappedPhotos: PhotoItem[] = data.map((item: any) => ({
              id: item._id,
              url: getAssetUrl(item.url),
              aspect: "aspect-[3/4]",
              titleEn: item.caption || "Ritual",
              titleHi: item.caption || "अनुष्ठान",
              descEn: item.caption || "Maa Baglamukhi temple ritual",
              descHi: item.caption || "माँ बगलामुखी मंदिर अनुष्ठान"
            }));
            setPhotos([...ALL_PHOTOS, ...mappedPhotos]);
          }
        }
      } catch (err) {
        console.warn("Notice: Custom gallery images not loaded (Backend offline). Using system default images.");
      }
    }
    fetchDynamicPhotos();
  }, []);
  
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

  const renderPhotoCard = (item: PhotoItem, flexClass: string) => (
    <motion.div
      key={item.id}
      onClick={() => setSelectedPhoto(item)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className={`group relative overflow-hidden rounded-md bg-gray-900 cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 h-[220px] md:h-[320px] w-full ${flexClass}`}
    >
      <img
        src={item.url}
        alt={`${lang === "en" ? item.titleEn : item.titleHi} - Maa Baglamukhi Temple Nalkheda Dham`}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Progressive blur overlay */}
      <div className="progressive-blur" />
      
      {/* Text overlay always visible with absolute override styles */}
      <div className="absolute bottom-4 left-5 right-5 z-10 flex flex-col pointer-events-none">
        <span 
          className="text-xs md:text-sm tracking-wide font-normal font-outfit"
          style={{ color: '#ffffff' }}
        >
          {lang === "en" ? item.titleEn : item.titleHi}
        </span>
      </div>
    </motion.div>
  );

  const photoRows = chunkArray(photos, 3);

  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": lang === "en" ? "Maa Baglamukhi Temple Gallery" : "माँ बगलामुखी मंदिर गैलरी",
    "description": lang === "en"
      ? "Photographs capturing the shringar, daily darshan, and sacred details of Maa Baglamukhi Temple at Nalkheda Dham."
      : "माँ बगलामुखी मंदिर नलखेड़ा धाम के दैनिक दर्शन, श्रृंगार और पवित्र अनुष्ठानों की तस्वीरें।",
    "image": photos.map((photo) => ({
      "@type": "ImageObject",
      "contentUrl": `https://www.panditmaabaglamukhi.com${photo.url.startsWith('/') ? photo.url : '/' + photo.url}`,
      "name": lang === "en" ? photo.titleEn : photo.titleHi,
      "description": lang === "en" ? photo.descEn : photo.descHi
    }))
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-outfit select-none pb-24 pt-28 relative overflow-hidden">
      {/* ImageGallery Schema for Google Image search indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      
      {/* Subtle spiritual background watermark */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Soft luxury background orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-200/5 rounded-full blur-[100px] opacity-50 pointer-events-none z-0" />

      {/* Centered Editorial Brand Header */}
      <div className="w-full text-center pb-6 border-b border-gray-200/50 max-w-[1440px] mx-auto mt-6 px-6 relative z-10">
        <h1 className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-gray-800 font-outfit">
          {lang === 'en' ? 'Maa Baglamukhi Temple Gallery & Videos' : 'माँ बगलामुखी मंदिर गैलरी और वीडियो'}
        </h1>
      </div>

      {/* Videos Section Title */}
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto pt-12 pb-6 relative z-10">
        <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-800 uppercase font-outfit flex items-center gap-3">
          <span>—</span>
          <span>{lang === 'en' ? 'Videos' : 'वीडियो'}</span>
        </h2>
        <p className="mt-3 text-gray-600 text-xs md:text-sm font-outfit max-w-2xl tracking-wide leading-relaxed">
          {lang === 'en' 
            ? 'Watch recordings of daily prayers, havan ceremonies, and rituals conducted at the temple.' 
            : 'मंदिर में होने वाली दैनिक आरती, हवन और अनुष्ठान के वीडियो देखें।'
          }
        </p>
      </div>

      {/* Video Gallery Section — Maa Baglamukhi Darshan Channel */}
      <motion.section 
        className="px-6 md:px-12 max-w-[1440px] mx-auto pb-12 relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {YOUTUBE_VIDEOS.map((vid) => (
            <motion.div 
              key={vid.id}
              className="relative rounded-lg overflow-hidden shadow-md bg-white group border border-gray-200/50"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <div className="aspect-video relative bg-black cursor-pointer">
                {activeVideos[vid.id] ? (
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full z-0"
                    src={`https://www.youtube.com/embed/${vid.id}?autoplay=1`} 
                    title={lang === 'en' ? vid.titleEn : vid.titleHi}
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    loading="lazy">
                  </iframe>
                ) : (
                  <div 
                    className="absolute inset-0 flex items-center justify-center z-10"
                    onClick={() => setActiveVideos(prev => ({ ...prev, [vid.id]: true }))}
                  >
                    <img 
                      src={`https://img.youtube.com/vi/${vid.id}/hqdefault.jpg`} 
                      alt={lang === 'en' ? vid.titleEn : vid.titleHi}
                      loading="lazy"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
                    />
                    <div className="absolute w-16 h-11 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-red-700 group-hover:scale-105 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white border-t border-gray-100">
                <div 
                  className="font-outfit text-xs md:text-sm font-semibold tracking-wide truncate"
                  style={{ color: '#12100e' }}
                >
                  {lang === 'en' ? vid.titleEn : vid.titleHi}
                </div>
                <p className="text-gray-500 text-[10px] mt-1 font-outfit uppercase tracking-wider">
                  Maa Baglamukhi Darshan
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit Channel Button */}
        <div className="text-center mt-6">
          <a 
            href="https://youtube.com/@maabaglamukhidarshan-d2e?si=OC9ZiN1R5Tb59OBl"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-xs tracking-wide shadow-lg hover:shadow-red-500/20 hover:scale-105 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span style={{ color: '#ffffff' }}>
              {lang === 'en' ? 'Visit Our YouTube Channel' : 'हमारा YouTube चैनल देखें'}
            </span>
          </a>
        </div>
      </motion.section>

      {/* Gallery Section Title */}
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto pt-12 pb-6 relative z-10">
        <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-800 uppercase font-outfit flex items-center gap-3">
          <span>—</span>
          <span>{lang === 'en' ? 'Gallery' : 'गैलरी'}</span>
        </h2>
        <p className="mt-3 text-gray-600 text-xs md:text-sm font-outfit max-w-2xl tracking-wide leading-relaxed">
          {lang === 'en' 
            ? 'Photographs capturing the shringar, daily darshan, and sacred details from Nalkheda Dham.' 
            : 'नलखेड़ा धाम से श्रृंगार, दैनिक दर्शन और पवित्र विवरणों को दर्शाती तस्वीरें।'}
        </p>
      </div>

      {/* Visual Alternating Flex Grid of Photos */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-24 relative z-10">
        <motion.div 
          className="flex flex-col gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {photoRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-col md:flex-row gap-6 w-full">
              {row.map((item, colIndex) => {
                const flexClass = getFlexClass(rowIndex, colIndex, row.length);
                return renderPhotoCard(item, flexClass);
              })}
            </div>
          ))}

          {/* Full-width banner at the end, fully visible */}
          <motion.div
            onClick={() => setSelectedPhoto({
              id: "banner-new",
              url: "/banner-new.webp",
              aspect: "aspect-[16/10]",
              titleEn: "Divine Puja and Havan Banner",
              titleHi: "दिव्य पूजा एवं हवन बैनर",
              descEn: "Authentic Maa Baglamukhi Havan and Vedic Puja services guided by Acharya Pt. Rudraksh Rajpurohit.",
              descHi: "आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा निर्देशित प्रामाणिक माँ बगलामुखी हवन और वैदिक पूजा सेवाएँ।"
            })}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="group relative overflow-hidden rounded-md bg-white cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 w-full max-w-4xl mx-auto border border-gray-200/50"
            style={{ aspectRatio: '1000/620' }}
          >
            <img
              src="/banner-new.webp"
              alt="Maa Baglamukhi Divine Banner"
              loading="lazy"
              className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* 5. Minimalist Lightbox Modal */}
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

    </div>
  );
}
