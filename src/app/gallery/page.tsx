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
  isDouble?: boolean;
  urlA?: string;
  urlB?: string;
  titleEnA?: string;
  titleHiA?: string;
  titleEnB?: string;
  titleHiB?: string;
};

// Configured image data matching the reference image's grid layout structure
const COLUMN_1_PHOTOS: PhotoItem[] = [
  {
    id: "col1-new-1",
    url: "/mrityunjay-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maha Mrityunjay Anusthan",
    titleHi: "महामृत्युंजय अनुष्ठान",
    descEn: "Pt. Rudraksh Rajpurohit conducting the sacred Maha Mrityunjay Anusthan for health, healing, and longevity.",
    descHi: "स्वास्थ्य, आरोग्य और दीर्घायु के लिए पं. रुद्राक्ष राजपुरोहित द्वारा पवित्र महामृत्युंजय अनुष्ठान का संपादन।"
  },
  {
    id: "col1-1",
    url: "/acharya-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Pt. Rudraksh Rajpurohit",
    titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
    descEn: "Pt. Rudraksh Rajpurohit in deep meditation and divine guidance at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में गहरे ध्यान और दिव्य मार्गदर्शन में पं. रुद्राक्ष राजपुरोहित।"
  },
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
  }
  ,
  {
    id: "col1-5",
    url: "/real-gallery-5.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Baglamukhi Shringar",
    titleHi: "माँ बगलामुखी श्रृंगार",
    descEn: "A ceremonial portrait from the gallery collection.",
    descHi: "गैलरी संग्रह से एक सांस्कृतिक पूजापूर्ण चित्रण।"
  }
];

const COLUMN_2_PHOTOS: PhotoItem[] = [
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
    id: "col2-3",
    url: "/real-gallery-1.jpg",
    aspect: "aspect-video",
    isDouble: true,
    urlA: "/real-gallery-1.jpg",
    urlB: "/real-gallery-3.jpg",
    titleEnA: "Spiritual Devotion",
    titleHiA: "आध्यात्मिक भक्ति",
    titleEnB: "Puja Offerings",
    titleHiB: "पूजा सामग्री",
    titleEn: "Ritual Assemblages",
    titleHi: "अनुष्ठान झलकियां",
    descEn: "Scenes from everyday pujas and offerings at the divine altar.",
    descHi: "दिव्य वेदी पर प्रतिदिन होने वाली पूजा और चढ़ावे के दृश्य।"
  },
  {
    id: "col2-4",
    url: "/new-havan-3.jpg",
    aspect: "aspect-[4/3]",
    titleEn: "Devotees Gathering",
    titleHi: "भक्तों का जमघट",
    descEn: "Devotees joining hands in prayer during a powerful community havan.",
    descHi: "एक शक्तिशाली सामूहिक हवन के दौरान प्रार्थना में हाथ जोड़ते भक्तगण।"
  }
  ,
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
  }
];

const COLUMN_3_PHOTOS: PhotoItem[] = [
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
  }
  ,
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
  }
];

