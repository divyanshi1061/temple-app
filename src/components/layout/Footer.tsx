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
} from "react-icons/fa";
import Logo from "@/components/layout/Logo";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { lang } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-white to-amber-50/20 border-t border-gray-100 overflow-hidden pt-6 pb-3 sacred-pattern">
      {/* Decorative background light gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] h-[180px] bg-gold/3 rounded-full blur-[90px] pointer-events-none" />

      <div className="container-sacred relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 text-left mb-4 md:mb-6">
          
          {/* Column 1: Divine Identity */}
          <motion.div 
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Logo size={40} />
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

            <div className="flex gap-2 mt-2">
              {[
                { icon: FaFacebookF, href: SITE_CONFIG.socials.facebook, name: "Facebook" },
                { icon: FaInstagram, href: SITE_CONFIG.socials.instagram, name: "Instagram" },
                { icon: FaYoutube, href: SITE_CONFIG.socials.youtube, name: "YouTube" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  aria-label={social.name}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gold/5 border border-gold/15 flex items-center justify-center text-gold hover:text-white hover:border-gold hover:bg-gold shadow-sm transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={12} className="md:w-3.5 md:h-3.5" />
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
            <ul className="grid grid-cols-2 gap-y-2 md:gap-y-3 gap-x-4 text-xs font-bold text-gray-600">
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



          {/* Column 4: Mandir Contact & Location */}
          <motion.div 
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xs md:text-sm font-extrabold text-gray-900 uppercase tracking-widest border-l-2 border-gold pl-2.5">
              {lang === 'en' ? 'Contact Mandir' : 'मंदिर संपर्क'}
            </h4>
            <div className="flex flex-col gap-2 md:gap-3.5 text-xs font-bold text-gray-600">
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-3 hover:text-gold transition-colors">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0">
                  <FaPhoneAlt size={12} />
                </div>
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 hover:text-gold transition-colors">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0">
                  <FaEnvelope size={12} />
                </div>
                <span className="break-all">{SITE_CONFIG.email}</span>
              </a>
              <a 
                href={SITE_CONFIG.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-3 hover:text-gold transition-colors"
              >
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 shrink-0 mt-0.5">
                  <FaMapMarkerAlt size={12} />
                </div>
                <span className="leading-relaxed">{SITE_CONFIG.address[lang]}</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Separator line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent my-4" />

        {/* Bottom copyright and slow-moving mantra */}
        <div className="flex flex-col items-center gap-2 text-center">
          
          <p className="text-[8px] md:text-[9px] text-gray-400 font-bold tracking-wider">
            © {currentYear} {SITE_CONFIG.name.en}. {lang === 'en' ? 'All rights reserved.' : 'सर्वाधिकार सुरक्षित।'}
          </p>
        </div>
      </div>

      {/* Spacer to prevent fixed marquee from overlapping the bottom of the footer scroll */}
      <div className="w-full h-5 mt-5" />

      {/* Seamless Moving Marquee Ticker - Sticky at the absolute bottom of the viewport */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] w-full bg-white/80 backdrop-blur-md bg-gradient-to-r from-gold/10 via-gold/15 to-gold/10 border-t border-gold/20 py-1.5 overflow-hidden select-none shadow-md">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-bold text-gray-700 tracking-wider">
          {Array(2).fill(null).map((_, idx) => (
            <span key={idx} className="flex items-center gap-8 pr-8">
              <span>{lang === 'en' ? 'Acharya Pt. Rudraksh Rajpurohit' : 'आचार्य पं. रुद्राक्ष राजपुरोहित'}</span>
              <span className="text-gold/60">ॐ</span>
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-gold transition-colors">{SITE_CONFIG.phone}</a>
              <span className="text-gold/60">ॐ</span>
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-gold transition-colors">{SITE_CONFIG.email}</a>
              <span className="text-gold/60">ॐ</span>
              <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Instagram: @maabaglamukhidarshan</a>
              <span className="text-gold/60">ॐ</span>
              <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Facebook: Maa Baglamukhi Darshan</a>
              <span className="text-gold/60">ॐ</span>
              <a href={SITE_CONFIG.socials.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">YouTube: Maa Baglamukhi Darshan</a>
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
