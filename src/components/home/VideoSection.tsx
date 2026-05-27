"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE, getAssetUrl } from "@/lib/adminApi";
import { FaVideo, FaYoutube } from "react-icons/fa";

interface VideoItem {
  _id: string;
  type: "upload" | "embed";
  url: string;
  title: string;
  uploadedAt: string;
}

export default function VideoSection() {
  const { lang } = useLanguage();
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch(`${API_BASE}/videos?t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setVideos(data);
          }
        }
      } catch (err) {
        console.warn("Notice: Dynamic videos not loaded (Backend offline). Using system default videos.");
      }
    }
    fetchVideos();
  }, []);

  // Helper to extract YouTube video ID from embed URL to load HQ default thumbnail
  const getYouTubeId = (url: string): string => {
    if (!url) return "";
    const regExp = /^.*(embed\/|v\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
    // Fallback parsing from regular url
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  // If no videos are configured in DB, render nothing (non-destructive fallback)
  if (videos.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-white border-t border-gray-100 sacred-pattern">
      {/* Soft luxury background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-100/5 rounded-full blur-[100px] opacity-50 pointer-events-none z-0" />

      <div className="container-sacred relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === 'en' ? 'Sacred Rituals' : 'दिव्य दर्शन'}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === 'en' ? 'Featured Video Gallery' : 'दिव्य वीडियो दर्शन'}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm font-outfit max-w-xl mx-auto tracking-wide leading-relaxed">
            {lang === 'en' 
              ? 'Watch recordings of daily prayers, havan ceremonies, and rituals conducted by Pt. Rudraksh Rajpurohit.' 
              : 'पंडित रुद्राक्ष राजपुरोहित द्वारा संपन्न दैनिक आरती, हवन और विशेष तांत्रिक अनुष्ठान के वीडियो।'
            }
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <motion.div 
              key={vid._id}
              className="relative rounded-2xl overflow-hidden shadow-md bg-white group border border-gray-200/50 flex flex-col justify-between"
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              {/* Media Player Container */}
              <div className="aspect-video relative bg-black cursor-pointer overflow-hidden border-b border-gray-100">
                {vid.type === "embed" ? (
                  activeVideos[vid._id] ? (
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full z-0"
                      src={`${vid.url}?autoplay=1`} 
                      title={vid.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                      loading="lazy">
                    </iframe>
                  ) : (
                    <div 
                      className="absolute inset-0 flex items-center justify-center z-10"
                      onClick={() => setActiveVideos(prev => ({ ...prev, [vid._id]: true }))}
                    >
                      <img 
                        src={`https://img.youtube.com/vi/${getYouTubeId(vid.url)}/hqdefault.jpg`} 
                        alt={vid.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity duration-300"
                      />
                      {/* Play Button Overlay */}
                      <div className="absolute w-14 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:bg-red-700 group-hover:scale-105 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  )
                ) : (
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    src={getAssetUrl(vid.url)} 
                    controls 
                    preload="metadata"
                  />
                )}
              </div>

              {/* Title Card details */}
              <div className="p-4 bg-white">
                <div 
                  className="font-outfit text-xs md:text-sm font-semibold tracking-wide truncate"
                  style={{ color: '#12100e' }}
                >
                  {vid.title}
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  {vid.type === "embed" ? (
                    <span className="inline-flex items-center gap-1 text-[9px] text-red-500 font-semibold tracking-wide uppercase">
                      <FaYoutube size={10} />
                      <span>YouTube</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] text-amber-600 font-semibold tracking-wide uppercase">
                      <FaVideo size={10} />
                      <span>Ritual Recording</span>
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
