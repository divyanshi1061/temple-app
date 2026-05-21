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
    id: "col1-1",
    url: "/acharya-new.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Pt. Rudraksh Rajpurohit",
    titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
    descEn: "Pt. Rudraksh Rajpurohit in deep meditation and divine guidance at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में गहरे ध्यान और दिव्य मार्गदर्शन में पं. रुद्राक्ष राजपुरोहित।"
  },
  {
    id: "col1-2",
    url: "/mata-idol-1.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Baglamukhi Sanctum",
    titleHi: "माँ बगलामुखी गर्भगृह",
    descEn: "The divine golden idol of Maa Baglamukhi Devi at Nalkheda Dham Temple.",
    descHi: "नलखेड़ा धाम मंदिर में माँ बगलामुखी देवी की दिव्य स्वर्ण प्रतिमा।"
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
    url: "/acharya-rudraksh.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Conducting Anusthan",
    titleHi: "अनुष्ठान करते आचार्य जी",
    descEn: "Vedic rites being guided by Acharya Pt. Rudraksh Rajpurohit.",
    descHi: "आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा निर्देशित वैदिक अनुष्ठान।"
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
  },
  {
    id: "col2-5",
    url: "/temple-sunset.png",
    aspect: "aspect-[4/3]",
    titleEn: "Divine Temple Sunset",
    titleHi: "मंदिर का सूर्यास्त",
    descEn: "A serene look at the temple silhouette painted against the orange sunset sky.",
    descHi: "नारंगी सूर्यास्त के आकाश के सामने मंदिर की शांत रूपरेखा।"
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
    url: "/mata-idol-2.jpg",
    aspect: "aspect-square",
    titleEn: "Sacred Shrine Deity",
    titleHi: "पवित्र गर्भगृह विग्रह",
    descEn: "A detailed view of the deity decorated with sacred yellow garments and flowers.",
    descHi: "पीले वस्त्रों और फूलों से सुसज्जित देवी माँ का विस्तृत दर्शन।"
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
    id: "col4-4",
    url: "/havan-upload-4.jpg",
    aspect: "aspect-[3/4]",
    titleEn: "Sacred Flames of Yajna",
    titleHi: "यज्ञ की पावन लपटें",
    descEn: "The high-rising flames of the Baglamukhi havan invoking divine grace.",
    descHi: "ईश्वरीय कृपा का आह्वान करती बगलामुखी हवन की ऊंची उठती लपटें।"
  },
  {
    id: "col4-5",
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-outfit select-none pb-0 pt-28">

      {/* 2. Editorial Header Section */}
      <section className="max-w-4xl mx-auto text-center pt-16 pb-12 px-6">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-cormorant font-normal italic tracking-wider text-gray-900 mb-6">
          {lang === "en" ? "Portraits of Devotion" : "दिव्य दर्शन की झाँकियाँ"}
        </h1>
        
        <p className="max-w-2xl mx-auto text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide mb-8">
          {lang === "en"
            ? "I capture the divine essence of Vedic rituals, havans, and the sacred energy of Maa Baglamukhi temple. Each frame is a portal to the ancient, spiritual, and timeless traditions of Nalkheda Dham."
            : "मैं वैदिक अनुष्ठानों, हवनों और माँ बगलामुखी मंदिर की दिव्य ऊर्जा को कलात्मक दृष्टिकोण से कैमरे में उतारता हूँ। प्रत्येक चित्र सिद्ध पीठ नलखेड़ा धाम की प्राचीन और शाश्वत आध्यात्मिक विरासत की एक खिड़की है।"}
        </p>

        <button
          onClick={() => router.push("/book")}
          className="inline-block text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-gray-900 border-b border-gray-900 pb-1.5 hover:text-orange-600 hover:border-orange-600 transition-all duration-300"
        >
          {lang === "en" ? "Let's Consult Pt. Rudraksh" : "आचार्य जी से परामर्श लें"}
        </button>
      </section>

      {/* 3. Visual Masonry Grid (4 Columns) */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {COLUMN_1_PHOTOS.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
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

          {/* Column 2 */}
          <div className="flex flex-col gap-6">
            {COLUMN_2_PHOTOS.map((item) => {
              if (item.isDouble) {
                return (
                  <div key={item.id} className="grid grid-cols-2 gap-3 w-full">
                    <motion.div
                      onClick={() => setSelectedPhoto({
                        ...item,
                        url: item.urlA || "",
                        titleEn: item.titleEnA || "",
                        titleHi: item.titleHiA || ""
                      })}
                      className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ scale: 0.99 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img
                          src={item.urlA}
                          alt={lang === "en" ? item.titleEnA : item.titleHiA}
                          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      onClick={() => setSelectedPhoto({
                        ...item,
                        url: item.urlB || "",
                        titleEn: item.titleEnB || "",
                        titleHi: item.titleHiB || ""
                      })}
                      className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ scale: 0.99 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="relative aspect-[3/4] w-full overflow-hidden">
                        <img
                          src={item.urlB}
                          alt={lang === "en" ? item.titleEnB : item.titleHiB}
                          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  </div>
                );
              }

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
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
              );
            })}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {COLUMN_3_PHOTOS.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
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

          {/* Column 4 */}
          <div className="flex flex-col gap-6">
            {COLUMN_4_PHOTOS.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative overflow-hidden bg-gray-100 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
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

        </div>
      </section>

      {/* 4. Bottom Full-Width Atmospheric Banner */}
      <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black flex items-center justify-center">
        <motion.img
          src="/new-havan-4.png"
          alt="Divine Fire Ritual at Nalkheda"
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-black/30" />
        
        <div className="relative z-10 text-center text-white px-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-orange-400 font-bold block mb-4">
            {lang === "en" ? "Maa Baglamukhi Siddh Peeth" : "मां बगलामुखी सिद्ध पीठ"}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-cormorant italic font-light tracking-wide text-white leading-tight">
            {lang === "en" ? "Feel the Sacred Presence" : "दिव्य ऊर्जा की अनुभूति"}
          </h2>
        </div>
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
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light tracking-wide mb-6">
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
