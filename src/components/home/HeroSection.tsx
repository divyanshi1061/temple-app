"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MANTRAS, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { lang } = useLanguage();
  
  const [particles, setParticles] = useState<Array<{
    id: number;
    width: string;
    height: string;
    left: string;
    bottom: string;
    duration: string;
    delay: string;
  }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        width: `${Math.random() * 8 + 4}px`,
        height: `${Math.random() * 8 + 4}px`,
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 20}%`,
        duration: `${Math.random() * 8 + 12}s`,
        delay: `${Math.random() * 8}s`,
      }))
    );
  }, []);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-screen flex flex-col justify-between overflow-hidden bg-white pt-24 sm:pt-28 pb-12 lg:py-0"
      style={{
        backgroundImage: "url('/hero-spiritual-bg.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'white',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 30s linear infinite;
        }
      `}} />

      {/* Spiritual Background Image Watermark */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12]" style={{ y }}>
        <Image
          src="/hero-spiritual-bg.webp"
          alt="Sacred Spiritual Background"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

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

      {/* Main Grid Content (Split 50/50) */}
      <motion.div className="relative z-10 container-sacred max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex-grow flex items-center" style={{ opacity }}>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full text-center lg:text-left">
          
          {/* LEFT COLUMN: Divine Text & Actions */}
          <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6">
 
            {/* Shloka Banner */}
            <div className="inline-flex px-3.5 py-1.5 rounded-full border border-gold/20 bg-white/70 backdrop-blur-sm shadow-sm items-center gap-1.5 max-w-[90vw] sm:max-w-none">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <p className="text-[11px] sm:text-xs text-gold-dim tracking-[0.02em] sm:tracking-[0.05em] font-semibold leading-relaxed sm:leading-none text-center sm:text-left sm:whitespace-nowrap">
                {MANTRAS[0]}
              </p>
            </div>
 
            {/* Main Headline & Subheading */}
            <div className="space-y-2 lg:space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-gray-900 font-cinzel leading-[1.2] lg:leading-[1.1] uppercase">
                {lang === 'hi' 
                  ? "माँ बगलामुखी हवन एवं वैदिक पूजा"
                  : "Maa Baglamukhi Havan & Vedic Pujas"
                }
              </h1>
              <h2 className="text-xs sm:text-sm lg:text-base text-gold font-semibold tracking-wider uppercase font-cinzel">
                {lang === 'hi' 
                  ? "आचार्य पं. रुद्राक्ष राजपुरोहित • सिद्ध पीठ नलखेड़ा धाम" 
                  : "by Acharya Pt. Rudraksh Rajpurohit • Siddh Peeth Nalkheda Dham"
                }
              </h2>
            </div>
 
            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-md lg:max-w-lg leading-relaxed font-medium px-2 lg:px-0 text-center lg:text-left">
              {SITE_CONFIG.description[lang]}
            </p>
 
            {/* Solid Clean Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 pt-1">
              <Link 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById("services");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                suppressHydrationWarning={true}
                className="btn-sacred text-xs sm:text-sm px-8 lg:px-10 py-3.5 lg:py-4 rounded-full cursor-pointer font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center"
              >
                {lang === "en" ? "Explore Pujas" : "पूजा अनुष्ठान देखें"}
              </Link>
 
              {/* Review Us Button */}
              <button
                onClick={() => window.dispatchEvent(new Event('open-review-modal'))}
                suppressHydrationWarning={true}
                className="text-xs sm:text-sm px-8 lg:px-10 py-3.5 lg:py-4 rounded-full font-bold text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-gold hover:text-gold transition-all uppercase tracking-wider shadow-sm"
              >
                {lang === 'en' ? 'Review Us' : 'समीक्षा करें'}
              </button>
            </div>
 
            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2 lg:pt-3">
              <span className="text-xs lg:text-sm font-bold text-gray-500 lg:text-gray-600 uppercase tracking-widest">
                {lang === 'en' ? 'Follow Us:' : 'हमें फॉलो करें:'}
              </span>
              <div className="flex items-center gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-[#1877F2] transition-colors p-2 rounded-full hover:bg-gray-100 shadow-sm border border-gray-200 lg:border-transparent lg:hover:border-gray-200 bg-white lg:bg-white/50 backdrop-blur-sm">
                  <FaFacebook className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
                <a href="https://youtube.com/@maabaglamukhidarshan-d2e" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-[#FF0000] transition-colors p-2 rounded-full hover:bg-gray-100 shadow-sm border border-gray-200 lg:border-transparent lg:hover:border-gray-200 bg-white lg:bg-white/50 backdrop-blur-sm">
                  <FaYoutube className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer nofollow" className="text-gray-400 hover:text-[#E4405F] transition-colors p-2 rounded-full hover:bg-gray-100 shadow-sm border border-gray-200 lg:border-transparent lg:hover:border-gray-200 bg-white lg:bg-white/50 backdrop-blur-sm">
                  <FaInstagram className="w-4 h-4 lg:w-5 lg:h-5" />
                </a>
              </div>
            </div>
 
          </div>
 
          {/* RIGHT COLUMN: Premium Sacred Visuals (Image) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative py-2 lg:py-6">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] xl:w-[28rem] xl:h-[28rem]">
              
              {/* Circular Background Decor */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/15 to-orange-100/10 border border-gold/10 scale-[1.08] pointer-events-none" />
              <div className="absolute inset-2 lg:inset-4 rounded-full border border-dashed border-gold/20 scale-100 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-4 lg:inset-8 rounded-full border border-gold/10 scale-95 animate-spin-slow-reverse pointer-events-none" />
              
              {/* Main Photo Cutout Frame */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-6 lg:border-8 border-white bg-white shadow-xl lg:shadow-2xl scale-95 flex items-center justify-center">
                <Image
                  src="/acharya-new.webp"
                  alt="Acharya Pt. Rudraksh Rajpurohit portrait"
                  fill
                  priority
                  sizes="(max-width: 640px) 208px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 450px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
 
            </div>
          </div>

        </div>

      </motion.div>
    </section>
  );
}
