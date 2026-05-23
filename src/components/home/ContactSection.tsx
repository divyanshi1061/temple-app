"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/animations/variants";
import { SITE_CONFIG } from "@/lib/constants";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaPlane, FaTrain, FaCar } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactSection() {
  const { lang } = useLanguage();
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format service label based on selection and language
    const serviceLabel = form.service 
      ? (form.service === "havan" ? (lang === "en" ? "Baglamukhi Havan" : "बगलामुखी हवन")
         : form.service === "jaap" ? (lang === "en" ? "Anusthan & Jaap" : "अनुष्ठान एवं जाप")
         : form.service === "puja" ? (lang === "en" ? "Puja Services" : "पूजा सेवाएं")
         : form.service === "rin-mukti" ? (lang === "en" ? "Rin Mukti (Debt Relief)" : "ऋण मुक्ति (कर्ज से राहत)")
         : form.service === "karya-mukti" ? (lang === "en" ? "Karya Mukti / Kasht Mukti" : "कार्य मुक्ति / कष्ट मुक्ति")
         : (lang === "en" ? "Other" : "अन्य"))
      : (lang === "en" ? "General" : "सामान्य");

    // Format the inquiry message
    const messageText = lang === "en"
      ? `Jai Maa Baglamukhi! Acharya Ji, I have an inquiry:\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${serviceLabel}\nMessage: ${form.message}`
      : `जय माँ बगलामुखी! आचार्य जी, मेरे पास एक पूछताछ है:\nनाम: ${form.name}\nफ़ोन: ${form.phone}\nईमेल: ${form.email}\nसेवा: ${serviceLabel}\nसंदेश: ${form.message}`;

    // Detect user OS for SMS format compatibility
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const bodyDelimiter = isIOS ? '&' : '?';
    const cleanPhone = SITE_CONFIG.phone.replace(/\s+/g, '');
    const smsUrl = `sms:${cleanPhone}${bodyDelimiter}body=${encodeURIComponent(messageText)}`;

    // Set submit state and trigger redirect to SMS app
    setSubmitted(true);
    window.location.href = smsUrl;
    
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    { icon: FaPhone, label: { en: "Phone", hi: "फ़ोन" }, value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
    { icon: FaWhatsapp, label: { en: "WhatsApp", hi: "व्हाट्सएप" }, value: { en: "Chat with us", hi: "हमसे चैट करें" }, href: `https://wa.me/${SITE_CONFIG.whatsapp}` },
    { icon: FaEnvelope, label: { en: "Email", hi: "ईमेल" }, value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { icon: FaMapMarkerAlt, label: { en: "Address", hi: "पता" }, value: { en: "Nalkheda, MP 465441", hi: "नलखेड़ा, मध्य प्रदेश 465441" }, href: SITE_CONFIG.mapUrl },
  ];

  const travelInfo = [
    { 
      icon: FaPlane, 
      label: { en: "By Air", hi: "हवाई मार्ग" }, 
      desc: { en: "Nearest airport is Devi Ahilya Bai Holkar Airport, Indore (approx. 150 km).", hi: "निकटतम हवाई अड्डा देवी अहिल्या बाई होलकर हवाई अड्डा, इंदौर (लगभग 150 किमी) है।" } 
    },
    { 
      icon: FaTrain, 
      label: { en: "By Train", hi: "ट्रेन द्वारा" }, 
      desc: { en: "Nearest major railway station is Ujjain Junction (approx. 100 km).", hi: "निकटतम प्रमुख रेलवे स्टेशन उज्जैन जंक्शन (लगभग 100 किमी) है।" } 
    },
    { 
      icon: FaCar, 
      label: { en: "By Road", hi: "सड़क मार्ग" }, 
      desc: { en: "Well connected by road from Ujjain (100km), Indore (150km), and Bhopal (220km).", hi: "उज्जैन (100 किमी), इंदौर (150 किमी) और भोपाल (220 किमी) से सड़क मार्ग से अच्छी तरह जुड़ा हुआ है।" } 
    }
  ];

  return (
    <section id="contact" className="relative py-10 md:py-20 overflow-hidden bg-gray-50 border-t border-gray-100 sacred-pattern">
      {/* Aura background blur */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-gold/3 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-sacred relative z-10">
        <motion.div className="text-center mb-10 max-w-3xl mx-auto" variants={fadeInUp} initial="hidden"
          whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === 'en' ? 'Get In Touch' : 'संपर्क करें'}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === 'en' ? 'Contact Acharya Ji' : 'आचार्य जी से संपर्क करें'}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Contact & Travel Info */}
          <motion.div variants={fadeInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            
            {/* Direct Contact */}
            <div>
              <h3 className="text-2xl text-gray-900 mb-6 font-bold tracking-tight font-cinzel">
                {lang === 'en' ? 'Consultation & Guidance' : 'परामर्श और मार्गदर्शन'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactInfo.map((info, i) => (
                  <motion.a key={i} href={info.href} target={info.label.en === "Address" ? "_blank" : undefined}
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-white border border-gray-100 hover:border-gold/35 rounded-2xl transition-all group shadow-sm"
                    whileHover={{ y: -2 }}>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-white group-hover:border-gold transition-all shadow-sm flex-shrink-0">
                      <info.icon size={13} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] text-gold/60 uppercase tracking-wider font-bold mb-0.5">{info.label[lang]}</p>
                      <p className="text-gray-800 font-bold text-xs md:text-sm group-hover:text-gold transition-colors truncate">{typeof info.value === 'string' ? info.value : info.value[lang]}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* How to Reach */}
            <div>
              <h3 className="text-2xl text-gray-900 mb-6 font-bold tracking-tight font-cinzel">
                {lang === 'en' ? 'How to Reach Nalkheda Dham' : 'नलखेड़ा धाम कैसे पहुंचें'}
              </h3>
              <div className="space-y-4">
                {travelInfo.map((travel, i) => (
                  <div key={i} className="flex gap-3 md:gap-4 p-3.5 md:p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="mt-1 flex-shrink-0">
                      <travel.icon className="text-gold text-base md:text-xl" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-xs md:text-sm uppercase tracking-wider mb-1">{travel.label[lang]}</h4>
                      <p className="text-gray-600 text-xs md:text-sm font-medium">{travel.desc[lang]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div variants={fadeInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-white rounded-3xl p-4 md:p-8 border border-gray-100 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl text-gray-900 mb-6 font-bold tracking-tight font-cinzel">
                {lang === 'en' ? 'Send an Inquiry' : 'पूछताछ भेजें'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-[9px] sm:text-[10px] text-gold font-bold mb-1 block">{lang === 'en' ? 'Full Name' : 'पूरा नाम'}</label>
                    <input type="text" placeholder={lang === 'en' ? "Enter name" : "नाम दर्ज करें"}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      suppressHydrationWarning={true}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gold focus:ring-0 focus:outline-none transition-all font-semibold text-xs" required />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] text-gold font-bold mb-1 block">{lang === 'en' ? 'Phone Number' : 'फ़ोन नंबर'}</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      suppressHydrationWarning={true}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gold focus:ring-0 focus:outline-none transition-all font-semibold text-xs" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="text-[9px] sm:text-[10px] text-gold font-bold mb-1 block">{lang === 'en' ? 'Email Address' : 'ईमेल पता'}</label>
                    <input type="email" placeholder="your@email.com"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      suppressHydrationWarning={true}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gold focus:ring-0 focus:outline-none transition-all font-semibold text-xs" required />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] text-gold font-bold mb-1 block">{lang === 'en' ? 'Service Interest' : 'सेवा रुचि'}</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      suppressHydrationWarning={true}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-gray-900 focus:border-gold focus:ring-0 focus:outline-none transition-all font-semibold text-xs">
                      <option value="">{lang === 'en' ? 'Select service' : 'सेवा चुनें'}</option>
                      <option value="havan">{lang === 'en' ? 'Baglamukhi Havan' : 'बगलामुखी हवन'}</option>
                      <option value="jaap">{lang === 'en' ? 'Anusthan & Jaap' : 'अनुष्ठान एवं जाप'}</option>
                      <option value="rin-mukti">{lang === 'en' ? 'Rin Mukti (Debt Relief)' : 'ऋण मुक्ति (कर्ज से राहत)'}</option>
                      <option value="karya-mukti">{lang === 'en' ? 'Karya Mukti / Kasht Mukti' : 'कार्य मुक्ति / कष्ट मुक्ति'}</option>
                      <option value="puja">{lang === 'en' ? 'Puja Services' : 'पूजा सेवाएं'}</option>
                      <option value="other">{lang === 'en' ? 'Other' : 'अन्य'}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] sm:text-[10px] text-gold font-bold mb-1 block">{lang === 'en' ? 'Message' : 'संदेश'}</label>
                  <textarea rows={3} placeholder={lang === 'en' ? 'Your message...' : 'आपका संदेश...'}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    suppressHydrationWarning={true}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3.5 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-gold focus:ring-0 focus:outline-none resize-none transition-all font-semibold text-xs h-20 md:h-24" />
                </div>
                
                <motion.button type="submit" 
                  suppressHydrationWarning={true}
                  className="btn-sacred w-full text-center py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all mt-2"
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  {submitted 
                    ? (lang === 'en' ? "Opening SMS App..." : "एसएमएस ऐप खुल रहा है...") 
                    : (lang === 'en' ? "Send Inquiry" : "पूछताछ भेजें")}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
