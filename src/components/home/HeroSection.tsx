"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MANTRAS, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { FaFire } from "react-icons/fa";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { lang } = useLanguage();
  
  const [headerData, setHeaderData] = useState({
    headingEn: SITE_CONFIG.name.en,
    headingHi: SITE_CONFIG.name.hi,
    subheadingEn: SITE_CONFIG.tagline.en,
    subheadingHi: SITE_CONFIG.tagline.hi
  });

  const [particles] = useState(() => Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    width: `${Math.random() * 8 + 4}px`,
    height: `${Math.random() * 8 + 4}px`,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 20}%`,
    duration: `${Math.random() * 8 + 12}s`,
    delay: `${Math.random() * 8}s`,
  })));

  useEffect(() => {
    fetch('/api/admin/header')
      .then(res => res.json())
      .then(data => {
        if (data && data.headingEn) {
          setHeaderData(data);
        }
      })
      .catch(err => console.error("Failed to fetch header data", err));
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-sacred-white pt-28 pb-12">
      
      {/* Soft blurred background orbs */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ y }}>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] opacity-70 mix-blend-multiply" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-100/10 rounded-full blur-[100px] opacity-60 mix-blend-multiply" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-100/10 rounded-full blur-[120px] opacity-50 mix-blend-multiply" />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-gold/15 blur-sm"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              bottom: p.bottom,
              animation: `floatUp ${p.duration} linear infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ═══ Shlok Banner ═══ */}
      <div className="relative z-20 w-full text-center mt-2 mb-6 px-4">
        <div className="max-w-4xl mx-auto px-4 py-2.5 rounded-full border border-gold/25 bg-white/70 backdrop-blur-md shadow-sm inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
          <p className="text-[10px] sm:text-xs md:text-sm text-gold-dim tracking-[0.15em] sm:tracking-[0.25em] font-bold font-cinzel leading-tight">
            {MANTRAS[0]}
          </p>
        </div>
      </div>

      {/* Main Grid Content (fades on scroll) */}
      <motion.div className="relative z-10 container-sacred max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center" style={{ opacity }}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subheading, Search, Stats */}
          <div className="lg:col-span-7 flex flex-col text-left items-start z-10">
            {/* Om Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 mb-6">
              <span className="font-cinzel text-xs font-bold text-gold">ॐ</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">
                {lang === "en" ? "Vedic Puja & Tantra Anusthan" : "वैदिक पूजा एवं तंत्र अनुष्ठान"}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 font-cinzel leading-[1.15] mb-5">
              {lang === 'hi' ? headerData.headingHi : headerData.headingEn}
            </h1>

            {/* Sub-headline */}
            <h2 className="text-base sm:text-lg md:text-xl text-gold font-bold tracking-wider uppercase font-cinzel mb-5">
              {lang === 'hi' ? headerData.subheadingHi : headerData.subheadingEn}
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 max-w-xl mb-8 leading-relaxed font-semibold">
              {SITE_CONFIG.description[lang]}
            </p>

            {/* CTA Button */}
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={() => {
                  const target = document.getElementById("services");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-sacred text-xs px-8 py-3.5 rounded-full cursor-pointer font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                {lang === "en" ? "Explore Pujas" : "पूजा अनुष्ठान देखें"}
              </button>
            </div>
          </div>

          {/* Right Column: Overlapping Circle Cutout & Floating Glass Cards (First Image Style) */}
          <div className="lg:col-span-5 relative flex justify-center items-center py-6">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              
              {/* Circular Background Decor */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/15 to-orange-100/10 border border-gold/10 scale-[1.08] pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-dashed border-gold/20 scale-100 animate-spin-slow pointer-events-none" />
              
              {/* Main Photo Cutout Frame (Overlap circular design) */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-8 border-white bg-white shadow-2xl scale-95 flex items-center justify-center">
                <img
                  src="/acharya-new.jpg"
                  alt="Acharya Pt. Rudraksh Rajpurohit"
                  className="w-full h-full object-cover object-top scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/mata-baglamukhi.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating Glass Card 2: Trishakti Forms & Small Avatars (Floating bottom right) */}
              <motion.div 
                initial={{ opacity: 0, x: 30, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="absolute bottom-6 -right-8 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-gold/30 flex flex-col gap-2 min-w-[155px]"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                    <FaFire className="text-sm" />
                  </div>
                  <span className="text-[10px] text-gray-900 font-extrabold uppercase tracking-wider">
                    {lang === "en" ? "Sacred Havan" : "सिद्ध अनुष्ठान"}
                  </span>
                </div>
                
                {/* Overlapping small avatar indicators */}
                <div className="flex items-center justify-between mt-1">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    {[
                      { src: "/real-havan-kund.jpg", alt: "1" },
                      { src: "/mata-baglamukhi.jpg", alt: "2" },
                      { src: "/acharya-new.jpg", alt: "3" }
                    ].map((avatar, idx) => (
                      <div key={idx} className="inline-block h-6 w-6 rounded-full ring-2 ring-white overflow-hidden bg-gray-150 relative">
                        <img src={avatar.src} alt={avatar.alt} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[9px] text-gray-500 font-extrabold uppercase tracking-wider pl-2">
                    {lang === "en" ? "+10k Blessed" : "अनेक कल्याण"}
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sacred-white to-transparent pointer-events-none" />

    </section>
  );
}
