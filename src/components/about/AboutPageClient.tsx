"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaQuoteLeft, FaTree, FaSun, FaHistory, FaBookOpen, FaPray, FaInfoCircle, FaStar, FaAward } from "react-icons/fa";
import { GiFlame, GiShield } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import ParticleField from "@/components/effects/ParticleField";
import ImageReel from "@/components/effects/ImageReel";
import FAQSection from "@/components/home/FAQSection";

export default function AboutPageClient() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"legend" | "darshan">("legend");

  // Title and description constants
  const panditTitle = lang === "en" 
    ? "Acharya Pt. Rudraksh Rajpurohit" 
    : "आचार्य पं. रुद्राक्ष राजपुरोहित";

  const panditDesc = lang === "en"
    ? "I welcome you to the sacred space of Maa Baglamukhi. As a lifelong Vedic priest and Baglamukhi Sadhak serving at the Siddh Peeth Nalkheda Dham, I have dedicated my life to preserving the absolute purity of ancient Vedic rituals and helping devotees experience the protective shield of our divine Mother. Born into a lineage of devoted spiritual practitioners, my path was guided early on to study and master the intricate Sanskrit scriptures, Vedic Yajna (fire rituals), and protective Tantric sadhana prescribed for removing life's most challenging obstacles."
    : "मैं माँ बगलामुखी के इस पावन द्वार पर आपका हार्दिक अभिनंदन करता हूँ। नलखेड़ा धाम सिद्ध पीठ में सेवा करने वाले एक समर्पित वैदिक पुजारी और बगलामुखी साधक के रूप में, मैंने अपना संपूर्ण जीवन प्राचीन वैदिक अनुष्ठानों की शुद्धता को अक्षुण्ण रखने और माँ की सुरक्षात्मक शक्ति से दुनिया भर के भक्तों के संकटों का निवारण करने के लिए समर्पित किया है। आध्यात्मिक साधकों और पुरोहितों के एक पावन वंश में जन्म लेने के कारण, मुझे बचपन से ही संस्कृत शास्त्रों, वैदिक यज्ञों (अग्नि अनुष्ठान) और तांत्रिक रक्षा प्रणालियों के गहन रहस्यों को सीखने का सुअवसर प्राप्त हुआ।";

  const mataHistory = lang === "en"
    ? "What is the historical and scriptural significance of the Maa Baglamukhi Temple at Nalkheda Dham? The ancient temple of Goddess Maa Baglamukhi is situated on the sacred banks of the Lakhundar River (historically known as the Lakshmana River) in Nalkheda, Agar Malwa district, Madhya Pradesh. This Siddh Peeth is highly revered worldwide for both religious worship and intense Tantric sadhanas. According to the sacred texts of the Kalika Purana, the divine yellow-robed idol of Maa Baglamukhi installed here dates back to the Pandava era of the Dwapara Yuga. When the Pandavas were in exile, Lord Krishna personally advised Yudhisthira to perform Maa Baglamukhi sadhana at this very site to ensure their victory in the Kurukshetra war. The temple houses the unique 'Tri-Shakti'—the main deity Maa Baglamukhi sits in the center, flanked by Maa Lakshmi on the right and Maa Saraswati on the left in the form of sacred 'Pindis'. This historic shrine is over 500 years old. A rare botanical miracle stands in the courtyard: sacred trees of Bel, Champa, White Aak, Amla, Neem, and Peepal all grow conjoined from a single root. The surrounding cremation grounds (Muktidham) in all four directions further establish Nalkheda Dham as a highly potent center for Tantric protection and spiritual sadhana."
    : "नलखेड़ा धाम माँ बगलामुखी मंदिर का ऐतिहासिक और शास्त्रीय महत्व क्या है? माँ बगलामुखी देवी का यह प्राचीन मंदिर मध्य प्रदेश के आगर मालवा जिले में नलखेड़ा में पवित्र लखुंदर नदी (जिसका प्राचीन नाम लक्ष्मणा है) के पावन तट पर स्थित है। धार्मिक आराधना और तांत्रिक साधना, दोनों ही दृष्टियों से यह सिद्ध पीठ संपूर्ण विश्व में विशेष महत्व रखता है। कालिका पुराण के प्रमाणों के अनुसार, यहाँ स्थापित माँ बगलामुखी की दिव्य पीताम्बरा मूर्ति पांडव कालीन है। द्वापर युग में जब पांडव अज्ञातवास में थे, तब स्वयं भगवान श्रीकृष्ण ने उन्हें महाभारत युद्ध में विजय सुनिश्चित करने के लिए इस स्थान पर माँ बगलामुखी की साधना करने का निर्देश दिया था। मंदिर में अनूठी 'त्रि-शक्ति' विराजमान हैं—मध्य में अष्टम महाविद्या माँ बगलामुखी, दाईं ओर माँ लक्ष्मी और बाईं ओर माँ सरस्वती पिंडी रूप में स्थित हैं। यह पावन सिद्ध पीठ 500 वर्षों से भी अधिक पुराना इतिहास समेटे हुए है। मंदिर प्रांगण में एक अद्भुत प्राकृतिक चमत्कार दर्शनीय है, जहाँ बेलपत्र, चंपा, सफेद आक, आंवला, नीम और पीपल के पवित्र वृक्ष एक ही मूल (जड़) से जुड़े हुए फल-फूल रहे हैं। मंदिर के चारों ओर मुक्तिधाम (श्मशान) की उपस्थिति इसे शास्त्रों के अनुसार अत्यंत तीव्र तांत्रिक रक्षा और साधना का सिद्ध पीठ प्रमाणित करती है।";

  const mataVision = lang === "en"
    ? "Why do devotees travel to the Siddh Peeth Nalkheda Dham? Over the centuries, our temple has served as a sanctuary for those facing severe life crises, legal battles, and enemy obstacles. The sacred Baglamukhi Havan (fire ritual) performed on the riverbanks of Lakhundar is globally recognized for its immediate spiritual efficacy. Devotees from all corners of India and abroad visit our temple to participate in these holy rituals and receive the protective blessings of Maa Baglamukhi, turning their struggles into triumphs."
    : "भक्त सिद्ध पीठ नलखेड़ा धाम की यात्रा क्यों करते हैं? सदियों से हमारा यह मंदिर उन भक्तों के लिए एक पावन शरणस्थली रहा है जो अपने जीवन में गंभीर संकटों, अदालती विवादों और शत्रु बाधा से घिरे रहे हैं। लखुंदर नदी के तट पर हमारे द्वारा वैदिक एवं तांत्रिक रीति से किए जाने वाले बगलामुखी हवन पूरी दुनिया में अपनी त्वरित आध्यात्मिक प्रभावकारिता के लिए प्रसिद्ध हैं। भारत और विदेशों से आने वाले श्रद्धालु इन पावन अनुष्ठानों में सम्मिलित होते हैं और माँ बगलामुखी की कृपा से अपने संकटों पर विजय प्राप्त करते हैं।";

  return (
    <main className="min-h-screen bg-sacred-white pb-20 overflow-hidden font-outfit">
      
      {/* ─── A. Cinematic Light Hero Banner ─── */}
      <section
        className="relative text-gray-900 pt-36 pb-24 md:py-40 overflow-hidden sacred-pattern border-b border-gray-100"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fdfbf7',
        }}
      >
        {/* Floating gold particles */}
        <ParticleField count={25} />
        
        {/* Soft background highlights */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-1/2 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[130px]" />
        </div>

        <div className="container-sacred max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          {/* Saffron Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 mb-8"
          >
            <span className="text-gold text-xs font-bold font-cinzel">ॐ</span>
            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-[0.2em] text-amber-800">
              {lang === "en" ? "Siddh Peeth Nalkheda Dham" : "सिद्ध पीठ नलखेड़ा धाम"}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-7xl font-black font-cinzel tracking-tight bg-gradient-to-r from-amber-600 via-gold to-yellow-600 bg-clip-text text-transparent mb-6 uppercase max-w-4xl leading-tight"
          >
            {lang === "en" ? "About Maa Baglamukhi Dham" : "माँ बगलामुखी धाम - परिचय"}
          </motion.h1>

          {/* Sanskrit Sloke banner */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl border-t border-b border-gold/25 py-6 mt-4 w-full"
          >
            <p className="text-sm sm:text-base md:text-lg text-gold-dim font-bold font-cinzel tracking-[0.2em] leading-relaxed">
              ॐ ह्लीं बगलामुखी देव्यै नमः
            </p>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-2 uppercase tracking-widest font-bold">
              {lang === "en" ? "Salutations to the Divine Goddess Maa Baglamukhi" : "शक्ति स्वरूपा माँ बगलामुखी को कोटि-कोटि प्रणाम"}
            </p>
          </motion.div>
          
          {/* Jump Links Navigation */}
          <div className="flex gap-4 sm:gap-8 mt-12 text-xs font-bold uppercase tracking-widest text-gray-600">
            <button 
              onClick={() => document.getElementById("shrine")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              {lang === "en" ? "01. The Shrine" : "01. दिव्य मंदिर"}
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => document.getElementById("acharya")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              {lang === "en" ? "02. Acharya Ji" : "02. आचार्य जी"}
            </button>
            <span className="text-gray-300">/</span>
            <button 
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="hover:text-gold transition-colors cursor-pointer"
            >
              {lang === "en" ? "03. Features" : "03. मुख्य विशेषताएं"}
            </button>
          </div>
        </div>
      </section>

      {/* ─── Seamless Infinite Image Reel ─── */}
      <div className="bg-[#fdfbf7] border-b border-gray-100 pb-4">
        <ImageReel />
      </div>

      {/* ─── B. Maa Baglamukhi Shrine Section ("Mata Section") ─── */}
      <section id="shrine" className="py-24 md:py-32 bg-white relative">
        <div className="container-sacred max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Beautiful Arched Frame with gold lighting border */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[360px] aspect-[3/4] rounded-t-[10rem] rounded-b-3xl overflow-hidden border-[6px] border-white shadow-2xl bg-white animate-pulse-glow"
                style={{
                  boxShadow: "0 0 40px rgba(249, 115, 22, 0.18)"
                }}
              >
                {/* Gold Outer-Glow Overlay */}
                <div className="absolute inset-0 border border-gold/40 rounded-t-[10rem] rounded-b-3xl z-10 pointer-events-none" />
                <Image
                  src="/mata-baglamukhi.webp"
                  alt="Maa Baglamukhi Divine Idol"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="filter brightness-[1.02] contrast-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
              </motion.div>

              {/* Sanskrit Mantra Overlay */}
              <div className="mt-8 text-center px-4 max-w-[400px]">
                <p className="text-xs sm:text-sm font-bold text-gold font-cinzel leading-relaxed bg-gold/5 border border-gold/15 py-2.5 px-4 sm:py-3 sm:px-5 rounded-2xl">
                  ॐ ह्लीं बगलामुखी सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशाय ह्लीं ॐ स्वाहा।
                </p>
                <p className="text-[10px] text-gray-500 uppercase font-extrabold tracking-wider mt-2.5">
                  {lang === "en" ? "Maa Baglamukhi Maha Mantra" : "माँ बगलामुखी महामंत्र"}
                </p>
              </div>
            </div>

            {/* Right: Tabbed Interactive Narrative */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4">
                {lang === "en" ? "The Sacred Presence" : "दिव्य महात्म्य"}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-cinzel tracking-tight leading-tight mb-8">
                {lang === "en" ? "Maa Baglamukhi Devi." : "माँ बगलामुखी देवी।"}
              </h2>

              {/* Tabs selector */}
              <div className="flex border-b border-gray-150 gap-6 sm:gap-8 mb-8">
                <button
                  onClick={() => setActiveTab("legend")}
                  className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === "legend" ? "text-gold border-b-2 border-gold" : "text-gray-400 hover:text-gray-800"
                  }`}
                >
                  {lang === "en" ? "The Legend & History" : "पौराणिक इतिहास"}
                </button>
                <button
                  onClick={() => setActiveTab("darshan")}
                  className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === "darshan" ? "text-gold border-b-2 border-gold" : "text-gray-400 hover:text-gray-800"
                  }`}
                >
                  {lang === "en" ? "Divine Darshan & Havan" : "दर्शन एवं हवन महात्म्य"}
                </button>
              </div>

              {/* Tab Narrative */}
              <div className="min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold"
                  >
                    {activeTab === "legend" ? (
                      <div className="flex flex-col gap-5">
                        <p>{mataHistory}</p>
                        <div className="p-4 bg-gray-50 border-l-4 border-gold rounded-r-xl text-xs text-gray-500 font-semibold leading-relaxed">
                          {lang === "en" 
                            ? "Lord Krishna advised the Pandavas to perform Maa Baglamukhi worship before launching the Kurukshetra war to ensure victory over enemies."
                            : "द्वापर युग में अज्ञातवास के समय भगवान श्रीकृष्ण ने पांडवों को विजय सुनिश्चित करने के लिए माँ बगलामुखी की साधना करने की सलाह दी थी।"}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-5">
                        <p>{mataVision}</p>
                        <div className="grid sm:grid-cols-2 gap-4 mt-2">
                          <div className="p-4 rounded-xl border border-gray-150 flex items-start gap-3 bg-sacred-white">
                            <FaPray className="text-gold text-lg shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-gray-900 font-extrabold text-xs uppercase tracking-wide mb-1">
                                {lang === "en" ? "Siddh Darshan" : "सिद्ध दर्शन"}
                              </h4>
                              <p className="text-gray-500 text-[11px] leading-relaxed">
                                {lang === "en" ? "Devotees find immediate relief from legal, personal, and career blockages." : "भक्तों को कोर्ट-कचहरी, शत्रु बाधा और जीवन के संकटों से त्वरित मुक्ति मिलती है।"}
                              </p>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl border border-gray-150 flex items-start gap-3 bg-sacred-white">
                            <GiFlame className="text-gold text-lg shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-gray-900 font-extrabold text-xs uppercase tracking-wide mb-1">
                                {lang === "en" ? "Maha Anusthan" : "महान अनुष्ठान"}
                              </h4>
                              <p className="text-gray-500 text-[11px] leading-relaxed">
                                {lang === "en" ? "Powerful Havans performed strictly according to scriptural dictates." : "शास्त्रों के अनुसार पूर्ण शुद्धता के साथ तांत्रिक हवन और जाप सम्पन्न किए जाते हैं।"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── C. Acharya Ji Editorial Profile Section ─── */}
      <section id="acharya" className="py-24 md:py-32 bg-sacred-white border-t border-b border-gray-150 relative sacred-pattern">
        <div className="container-sacred max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Column: Asymmetrical Editorial Portrait Card */}
            <div className="lg:col-span-5 relative flex justify-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative max-w-md w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white group"
              >
                <img 
                  src="/acharya-new.webp" 
                  alt="Acharya Pt. Rudraksh Rajpurohit" 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/acharya-new.webp';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Plaque tag */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-gold/20 text-center shadow-lg">
                  <h4 className="text-gray-900 font-extrabold text-sm font-cinzel leading-none mb-1">
                    {lang === "en" ? "Acharya Pt. Rudraksh Rajpurohit" : "आचार्य पं. रुद्राक्ष राजपुरोहित"}
                  </h4>
                  <span className="text-[10px] text-gold uppercase font-bold tracking-widest">
                    {lang === "en" ? "Priest & Bagalmukhi Sadhak" : "पुरोहित एवं बगलामुखी साधक"}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Editorial narrative & quote block */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <span className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
                <FaStar className="text-[9px] animate-pulse" />
                {lang === "en" ? "The Spiritual Guide" : "आध्यात्मिक साधक"}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-cinzel tracking-tight leading-none mb-6">
                {lang === "en" ? "Acharya Pt. Rudraksh." : "आचार्य पं. रुद्राक्ष।"}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-semibold mb-8">
                {panditDesc}
              </p>

              {/* Quote Block */}
              <div className="relative pl-10 py-2 border-l-4 border-gold mb-10 bg-gold/5 rounded-r-2xl pr-6">
                <FaQuoteLeft className="text-gold/15 text-5xl absolute top-2 left-3 pointer-events-none" />
                <blockquote className="text-base sm:text-lg font-bold text-gray-900 italic font-cinzel relative z-10">
                  {lang === "en"
                    ? "\u201CWhere there is the sacred fire of Maa Baglamukhi and the strict purity of Vedic chants, fear ceases, adversaries are neutralized, and ultimate justice prevails.\u201D"
                    : "\u201Cजहाँ माँ बगलामुखी की पवित्र अग्नि और वैदिक मन्त्रों की शुद्ध साधना होती है, वहाँ भय का नाश होता है, शत्रुओं का दमन होता है और सत्य की विजय होती है।\u201D"}
                </blockquote>
              </div>

              {/* Action Button */}
              <div>
                <Link href="/book" className="btn-sacred text-xs px-8 py-3.5 rounded-full inline-flex items-center gap-2 cursor-pointer font-bold uppercase tracking-wider">
                  {lang === "en" ? "Schedule a Consultation" : "परामर्श समय बुक करें"}
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── D. High-Contrast Interactive Statistics Counters ─── */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Soft background highlights */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-sacred max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            
            {[
              { num: "Vedic", label: { en: "Rituals & Sadhana", hi: "वैदिक अनुष्ठान और साधना" } },
              { num: "100k+", label: { en: "Blessed Devotees", hi: "कल्याणकारी भक्त" } },
              { num: "8th", label: { en: "Mahavidya Form", hi: "अष्टम महाविद्या" } },
              { num: "500+", label: { en: "Years of Heritage", hi: "वर्षों का इतिहास" } }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white border border-gray-100 p-8 rounded-[2rem] text-center flex flex-col justify-center shadow-md hover:shadow-2xl hover:border-gold/45 transition-all duration-500 relative overflow-hidden group"
              >
                {/* Subtle back decorative glow */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-gold/5 rounded-full blur-xl group-hover:bg-gold/15 transition-all duration-500" />
                
                <span className="block text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-br from-amber-500 via-gold to-yellow-600 bg-clip-text text-transparent font-cinzel leading-none mb-3">
                  {stat.num}
                </span>
                <div className="w-10 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-4 group-hover:w-16 transition-all duration-300" />
                <span className="text-[10px] sm:text-xs text-gray-600 font-extrabold uppercase tracking-widest block leading-relaxed">
                  {stat.label[lang]}
                </span>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ─── E. Sacred Environment & Features Section ─── */}
      <section id="features" className="py-24 md:py-32 bg-sacred-white border-t border-gray-150 relative">
        <div className="container-sacred max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 sm:mb-20">
            <span className="text-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-3 inline-block">
              {lang === "en" ? "Divine Landscape" : "भौगोलिक सिद्धियाँ"}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 font-cinzel tracking-tight leading-none uppercase">
              {lang === "en" ? "Sacred Features." : "प्राकृतिक चमत्कार।"}
            </h2>
            <div className="w-16 h-[2px] bg-gold mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
            
            {/* Feature 1: Trees */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-md hover:shadow-2xl hover:border-gold/40 transition-all duration-500 flex flex-col items-start relative group overflow-hidden"
            >
              {/* Saffron border-glow hint */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-gold to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                <FaTree />
              </div>
              <h3 className="text-lg font-black text-gray-900 font-cinzel uppercase mb-3 tracking-wide group-hover:text-gold transition-colors duration-300">
                {lang === "en" ? "Conjoined Trees" : "एक साथ स्थित वृक्ष"}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                {lang === "en"
                  ? "Bel, Champa, White Aak, Amla, Neem, and Peepal trees grow conjoined in the courtyard, representing a rare botanical phenomenon."
                  : "बेल पत्र, चंपा, सफेद आंकड़े, आंवले, नीम एवं पीपल के पवित्र वृक्ष एक साथ मंदिर प्रांगण में स्थित हैं, जो एक अत्यंत दुर्लभ प्राकृतिक चमत्कार है।"}
              </p>
            </motion.div>

            {/* Feature 2: River */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-md hover:shadow-2xl hover:border-gold/40 transition-all duration-500 flex flex-col items-start relative group overflow-hidden"
            >
              {/* Saffron border-glow hint */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-gold to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                <FaSun />
              </div>
              <h3 className="text-lg font-black text-gray-900 font-cinzel uppercase mb-3 tracking-wide group-hover:text-gold transition-colors duration-300">
                {lang === "en" ? "Lakhunder River" : "लखुन्दर नदी (लक्ष्मणा)"}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                {lang === "en"
                  ? "Flows perennially behind the temple with graves of old saints on the banks, confirming its historic ascetic energy."
                  : "मंदिर के ठीक पीछे लखुन्दर नदी (प्राचीन नाम लक्ष्मणा) वर्ष भर बहती है। इसके पावन तट पर प्राचीन सिद्ध संतों की समाधियां स्थित हैं।"}
              </p>
            </motion.div>

            {/* Feature 3: Muktidham */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-md hover:shadow-2xl hover:border-gold/40 transition-all duration-500 flex flex-col items-start relative group overflow-hidden"
            >
              {/* Saffron border-glow hint */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-300 via-gold to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold text-2xl mb-6 group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                <GiShield />
              </div>
              <h3 className="text-lg font-black text-gray-900 font-cinzel uppercase mb-3 tracking-wide group-hover:text-gold transition-colors duration-300">
                {lang === "en" ? "Four Muktidhams" : "श्मशान (मुक्तिधाम)"}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-semibold leading-relaxed">
                {lang === "en"
                  ? "Encircled by cremation grounds in all four directions, establishing Nalkheda Dham as a powerful Siddh Tantra Peeth."
                  : "मंदिर चारों दिशाओं में श्मशान (मुक्तिधाम) से घिरा हुआ है, जो शास्त्र सम्मत रूप से इसे तीव्र साधना और सुरक्षा अनुष्ठानों का सिद्ध तंत्र पीठ बनाता है।"}
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      <FAQSection />

    </main>
  );
}
