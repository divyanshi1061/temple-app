"use client";

import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
  FaOm,
} from "react-icons/fa";
import Logo from "@/components/layout/Logo";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-white to-amber-50/30 border-t border-gray-150 overflow-hidden pt-12 pb-6 sacred-pattern">
      {/* Decorative background light gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gold/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="container-sacred relative z-10 max-w-7xl mx-auto px-6">
        
        {/* ─── Top Section: E-E-A-T Plaque & Map Embed ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 border-b border-gray-200/60 pb-10">
          
          {/* E-E-A-T Pandit Authority (7 Cols) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center bg-gradient-to-br from-gold/5 via-amber-50/10 to-transparent border border-gold/15 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-3">
              <FaOm className="text-gold text-lg" />
              <h4 className="text-xs sm:text-sm font-extrabold text-amber-900 uppercase tracking-widest font-cinzel">
                {lang === 'en' ? 'Authorized Pujari & Vedic Scholars' : 'अधिकृत पुरोहित एवं वैदिक विद्वान'}
              </h4>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold font-cinzel text-gray-900 mb-4">
              {lang === 'en' 
                ? 'Siddh Peeth Maa Baglamukhi Mandir Nalkheda Dham' 
                : 'सिद्ध पीठ माँ बगलामुखी मंदिर नलखेड़ा धाम'}
            </h3>

            <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed mb-4">
              {lang === 'en' ? (
                <>
                  Siddh Peeth Maa Baglamukhi Mandir in Nalkheda is served by generations of dedicated Vedic priests and Baglamukhi Sadhaks. Among them, <strong className="text-amber-900 font-bold">Acharya Pt. Rudraksh Rajpurohit</strong> (author and primary guide of this site) is widely trusted for authentic, results-oriented Hawan, Anusthan, and online Sankalp rituals. The holy dham is also home to other respected local scholars (such as Pandit Naval Sharma, Pandit Arun Sharma, and Pandit Bajrang Sharma). If you are seeking pure Vedic rituals, consult Acharya Ji to find the most auspicious muhurta for your puja.
                </>
              ) : (
                <>
                  सिद्ध पीठ माँ बगलामुखी मंदिर नलखेड़ा धाम में पीढ़ियों से समर्पित वैदिक पुरोहितों और बगलामुखी साधकों द्वारा अनुष्ठान संपन्न किए जाते हैं। इनमें से, <strong className="text-amber-900 font-bold">आचार्य पं. रुद्राक्ष राजपुरोहित</strong> (इस वेबसाइट के मुख्य मार्गदर्शक) प्रामाणिक और शास्त्रोक्त विधि से हवन, सवा लाख मंत्र जाप एवं ऑनलाइन संकल्प पूजा के लिए देश-विदेश में श्रद्धालुओं द्वारा अत्यधिक पूजनीय हैं। नलखेड़ा धाम क्षेत्र के अन्य आदरणीय पंडितों (जैसे पंडित नवल शर्मा, पंडित अरुण शर्मा, और पंडित बजरंग शर्मा जी) की तरह ही, आचार्य पं. रुद्राक्ष राजपुरोहित जी भी माँ बगलामुखी की कृपा से आपकी सभी मनोकामनाओं की पूर्ति के लिए शुद्ध तांत्रिक और वैदिक अनुष्ठान करते हैं।
                </>
              )}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-gold px-3 py-1 bg-gold/10 rounded-full border border-gold/15">
                {lang === 'en' ? '100% Authentic' : '१००% प्रामाणिक'}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-gold px-3 py-1 bg-gold/10 rounded-full border border-gold/15">
                {lang === 'en' ? 'Pure Vedic Vidhi' : 'शुद्ध वैदिक विधि'}
              </span>
            </div>
          </motion.div>

          {/* Map Embed (5 Cols) */}
          <motion.div 
            className="lg:col-span-5 w-full h-64 lg:h-auto min-h-[250px] relative rounded-3xl overflow-hidden border border-gold/20 shadow-md group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <iframe
              src="https://maps.google.com/maps?q=Siddh+Peeth+Maa+Baglamukhi+Mandir+Nalkheda&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover rounded-3xl filter saturate-[0.85] contrast-[1.05]"
              title="Siddh Peeth Maa Baglamukhi Mandir Nalkheda Map"
            />
            {/* Map border overlay glow */}
            <div className="absolute inset-0 border border-gold/20 rounded-3xl pointer-events-none group-hover:border-gold/45 transition-colors duration-300" />
          </motion.div>

        </div>

        {/* ─── Middle Section: Information Columns ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left mb-10">
          
          {/* Column 1: Divine Identity */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Logo size={42} />
              <div>
                <h3 className="text-base font-extrabold text-gray-900 tracking-tight font-cinzel leading-tight">
                  {SITE_CONFIG.name[lang]}
                </h3>
                <span className="text-[9px] tracking-[0.2em] text-gold font-bold uppercase block mt-1">
                  {SITE_CONFIG.tagline[lang]}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-xs font-semibold leading-relaxed">
              {lang === 'en'
                ? 'Dedicated to providing authentic Vedic rituals, Maa Baglamukhi Havans, and holy guidance at the sacred Siddh Peeth Nalkheda Dham.'
                : 'पवित्र सिद्ध पीठ नलखेड़ा धाम में प्रामाणिक वैदिक अनुष्ठान, माँ बगलामुखी हवन और श्रद्धापूर्ण मार्गदर्शन के लिए समर्पित।'}
            </p>

            <div className="flex gap-2.5 mt-1">
              {[
                { icon: FaFacebookF, href: SITE_CONFIG.socials.facebook, name: "Facebook" },
                { icon: FaInstagram, href: SITE_CONFIG.socials.instagram, name: "Instagram" },
                { icon: FaYoutube, href: SITE_CONFIG.socials.youtube, name: "YouTube" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold hover:text-white hover:border-gold hover:bg-gold shadow-sm transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={13} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Navigation Links */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs md:text-sm font-extrabold text-gray-900 uppercase tracking-widest border-l-2 border-gold pl-2.5">
              {lang === 'en' ? 'Quick Navigation' : 'त्वरित नेविगेशन'}
            </h4>
            <ul className="flex flex-col gap-y-2 md:gap-y-3 text-xs font-bold text-gray-600">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/") ? (
                    <Link href={link.href} className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                      <FaChevronRight size={8} className="text-gold/50 group-hover:text-gold transition-colors" />
                      {link.label[lang]}
                    </Link>
                  ) : (
                    <a href={link.href} className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                      <FaChevronRight size={8} className="text-gold/50 group-hover:text-gold transition-colors" />
                      {link.label[lang]}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Popular Services */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs md:text-sm font-extrabold text-gray-900 uppercase tracking-widest border-l-2 border-gold pl-2.5">
              {lang === 'en' ? 'Popular Services' : 'लोकप्रिय सेवाएं'}
            </h4>
            <ul className="flex flex-col gap-y-2 md:gap-y-3 text-xs font-bold text-gray-600">
              {[
                { id: "baglamukhi-36-sawa-lakh", title: { en: "Sawa Lakh Jaap", hi: "सवा लाख जाप" } },
                { id: "baglamukhi-vishesh-havan", title: { en: "Vishesh Havan", hi: "विशेष हवन" } },
                { id: "lal-mirchi-havan", title: { en: "Lal Mirchi Havan", hi: "लाल मिर्ची हवन" } },
                { id: "nyayalay-vijay", title: { en: "Court Case Victory", hi: "न्यायालय विजय पूजा" } },
                { id: "shatru-stambhan", title: { en: "Shatru Stambhan", hi: "शत्रु स्तंभन" } },
                { id: "maha-mrityunjay", title: { en: "Mrityunjay Anusthan", hi: "मृत्युंजय अनुष्ठान" } },
              ].map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.id}`} className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                    <FaChevronRight size={8} className="text-gold/50 group-hover:text-gold transition-colors" />
                    {service.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Vedic Knowledge Guides */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs md:text-sm font-extrabold text-gray-900 uppercase tracking-widest border-l-2 border-gold pl-2.5">
              {lang === 'en' ? 'Spiritual Guides' : 'आध्यात्मिक लेख'}
            </h4>
            <ul className="flex flex-col gap-y-2 md:gap-y-3 text-xs font-bold text-gray-600">
              {[
                { id: "baglamukhi-temple-history", title: { en: "Temple History", hi: "मंदिर का इतिहास" } },
                { id: "benefits-of-baglamukhi-puja", title: { en: "Puja Benefits", hi: "पूजा के लाभ" } },
                { id: "baglamukhi-mantra-meaning", title: { en: "Mantra Meaning", hi: "मंत्र का अर्थ" } },
                { id: "authentic-hawan-process", title: { en: "Hawan Process", hi: "हवन प्रक्रिया" } },
                { id: "nalkheda-temple-travel-guide", title: { en: "Travel Guide", hi: "यात्रा मार्गदर्शिका" } },
              ].map((article) => (
                <li key={article.id}>
                  <Link href={`/articles/${article.id}`} className="hover:text-gold transition-colors flex items-center gap-1.5 group">
                    <FaChevronRight size={8} className="text-gold/50 group-hover:text-gold transition-colors" />
                    {article.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* ─── Contact Information & Address Plaque ─── */}
        <div className="bg-amber-50/15 border border-gold/10 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-bold text-gray-600 mb-8">
          <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 hover:text-gold transition-colors justify-start md:justify-center">
            <div className="w-8 h-8 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0">
              <FaPhoneAlt size={12} />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-extrabold tracking-wider">{lang === 'en' ? 'Call Acharya Ji' : 'आचार्य जी को कॉल करें'}</span>
              <span>{SITE_CONFIG.phone}</span>
            </div>
          </a>
          <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 hover:text-gold transition-colors justify-start md:justify-center">
            <div className="w-8 h-8 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0">
              <FaEnvelope size={12} />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-extrabold tracking-wider">{lang === 'en' ? 'Email Support' : 'ईमेल करें'}</span>
              <span className="break-all">{SITE_CONFIG.email}</span>
            </div>
          </a>
          <a 
            href={SITE_CONFIG.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer nofollow" 
            className="flex items-center gap-3 hover:text-gold transition-colors justify-start md:justify-center"
          >
            <div className="w-8 h-8 rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0">
              <FaMapMarkerAlt size={12} />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-extrabold tracking-wider">{lang === 'en' ? 'Mandir Location' : 'मंदिर स्थान'}</span>
              <span className="leading-relaxed">{SITE_CONFIG.address[lang]}</span>
            </div>
          </a>
        </div>

        {/* ─── SEO Tag Cloud Section ─── */}
        <div className="border-t border-b border-gray-150 py-5 my-6 text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-gold-dim block mb-3">
              {lang === 'en' ? 'Local SEO & Spiritual Search Terms' : 'स्थानीय खोज एवं आध्यात्मिक शब्दावली'}
            </span>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 text-[9px] sm:text-[10px] font-bold text-gray-400">
              {lang === 'en' ? (
                <>
                  <span>#MaaBaglamukhiPanditNalkheda</span>
                  <span>•</span>
                  <span>#BestPanditForBaglamukhiHavan</span>
                  <span>•</span>
                  <span>#PanditNavalSharmaNalkheda</span>
                  <span>•</span>
                  <span>#PanditArunSharmaNalkheda</span>
                  <span>•</span>
                  <span>#PanditBajrangSharmaNalkheda</span>
                  <span>•</span>
                  <span>#OnlineBaglamukhiPujaBooking</span>
                  <span>•</span>
                  <span>#ShatruStambhanPujaNalkheda</span>
                  <span>•</span>
                  <span>#LalMirchiHavanSpecialist</span>
                  <span>•</span>
                  <span>#CourtCaseVictoryPuja</span>
                </>
              ) : (
                <>
                  <span>#माँबगलामुखीपंडितनलखेड़ा</span>
                  <span>•</span>
                  <span>#बगलामुखीहवनकेपंडित</span>
                  <span>•</span>
                  <span>#पंडितनवलशर्मानलखेड़ा</span>
                  <span>•</span>
                  <span>#पंडितअरुणशर्मानलखेड़ा</span>
                  <span>•</span>
                  <span>#पंडितबजरंगशर्माजी</span>
                  <span>•</span>
                  <span>#ऑनलाइनबगलामुखीपूजाबुकिंग</span>
                  <span>•</span>
                  <span>#शत्रुस्तंभनपूजा</span>
                  <span>•</span>
                  <span>#लालमिर्चीहवनविशेषज्ञ</span>
                  <span>•</span>
                  <span>#न्यायालयविजयपूजा</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright & policy links */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-[10px] md:text-xs font-bold text-gray-500">
            <Link href="/privacy" className="hover:text-gold transition-colors">
              {lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/terms" className="hover:text-gold transition-colors">
              {lang === 'en' ? 'Terms & Conditions' : 'नियम और शर्तें'}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/refund-policy" className="hover:text-gold transition-colors">
              {lang === 'en' ? 'Cancellation & Refund' : 'रद्दीकरण और रिफंड'}
            </Link>
          </div>
          <p className="text-[9px] text-gray-400 font-bold tracking-wider mt-1">
            © {currentYear} {SITE_CONFIG.name.en}. {lang === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
          </p>
        </div>
      </div>

      {/* Spacer to prevent fixed marquee from overlapping the bottom of the footer scroll */}
      <div className="w-full h-6 mt-6" />

      {/* Seamless Moving Marquee Ticker - Sticky at the absolute bottom of the viewport */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] w-full bg-white/90 backdrop-blur-md bg-gradient-to-r from-gold/10 via-gold/15 to-gold/10 border-t border-gold/20 py-1.5 overflow-hidden select-none shadow-md">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-bold text-gray-700 tracking-wider">
          {Array(2).fill(null).map((_, idx) => (
            <span key={idx} className="flex items-center gap-8 pr-8">
              <span>{lang === 'en' ? 'Acharya Pt. Rudraksh Rajpurohit' : 'आचार्य पं. रुद्राक्ष राजपुरोहित'}</span>
              <span className="text-gold/60">ॐ</span>
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-gold transition-colors">{SITE_CONFIG.phone}</a>
              <span className="text-gold/60">ॐ</span>
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold transition-colors">{SITE_CONFIG.email}</a>
              <span className="text-gold/60">ॐ</span>
              <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gold transition-colors">Instagram: @maabaglamukhidarshan</a>
              <span className="text-gold/60">ॐ</span>
              <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gold transition-colors">Facebook: Maa Baglamukhi Darshan</a>
              <span className="text-gold/60">ॐ</span>
              <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gold transition-colors">YouTube: Maa Baglamukhi Darshan</a>
              <span className="text-gold/60">ॐ</span>
              <span className="text-gold font-extrabold uppercase">
                {lang === 'en' 
                  ? '✦ Contact us for authentic Vedic Pujas, Maa Baglamukhi Havans, and Kundali analysis at Siddh Peeth Nalkheda Dham ✦' 
                  : '✦ सिद्ध पीठ नलखेड़ा धाम में प्रामाणिक वैदिक पूजा, माँ बगलामुखी हवन और कुंडली विश्लेषण के लिए आज ही संपर्क करें! ✦'}
              </span>
              <span className="text-gold/60">ॐ</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
