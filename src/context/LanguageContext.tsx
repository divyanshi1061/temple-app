"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

type Language = 'en' | 'hi';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleLang = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setLang(prev => (prev === 'en' ? 'hi' : 'en'));
      setIsTransitioning(false);
    }, 200);
  };

  const handleSetLang = (newLang: Language) => {
    if (newLang === lang) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLang(newLang);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang: handleSetLang }}>
      <motion.div
        animate={{ 
          opacity: isTransitioning ? 0.4 : 1,
          filter: isTransitioning ? 'blur(4px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.2 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
