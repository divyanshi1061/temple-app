"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { FaStar } from "react-icons/fa";
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
  },
  {
    _id: "4",
    nameEn: "Meena Agarwal",
    nameHi: "मीना अग्रवाल",
    locationEn: "Jaipur, Rajasthan",
    locationHi: "जयपुर, राजस्थान",
    textEn: "My daughter's marriage was getting delayed for years despite all efforts. Acharya Ji performed Vyavahik Badha Nivaran at Nalkheda Dham. Within 3 months, she found an excellent match and is now happily married. We are forever grateful.",
    textHi: "सब प्रयासों के बावजूद मेरी बेटी की शादी सालों से नहीं हो रही थी। आचार्य जी ने नलखेड़ा धाम में वैवाहिक बाधा निवारण किया। 3 महीने के भीतर उसे एक उत्कृष्ट रिश्ता मिला और अब वह खुशहाल विवाहित जीवन जी रही है। हम सदैव आभारी हैं।",
    rating: 5,
  },
  {
    _id: "5",
    nameEn: "Ajay Tiwari",
    nameHi: "अजय तिवारी",
    locationEn: "Bhopal, Madhya Pradesh",
    locationHi: "भोपाल, मध्य प्रदेश",
    textEn: "I was drowning in debt and my business was on the verge of collapse. Acharya Ji recommended Rin Mukti and Vyapar Vraddhi Puja together. The results were miraculous — debts cleared within months and new contracts started flowing in.",
    textHi: "मैं कर्ज में डूब रहा था और मेरा व्यवसाय बंद होने की कगार पर था। आचार्य जी ने ऋण मुक्ति और व्यापार वृद्धि पूजा दोनों कराने की सलाह दी। परिणाम चमत्कारी रहे — कुछ ही महीनों में सारा कर्ज चुक गया और नए ठेके आने लगे।",
    rating: 5,
  },
  {
    _id: "6",
    nameEn: "Kavita Singh",
    nameHi: "कविता सिंह",
    locationEn: "Lucknow, Uttar Pradesh",
    locationHi: "लखनऊ, उत्तर प्रदेश",
    textEn: "My father was critically ill and doctors had lost hope. I contacted Acharya Ji for Maha Mrityunjay Anusthan. He conducted it with immense devotion at Siddh Peeth Nalkheda Dham. By Maa Baglamukhi's grace, my father recovered completely. A true divine miracle.",
    textHi: "मेरे पिताजी गंभीर रूप से बीमार थे और डॉक्टरों ने उम्मीद छोड़ दी थी। मैंने आचार्य जी से महामृत्युंजय अनुष्ठान के लिए संपर्क किया। उन्होंने सिद्ध पीठ नलखेड़ा धाम में पूर्ण भक्ति के साथ इसे संपन्न किया। माँ बगलामुखी की कृपा से मेरे पिताजी पूरी तरह स्वस्थ हो गए। एक सच्चा दिव्य चमत्कार।",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const { lang } = useLanguage();
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    const loadReviews = async () => {
      let apiReviews: TestimonialItem[] = [];
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const res = await fetch(`${apiBase}/reviews?t=${Date.now()}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            apiReviews = data.map((r: any) => ({
              _id: r._id,
              nameEn: r.name,
              nameHi: r.name,
              locationEn: r.location || "India",
              locationHi: r.location || "भारत",
              textEn: r.text,
              textHi: r.text,
              rating: r.rating || 5,
            }));
          }
        }
      } catch (err) {
        console.warn("Failed to load approved reviews from backend, using defaults.");
      }

      // Merge with offline user backup from localStorage (so user sees their submitted pending review locally)
      const saved = localStorage.getItem("user_reviews");
      let localReviews: TestimonialItem[] = [];
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            localReviews = parsed;
          }
        } catch (e) {
          console.error("Failed to parse local reviews", e);
        }
      }

      // Filter out local reviews that have already been approved and returned in apiReviews
      const apiIds = new Set(apiReviews.map(r => r._id));
      const pendingLocalReviews = localReviews.filter(r => !apiIds.has(r._id));

      setTestimonials([...DEFAULT_TESTIMONIALS, ...apiReviews, ...pendingLocalReviews]);
    };

    loadReviews();

    window.addEventListener("reviewsUpdated", loadReviews);
    return () => window.removeEventListener("reviewsUpdated", loadReviews);
  }, []);

  return (
    <section id="testimonials" className="relative py-8 overflow-hidden bg-white border-t border-gray-100 sacred-pattern">
      <div className="container-sacred relative z-10">
        
        {/* Simplified Header Block */}
        <motion.div 
          className="text-center mb-10 max-w-3xl mx-auto"
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === 'en' ? 'Devotee Experiences' : 'भक्तों के अनुभव'}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === 'en' ? 'Miracles of Devotion' : 'भक्ति के चमत्कार'}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-outfit max-w-2xl mx-auto">
            {lang === 'en' 
              ? 'Read the stories of devotees whose lives were blessed by Maa Baglamukhi\'s divine grace through Acharya Ji\'s guidance.'
              : 'उन भक्तों की कहानियाँ पढ़ें जिनका जीवन आचार्य जी के मार्गदर्शन में माँ बगलामुखी की दिव्य कृपा से धन्य हुआ।'}
          </p>
        </motion.div>

        {/* Faster Slider */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            loop={testimonials.length > 1}
            speed={400}
            autoplay={{ delay: 1800, disableOnInteraction: false }}
            pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 }
            }}
            modules={[Autoplay, Pagination]}
            className="w-full py-2"
          >
            {testimonials.map((t) => {
              const name = lang === 'en' ? t.nameEn : t.nameHi;
              const text = lang === 'en' ? t.textEn : t.textHi;
              const location = lang === 'en' ? t.locationEn : t.locationHi;

              return (
                <SwiperSlide key={t._id} className="h-auto">
                  <div className="w-full bg-white rounded-2xl p-4 border border-gray-100 hover:border-gold/30 hover:shadow-md transition-all duration-300 relative flex flex-col justify-start h-full shadow-sm select-none">
                    
                    {/* Header Info: Name, Location, Rating */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3 flex-shrink-0 z-10 relative">
                      <div className="flex flex-col">
                        <span className="font-outfit font-bold text-xs text-gray-900 tracking-wider uppercase">
                          {name}
                        </span>
                        <span className="text-[10px] text-gray-500 font-outfit font-normal">
                          {location}
                        </span>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0">
                        {Array.from({ length: t.rating }, (_, index) => (
                          <FaStar key={index} className="text-gold text-[9px]" />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="relative z-10 flex-grow">
                      <p className="text-xs text-gray-600 leading-relaxed font-outfit text-justify font-normal">
                        &ldquo;{text}&rdquo;
                      </p>
                    </div>

                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          {/* Custom pagination layout */}
          <div className="swiper-custom-pagination flex justify-center gap-2 mt-4 z-20 relative" />
        </motion.div>
      </div>
    </section>
  );
}
