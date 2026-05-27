"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { FaBookOpen, FaClock, FaCalendarAlt, FaArrowRight, FaOm } from "react-icons/fa";
import { ARTICLES } from "@/lib/articles";
import { staggerContainer, staggerItem } from "@/animations/variants";
import ParticleField from "@/components/effects/ParticleField";

export default function ArticlesPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-sacred-white pb-20 overflow-hidden font-outfit">
      
      {/* ─── Light Hero Section ─── */}
      <section 
        className="relative text-gray-900 pt-36 pb-20 md:py-28 sacred-pattern border-b border-gray-100"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fdfbf7',
        }}
      >
        <ParticleField count={15} />
        
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-1/2 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-sacred max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-6"
          >
            <span className="text-gold text-xs font-bold font-cinzel">ॐ</span>
            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-amber-800">
              {lang === "en" ? "Spiritual Knowledge Hub" : "आध्यात्मिक ज्ञान केंद्र"}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-cinzel tracking-tight bg-gradient-to-r from-amber-600 via-gold to-yellow-600 bg-clip-text text-transparent mb-5 uppercase max-w-4xl leading-tight"
          >
            {lang === "en" ? "Vedic Guidance & Articles" : "वैदिक मार्गदर्शिका एवं लेख"}
          </motion.h1>

          {/* Sanskrit Sloke */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl border-t border-b border-gold/25 py-4 w-full mb-6"
          >
            <p className="text-xs sm:text-sm text-gold-dim font-bold font-cinzel tracking-[0.25em]">
              ज्ञानेन सदृशं पवित्रमिह न विद्यते
            </p>
            <p className="text-[9px] sm:text-[10px] text-gray-500 mt-1.5 uppercase tracking-widest font-semibold">
              {lang === "en" ? "Truly, there is nothing in this world as purifying as knowledge" : "वास्तव में, इस संसार में ज्ञान के समान पवित्र करने वाला कुछ भी नहीं है"}
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-xs sm:text-sm font-medium max-w-xl leading-relaxed"
          >
            {lang === "en"
              ? "Deepen your understanding of Maa Baglamukhi rituals, temple legacy, mantra processes, and travel guidance to Nalkheda Dham."
              : "माँ बगलामुखी अनुष्ठानों, मंदिर के इतिहास, मंत्र साधना की प्रक्रिया, और नलखेड़ा धाम की यात्रा से संबंधित अपनी समझ को गहरा करें।"}
          </motion.p>
        </div>
      </section>

      {/* ─── Articles Grid Section ─── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-sacred max-w-7xl mx-auto px-6">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {ARTICLES.map((article) => {
              const titleText = lang === "en" ? article.title.en : article.title.hi;
              const descText = lang === "en" ? article.description.en : article.description.hi;
              const catText = lang === "en" ? article.category.en : article.category.hi;
              const timeText = lang === "en" ? article.readTime.en : article.readTime.hi;

              return (
                <motion.div
                  key={article.id}
                  variants={staggerItem}
                  className="group relative bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 transition-all duration-500 flex flex-col h-full"
                >
                  {/* Image container */}
                  <div className="relative h-56 md:h-60 w-full overflow-hidden bg-gray-50 border-b border-gray-50 shrink-0">
                    <img 
                      src={article.image} 
                      alt={titleText}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Category Overlay tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-semibold text-[10px] tracking-wider uppercase shadow-md">
                        <FaBookOpen size={10} />
                        <span>{catText}</span>
                      </span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    {/* Date and Readtime row */}
                    <div className="flex items-center gap-4 text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt size={11} className="text-gold" />
                        <span>{new Date(article.date).toLocaleDateString(lang === "en" ? 'en-US' : 'hi-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      <span className="flex items-center gap-1.5">
                        <FaClock size={11} className="text-gold" />
                        <span>{timeText}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg md:text-xl font-bold font-cinzel text-gray-900 group-hover:text-gold transition-colors duration-300 mb-3 leading-snug line-clamp-2">
                      <Link href={`/articles/${article.id}`} className="focus:outline-none">
                        {titleText}
                      </Link>
                    </h2>

                    {/* Short Description */}
                    <p className="text-xs md:text-sm text-gray-500 font-medium leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {descText}
                    </p>

                    {/* Read CTA Link */}
                    <div className="pt-4 border-t border-gray-50 shrink-0">
                      <Link 
                        href={`/articles/${article.id}`} 
                        className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 hover:text-gold uppercase tracking-widest transition-colors duration-300"
                      >
                        <span>{lang === "en" ? "Read Guide" : "पूरा लेख पढ़ें"}</span>
                        <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

    </main>
  );
}
