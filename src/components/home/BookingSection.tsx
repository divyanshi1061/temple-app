"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInRight } from "@/animations/variants";
import { SERVICES, SITE_CONFIG } from "@/lib/constants";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function BookingSection() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";

  const [selectedService, setSelectedService] = useState(
    serviceParam && SERVICES.some((s) => s.id === serviceParam) ? serviceParam : ""
  );
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      alert(lang === 'en' ? 'Please enter a phone number to receive the SMS.' : 'कृपया एसएमएस प्राप्त करने के लिए एक फोन नंबर दर्ज करें।');
      return;
    }

    const serviceName = selectedService ? SERVICES.find(s => s.id === selectedService)?.title.en : "Puja/Havan";
    const messageText = `Jai Maa Baglamukhi! Acharya Ji, I want to inquire about ${serviceName}. \nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const bodyDelimiter = isIOS ? '&' : '?';
    const cleanPhone = formData.phone.trim().replace(/\s+/g, '');
    const smsUrl = `sms:${cleanPhone}${bodyDelimiter}body=${encodeURIComponent(messageText)}`;

    setSubmitted(true);
    window.location.href = smsUrl;
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 3000);
  };

  const handleWhatsApp = () => {
    const serviceName = selectedService ? SERVICES.find(s => s.id === selectedService)?.title.en : "Puja/Havan";
    const text = encodeURIComponent(
      `Jai Maa Baglamukhi! Acharya Ji, I want to inquire about ${serviceName}. \nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/${SITE_CONFIG.whatsapp}?text=${text}`, "_blank");
  };

  const inputClass = "w-full bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 text-gray-900 focus:border-gold focus:ring-1 focus:ring-gold/30 focus:outline-none transition-all font-medium";

  return (
    <section id="booking" className="relative section-padding overflow-hidden bg-sacred-white sacred-pattern">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-gold/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-sacred relative z-10">
        <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <span className="text-gold text-xs tracking-[0.2em] uppercase font-bold bg-gold/10 px-4 py-2 rounded-full border border-gold/20 backdrop-blur-sm">
            {lang === 'en' ? 'Direct Consultation' : 'सीधा परामर्श'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl mt-6 mb-6 font-bold tracking-tight text-gray-900 font-cinzel">
            {lang === 'en' ? 'Consultation & Inquiry' : 'परामर्श और पूछताछ'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            {lang === 'en'
              ? 'Send a direct inquiry to Acharya Pt. Rudraksh Rajpurohit regarding your anusthan and sacred rituals.'
              : 'अपने अनुष्ठान और पवित्र अनुष्ठानों के संबंध में आचार्य पं. रुद्राक्ष राजपुरोहित को सीधी पूछताछ भेजें।'}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Form */}
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="sacred-card p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <form onSubmit={handleInquiry} className="space-y-6 relative z-10">
                <div>
                  <label className="text-xs text-gold font-bold mb-3 block uppercase tracking-wider">
                    {lang === 'en' ? 'Select Service (Optional)' : 'सेवा चुनें (वैकल्पिक)'}
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    suppressHydrationWarning={true}
                    className={inputClass}
                  >
                    <option value="">{lang === 'en' ? 'General Inquiry' : 'सामान्य पूछताछ'}</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id}>{s.title[lang]}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-gold font-bold mb-3 block uppercase tracking-wider">{lang === 'en' ? 'Full Name' : 'पूरा नाम'}</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} suppressHydrationWarning={true} className={inputClass} required placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="text-xs text-gold font-bold mb-3 block uppercase tracking-wider">{lang === 'en' ? 'Phone / WhatsApp' : 'फ़ोन / व्हाट्सएप'}</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} suppressHydrationWarning={true} className={inputClass} required placeholder="+91 XXXXX XXXXX" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gold font-bold mb-3 block uppercase tracking-wider">{lang === 'en' ? 'Your Message or Question' : 'आपका संदेश या प्रश्न'}</label>
                  <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} suppressHydrationWarning={true} className={`${inputClass} resize-none`} required placeholder={lang === 'en' ? 'Describe your problem or ask your question...' : 'अपनी समस्या बताएं या अपना प्रश्न पूछें...'} />
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                  <button type="submit" suppressHydrationWarning={true} className="flex-1 btn-sacred shadow-md flex items-center justify-center gap-2 py-4">
                    <FaEnvelope className="w-4 h-4" />
                    {submitted ? (lang === 'en' ? 'SMS Opened' : 'एसएमएस खुला है') : (lang === 'en' ? 'Send SMS' : 'एसएमएस भेजें')}
                  </button>
                  <button type="button" onClick={handleWhatsApp} suppressHydrationWarning={true} className="flex-1 bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold uppercase tracking-wider text-xs rounded-xl shadow-md flex items-center justify-center gap-2 py-4 transition-all hover:-translate-y-1">
                    <FaWhatsapp className="w-5 h-5" />
                    {lang === 'en' ? 'WhatsApp Direct' : 'व्हाट्सएप डायरेक्ट'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold font-cinzel text-gray-900 mb-4">{lang === 'en' ? 'Why Inquire?' : 'पूछताछ क्यों करें?'}</h3>
              <ul className="space-y-4">
                {[
                  { en: "Direct guidance from Acharya Ji based on your astrological chart.", hi: "आपकी ज्योतिषीय कुंडली के आधार पर आचार्य जी से सीधा मार्गदर्शन।" },
                  { en: "Understand which specific anusthan is right for your problems.", hi: "समझें कि आपकी समस्याओं के लिए कौन सा विशिष्ट अनुष्ठान सही है।" },
                  { en: "Get regular updates on your scheduled or ongoing 36-lakh or sawa-lakh jaap.", hi: "अपने निर्धारित या चल रहे 36-लाख या सवा-लाख जाप के बारे में नियमित जानकारी प्राप्त करें।" },
                  { en: "100% confidential and secure consultation.", hi: "100% गोपनीय और सुरक्षित परामर्श।" }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">✓</span>
                    </div>
                    <p className="text-gray-600 font-medium text-sm leading-relaxed">{item[lang]}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            {selectedService && (
              <div className="bg-gold/5 rounded-3xl p-8 border border-gold/20">
                <p className="text-xs text-gold uppercase tracking-wider font-bold mb-2">{lang === 'en' ? 'You are inquiring about:' : 'आप इसके बारे में पूछताछ कर रहे हैं:'}</p>
                <h4 className="text-xl font-bold font-cinzel text-gray-900">{SERVICES.find(s => s.id === selectedService)?.title[lang]}</h4>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
