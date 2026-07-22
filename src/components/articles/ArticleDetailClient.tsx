"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaBookOpen, FaUser, FaWhatsapp, FaPhoneAlt, FaOm, } from "react-icons/fa";
import { SITE_CONFIG, } from "@/lib/constants";

type ArticleSection = {
  heading: { en: string; hi: string };
  content: { en: string; hi: string };
};

type ArticleItem = {
  id: string;
  category: { en: string; hi: string };
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  image: string;
  readTime: { en: string; hi: string };
  date: string;
  sections: ArticleSection[];
};

interface ArticleDetailClientProps {
  rawArticle: any;
}

// Helper function to format text with bold tags and lists
const formatText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="font-extrabold text-gold">{part.slice(2, -2)}</strong>;
    }
    if (part.includes("\n")) {
      return part.split("\n").map((line, lIdx) => {
        if (line.trim().startsWith("- ")) {
          return (
            <span key={`${idx}-${lIdx}`} className="block my-2 pl-4 flex items-start gap-2">
              <span className="text-gold flex-shrink-0 mt-1">•</span>
              <span>{line.trim().slice(2)}</span>
            </span>
          );
        }
        return (
          <span key={`${idx}-${lIdx}`} className="block my-2">
            {line}
          </span>
        );
      });
    }
    return part;
  });
};

