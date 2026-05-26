"use client";

import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { FaCheckCircle, FaArrowLeft, FaOm, FaWhatsapp, FaInfoCircle } from "react-icons/fa";

type ServiceItem = {
  _id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  longDescriptionEn?: string;
  longDescriptionHi?: string;
  image?: string;
  category?: string;
};

interface ServiceDetailClientProps {
  rawService: any;
}

export default function ServiceDetailClient({ rawService }: ServiceDetailClientProps) {
  const { lang } = useLanguage();

  if (!rawService) {
    return (
      <main className="min-h-screen bg-sacred-white pt-32 pb-20 text-center flex items-center justify-center">
        <div className="container-sacred">
          <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FaOm className="text-4xl text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-cinzel tracking-tight">
            {lang === 'en' ? 'Divine Service Not Found' : 'सेवा नहीं मिली'}
          </h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {lang === 'en' ? 'The sacred ritual you are seeking could not be found. Please return to the services portal.' : 'जो पवित्र अनुष्ठान आप ढूंढ रहे हैं वह मौजूद नहीं है। कृपया सेवाओं पर लौटें।'}
          </p>
          <Link href="/#services" className="btn-sacred inline-flex items-center gap-2 px-8 py-3.5 shadow-md">
            <FaArrowLeft className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Return to Services' : 'सेवाओं पर वापस जाएं'}
          </Link>
        </div>
      </main>
    );
  }

  const service: ServiceItem = {
    _id: rawService.id,
    titleEn: rawService.title.en,
    titleHi: rawService.title.hi,
    descriptionEn: rawService.description.en,
    descriptionHi: rawService.description.hi,
    longDescriptionEn: rawService.longDescription?.en || "",
    longDescriptionHi: rawService.longDescription?.hi || "",
    image: rawService.image,
    category: rawService.category,
  };

  const title = lang === 'en' ? service.titleEn : service.titleHi;
  const description = lang === 'en' ? service.descriptionEn : service.descriptionHi;
  const longDescription = lang === 'en' ? service.longDescriptionEn : service.longDescriptionHi;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${title} - Acharya Pt. Rudraksh Rajpurohit`,
    "description": description,
    "provider": {
      "@type": "Person",
      "name": "Acharya Pt. Rudraksh Rajpurohit",
      "url": "https://www.panditmaabaglamukhi.com"
    },
    "areaServed": "Worldwide",
    "serviceType": "Vedic Puja & Tantra Havan",
    "category": service.category || "Religious Service",
    "image": service.image ? (service.image.startsWith('http') ? service.image : `https://www.panditmaabaglamukhi.com${service.image.startsWith('/') ? '' : '/'}${service.image}`) : undefined
  };

  const whatsappMessage = encodeURIComponent(
    `Jai Maa Baglamukhi! Acharya Ji, I am interested in booking or knowing more about ${service.titleEn}.`
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-sacred-white pb-32 lg:pb-20">
      {/* Schema.org Structured Data for dynamic service indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Premium Split Hero without big image */}
      <section
        className="relative pt-32 pb-16 bg-white border-b border-gray-100 sacred-pattern overflow-hidden"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fff',
        }}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 rounded-bl-[100%] blur-[80px] pointer-events-none" />
        
        <div className="container-sacred relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex-1 max-w-4xl">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mb-8 uppercase tracking-[0.2em]">
              <Link href="/" className="hover:text-gold transition-colors">{lang === 'en' ? 'Home' : 'मुख्य पृष्ठ'}</Link>
              <span className="text-gray-300">/</span>
              <Link href="/#services" className="hover:text-gold transition-colors">{lang === 'en' ? 'Services' : 'सेवाएं'}</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gold">{title}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-900 font-bold tracking-tight font-cinzel leading-tight mb-6">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              {description}
            </p>
          </motion.div>

          {service.image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full lg:w-auto"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
                <img 
                  src={service.image.startsWith('http') ? service.image : (service.image.startsWith('/') ? service.image : '/' + service.image)} 
                  alt={`${title} Puja Havan Ceremony performed by Vedic Priest Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Maa Baglamukhi Dham, Nalkheda`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="container-sacred py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-16 lg:gap-12">
          
          {/* Main Column */}
          <motion.div
            className="lg:col-span-2 space-y-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Description Section */}
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                <FaOm className="text-2xl text-gold" />
                <h2 className="text-3xl font-bold text-gray-900 font-cinzel tracking-tight m-0">
                  {lang === 'en' ? 'Sacred Details' : 'पवित्र विवरण'}
                </h2>
              </div>
              <p className="leading-relaxed font-medium text-lg whitespace-pre-wrap">
                {longDescription || description}
              </p>
            </div>
          </motion.div>

          {/* Sticky Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-white/90 backdrop-blur-3xl border border-gray-100 rounded-3xl shadow-xl overflow-hidden sticky top-28 p-8">
              
              <h3 className="text-2xl font-bold font-cinzel text-gray-900 mb-6 border-b border-gray-100 pb-4">
                {lang === 'en' ? 'Consultation & Inquiry' : 'परामर्श और पूछताछ'}
              </h3>
              
              <div className="space-y-6">
                
                {/* Meta details */}
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <FaCheckCircle className="text-gold w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{lang === 'en' ? 'Category' : 'श्रेणी'}</p>
                      <p className="text-sm text-gray-900 font-bold capitalize">{service.category || 'Puja'}</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-600 font-medium bg-gold/5 p-4 rounded-xl border border-gold/10 flex items-start gap-3">
                  <FaInfoCircle className="text-gold w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>
                    {lang === 'en' 
                      ? 'To know more about this ritual or to book a consultation, please send us a direct inquiry.' 
                      : 'इस अनुष्ठान के बारे में अधिक जानने या परामर्श बुक करने के लिए, कृपया हमें सीधा संदेश भेजें।'}
                  </p>
                </div>

                <div className="pt-2 space-y-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#25D366]/20 hover:shadow-xl hover:bg-[#1EBE5D] hover:-translate-y-1 uppercase tracking-wider"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    {lang === 'en' ? 'Inquire on WhatsApp' : 'व्हाट्सएप पर पूछताछ करें'}
                  </a>

                  <Link
                    href={`/book?service=${service._id}`}
                    className="w-full py-4 bg-gold hover:bg-gold/90 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 uppercase tracking-wider text-center"
                  >
                    {lang === 'en' ? 'Book Puja' : 'पूजा बुक करें'}
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Sticky Bottom Bar on Mobile */}
      <div className="lg:hidden fixed bottom-[37px] left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 flex gap-3 shadow-lg shadow-gold/5">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 bg-[#25D366] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider hover:bg-[#1EBE5D]"
        >
          <FaWhatsapp className="w-4 h-4" />
          {lang === 'en' ? 'WhatsApp' : 'व्हाट्सएप'}
        </a>

        <Link
          href={`/book?service=${service._id}`}
          className="flex-1 py-3.5 bg-gold text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider text-center hover:bg-gold/90"
        >
          {lang === 'en' ? 'Book Puja' : 'पूजा बुक करें'}
        </Link>
      </div>
    </main>
  );
}
