"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { navbarVariants, slideInFromLeft } from "@/animations/variants";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import ReviewModal from "@/components/ReviewModal";
import { FaStar } from "react-icons/fa";

const MotionLink = motion(Link);

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  
  const { lang, toggleLang } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          setIsScrolled((prevScrolled) => {
            const nextScrolled = currentScrollY > 50;
            return prevScrolled === nextScrolled ? prevScrolled : nextScrolled;
          });
          
          setIsVisible((prevVisible) => {
            const nextVisible = currentScrollY < lastScrollY || currentScrollY < 100;
            return prevVisible === nextVisible ? prevVisible : nextVisible;
          });
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Global Review Modal Listener
  useEffect(() => {
    const handleOpenReview = () => setIsReviewModalOpen(true);
    window.addEventListener("open-review-modal", handleOpenReview);
    return () => window.removeEventListener("open-review-modal", handleOpenReview);
  }, []);

  // Track active section
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            // Clear URL hash when scrolling back to the home/top section
            if (id === "home" && typeof window !== "undefined" && window.location.hash) {
              window.history.pushState({}, document.title, window.location.pathname + window.location.search);
            }
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
      if (href === "#home") {
        if (typeof window !== "undefined" && window.location.hash) {
          window.history.pushState({}, document.title, window.location.pathname + window.location.search);
        }
        setActiveSection("home");
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileOpen(false);
    
    // Smooth scroll to top and clear hash if clicking Home link on Home page
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (typeof window !== "undefined" && window.location.hash) {
        window.history.pushState({}, document.title, window.location.pathname + window.location.search);
      }
      setActiveSection("home");
      return;
    }

    // Check if the link is a hash link for the current page
    if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
      const hash = href.startsWith("/#") ? href.substring(1) : href;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        if (typeof window !== "undefined") {
          window.history.pushState({}, document.title, window.location.pathname + window.location.search + hash);
        }
      }
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      if (href === "/") {
        return pathname === "/" && (activeSection === "home" || activeSection === "");
      }
      if (href.includes("#")) {
        const [path, hash] = href.split("#");
        return pathname === path && activeSection === hash;
      }
      return pathname.startsWith(href);
    }
    if (href.startsWith("#")) return pathname === "/" && activeSection === href.replace("#", "");
    return false;
  };

  const shouldShowNavbar = !isMobileOpen && isVisible;

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pt-3 px-4 sm:px-5 lg:px-6`}
        variants={navbarVariants}
        animate={shouldShowNavbar ? "visible" : "hidden"}
        initial="visible"
      >
        <div className={`mx-auto max-w-7xl transition-all duration-500 rounded-[1.85rem] border ${
          isScrolled 
            ? "bg-gradient-to-r from-white/95 via-amber-50/90 to-white/95 backdrop-blur-lg shadow-xl shadow-gold/5 border-gold/30" 
            : "bg-gradient-to-r from-white/80 via-amber-50/60 to-white/80 backdrop-blur-md shadow-sm border-white/60"
        }`}>
          <nav className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-14 px-5 lg:px-6" : "h-16 px-6 lg:px-8"
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
              <Logo size={isScrolled ? 40 : 44} alt={`${SITE_CONFIG.name[lang]} logo`} className="transition-all duration-500" />
              <div className="hidden sm:block">
                <span className="text-sm sm:text-base tracking-tight text-gray-900 leading-none font-bold font-cinzel block">
                  {SITE_CONFIG.name[lang]}
                </span>
                <span className="text-[9px] text-gold font-bold tracking-widest block mt-1 uppercase">
                  {lang === 'en' ? 'Vedic Acharya' : 'वैदिक आचार्य'}
                </span>
              </div>
            </motion.a>


            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1.5">
              {NAV_LINKS.map((link) => (
                <MotionLink
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
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
                </MotionLink>
              ))}
            </div>

            {/* Actions: Language Toggle & Book CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <motion.button
                onClick={() => setIsReviewModalOpen(true)}
                suppressHydrationWarning={true}
                className="text-[11px] font-bold text-gray-600 hover:text-gold transition-colors uppercase tracking-wider border-b border-transparent hover:border-gold pb-0.5 mx-2"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === 'en' ? 'Review Us' : 'समीक्षा करें'}
              </motion.button>
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
              <MotionLink
                href="/book"
                onClick={() => setIsMobileOpen(false)}
                suppressHydrationWarning={true}
                className="btn-sacred text-xs px-6 py-2.5 shadow-sm rounded-full cursor-pointer font-bold uppercase tracking-wider inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === 'en' ? 'Book Puja' : 'पूजा बुक करें'}
              </MotionLink>
            </div>

            {/* Mobile Menu Toggle & Lang Toggle */}
            <div className="flex lg:hidden items-center gap-3">
              <motion.button
                onClick={toggleLang}
                suppressHydrationWarning={true}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/15 font-bold text-sm"
                whileTap={{ scale: 0.9 }}
              >
                {lang === 'en' ? 'अ' : 'EN'}
              </motion.button>
              <motion.button
                className="text-gray-900 p-3 flex items-center justify-center rounded-full hover:bg-gold/5"
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
              className="fixed inset-0 z-[98] lg:hidden bg-sacred-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-sacred-pattern opacity-50 pointer-events-none" />
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full p-6 pt-24 pb-12 overflow-y-auto">
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                  {/* Logo */}
                  <div className="mb-2 flex flex-col items-center gap-3">
                    <Logo size={56} alt={`${SITE_CONFIG.name[lang]} logo`} />
                    <div>
                      <h2 className="text-xl text-gray-900 font-bold tracking-tight font-cinzel leading-none">
                        {SITE_CONFIG.name[lang]}
                      </h2>
                      <span className="text-[10px] text-gold font-bold tracking-widest mt-2 uppercase block">
                        {lang === 'en' ? 'Nalkheda Dham' : 'नलखेड़ा धाम'}
                      </span>
                    </div>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-2 w-full max-w-[250px]">
                    {NAV_LINKS.map((link, i) => (
                      <MotionLink
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        suppressHydrationWarning={true}
                        className={`text-center py-4 text-base transition-all duration-300 font-bold tracking-wider border-b border-gray-100 uppercase block ${
                          isActive(link.href)
                            ? "text-gold"
                            : "text-gray-600 hover:text-gold"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        {link.label[lang]}
                      </MotionLink>
                    ))}
                  </div>
                </div>

                <div className="w-full max-w-[250px] mx-auto mt-8">
                  {/* Actions */}
                  <div className="flex flex-col gap-4">
                    <MotionLink
                      href="/book"
                      onClick={() => setIsMobileOpen(false)}
                      suppressHydrationWarning={true}
                      className="btn-sacred w-full text-center py-4 rounded-full font-bold uppercase tracking-wider text-sm shadow-md block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {lang === 'en' ? 'Book Puja' : 'पूजा बुक करें'}
                    </MotionLink>

                    <motion.button
                      onClick={() => {
                        setIsMobileOpen(false);
                        setIsReviewModalOpen(true);
                      }}
                      suppressHydrationWarning={true}
                      className="text-xs font-bold text-gray-500 hover:text-gold transition-colors uppercase tracking-wider underline-offset-4 hover:underline text-center py-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {lang === 'en' ? 'Review Us' : 'समीक्षा करें'}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ReviewModal isOpen={isReviewModalOpen} onClose={() => setIsReviewModalOpen(false)} />
    </>
  );
}
