"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/animations/variants";
import { SERVICES } from "@/lib/constants";

type ServiceItem = {
  _id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category?: string;
  image?: string;
};

export default function ServicesPage() {
  const { lang } = useLanguage();
  
  const services: ServiceItem[] = SERVICES.map(s => ({
    _id: s.id,
    titleEn: s.title.en,
    titleHi: s.title.hi,
    descriptionEn: s.description.en,
    descriptionHi: s.description.hi,
    category: s.category || "puja",
    image: s.image || "/new-havan-1.webp",
  }));

  return (
    <main className="min-h-screen bg-sacred-white pb-20">
      {/* Premium Hero Header */}
      <section
        className="relative overflow-hidden pt-36 pb-20 md:py-28 bg-cover bg-center bg-no-repeat border-b border-gray-100"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundColor: '#fdfbf7',
        }}
      >
        <div className="absolute inset-0 bg-sacred-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-sacred relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center">
            <span className="text-gold text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold bg-gold/10 px-5 py-2.5 rounded-full border border-gold/20 shadow-sm backdrop-blur-md">
              {lang === 'en' ? 'Our Sacred Offerings' : 'हमारी पवित्र सेवाएं'}
            </span>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel tracking-tight bg-gradient-to-r from-amber-600 via-gold to-yellow-600 bg-clip-text text-transparent mt-8 mb-5 uppercase max-w-4xl leading-tight">
              {lang === 'en' ? 'Divine Services & Rituals' : 'दिव्य सेवाएं और अनुष्ठान'}
            </h1>
            
            {/* Sanskrit Shloka */}
            <div className="max-w-2xl border-t border-b border-gold/25 py-4 w-full mb-6 mt-2">
              <p className="text-xs sm:text-sm text-gold-dim font-bold font-cinzel tracking-[0.25em]">
                यज्ञो वै श्रेष्ठतमं कर्म
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1.5 uppercase tracking-widest font-semibold">
                {lang === "en" ? "Indeed, Yajna (sacred fire ritual) is the noblest deed" : "वास्तव में, यज्ञ (पवित्र अग्नि अनुष्ठान) सर्वश्रेष्ठ कर्म है"}
              </p>
            </div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium max-w-2xl mt-2">
              {lang === 'en'
                ? 'Explore our complete range of authentic Vedic and Tantric rituals. Each service is personally conducted with absolute purity and devotion by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham.'
                : 'हमारी वैदिक और तांत्रिक अनुष्ठानों की पूर्ण श्रृंखला देखें। प्रत्येक सेवा सिद्ध पीठ नलखेड़ा धाम पर आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा व्यक्तिगत रूप से संचालित की जाती है।'}
            </p>
          </motion.div>
        </div>
      </section>



      {/* Services Grid */}
      <section className="container-sacred mt-20 lg:mt-24">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {services.map((service) => (
            <motion.div
              key={service._id}
              variants={staggerItem}
              className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/40 transition-all duration-500 flex flex-col h-full"
              whileHover={{ y: -8 }}
            >
              {/* Image flush to top */}
              {service.image && (
                <div className="relative h-56 md:h-60 w-full overflow-hidden bg-gray-50 border-b border-gray-50 shrink-0">
                  <img 
                    src={service.image} 
                    alt={lang === 'en' ? service.titleEn : service.titleHi} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}

              {/* Body Content with padding */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Gold accent line */}
                <div className="w-10 h-1 rounded-full bg-gold/40 mb-5 group-hover:w-16 group-hover:bg-gold transition-all duration-300" />

                <h3 className="text-xl md:text-2xl text-gray-900 mb-3 font-bold tracking-tight font-cinzel group-hover:text-gold transition-colors duration-300 relative z-10 leading-snug">
                  {lang === 'en' ? service.titleEn : service.titleHi}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow font-medium relative z-10">
                  {lang === 'en' ? service.descriptionEn : service.descriptionHi}
                </p>

                {/* Duration + Category */}
                <div className="flex items-center gap-3 mb-6 relative z-10 mt-auto">
                  <span className="text-[10px] text-gray-500 font-bold bg-gray-50 border border-gray-100 px-4 py-1.5 rounded-lg uppercase tracking-wider">
                    {service.category || 'Puja'}
                  </span>
                </div>

                {/* Learn More */}
                <Link
                  href={`/services/${service._id}`}
                  className="w-full py-4 bg-gray-50 border border-gray-100 text-gray-900 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:border-gold group-hover:shadow-md relative z-10"
                >
                  {lang === 'en' ? 'Inquiry & Details' : 'पूछताछ एवं विवरण'}
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </motion.svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
