"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

export default function AboutSection() {
  const { lang } = useLanguage();

  // Fallbacks
  const title = lang === 'en' 
    ? "Acharya Pt. Rudraksh Rajpurohit" 
    : "आचार्य पं. रुद्राक्ष राजपुरोहित";
    
  const desc = lang === 'en'
    ? "Acharya Pt. Rudraksh Rajpurohit is a highly revered Vedic Priest and Tantra Sadhak at Nalkheda Dham Siddh Peeth. He dedicates his life to preserving the absolute purity of Vedic rituals and directing Maa Baglamukhi's protective aura to devotees worldwide."
    : "आचार्य पं. रुद्राक्ष राजपुरोहित नलखेड़ा धाम सिद्ध पीठ में एक अत्यंत प्रतिष्ठित वैदिक पुरोहित और तंत्र साधक हैं। वह वैदिक अनुष्ठानों की पूर्ण शुद्धता को बनाए रखने और दुनिया भर के भक्तों तक माँ बगलामुखी की सुरक्षात्मक ऊर्जा को निर्देशित करने के लिए अपना जीवन समर्पित करते हैं।";

  const mission = lang === 'en'
    ? "The magnificent temple of Goddess Maa Baglamukhi is located in Nalkheda, Agar Malwa district, approximately 100 kilometers from Ujjain. Situated on the banks of the Lakhundar River, this temple is highly significant from both religious and tantric perspectives. The idol of Maa Baglamukhi installed here dates back to the Pandava era, as mentioned in the Kalika Purana. Among the idols in the temple, Maa Baglamukhi sits in the center, flanked by Maa Lakshmi on the right and Maa Saraswati on the left in the form of 'Pindis'. During the Dwapara Yuga, while the Pandavas were in exile, Lord Krishna advised them to worship Maa Baglamukhi to ensure victory. Among the Ten Mahavidyas, Maa Baglamukhi is the eighth. Her worship and rituals are highly effective and precise. The temple is more than 500 years old, serving as a primary Siddh Peeth in India. Sacred trees like Bel, Champa, White Aak, Amla, Neem, and Peepal stand together here. The Lakhundar River (anciently named Lakshmana) flows perennially behind the temple, enhancing its natural beauty. Many saints' tombs lie on the riverbanks, indicating a historic presence of ascetics. The surrounding cremation grounds (Muktidham) in all four directions further establish Nalkheda Dham as a powerful center for Tantra and Sadhana."
    : "उज्जैन से लगभग 100 किलोमीटर दूरी पर आगर मालवा जिले के नलखेडा में मां बगलामुखी मंदिर स्थित है। यह मंदिर लखुन्दर नदी के तट पर स्थित है। मंदिर धार्मिक एवं तांत्रिक दृष्टि से महत्वपूर्ण है। मंदिर में स्थित मां बगलामुखी की मुर्ति पाण्डव कालीन है। इसका प्रमाण कालिका पुराण में बताया गया है। मंदिर में स्थित मुर्तियों में बीच में मां बगलामुखी , दाए महालक्ष्मी व बाऐं मां सरस्वती पीण्डी के रूप में विराजित है। द्वापर युग में अज्ञातवास के समय पाण्डवों को भगवान श्रीकृष्ण ने बताया था की तुम मां बगलामुखी की साधना करो । दस महाविद्याओं में मां बगलामुखी अष्टम महाविद्या है। मां बगलामुखी की साधना अचुक होती है। यह मंदिर 500 वर्ष से भी अधिक पुराना है। त्रिशक्ति मां का मंदिर भारत वर्ष में प्रधान सिद्ध पीठ नलखेड़ा में स्थित है। बेल पत्र, चंपा, सफेद आंकड़े, आंवले तथा निम्न एवं पीपल के वृक्ष एक साथ स्थित है । मंदिर के पीछे लखुन्दर नदी (पुरातत्व नाम लक्ष्मणा) का पानी वर्ष भर रहता है जो प्राकृतिक सौंदर्य को दर्शाता है। नदी के किनारे कई संतो की समाधियां स्थित है। पुर्व में बड़ी संख्या में संतो के रहने का प्रमाण मिलता है। मंदिर के चारों दिशाओं में पुर्व से श्मशान (मुक्तिधाम) है जो साधना एंव तन्त्र स्थल होने का प्रमाण है।";

  const vision = lang === 'en'
    ? "The magnificent temple of Goddess Maa Baglamukhi is located on the banks of the Lakhundar River in Nalkheda, Agar Malwa district. This temple holds immense significance for both religious worship and tantric sadhanas. The Baglamukhi Havan (fire ritual) performed here is famous worldwide. Devotees from all over India and abroad visit Nalkheda Dham for sacred darshan, potent havans, and holy prayers, where their innermost wishes are fulfilled."
    : "मां बगलामुखी माता का भव्य मंदिर आगर-मालवा जिले के नलखेड़ा में लखुंदर नदी के तट पर स्थित है। यह मंदिर धार्मिक और तांत्रिक दोनों ही तरह की साधनाओं के लिए महत्वपूर्ण है। यहां किया जाने वाला बगलामुखी हवन (अग्नि अनुष्ठान) दुनिया भर में प्रसिद्ध है। भारत और अन्य देशों से लोग दर्शन (पूजा), हवन और पूजा (प्रार्थना) के लिए आते हैं। यहां भक्तों की मनोकामनाएं पूरी होती हैं।";

  return (
    <section id="about" className="relative py-16 lg:py-24 overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sacred-pattern opacity-30 pointer-events-none" />
      <div className="absolute -left-64 top-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-sacred relative z-10 px-4 sm:px-6 lg:px-8">
        
        {/* ═══════ Part 1: About Acharya Ji ═══════ */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-20">
          
          {/* Left: Acharya Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-md mx-auto border-2 border-gray-100 bg-gray-100">
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
            <div className="absolute -bottom-5 left-4 sm:left-8 z-20 bg-white p-3.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold/30 bg-gray-100">
                <img 
                  src="/acharya-new.jpg" 
                  alt="Acharya" 
                  className="w-full h-full object-cover" 
                  onError={(e) => { (e.target as HTMLImageElement).src = '/acharya-new.jpg'; }}
                />
              </div>
              <div className="w-[1px] h-7 bg-gray-200" />
              <div>
                <p className="text-gray-900 font-bold text-xs leading-tight font-cinzel">
                  {lang === 'en' ? 'Revered' : 'प्रतिष्ठित'}
                </p>
                <p className="text-gray-500 font-semibold uppercase tracking-wider text-[9px]">
                  {lang === 'en' ? 'Vedic Sadhak' : 'वैदिक साधक'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: About Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <span className="text-gold text-xs tracking-[0.25em] uppercase font-bold mb-3 block">
              {lang === 'en' ? 'About Acharya Ji' : 'आचार्य जी के बारे में'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-5">
              {title}
            </h2>
            <p className="text-gray-600 text-sm lg:text-base leading-relaxed font-medium mb-6">
              {desc}
            </p>

            {/* Core Values Grid — removed "payment gateway" from Secure Booking */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { title: { en: "Authentic Rituals", hi: "प्रामाणिक अनुष्ठान" }, desc: { en: "100% adherence to pure Vedic scriptures.", hi: "शुद्ध वैदिक शास्त्रों का 100% पालन।" } },
                { title: { en: "Global Reach", hi: "वैश्विक पहुंच" }, desc: { en: "Online sankalp for remote devotees.", hi: "दूरस्थ भक्तों के लिए ऑनलाइन संकल्प।" } },
                { title: { en: "Tantric Mastery", hi: "तांत्रिक महारत" }, desc: { en: "Specialist in resolving court & enemy cases.", hi: "अदालत और शत्रु मामलों को सुलझाने में विशेषज्ञ।" } },
                { title: { en: "Secure Booking", hi: "सुरक्षित बुकिंग" }, desc: { en: "Transparent and trusted process.", hi: "पारदर्शी और विश्वसनीय प्रक्रिया।" } },
              ].map((val, i) => (
                <div key={i} className="flex gap-2.5">
                  <div className="mt-0.5 flex-shrink-0">
                    <FaCheckCircle className="text-gold text-base" />
                  </div>
                  <div>
                    <h4 className="text-gray-900 font-bold text-sm mb-0.5">{val.title[lang]}</h4>
                    <p className="text-gray-500 text-xs font-medium leading-relaxed">{val.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#services" className="inline-block px-6 py-3 bg-gray-900 hover:bg-gold text-white font-bold rounded-full transition-colors duration-300 shadow-lg text-sm">
              {lang === 'en' ? 'Discover Services' : 'सेवाएं खोजें'}
            </a>
          </motion.div>
        </div>

        {/* ═══════ Part 2: About Mata Mandir — Compact Preview ═══════ */}
        <motion.div 
          className="bg-gray-50 rounded-2xl p-5 sm:p-8 border border-gray-100 shadow-sm relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        >
          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Left: Image Thumbnail (Single Large Image) */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white p-2">
              <div className="rounded-2xl overflow-hidden bg-gray-100 relative aspect-[4/3] w-full">
                <Image
                  src="/mata-baglamukhi.jpg"
                  alt="Maa Baglamukhi - Sacred Darshan"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{ objectFit: "cover" }}
                  className="hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            </div>

            {/* Right: Brief Text + CTA */}
            <div className="md:col-span-7 flex flex-col items-start pl-0 md:pl-4">
              <span className="text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20 mb-4">
                {lang === 'en' ? 'Siddh Peeth Nalkheda Dham' : 'सिद्ध पीठ नलखेड़ा धाम'}
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 mb-3">
                {lang === 'en' ? 'Maa Baglamukhi Temple' : 'माँ बगलामुखी मंदिर'}
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium text-sm mb-5 line-clamp-3">
                {lang === 'en'
                  ? 'The magnificent temple of Goddess Maa Baglamukhi is located in Nalkheda, approximately 100 km from Ujjain. Situated on the banks of the Lakhundar River, this temple is highly significant from both religious and tantric perspectives. The idol dates back to the Pandava era.'
                  : 'उज्जैन से लगभग 100 किलोमीटर दूरी पर नलखेड़ा में माँ बगलामुखी का भव्य मंदिर स्थित है। लखुन्दर नदी के तट पर स्थित यह मंदिर धार्मिक एवं तांत्रिक दृष्टि से अत्यंत महत्वपूर्ण है। यहाँ स्थापित मूर्ति पाण्डव कालीन है।'}
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gold text-white font-bold rounded-full transition-colors duration-300 shadow-lg text-sm group"
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