const COLUMN_4_PHOTOS: PhotoItem[] = [
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

export default function GalleryPage() {
  const { lang, toggleLang } = useLanguage();
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

  const renderPhotoCard = (item: PhotoItem) => (
    <motion.div
      key={item.id}
      onClick={() => setSelectedPhoto(item)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      }}
      className="group relative overflow-hidden rounded-2xl bg-gray-900 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-gold/20 transition-all duration-500"
    >
      <div className={`relative w-full ${item.aspect} overflow-hidden`}>
        <img
          src={item.url}
          alt={lang === "en" ? item.titleEn : item.titleHi}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <h3 className="text-white font-cinzel font-bold text-lg md:text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {lang === "en" ? item.titleEn : item.titleHi}
          </h3>
          <p className="text-white/80 text-xs mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
            {lang === "en" ? item.descEn : item.descHi}
          </p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-white text-gray-900 font-outfit select-none pb-0 pt-28 relative"
      style={{
        backgroundImage: "url('/hero-spiritual-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* 2. Editorial Header Section */}
      <section className="relative max-w-4xl mx-auto text-center pt-16 md:pt-24 pb-16 px-6 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/15 rounded-full blur-[100px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-bold bg-white/60 px-6 py-2.5 rounded-full border border-gold/20 backdrop-blur-md inline-block mb-6 shadow-sm">
            {lang === 'en' ? 'Sacred Moments' : 'पवित्र पल'}
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 font-cinzel drop-shadow-sm">
            {lang === 'en' ? 'Divine Gallery' : 'दिव्य गैलरी'}
          </h1>
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-8 opacity-70" />
        </motion.div>
      </section>

      {/* 4. Video Gallery Section — Maa Baglamukhi Darshan Channel */}
      <motion.section 
        className="px-6 md:px-12 max-w-[1440px] mx-auto pb-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 font-cinzel inline-block relative">
            {lang === 'en' ? 'Temple Videos' : 'मंदिर वीडियो'}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-gold rounded-full" />
          </h2>
          <p className="mt-6 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            {lang === 'en' 
              ? 'Watch sacred rituals, havan ceremonies, and divine darshan from our official YouTube channel — Maa Baglamukhi Darshan' 
              : 'हमारे आधिकारिक यूट्यूब चैनल — माँ बगलामुखी दर्शन से पवित्र अनुष्ठान, हवन समारोह और दिव्य दर्शन देखें'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Video 1 — Havan Booking / Maa Baglamukhi Havan Benefits */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 group border border-gold/20"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <iframe 
                className="absolute top-0 left-0 w-full h-full z-0"
                src="https://www.youtube.com/embed/C9iVhfuGFow" 
                title={lang === 'en' ? 'Maa Baglamukhi Havan Benefits' : 'माँ बगलामुखी हवन के लाभ'}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-950">
              <h3 className="text-white font-cinzel font-semibold text-sm md:text-base truncate">
                {lang === 'en' ? '🔥 Maa Baglamukhi Havan Benefits' : '🔥 माँ बगलामुखी हवन के लाभ'}
              </h3>
              <p className="text-white/60 text-xs mt-1">Maa Baglamukhi Darshan</p>
            </div>
          </motion.div>

          {/* Video 2 — Baglamukhi Darshan Shorts */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 group border border-gold/20"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <iframe 
                className="absolute top-0 left-0 w-full h-full z-0"
                src="https://www.youtube.com/embed/B8eT6o8a1oU" 
                title={lang === 'en' ? 'Maa Baglamukhi Divine Darshan' : 'माँ बगलामुखी दिव्य दर्शन'}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-950">
              <h3 className="text-white font-cinzel font-semibold text-sm md:text-base truncate">
                {lang === 'en' ? '🙏 Maa Baglamukhi Divine Darshan' : '🙏 माँ बगलामुखी दिव्य दर्शन'}
              </h3>
              <p className="text-white/60 text-xs mt-1">Maa Baglamukhi Darshan</p>
            </div>
          </motion.div>

          {/* Video 3 — Channel Latest Videos Embed */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-900 group border border-gold/20 md:col-span-2 lg:col-span-1"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <div className="aspect-video relative">
              <div className="absolute inset-0 bg-gold/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
              <iframe 
                className="absolute top-0 left-0 w-full h-full z-0"
                src="https://www.youtube.com/embed?listType=user_uploads&list=UCw1djYbf_qoTFF2LpV1CoTQ" 
                title={lang === 'en' ? 'Latest Videos from Channel' : 'चैनल से नवीनतम वीडियो'}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen>
              </iframe>
            </div>
            <div className="p-4 bg-gradient-to-b from-gray-900 to-gray-950">
              <h3 className="text-white font-cinzel font-semibold text-sm md:text-base truncate">
                {lang === 'en' ? '📺 Latest from Our Channel' : '📺 हमारे चैनल से नवीनतम'}
              </h3>
              <p className="text-white/60 text-xs mt-1">Maa Baglamukhi Darshan</p>
            </div>
          </motion.div>
        </div>

        {/* Visit Channel Button */}
        <div className="text-center mt-10">
          <a 
            href="https://youtube.com/@maabaglamukhidarshan-d2e?si=OC9ZiN1R5Tb59OBl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-sm tracking-wide shadow-lg hover:shadow-red-500/30 hover:scale-105 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {lang === 'en' ? 'Visit Our YouTube Channel' : 'हमारा YouTube चैनल देखें'}
          </a>
        </div>
      </motion.section>

      {/* 3. Visual Masonry Grid (4 Columns) */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-24 relative z-10">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {COLUMN_1_PHOTOS.map((item) => renderPhotoCard(item))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {COLUMN_2_PHOTOS.map((item) => {
              if (item.isDouble) {
                return (
                  <div key={item.id} className="grid grid-cols-2 gap-3 w-full">
                    {renderPhotoCard({
                      ...item, id: `${item.id}-A`, url: item.urlA || "", titleEn: item.titleEnA || "", titleHi: item.titleHiA || "", aspect: "aspect-[3/4]"
                    })}
                    {renderPhotoCard({
                      ...item, id: `${item.id}-B`, url: item.urlB || "", titleEn: item.titleEnB || "", titleHi: item.titleHiB || "", aspect: "aspect-[3/4]"
                    })}
                  </div>
                );
              }
              return renderPhotoCard(item);
            })}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {COLUMN_3_PHOTOS.map((item) => renderPhotoCard(item))}
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-6">
            {COLUMN_4_PHOTOS.map((item) => renderPhotoCard(item))}
          </div>
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

    </div>
  );
}
