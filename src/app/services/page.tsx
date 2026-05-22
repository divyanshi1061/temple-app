"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { staggerContainer, staggerItem } from "@/animations/variants";

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
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (res.ok) {
          const data = await res.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <main className="min-h-screen bg-sacred-white pb-20">
      {/* Premium Hero Header */}
      <section
        className="relative overflow-hidden pb-28 pt-36 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.png')",
          minHeight: '520px',
          backgroundColor: '#fff',
        }}
      >
        <div className="absolute inset-0 bg-sacred-pattern opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-sacred relative z-10 text-center max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold bg-gold/10 px-5 py-2.5 rounded-full border border-gold/20 shadow-sm backdrop-blur-md">
              {lang === 'en' ? 'Our Sacred Offerings' : 'हमारी पवित्र सेवाएं'}
            </span>
            <h1 className="text-4xl md:text-6xl mt-8 mb-6 font-bold tracking-tight text-gray-900 font-cinzel leading-tight">
              {lang === 'en' ? 'Divine Services & Rituals' : 'दिव्य सेवाएं और अनुष्ठान'}
            </h1>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-medium">
              {lang === 'en'
                ? 'Explore our complete range of authentic Vedic and Tantric rituals. Each service is personally conducted with absolute purity and devotion by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham.'
                : 'हमारी वैदिक और तांत्रिक अनुष्ठानों की पूर्ण श्रृंखला देखें। प्रत्येक सेवा सिद्ध पीठ नलखेड़ा धाम पर आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा व्यक्तिगत रूप से संचालित की जाती है।'}
            </p>
          </motion.div>
        </div>
      </section>



      {/* Services Grid */}
      <section className="container-sacred mt-20 lg:mt-24">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
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
                className="group relative bg-white border border-gray-100 rounded-3xl p-8 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/40 transition-all duration-500 flex flex-col"
                whileHover={{ y: -8 }}
              >
                {/* Image above name */}
                {service.image && (
                  <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden shadow-sm">
                    <Image 
                      src={service.image} 
                      alt={lang === 'en' ? service.titleEn : service.titleHi} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Gold accent line */}
                <div className="w-10 h-1 rounded-full bg-gold/40 mb-5 group-hover:w-16 group-hover:bg-gold transition-all duration-300" />

                <h3 className="text-2xl text-gray-900 mb-3 font-bold tracking-tight font-cinzel group-hover:text-gold transition-colors duration-300 relative z-10">
                  {lang === 'en' ? service.titleEn : service.titleHi}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-8 flex-grow font-medium relative z-10">
                  {lang === 'en' ? service.descriptionEn : service.descriptionHi}
                </p>

                {/* Duration + Category */}
                <div className="flex items-center gap-3 mb-8 relative z-10">
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  );
}
