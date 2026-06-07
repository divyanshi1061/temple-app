"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function AboutSection() {
  const { lang } = useLanguage();

  const title = lang === 'en' 
    ? "Acharya Pt. Rudraksh Rajpurohit" 
    : "आचार्य पं. रुद्राक्ष राजपुरोहित";
    
  const desc = lang === 'en'
    ? "For generations, my family has served the sacred fire of Maa Baglamukhi. As a Vedic priest and Sadhak at Nalkheda Dham, I, Acharya Pt. Rudraksh Rajpurohit, welcome you. My life is dedicated to maintaining the precise scriptural purity of ancient rituals. Whether you visit our temple in person or connect with us from afar, my mission is to guide you safely through these powerful Vedic Havans to bring protection and harmony into your life."
    : "पीढ़ियों से, मेरा परिवार माँ बगलामुखी की अखंड ज्योति और सेवा में समर्पित रहा है। नलखेड़ा धाम सिद्ध पीठ में एक पुरोहित और साधक के रूप में, मैं, आचार्य पं. रुद्राक्ष राजपुरोहित, आपका स्वागत करता हूँ। मेरा जीवन इन प्राचीन अनुष्ठानों की शास्त्रीय शुद्धता बनाए रखने के लिए समर्पित है। चाहे आप व्यक्तिगत रूप से हमारे मंदिर आएं या हमसे दूर से जुड़ें, मेरा संकल्प है कि मैं पूर्ण श्रद्धा और वैदिक मर्यादा के साथ यज्ञ संपन्न करवाकर आपके जीवन में सुरक्षा और समृद्धि का मार्ग प्रशस्त कर सकूं।";

  const templeSummary = lang === 'en'
    ? "Nestled on the banks of the sacred Lakhundar River, the ancient Siddh Peeth of Maa Baglamukhi in Nalkheda Dham is a site of immense spiritual energy. Dating back to the Pandava era, where Lord Krishna guided King Yudhishthir in sadhana, this temple remains a sanctuary for those seeking protection and victory. Here, we carry forward the legacy of intense Vedic Pujas and Tantra Havans, preserving the exact methods passed down through generations."
    : "पवित्र लखुंदर नदी के पावन तट पर स्थित, नलखेड़ा धाम में माँ बगलामुखी का प्राचीन सिद्ध पीठ असीम दिव्य ऊर्जा का केंद्र है। द्वापर युग के पांडव काल से जुड़े इस इतिहास में, जहाँ स्वयं भगवान कृष्ण ने महाराज युधिष्ठिर को साधना का निर्देश दिया था, आज भी यह मंदिर एक जागृत धाम है। यहाँ हम सदियों पुरानी परंपरा को जीवित रखते हुए, शुद्ध शास्त्रीय विधि-विधान के साथ विशेष हवन और वैदिक अनुष्ठान संपन्न करते हैं।";

  return (
    <section id="about" className="relative py-10 md:py-16 lg:py-24 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sacred-pattern opacity-30 pointer-events-none" />
      <div className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-sacred relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: About Acharya Ji */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center mb-10 lg:mb-20">
          
          {/* Left: Acharya Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-xs md:max-w-md mx-auto border-2 border-gray-100 bg-gray-100">
              <Image 
                src="/acharya-new.webp" 
                alt="Acharya Pt. Rudraksh Rajpurohit" 
                fill
                sizes="(max-width: 768px) 280px, 400px"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 left-3 sm:left-8 z-20 bg-white p-2.5 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-gold/30 bg-gray-100">
                <Image 
                  src="/acharya-new.webp" 
                  alt="Acharya" 
                  fill
                  sizes="(max-width: 640px) 32px, 44px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="w-[1px] h-7 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-bold text-[10px] sm:text-xs leading-tight font-cinzel">
                  {lang === 'en' ? 'Revered' : 'प्रतिष्ठित'}
                </p>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-[8px] sm:text-[9px]">
                  {lang === 'en' ? 'Bagalamukhi Sadhak' : 'वैदिक साधक'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold text-[10px] sm:text-xs tracking-[0.25em] uppercase font-bold mb-2 block">
              {lang === 'en' ? 'About Acharya Ji' : 'आचार्य जी के बारे में'}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-4">
              {title}
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed font-medium mb-4 md:mb-6">
              {desc}
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 md:mb-6">
              {[
                { title: { en: "Vedic Purity", hi: "शास्त्रीय शुद्धता" }, desc: { en: "We follow the exact mantras and offerings prescribed in ancient Tantric texts.", hi: "हम प्राचीन ग्रंथों में बताए गए मंत्रों और सामग्रियों का ही उपयोग करते हैं।" } },
                { title: { en: "Devotion Beyond Distance", hi: "भौगोलिक दूरी से परे" }, desc: { en: "Connect via live video call for your personal Sankalp recitation.", hi: "अपने व्यक्तिगत संकल्प के लिए लाइव वीडियो कॉल के माध्यम से जुड़ें।" } },
                { title: { en: "Guided Anusthan", hi: "मार्गदर्शित अनुष्ठान" }, desc: { en: "Every step is personally explained and directed under scriptural safety.", hi: "हर चरण को शास्त्रीय सुरक्षा के तहत व्यक्तिगत रूप से समझाया और संपन्न किया जाता है।" } },
                { title: { en: "Devotee Trust", hi: "भक्तों का विश्वास" }, desc: { en: "A transparent and respectful process with complete spiritual dedication.", hi: "पूर्ण समर्पण के साथ एक पारदर्शी, आदरणीय और प्रामाणिक प्रक्रिया।" } },
              ].map((val, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-gold text-base" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-xs sm:text-sm mb-0.5">{val.title[lang]}</h3>
                    <p className="text-gray-500 text-[11px] sm:text-xs font-medium leading-relaxed">{val.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#services" className="inline-block px-5 py-2.5 bg-gray-900 hover:bg-gold text-white font-bold rounded-full transition-colors duration-300 shadow-lg text-xs sm:text-sm">
              {lang === 'en' ? 'Discover Services' : 'सेवाएं खोजें'}
            </a>
          </motion.div>
        </div>

        {/* Part 2: About Mata Mandir — Compact Preview */}
        <motion.div 
          className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center">
            {/* Left: Image Thumbnail (Single Large Image) */}
            <div className="md:col-span-5 rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white p-1.5 md:p-2">
              <div className="rounded-xl md:rounded-2xl overflow-hidden bg-gray-100 relative aspect-[4/3] w-full">
                <Image
                  src="/mata-baglamukhi.webp"
                  alt="Maa Baglamukhi - Sacred Darshan at Nalkheda Dham"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            </div>

            {/* Right: Brief Text + CTA */}
            <div className="md:col-span-7 flex flex-col items-start pl-0 md:pl-4">
              <span className="text-gold text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20 mb-3 md:mb-4">
                {lang === 'en' ? 'Siddh Peeth Nalkheda Dham' : 'सिद्ध पीठ नलखेड़ा धाम'}
              </span>
              <h3 className="text-lg md:text-2xl font-bold font-cinzel text-gray-900 mb-2 md:mb-3">
                {lang === 'en' ? 'Siddh Peeth Maa Baglamukhi Temple, Nalkheda Dham' : 'सिद्ध पीठ माँ बगलामुखी मंदिर, नलखेड़ा धाम'}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium text-xs sm:text-sm mb-4 md:mb-5 line-clamp-4">
                {templeSummary}
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gold text-white font-bold rounded-full transition-colors duration-300 shadow-lg text-xs sm:text-sm group"
              >
                {lang === 'en' ? 'Read Full History' : 'पूरा इतिहास पढ़ें'}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
