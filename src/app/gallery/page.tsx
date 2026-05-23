"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
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

// Configured image data matching the reference image's grid layout structure
const ALL_PHOTOS: PhotoItem[] = [
  {
    id: "mrityunjay-new",
    url: "/mrityunjay-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maha Mrityunjay Anusthan",
    titleHi: "महामृत्युंजय अनुष्ठान",
    descEn: "Maha Mrityunjay ritual conducted for health, longevity, and spiritual protection.",
    descHi: "स्वास्थ्य, दीर्घायु और आध्यात्मिक सुरक्षा के लिए आयोजित महामृत्युंजय अनुष्ठान।"
  },
  {
    id: "acharya-new",
    url: "/acharya-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Pt. Rudraksh Rajpurohit",
    titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
    descEn: "Acharya Pt. Rudraksh Rajpurohit conducting sacred rituals and prayers at the temple.",
    descHi: "मंदिर में अनुष्ठान और पूजा का संपादन करते आचार्य पं. रुद्राक्ष राजपुरोहित।"
  },
  // COLUMN 1
  {
    id: "col1-3",
    url: "/havan-upload-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Sacred Vedic Havan",
    titleHi: "पवित्र वैदिक हवन",
    descEn: "Performing traditional Yajna and Havans according to ancient Vedic scriptures.",
    descHi: "प्राचीन वैदिक ग्रंथों के अनुसार पारंपरिक यज्ञ और हवन का संपादन।"
  },
  {
    id: "col1-4",
    url: "/temple-night-1.jpg",
    aspect: "aspect-square",
    titleEn: "Temple Under Night Sky",
    titleHi: "रात्रि में देदीप्यमान मंदिर",
    descEn: "The magnificent night view of the illuminated Maa Baglamukhi temple.",
    descHi: "रोशनी से जगमगाते माँ बगलामुखी मंदिर का भव्य रात्रिकालीन दृश्य।"
  },

  
  // COLUMN 2
  {
    id: "col2-1",
    url: "/new-havan-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Siddh Peeth Puja",
    titleHi: "सिद्ध पीठ पूजा",
    descEn: "Intricate arrangements during a special puja ritual at the temple.",
    descHi: "मंदिर में एक विशेष पूजा अनुष्ठान के दौरान जटिल व्यवस्था।"
  },
  {
    id: "col2-2",
    url: "/new-havan-2.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Havan Ritual 2",
    titleHi: "हवन अनुष्ठान 2",
    descEn: "A second sacred Havan ritual captured during the devotions at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में समर्पण के दौरान एक दूसरा पवित्र हवन अनुष्ठान।"
  },

  {
    id: "col2-4",
    url: "/new-havan-3.jpg",
    aspect: "aspect-[4/3]",
    titleEn: "Devotees Gathering",
    titleHi: "भक्तों का जमघट",
    descEn: "Devotees joining hands in prayer during a powerful community havan.",
    descHi: "एक शक्तिशाली सामूहिक हवन के दौरान प्रार्थना में हाथ जोड़ते भक्तगण।"
  },
  {
    id: "col2-5",
    url: "/new-upload-10.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Community Ritual",
    titleHi: "सामुदायिक अनुष्ठान",
    descEn: "Captured moments from recent temple activities.",
    descHi: "हालिया मंदिर गतिविधियों से लिए गए दृश्य।"
  },
  {
    id: "col2-6",
    url: "/new-upload-9.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Offering",
    titleHi: "मंदिर अर्पण",
    descEn: "Offerings prepared for the evening puja.",
    descHi: "शाम की पूजा के लिए तैयार किए गए अर्पण।"
  },
  {
    id: "col2-7",
    url: "/new-upload-8.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Puja Preparation",
    titleHi: "पूजा तैयारी",
    descEn: "Preparations and arrangements behind the ritual.",
    descHi: "अनुष्ठान के पीछे की तैयारी और व्यवस्थाएं।"
  },
  {
    id: "col2-8",
    url: "/new-upload-7.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Altar Details",
    titleHi: "वेदिका विवरण",
    descEn: "Close-up details from the temple altar.",
    descHi: "मंदिर वेदी के क्लोज़-अप विवरण।"
  },
  {
    id: "col2-9",
    url: "/IMG_5116.JPG.jpeg",
    aspect: "aspect-[3/4]",
    titleEn: "Devotional Moment",
    titleHi: "भक्ति क्षण",
    descEn: "A candid devotional photograph.",
    descHi: "एक सहज भक्ति पूर्ण फ़ोटो।"
  },

  // COLUMN 3
  {
    id: "col3-1",
    url: "/real-havan-kund.jpg",
    aspect: "aspect-[4/3]",
    titleEn: "Agni Dev - Havan Fire",
    titleHi: "अग्नि देव - हवन कुंड",
    descEn: "The sacred fire consuming offerings in the central Havan Kund.",
    descHi: "मुख्य हवन कुंड में आहुति ग्रहण करती पवित्र अग्नि।"
  },
  {
    id: "col3-2",
    url: "/temple-tower.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Golden Shikhar Dome",
    titleHi: "स्वर्ण शिखर गुंबद",
    descEn: "The soaring Shikhar of the temple standing tall as a beacon of cosmic energy.",
    descHi: "ब्रह्मांडीय ऊर्जा के प्रकाशस्तंभ के रूप में खड़ा मंदिर का ऊंचा शिखर।"
  },
  {
    id: "col3-3",
    url: "/mata-baglamukhi.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Baglamukhi Idol",
    titleHi: "माँ बगलामुखी प्रतिमा",
    descEn: "The divine idol of Maa Baglamukhi decorated for the temple ceremony.",
    descHi: "मंदिर समारोह के लिए सजाई गई माँ बगलामुखी की दिव्य मूर्ति।"
  },
  {
    id: "col3-4",
    url: "/new-havan-5.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Prasad and Offerings",
    titleHi: "प्रसाद एवं हवन सामग्री",
    descEn: "Prepared offerings and sacred materials ready for the havan.",
    descHi: "हवन के लिए तैयार की गई पूजा और पवित्र सामग्री।"
  },
  {
    id: "col3-5",
    url: "/real-puja-plate.jpg",
    aspect: "aspect-[16/6]",
    titleEn: "Vedic Puja Plate",
    titleHi: "वैदिक पूजा थाली",
    descEn: "A close-up of the ceremonial plate arranged with kumkum, flowers, and lamps.",
    descHi: "कुमकुम, फूलों और दीयों से सजी हुई अनुष्ठान की थाली।"
  },
  {
    id: "col3-6",
    url: "/IMG_5112.JPG.jpeg",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Devotee",
    titleHi: "मंदिर श्रद्धालु",
    descEn: "Portrait from the temple gathering.",
    descHi: "मंदिर के समागम से लिया गया चित्र।"
  },
  {
    id: "col3-7",
    url: "/mata.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Image",
    titleHi: "माँ का चित्र",
    descEn: "A revered portrait used in ceremonial rites.",
    descHi: "अनुष्ठानों में उपयोग किया जाने वाला पूजनीय चित्र।"
  },

  // COLUMN 4
  {
    id: "col4-1",
    url: "/temple-entrance-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Entrance Gates",
    titleHi: "मंदिर प्रवेश द्वार",
    descEn: "The decorative and grand entrance welcoming devotees into the temple.",
    descHi: "भक्तों का मंदिर में स्वागत करता हुआ भव्य और कलात्मक प्रवेश द्वार।"
  },
  {
    id: "col4-2",
    url: "/temple-inside-1.jpg",
    aspect: "aspect-[4/3]",
    titleEn: "Sacred Inner Sanctuary",
    titleHi: "पवित्र अंतःस्थल",
    descEn: "Inside the main prayer hall filled with vibrations of ancient chants.",
    descHi: "मुख्य प्रार्थना कक्ष के भीतर प्राचीन मंत्रोच्चार की तरंगें।"
  },
  {
    id: "col4-3",
    url: "/temple-devotees-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Gathering of Seekers",
    titleHi: "साधकों का समागम",
    descEn: "Devotees sitting together waiting for the evening maha-aarti.",
    descHi: "शाम की महा-आरती की प्रतीक्षा में एक साथ बैठे श्रद्धालु।"
  },
  {
    id: "col4-6",
    url: "/temple-lion-gate.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Lion Gate",
    titleHi: "मंदिर सिंह द्वार",
    descEn: "The ornate lion gate at the temple entrance symbolizing strength and protection.",
    descHi: "शक्ति और सुरक्षा का प्रतीक मंदिर के प्रवेश द्वार का शानदार सिंह द्वार।"
  },
  {
    id: "col4-7",
    url: "/temple-dome-night.jpg",
    aspect: "aspect-[4/3]",
    titleEn: "Temple Dome Night",
    titleHi: "मंदिर गुंबद रात में",
    descEn: "The illuminated dome captured against the night sky.",
    descHi: "रात्रि आकाश के खिलाफ रोशन गुंबद का दृश्य।"
  },
  {
    id: "col4-8",
    url: "/temple-night-2.jpg",
    aspect: "aspect-square",
    titleEn: "Gilded Temple architecture",
    titleHi: "स्वर्ण मण्डित वास्तुकला",
    descEn: "The glowing dome of the temple reflecting spiritual glory.",
    descHi: "आध्यात्मिक वैभव को दर्शाती मंदिर की चमकती हुई गुंबद।"
  }
];

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
        alt={lang === "en" ? item.titleEn : item.titleHi}
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

  const photoRows = chunkArray(ALL_PHOTOS, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-outfit select-none pb-24 pt-28 relative overflow-hidden">
      
      {/* Subtle spiritual background watermark */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.png')",
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
        <h2 className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-gray-800 font-outfit">
          {lang === 'en' ? 'PANDIT MAA BAGLAMUKHI' : 'पंडित माँ बगलामुखी'}
        </h2>
      </div>

      {/* Videos Section Title */}
      <div className="px-6 md:px-12 max-w-[1440px] mx-auto pt-12 pb-6 relative z-10">
        <h1 className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-800 uppercase font-outfit flex items-center gap-3">
          <span>—</span>
          <span>{lang === 'en' ? 'Videos' : 'वीडियो'}</span>
        </h1>
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
              <div className="aspect-video relative">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full z-0"
                  src={`https://www.youtube.com/embed/${vid.id}`} 
                  title={lang === 'en' ? vid.titleEn : vid.titleHi}
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen>
                </iframe>
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
            rel="noopener noreferrer"
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
        <h1 className="text-xl md:text-2xl font-light tracking-[0.2em] text-gray-800 uppercase font-outfit flex items-center gap-3">
          <span>—</span>
          <span>{lang === 'en' ? 'Gallery' : 'गैलरी'}</span>
        </h1>
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
              url: "/banner-new.jpg",
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
              src="/banner-new.jpg"
              alt="Maa Baglamukhi Divine Banner"
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