export default function ArticleDetailClient({ rawArticle }: ArticleDetailClientProps) {
  const { lang } = useLanguage();

  if (!rawArticle) {
    return (
      <main className="min-h-screen bg-sacred-white pt-32 pb-20 text-center flex items-center justify-center">
        <div className="container-sacred">
          <div className="w-20 h-20 mx-auto bg-gray-150 rounded-full flex items-center justify-center mb-6">
            <FaOm className="text-4xl text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold font-cinzel text-gray-900 mb-4 tracking-tight">
            {lang === 'en' ? 'Article Not Found' : 'लेख नहीं मिला'}
          </h1>
          <Link href="/articles" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-full font-semibold text-xs tracking-wider uppercase shadow-md">
            <FaArrowLeft size={12} />
            {lang === 'en' ? 'Return to Knowledge Hub' : 'ज्ञान केंद्र पर वापस जाएं'}
          </Link>
        </div>
      </main>
    );
  }

  const article: ArticleItem = {
    id: rawArticle.id,
    category: { en: rawArticle.category.en, hi: rawArticle.category.hi },
    title: { en: rawArticle.title.en, hi: rawArticle.title.hi },
    description: { en: rawArticle.description.en, hi: rawArticle.description.hi },
    image: rawArticle.image,
    readTime: { en: rawArticle.readTime.en, hi: rawArticle.readTime.hi },
    date: rawArticle.date,
    sections: rawArticle.sections,
  };

  const titleText = lang === "en" ? article.title.en : article.title.hi;
  const descText = lang === "en" ? article.description.en : article.description.hi;
  const catText = lang === "en" ? article.category.en : article.category.hi;
  const timeText = lang === "en" ? article.readTime.en : article.readTime.hi;

  // Schema.org Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": titleText,
    "description": descText,
    "image": `https://www.panditmaabaglamukhi.com${article.image}`,
    "datePublished": article.date,
    "author": {
      "@type": "Person",
      "name": "Acharya Pt. Rudraksh Rajpurohit",
      "url": "https://www.panditmaabaglamukhi.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pandit Maa Baglamukhi Nalkheda Dham",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.panditmaabaglamukhi.com/logo.webp"
      }
    },
    "mainEntityOfPage": `https://www.panditmaabaglamukhi.com/articles/${article.id}`
  };

  const whatsappMessage = encodeURIComponent(
    `Jai Maa Baglamukhi! Acharya Ji, I read your article about "${article.title.en}" and would like to seek spiritual guidance/puja booking.`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-sacred-white pb-24 font-outfit text-gray-800">
      {/* Schema.org Article Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ─── A. Header & Breadcrumbs ─── */}
      <section 
        className="relative pt-32 pb-16 bg-white border-b border-gray-100 sacred-pattern overflow-hidden"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fff',
        }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 rounded-bl-[100%] blur-[80px] pointer-events-none" />
        
        <div className="container-sacred max-w-4xl mx-auto px-6 relative z-10">
          
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-gray-400 text-[10px] md:text-xs font-bold mb-6 uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-gold transition-colors">{lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}</Link>
            <span className="text-gray-300">/</span>
            <Link href="/articles" className="hover:text-gold transition-colors">{lang === 'en' ? 'Guidance' : 'लेख सूची'}</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gold line-clamp-1">{titleText}</span>
          </div>

          {/* Saffron Category Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 border border-gold/20 text-amber-800 rounded-full font-semibold text-[9px] md:text-[10px] tracking-wider uppercase mb-4">
            <FaBookOpen size={9} className="text-gold" />
            <span>{catText}</span>
          </span>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-cinzel text-gray-900 leading-tight tracking-tight mb-6">
            {titleText}
          </h1>

          {/* Author, Date, Read time metadata row */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide border-t border-gray-50 pt-5">
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                <FaUser size={10} />
              </div>
              <span className="text-gray-700">{lang === "en" ? "Pt. Rudraksh Rajpurohit" : "पं. रुद्राक्ष राजपुरोहित"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt size={11} className="text-gold" />
              <span>{new Date(article.date).toLocaleDateString(lang === "en" ? 'en-US' : 'hi-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock size={11} className="text-gold" />
              <span>{timeText}</span>
            </span>
          </div>

        </div>
      </section>

      {/* ─── B. Main Content ─── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-sacred max-w-3xl mx-auto px-6">
          
          {/* Back link */}
          <div className="mb-8">
            <Link 
              href="/articles" 
              className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gold uppercase tracking-wider transition-all"
            >
              <FaArrowLeft />
              <span>{lang === "en" ? "Back to Knowledge Hub" : "ज्ञान केंद्र पर वापस जाएं"}</span>
            </Link>
          </div>

          {/* Featured Image */}
          <div className="relative w-full rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-lg mb-10">
            <img 
              src={article.image} 
              alt={titleText}
              className="w-full h-auto object-cover max-h-[480px]"
            />
          </div>

          {/* Introduction paragraph */}
          <p className="text-sm md:text-base text-gray-700 font-medium leading-relaxed mb-8 italic pl-4 border-l-4 border-gold">
            {descText}
          </p>

          {/* Render Sections */}
          <div className="space-y-10">
            {article.sections.map((section, sIdx) => {
              const secHeading = lang === "en" ? section.heading.en : section.heading.hi;
              const secContent = lang === "en" ? section.content.en : section.content.hi;

              return (
                <div key={sIdx} className="space-y-4">
                  <h2 className="text-lg md:text-xl font-bold font-cinzel text-gray-900 tracking-tight mt-6 pb-2 border-b border-gray-50 flex items-center gap-2.5">
                    <span className="text-gold font-bold font-cinzel">ॐ</span>
                    <span>{secHeading}</span>
                  </h2>
                  <div className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed font-semibold">
                    {formatText(secContent)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── C. Direct Contact Callout Plaque ─── */}
          <div className="mt-16 bg-gradient-to-br from-gold/5 via-orange-100/5 to-amber-500/5 border border-gold/25 rounded-[2rem] p-8 text-center relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 via-gold to-amber-600" />
            
            <span className="text-[10px] font-bold font-cinzel text-gold tracking-[0.2em] uppercase bg-gold/10 px-3.5 py-1 rounded-full border border-gold/15 mb-3 inline-block">
              {lang === "en" ? "Seek Puja & Protection" : "साधना और संकट निवारण"}
            </span>

            <h3 className="text-base md:text-lg font-bold font-cinzel text-gray-900 mb-2">
              {lang === "en" ? "Consult Acharya Pt. Rudraksh Rajpurohit" : "आचार्य पं. रुद्राक्ष राजपुरोहित से परामर्श करें"}
            </h3>
            
            <p className="text-xs md:text-sm text-gray-600 font-semibold mb-6 max-w-xl mx-auto leading-relaxed">
              {lang === "en"
                ? "For customized Maa Baglamukhi Havans, Sawa Lakh Mantra Jaap, or professional astrological consultation at Nalkheda Dham, contact directly."
                : "नलखेड़ा धाम में माँ बगलामुखी हवन, सवा लाख मंत्र जाप, या ज्योतिषीय परामर्श के लिए सीधे आचार्य जी से संपर्क करें।"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold uppercase tracking-wider text-xs rounded-xl shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaWhatsapp size={14} />
                <span>WhatsApp / व्हाट्सएप</span>
              </a>
              <a 
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <FaPhoneAlt size={12} />
                <span>Call Now / कॉल करें</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
