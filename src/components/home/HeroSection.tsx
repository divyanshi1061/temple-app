"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MANTRAS, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";

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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-white pt-24"
      style={{
        backgroundImage: "url('/hero-spiritual-bg.png')",
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
        <img
          src="/hero-spiritual-bg.png"
          alt="Sacred Spiritual Background"
          className="w-full h-full object-cover object-center"
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
      <motion.div className="relative z-10 container-sacred max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-16 flex-grow flex items-center" style={{ opacity }}>
        {/* Asymmetric 2-Column Split: Image on Left (5 cols), Text/Actions on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* LEFT COLUMN: Premium Sacred Visuals */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              
              {/* Circular Background Decor */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/15 to-orange-100/10 border border-gold/10 scale-[1.08] pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-dashed border-gold/20 scale-100 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-gold/10 scale-95 animate-spin-slow-reverse pointer-events-none" />
              
              {/* Main Photo Cutout Frame */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-white bg-white shadow-2xl scale-95 flex items-center justify-center">
                <img
                  src="/acharya-new.jpg"
                  alt="New acharya portrait"
                  className="w-full h-full object-cover object-center scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/mata-baglamukhi.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>



            </div>
          </div>

          {/* RIGHT COLUMN: Divine Text & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">

            {/* Shloka Banner */}
            <div className="px-3.5 py-1.5 rounded-full border border-gold/25 bg-white/70 backdrop-blur-sm shadow-sm inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse flex-shrink-0" />
              <p className="text-[9px] sm:text-[10px] text-gold-dim tracking-[0.1em] font-bold font-cinzel leading-none">
                {MANTRAS[0]}
              </p>
            </div>

            {/* Main Headline & Subheading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 font-cinzel leading-[1.1] uppercase">
                {lang === 'hi' ? SITE_CONFIG.name.hi : SITE_CONFIG.name.en}
              </h1>
              <h2 className="text-base sm:text-lg md:text-xl text-gold font-bold tracking-wider uppercase font-cinzel">
                {lang === 'hi' ? SITE_CONFIG.tagline.hi : SITE_CONFIG.tagline.en}
              </h2>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-600 max-w-xl leading-relaxed font-semibold">
              {SITE_CONFIG.description[lang]}
            </p>

            {/* Solid Clean Action CTA Button */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => {
                  const target = document.getElementById("services");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                suppressHydrationWarning={true}
                className="btn-sacred text-xs px-10 py-4 rounded-full cursor-pointer font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                {lang === "en" ? "Explore Pujas" : "पूजा अनुष्ठान देखें"}
              </button>
            </div>

          </div>

        </div>
      </motion.div>

    </section>
  );
}
