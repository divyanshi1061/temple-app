"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";

type ServiceItem = {
  _id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  category?: string;
  image?: string;
};

export default function ServicesSection() {
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
    <section id="services" className="relative py-20 overflow-hidden bg-gray-50 border-t border-gray-100 sacred-pattern">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
      
      <div className="container-sacred relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm">
            {lang === 'en' ? 'Divine Offerings' : 'दिव्य प्रसाद'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl mt-5 mb-4 font-bold tracking-tight text-gray-900 font-cinzel">
            {lang === 'en' ? 'Sacred Services' : 'पवित्र सेवाएं'}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto font-medium text-sm md:text-base leading-relaxed">
            {lang === 'en' 
              ? 'Personalized Vedic and Tantric rituals conducted by Acharya Pt. Rudraksh Rajpurohit at Nalkheda Dham' 
              : 'नलखेड़ा धाम पर आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा व्यक्तिगत रूप से आयोजित पवित्र अनुष्ठान'}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}>
            {services.slice(0, 6).map((service) => (
              <motion.div key={service._id} variants={staggerItem}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col justify-between"
                whileHover={{ y: -4 }}>
                
                <div>
                  {/* Image above name */}
                  {service.image && (
                    <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden shadow-sm">
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
                  <div className="w-10 h-1 rounded-full bg-gold/40 mb-4 group-hover:w-16 group-hover:bg-gold transition-all duration-300" />
                  
                  {/* Title */}
                  <h3 className="text-xl text-gray-900 mb-3 font-bold tracking-tight group-hover:text-gold transition-colors font-cinzel leading-snug relative z-10">
                    {lang === 'en' ? service.titleEn : service.titleHi}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3 font-medium relative z-10">
                    {lang === 'en' ? service.descriptionEn : service.descriptionHi}
                  </p>
                </div>

                <div className="relative z-10">
                  <Link href={`/services/${service._id}`} className="w-full py-3 bg-white border-2 border-gold/30 text-gold font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 hover:bg-gold hover:text-white hover:border-gold hover:shadow-md uppercase tracking-wider">
                    {lang === 'en' ? 'Inquiry / Details' : 'पूछताछ / विवरण'}
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </Link>
                </div>
                
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div className="text-center mt-16" variants={fadeInUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}>
          <Link href="/services" className="btn-sacred inline-flex items-center gap-2 text-sm px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            {lang === 'en' ? 'View All Services' : 'सभी सेवाएं देखें'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
