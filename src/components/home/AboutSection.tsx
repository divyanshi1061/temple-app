"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function AboutSection() {
  const { lang } = useLanguage();

  const title = lang === 'en' 
    ? "Acharya Pt Rudraksh Rajpurohit" 
    : "आचार्य पं. रुद्राक्ष राजपुरोहित";
    
  const desc = lang === 'en'
    ? "Acharya Pt Rudraksh Rajpurohit is a highly revered Vedic Priest and Bagalmukhi Sadhak at Siddh Peeth Nalkheda Dham. He dedicates his life to preserving the absolute purity of Vedic rituals and directing Maa Baglamukhi's protective aura to devotees worldwide."
    : "आचार्य पं. रुद्राक्ष राजपुरोहित नलखेड़ा धाम सिद्ध पीठ में एक अत्यंत प्रतिष्ठित वैदिक पुरोहित और बगलामुखी साधक हैं। वह वैदिक अनुष्ठानों की पूर्ण शुद्धता को बनाए रखने और दुनिया भर के भक्तों तक माँ बगलामुखी की सुरक्षात्मक ऊर्जा को निर्देशित करने के लिए अपना जीवन समर्पित करते हैं।";

  const templeSummary = lang === 'en'
    ? "Experience divine blessings at the ancient Siddh Peeth of Maa Baglamukhi, situated on the banks of the sacred Lakhundar River in Nalkheda Dham. Dating back to the Pandava era, this spiritual powerhouse is world-renowned for its intense Vedic Pujas and specialized Tantra Havans conducted under pure scriptures."
    : "नलखेड़ा धाम में पवित्र लखुंदर नदी के तट पर स्थित माँ बगलामुखी के प्राचीन सिद्ध पीठ में दिव्य आशीर्वाद का अनुभव करें। पांडव कालीन इतिहास से समृद्ध यह मंदिर अपने तीव्र वैदिक अनुष्ठानों और शास्त्र सम्मत तांत्रिक हवन के लिए विश्व प्रसिद्ध है।";

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
              <img 
                src="/acharya-new.jpg" 
                alt="Acharya Pt. Rudraksh Rajpurohit" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/acharya-new.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Badge */}
            <div className="absolute -bottom-4 left-3 sm:left-8 z-20 bg-white p-2.5 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-3">
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-gold/30 bg-gray-100">
                <img 
                  src="/acharya-new.jpg" 
                  alt="Acharya" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { (e.target as HTMLImageElement).src = '/acharya-new.jpg'; }}
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
                { title: { en: "Authentic Rituals", hi: "प्रामाणिक अनुष्ठान" }, desc: { en: "100% adherence to pure Vedic scriptures.", hi: "शुद्ध वैदिक शास्त्रों का 100% पालन।" } },
                { title: { en: "Global Reach", hi: "वैश्विक पहुंच" }, desc: { en: "Online sankalp for remote devotees.", hi: "दूरस्थ भक्तों के लिए ऑनलाइन संकल्प।" } },
                { title: { en: "Online Havan & Anusthan", hi: "ऑनलाइन हवन व अनुष्ठान" }, desc: { en: "Live online havan and anusthan bookings for devotees worldwide.", hi: "विश्वभर के भक्तों के लिए लाइव ऑनलाइन हवन और अनुष्ठान बुकिंग।" } },
                { title: { en: "Secure Booking", hi: "सुरक्षित बुकिंग" }, desc: { en: "Transparent and trusted process.", hi: "पारदर्शी और विश्वसनीय प्रक्रिया।" } },
              ].map((val, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-gold text-base" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-xs sm:text-sm mb-0.5">{val.title[lang]}</h4>
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
                  src="/mata-baglamukhi.jpg"
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
