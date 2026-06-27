"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/animations/variants";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { API_BASE } from "@/lib/adminApi";
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
    textEn: "We were caught in a stressful legal dispute that dragged on for four years, draining us financially and mentally. When we contacted Acharya Ji, he listened to our troubles with so much patience and conducted the Baglamukhi Puja at Nalkheda Dham on our behalf. His calmness gave us hope, and the dispute was resolved peacefully shortly after. We are deeply grateful for his guidance.",
    textHi: "हम चार साल से एक मानसिक और आर्थिक रूप से थका देने वाले कानूनी विवाद में फंसे हुए थे। जब हमने आचार्य जी से संपर्क किया, तो उन्होंने बड़े धैर्य से हमारी बात सुनी और हमारी ओर से नलखेड़ा धाम में बगलामुखी पूजा संपन्न कराई। उनके मार्गदर्शन से हमें संबल मिला और जल्द ही विवाद का शांतिपूर्ण समाधान हो गया। हम उनके हृदय से आभारी हैं।",
    rating: 5,
  },
  {
    _id: "2",
    nameEn: "Sunita Deshmukh",
    nameHi: "सुनीता देशमुख",
    locationEn: "Mumbai",
    locationHi: "मुंबई",
    textEn: "Our family business was facing severe setbacks, and we felt constant blockages around us. Acharya Ji suggested a special Vishesh Havan. Unlike others, he didn't demand complex things; he just asked us to have faith in Maa Pitambara. The positive energy in our office returned within weeks, and our relationships with clients smoothed out. He is a genuine guide.",
    textHi: "हमारे पारिवारिक व्यवसाय में काफी गिरावट आ रही थी और चारों तरफ से रुकावटें महसूस हो रही थीं। आचार्य जी ने विशेष हवन कराने का सुझाव दिया। उन्होंने हमें केवल माँ पीताम्बरा पर अटूट विश्वास रखने को कहा। कुछ ही हफ्तों में सकारात्मक ऊर्जा लौट आई और व्यापारिक संबंध सुधर गए। वे एक सच्चे मार्गदर्शक हैं।",
    rating: 5,
  },
  {
    _id: "3",
    nameEn: "Vikram Rathore",
    nameHi: "विक्रम राठौड़",
    locationEn: "Indore",
    locationHi: "इंदौर",
    textEn: "Visiting the temple at Nalkheda Dham with my family was a transformative experience. Acharya Pt. Rudraksh Rajpurohit explained the meaning of each ritual step to us instead of just chanting fast. You can feel the purity in how he handles the offerings and chants the mantras. It felt less like a service and more like a spiritual homecoming.",
    textHi: "अपने परिवार के साथ नलखेड़ा धाम मंदिर के दर्शन करना हमारे लिए जीवन बदलने वाला अनुभव था। आचार्य जी ने हमें केवल मंत्रोच्चार सुनाने के बजाय पूजा के प्रत्येक चरण का महत्व समझाया। हवन की आहुतियों और मंत्रों की शुचिता को स्पष्ट रूप से महसूस किया जा सकता है। यह एक अत्यंत दिव्य अनुभव था।",
    rating: 5,
  },
  {
    _id: "4",
    nameEn: "Meena Agarwal",
    nameHi: "मीना अग्रवाल",
    locationEn: "Jaipur, Rajasthan",
    locationHi: "जयपुर, राजस्थान",
    textEn: "My daughter's marriage was facing unexpected delays and obstacles for nearly three years, causing great worry at home. Acharya Ji performed the Vyavahik Badha Nivaran Puja with complete Vedic protocols. Within a few months, we met a wonderful family and her marriage was finalized. Acharya Ji's prayers brought peace back to our family.",
    textHi: "मेरी बेटी के विवाह में लगभग तीन वर्षों से लगातार अड़चनें आ रही थीं, जिससे पूरा परिवार चिंतित रहता था। आचार्य जी ने पूरे विधि-विधान से वैवाहिक बाधा निवारण पूजा संपन्न की। कुछ ही महीनों में हमें एक बहुत अच्छा परिवार मिला और उसका विवाह तय हो गया। आचार्य जी की प्रार्थनाओं ने हमारे घर में खुशियाँ लौटा दीं।",
    rating: 5,
  },
  {
    _id: "5",
    nameEn: "Ajay Tiwari",
    nameHi: "अजय तिवारी",
    locationEn: "Bhopal, Madhya Pradesh",
    locationHi: "भोपाल, मध्य प्रदेश",
    textEn: "I was under immense pressure due to growing debts and a complete standstill in my career. Acharya Ji suggested the Rin Mukti Havan. He did not promise instant magic but told me to work with dedication while he prayed for me. Gradually, new opportunities opened up, and I cleared my major dues. His practical guidance alongside rituals is what makes him different.",
    textHi: "बढ़ते कर्ज और करियर में ठहराव के कारण मैं बहुत तनाव में था। आचार्य जी ने ऋण मुक्ति हवन कराने की सलाह दी। उन्होंने कोई हवाई दावा नहीं किया, बल्कि मुझे कर्म करने और माँ पर भरोसा रखने को कहा। धीरे-धीरे नए रास्ते खुले और मैंने अपना कर्ज चुका दिया। अनुष्ठानों के साथ उनका व्यावहारिक मार्गदर्शन ही उन्हें सबसे अलग बनाता है।",
    rating: 5,
  },
  {
    _id: "6",
    nameEn: "Kavita Singh",
    nameHi: "कविता सिंह",
    locationEn: "Lucknow, Uttar Pradesh",
    locationHi: "लखनऊ, उत्तर प्रदेश",
    textEn: "During a time of severe health crisis in our family, we felt completely helpless. A well-wisher recommended Acharya Ji. We booked the Maha Mrityunjay Anusthan online since we couldn't travel. Acharya Ji sent us videos of the Sankalp and daily updates of the path. The mental strength we received was immense, and our family recovered. We feel blessed to have connected with him.",
    textHi: "हमारे परिवार में अचानक आए स्वास्थ्य संकट के समय हम खुद को बहुत असहाय महसूस कर रहे थे। एक शुभचिंतक के सुझाव पर हमने आचार्य जी से संपर्क किया। हम यात्रा करने में असमर्थ थे, इसलिए ऑनलाइन महामृत्युंजय अनुष्ठान बुक किया। आचार्य जी ने संकल्प का वीडियो और प्रतिदिन की पूजा की जानकारी भेजी। इससे हमें बहुत संबल मिला और परिवार में स्थिति सामान्य हो गई।",
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
        const res = await fetch(`${API_BASE}/reviews?t=${Date.now()}`);
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
          
          {/* Review Us CTA Option */}
          <div className="flex justify-center mt-10 relative z-20">
            <button
              onClick={() => window.dispatchEvent(new Event('open-review-modal'))}
              className="btn-sacred text-xs px-8 py-3.5 rounded-full font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              {lang === 'en' ? 'Share Your Experience' : 'अपना अनुभव साझा करें'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
