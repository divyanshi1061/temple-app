"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { navbarVariants, slideInFromLeft } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, usePathname } from "next/navigation";
import Logo from "@/components/layout/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  const { lang, toggleLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Track active section
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [pathname]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }

    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    }
    if (href.startsWith("#")) return pathname === "/" && activeSection === href.replace("#", "");
    return false;
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pt-5 px-4 sm:px-6 lg:px-8`}
        variants={navbarVariants}
        animate={isVisible ? "visible" : "hidden"}
        initial="visible"
      >
        <div className={`mx-auto max-w-6xl transition-all duration-500 rounded-[1.85rem] border ${
          isScrolled 
            ? "bg-gradient-to-r from-white/95 via-amber-50/90 to-white/95 backdrop-blur-lg shadow-xl shadow-gold/5 border-gold/30" 
            : "bg-gradient-to-r from-white/80 via-amber-50/60 to-white/80 backdrop-blur-md shadow-sm border-white/60"
        }`}>
          <nav className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-16 px-6 lg:px-8" : "h-20 px-8 lg:px-10"
          }`}>
            {/* Logo */}
            <motion.a
              href="#home"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Logo size={isScrolled ? 42 : 46} alt={`${SITE_CONFIG.name[lang]} logo`} className="transition-all duration-500" />
              <div className="hidden sm:block">
                <h1 className="text-sm sm:text-base tracking-tight text-gray-900 leading-none font-bold font-cinzel">
                  {SITE_CONFIG.name[lang]}
                </h1>
                <span className="text-[9px] text-gold font-bold tracking-widest block mt-1 uppercase">
                  {lang === 'en' ? 'Vedic Acharya' : 'वैदिक आचार्य'}
                </span>
              </div>
            </motion.a>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map((link) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  suppressHydrationWarning={true}
                  className={`relative px-4 py-2 text-sm transition-all duration-300 rounded-full font-bold cursor-pointer ${
                    isActive(link.href)
                      ? "text-white bg-gold shadow-sm"
                      : "text-gray-600 hover:text-gold hover:bg-gold/5"
                  }`}
                  style={{ fontSize: lang === 'hi' ? '0.95rem' : '0.85rem' }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label[lang]}
                </motion.button>
              ))}
            </div>

            {/* Actions: Language Toggle & Book CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={toggleLang}
                suppressHydrationWarning={true}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-white transition-all font-bold text-sm border border-gold/15 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Toggle Language"
              >
                {lang === 'en' ? 'अ' : 'EN'}
              </motion.button>
              <motion.button
                onClick={() => handleNavClick("/book")}
                suppressHydrationWarning={true}
                className="btn-sacred text-xs px-6 py-2.5 shadow-sm rounded-full cursor-pointer font-bold uppercase tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === 'en' ? 'Book Puja' : 'पूजा बुक करें'}
              </motion.button>
            </div>

            {/* Mobile Menu Toggle & Lang Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <motion.button
                onClick={toggleLang}
                suppressHydrationWarning={true}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/15 font-bold text-xs"
                whileTap={{ scale: 0.9 }}
              >
                {lang === 'en' ? 'अ' : 'EN'}
              </motion.button>
              <motion.button
                className="text-gray-900 p-2"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                suppressHydrationWarning={true}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </motion.button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[98] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-[99] lg:hidden bg-white border-l border-gray-150 shadow-2xl"
              variants={slideInFromLeft}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col h-full p-6 pt-24 justify-between">
                <div>
                  {/* Logo in mobile */}
                  <div className="mb-6 pb-4 border-b border-gray-100 flex items-center gap-3">
                    <Logo size={42} alt={`${SITE_CONFIG.name[lang]} logo`} />
                    <div>
                      <h2 className="text-sm text-gray-900 font-bold tracking-tight font-cinzel leading-none">
                        {SITE_CONFIG.name[lang]}
                      </h2>
                      <span className="text-[8px] text-gold font-bold tracking-widest mt-1 uppercase block">
                        {lang === 'en' ? 'Nalkheda Dham' : 'नलखेड़ा धाम'}
                      </span>
                    </div>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-1">
                    {NAV_LINKS.map((link, i) => (
                      <motion.button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        suppressHydrationWarning={true}
                        className={`text-left px-4 py-3 rounded-xl text-base transition-all duration-300 font-bold cursor-pointer ${
                          isActive(link.href)
                            ? "text-gold bg-gold/5"
                            : "text-gray-600 hover:text-gold hover:bg-gold/5"
                        }`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        {link.label[lang]}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Book CTA */}
                  <motion.button
                    onClick={() => handleNavClick("/book")}
                    suppressHydrationWarning={true}
                    className="btn-sacred w-full text-center py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {lang === 'en' ? 'Book Puja' : 'पूजा बुक करें'}
                  </motion.button>

                  {/* Contact info */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center">
                    <p className="text-xs text-gray-500 font-bold tracking-wide">
                      {SITE_CONFIG.phone}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
