"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaMusic } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function SpiritualMusicPlayer() {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element with locally hosted ambient flute MP3
    audioRef.current = new Audio("/ambient-flute.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Gentle ambient volume that does not overpower the text

    // Session recovery: check if devotee had enabled music previously
    const savedState = localStorage.getItem("spiritual-music-playing");
    if (savedState === "true") {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy on initial load without interaction
          setIsPlaying(false);
        });
    }

    // Auto dismiss tooltip after 8 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      localStorage.setItem("spiritual-music-playing", "false");
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          localStorage.setItem("spiritual-music-playing", "true");
          setShowTooltip(false);
        })
        .catch((err) => {
          console.error("Audio playback blocked by browser: ", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 left-4 md:left-6 z-50 flex items-center gap-3 select-none">
      {/* Music Toggle Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        suppressHydrationWarning={true}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl border cursor-pointer overflow-hidden transition-all duration-300 ${
          isPlaying
            ? "bg-gradient-to-br from-gold to-orange-500 text-white border-transparent shadow-[0_0_20px_rgba(249,115,22,0.4)]"
            : "bg-white text-gold border-gold/20 hover:border-gold/50 shadow-md"
        }`}
        title={lang === "en" ? "Toggle Sacred Music" : "संगीत चालू/बंद करें"}
      >
        {/* Rotating Sacred Chakra SVG background */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute inset-1 opacity-20 pointer-events-none"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
            <path d="M50 5 C25 5, 5 25, 5 50 C5 75, 25 95, 50 95 C75 95, 95 75, 95 50 C95 25, 75 5, 50 5 Z M50 15 C69 15, 85 31, 85 50 C85 69, 69 85, 50 85 C31 85, 15 69, 15 50 C15 31, 31 15, 50 15 Z" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 35 * Math.cos((i * Math.PI) / 4)}
                y2={50 + 35 * Math.sin((i * Math.PI) / 4)}
                stroke="currentColor"
                strokeWidth="2.5"
              />
            ))}
          </svg>
        </motion.div>

        {/* Static Note */}
        <div className="relative flex items-center justify-center gap-[3px] z-10">
          <FaMusic className="w-5 h-5" />
        </div>
      </motion.button>

      {/* Tooltip slide-out alert */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            className="bg-white/95 backdrop-blur-md text-gray-900 border border-gold/30 px-4 py-2.5 rounded-2xl shadow-xl flex flex-col items-start min-w-[210px] text-left pointer-events-none"
          >
            <span className="text-[10px] font-bold text-gold uppercase tracking-wider">
              {lang === "en" ? "Temple Ambient" : "मंदिर संगीत"}
            </span>
            <span className="text-xs font-bold text-gray-700 font-cinzel">
              {lang === "en" ? "Play Sacred Flute" : "दिव्य बांसुरी बजाएं"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
