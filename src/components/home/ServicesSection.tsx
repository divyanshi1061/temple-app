"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, staggerItem } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
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

const STATIC_SERVICES: ServiceItem[] = SERVICES.map(s => ({
  _id: s.id,
  titleEn: s.title.en,
  titleHi: s.title.hi,
  descriptionEn: s.description.en,
  descriptionHi: s.description.hi,
  category: s.category || "puja",
  image: s.image || "/new-havan-1.webp",
}));

export default function ServicesSection() {
  const { lang } = useLanguage();


  return (
    <section id="services" className="relative py-10 md:py-20 overflow-hidden bg-gray-50 border-t border-gray-100 sacred-pattern">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
      
      <div className="container-sacred relative z-10">
        <motion.div className="text-center mb-10 max-w-3xl mx-auto" variants={fadeInUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === 'en' ? 'Divine Offerings' : 'दिव्य प्रसाद'}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === 'en' ? 'Sacred Services' : 'पवित्र सेवाएं'}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-outfit max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Personalized Vedic and Tantric rituals conducted by Acharya Pt. Rudraksh Rajpurohit at Nalkheda Dham' 
              : 'नलखेड़ा धाम पर आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा व्यक्तिगत रूप से आयोजित पवित्र अनुष्ठान'}
          </p>
        </motion.div>

        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}>
          {(() => {
            const homeServiceIds = [
              "vyavahik-badha",
              "santan-prapti",
              "lakshmi-prapti",
              "baglamukhi-36-sawa-lakh",
              "nyayalay-vijay",
              "vastu-shastra"
            ];
            const filteredServices = homeServiceIds
              .map(id => STATIC_SERVICES.find(s => s._id === id))
              .filter((s): s is ServiceItem => !!s);

              return filteredServices.map((service) => (
                <Link key={service._id} href={`/services/${service._id}`} className="block">
                  <motion.div
                    variants={staggerItem}
                    className="group relative bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      {/* Image above name */}
                      {service.image && (
                        <div className="relative w-full h-28 md:h-40 mb-3 rounded-xl overflow-hidden shadow-sm">
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
                      <h3 className="text-base md:text-xl text-gray-900 mb-2 font-bold tracking-tight group-hover:text-gold transition-colors font-cinzel leading-snug relative z-10">
                        {lang === 'en' ? service.titleEn : service.titleHi}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-4 md:mb-6 line-clamp-3 font-medium relative z-10">
                        {lang === 'en' ? service.descriptionEn : service.descriptionHi}
                      </p>
                    </div>

                    <div className="relative z-10">
                      <div className="w-full py-2.5 bg-white border-2 border-gold/30 text-gold font-bold text-[10px] md:text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:border-gold group-hover:shadow-md uppercase tracking-wider">
                        {lang === 'en' ? 'Inquiry / Details' : 'पूछताछ / विवरण'}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ));
            })()}
          </motion.div>


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
