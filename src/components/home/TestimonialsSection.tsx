"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { FaStar, FaQuoteLeft } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type TestimonialItem = {
  _id: string;
  nameEn: string;
  nameHi: string;
  locationEn: string;
  locationHi: string;
  textEn: string;
  textHi: string;
  rating: number;
};

const DEFAULT_TESTIMONIALS = [
  {
    _id: "1",
    nameEn: "Rajesh Sharma",
    nameHi: "राजेश शर्मा",
    locationEn: "Delhi",
    locationHi: "दिल्ली",
    textEn: "Acharya Ji guided us in performing the Maa Baglamukhi Anusthan for our critical legal case. Within 11 days of the puja completion, the court decision was entirely in our favor. Absolute miraculous power!",
    textHi: "आचार्य जी ने हमारे महत्वपूर्ण कानूनी मामले के लिए माँ बगलामुखी अनुष्ठान करने में हमारा मार्गदर्शन किया। पूजा पूरी होने के 11 दिनों के भीतर, अदालत का फैसला पूरी तरह से हमारे पक्ष में था। पूर्ण चमत्कारी शक्ति!",
    rating: 5,
  },
  {
    _id: "2",
    nameEn: "Sunita Deshmukh",
    nameHi: "सुनीता देशमुख",
    locationEn: "Mumbai",
    locationHi: "मुंबई",
    textEn: "We were facing severe obstacles in our business expansion and malicious enemy blockages. Acharya Ji conducted a special Shatru Nashak Havan for us. The business has now doubled and all issues resolved.",
    textHi: "हमें अपने व्यवसाय विस्तार में गंभीर बाधाओं और दुर्भावनापूर्ण शत्रु रुकावटों का सामना करना पड़ रहा था। आचार्य जी ने हमारे लिए एक विशेष शत्रु नाशक हवन आयोजित किया। व्यापार अब दोगुना हो गया है और सभी समस्याएं हल हो गई हैं।",
    rating: 5,
  },
  {
    _id: "3",
    nameEn: "Vikram Rathore",
    nameHi: "विक्रम राठौड़",
    locationEn: "Indore",
    locationHi: "इंदौर",
    textEn: "The spiritual ambiance at Nalkheda Dham is filled with massive energy. Acharya Pt. Rudraksh Rajpurohit conducts every mantra and offering with extreme Vedic precision and purity.",
    textHi: "नलखेड़ा धाम का आध्यात्मिक वातावरण विशाल ऊर्जा से भरा है। आचार्य पं. रुद्राक्ष राजपुरोहित हर मंत्र और आहुति को अत्यंत वैदिक सटीकता और पवित्रता के साथ संपन्न करते हैं।",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/admin/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          } else {
            setTestimonials(DEFAULT_TESTIMONIALS);
          }
        } else {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
        setTestimonials(DEFAULT_TESTIMONIALS);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 sacred-pattern">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-sacred relative z-10">
        
        {/* Dynamic Header Block */}
        <motion.div 
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.2em] uppercase font-bold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            {lang === 'en' ? 'Devotee Experiences' : 'भक्तों के अनुभव'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-6">
            {lang === 'en' ? 'Miracles of Devotion' : 'भक्ति के चमत्कार'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed font-medium">
            {lang === 'en' 
              ? 'Read the powerful stories of devotees whose lives were transformed by Maa Baglamukhi\'s divine grace through Acharya Ji\'s guidance.'
              : 'उन भक्तों की शक्तिशाली कहानियाँ पढ़ें जिनका जीवन आचार्य जी के मार्गदर्शन में माँ बगलामुखी की दिव्य कृपा से बदल गया।'}
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6" />
        </motion.div>

        {/* Slider */}
        {loading ? (
          <div className="text-center py-10 text-gray-500 font-semibold">Loading devotee miracles...</div>
        ) : (
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              spaceBetween={24}
              slidesPerView={1}
              loop={testimonials.length > 1}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 3 }
              }}
              modules={[Autoplay, Pagination]}
              className="w-full py-6"
            >
              {testimonials.map((t) => {
                const name = lang === 'en' ? t.nameEn : t.nameHi;
                const text = lang === 'en' ? t.textEn : t.textHi;
                const location = lang === 'en' ? t.locationEn : t.locationHi;

                return (
                  <SwiperSlide key={t._id} className="h-auto">
                    <div className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-gray-100 hover:border-gold/30 hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500 relative overflow-hidden flex flex-col justify-between h-full min-h-[360px] md:min-h-[380px] shadow-sm select-none">
                      
                      {/* Decorative Elements */}
                      <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                      <FaQuoteLeft className="absolute top-8 right-8 text-7xl text-gray-50/70 pointer-events-none transform rotate-12" />
                      
                      {/* Service tag pill */}
                      <div className="relative z-10 mb-5 flex">
                        <span className="text-[9px] md:text-[10px] text-gold font-bold bg-gold/5 border border-gold/15 px-3 py-1 rounded-full uppercase tracking-wider">
                          {lang === 'en' ? 'Puja Experience' : 'पूजा अनुभव'}
                        </span>
                      </div>

                      {/* Quote Content */}
                      <div className="relative z-10 flex-grow">
                        <p className="text-base md:text-lg text-gray-800 leading-relaxed font-semibold italic">
                          &ldquo;{text}&rdquo;
                        </p>
                      </div>
                      
                      {/* Author Profile */}
                      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-100 relative z-10 flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center border border-gold/30 flex-shrink-0 shadow-inner ring-4 ring-gold/5">
                          <span className="text-lg font-bold text-gold font-cinzel">
                            {name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-900 font-bold text-sm md:text-base tracking-tight truncate">{name}</h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider truncate">{location}</span>
                            <div className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                            <div className="flex gap-0.5 flex-shrink-0">
                              {Array.from({ length: t.rating }, (_, index) => (
                                <FaStar key={index} className="text-gold text-[9px]" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            
            {/* Custom pagination layout */}
            <div className="swiper-custom-pagination flex justify-center gap-2 mt-8 z-20 relative" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
