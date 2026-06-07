"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaChevronDown, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { SITE_CONFIG } from "@/lib/constants";

type FAQItem = {
  q: { en: string; hi: string };
  a: { en: string; hi: string };
};

const FAQ_DATA: FAQItem[] = [
  {
    q: {
      en: "Who is Acharya Pt. Rudraksh Rajpurohit and why is he considered the best pandit for Maa Baglamukhi Havan in Nalkheda?",
      hi: "आचार्य पं. रुद्राक्ष राजपुरोहित कौन हैं और उन्हें नलखेड़ा में माँ बगलामुखी हवन के लिए सबसे अच्छा पंडित क्यों माना जाता है?"
    },
    a: {
      en: "**Acharya Pt. Rudraksh Rajpurohit is a traditional Vedic Priest and lifelong Baglamukhi Sadhak based at the ancient Siddh Peeth Maa Baglamukhi Mandir in Nalkheda, Madhya Pradesh.** Descending from a lineage of spiritual guides, he performs Havans, Pujas, and Anusthans in strict accordance with the Atharvaveda and classic Tantric texts. Devotees revere him for his pure scriptural conduct, deep devotion, and compassionate personal guidance through difficult crises.",
      hi: "**आचार्य पं. रुद्राक्ष राजपुरोहित मध्य प्रदेश के नलखेड़ा धाम स्थित प्राचीन सिद्ध पीठ माँ बगलामुखी मंदिर के एक पारंपरिक वैदिक पुरोहित और आजीवन बगलामुखी साधक हैं।** एक आध्यात्मिक परिवार से आने वाले आचार्य जी अथर्ववेद और प्राचीन तंत्र ग्रंथों के अनुसार पवित्र हवन, पूजा और अनुष्ठान संपन्न कराते हैं। श्रद्धालु उन्हें उनकी शास्त्रीय शुद्धता, गहरी साधना और संकटों के समय उनके द्वारा दिए जाने वाले स्नेहमय व्यक्तिगत मार्गदर्शन के लिए आदरपूर्वक याद करते हैं।"
    }
  },
  {
    q: {
      en: "What is Maa Baglamukhi Havan and what are its benefits?",
      hi: "माँ बगलामुखी हवन क्या है और इसके क्या लाभ हैं?"
    },
    a: {
      en: "**Maa Baglamukhi Havan is a sacred fire ritual dedicated to the Goddess Pitambara (the yellow-robed Mother) to seek protection and stambhan (the power to neutralize negative forces).** Performing this Havan at the energized Siddh Peeth in Nalkheda under correct Muhurtas helps devotees overcome long-standing legal disputes, business obstacles, or personal crises. Every offering of yellow mustard, turmeric, and pure cow ghee is accompanied by precise Vedic chants to invoke the Goddess's protective energies.",
      hi: "**माँ बगलामुखी हवन देवी पीताम्बरा को समर्पित एक अत्यंत शक्तिशाली और पवित्र अग्नि अनुष्ठान है, जो शत्रुओं की नकारात्मक बुद्धि, वाणी और क्रियाओं को स्तंभित (शांत) करने के लिए किया जाता है।** नलखेड़ा के जागृत सिद्ध पीठ में शुभ मुहूर्त में यह हवन करने से भक्तों को पुराने मुकदमों, व्यावसायिक बाधाओं और गृह क्लेश से मुक्ति मिलती है। पूजा में पीली सरसों, हल्दी और गाय के घी जैसी सात्विक सामग्रियों की आहुतियां माँ की दिव्य रक्षात्मक ऊर्जा को जागृत करती हैं।"
    }
  },
  {
    q: {
      en: "What is Maa Baglamukhi 36 Lakh Jaap and Sawa Lakh Jaap? Who should book it?",
      hi: "माँ बगलामुखी 36 लाख जाप और सवा लाख जाप क्या है? इसे किसे बुक करना चाहिए?"
    },
    a: {
      en: "**The Maa Baglamukhi Sawa Lakh Jaap (125,000 recitations) and 36 Lakh Jaap are extensive multi-day mantra chanting anusthans performed under strict Vedic discipline to invoke ultimate divine protection.** These recitations are undertaken for individuals facing extreme adversity, such as false legal allegations, severe business losses, or persistent negative energies. Acharya Pt. Rudraksh Rajpurohit and a team of qualified Vedic Brahmins conduct these recitations with complete discipline, wearing yellow robes and using energized turmeric rosaries.",
      hi: "**माँ बगलामुखी सवा लाख (1,25,000) और 36 लाख मंत्र जाप अत्यंत गहन अनुष्ठानिक साधनाएँ हैं, जो बड़े संकटों के समय देवी माँ के अभेद्य संरक्षण को जाग्रत करने के लिए की जाती हैं।** यह जाप उन लोगों के लिए विशेष रूप से किया जाता है जो गंभीर अदालती मुकदमों, झूठे आरोपों, व्यापार में भारी नुकसान या अज्ञात नकारात्मक ऊर्जाओं से घिरे हों। आचार्य जी और उनके सहयोगी पुरोहित पीत वस्त्र धारण कर, हल्दी की पवित्र माला से पूर्ण नियमों के साथ यह जाप करते हैं।"
    }
  },
  {
    q: {
      en: "Can I book Maa Baglamukhi Havan online? How does it work for remote devotees?",
      hi: "क्या मैं माँ बगलामुखी हवन ऑनलाइन बुक कर सकता हूँ? दूर रहने वाले भक्तों के लिए यह कैसे काम करता है?"
    },
    a: {
      en: "**Yes, devotees worldwide can book and participate in the Maa Baglamukhi Havan online through a personalized virtual Sankalp (sacred resolution) performed by Acharya Ji.** Before the Havan begins, Acharya Ji connects with you directly via phone or video call to take your personal Sankalp, reciting your name, family details, and purpose of the ritual. The entire Havan is then conducted on your behalf at the ancient Siddh Peeth in Nalkheda Dham with the same scriptural purity as an in-person ritual, and the blessed offerings are sent to you.",
      hi: "**हाँ, जो भक्त व्यक्तिगत रूप से नलखेड़ा नहीं आ सकते, वे फोन या वीडियो कॉल पर आचार्य जी के माध्यम से संकल्प लेकर ऑनलाइन माँ बगलामुखी हवन में भाग ले सकते हैं।** हवन शुरू होने से पहले, आचार्य जी सीधे आपसे जुड़ते हैं और आपका नाम, गोत्र एवं उद्देश्य बोलकर संकल्प करवाते हैं। इसके बाद पूर्ण नियमों के साथ नलखेड़ा धाम के प्राचीन मंदिर में आपकी ओर से पूजा संपन्न की जाती है और पूजा का प्रसाद आपको भेज दिया जाता है।"
    }
  },
  {
    q: {
      en: "What is Nyayalay Vijay Puja and can it help me win my court case?",
      hi: "क्या न्यायालय विजय पूजा मेरे कोर्ट केस को जीतने में मदद कर सकती है?"
    },
    a: {
      en: "**Nyayalay Vijay Puja is a specialized Vedic ritual performed to invoke Maa Baglamukhi's Stambhan power to pacify legal disputes, false allegations, and hostility.** By aligning the spiritual energy of the devotee, the puja helps bring truth and fairness to the forefront, assisting in favorable resolutions. Acharya Ji performs this ritual at Nalkheda Dham with precise offerings tailored to the devotee's specific legal hurdles.",
      hi: "**न्यायालय विजय पूजा एक विशेष तांत्रिक और शास्त्रीय अनुष्ठान है, जो कानूनी मुकदमों में विरोधियों की दुर्भावना, झूठे साक्ष्यों और नकारात्मक गतिविधियों को शांत (स्तंभित) करने के लिए किया जाता है।** यह अनुष्ठान भक्त की आंतरिक ऊर्जा को मजबूत करता है और न्यायपूर्ण निर्णय में सहायक होता है। आचार्य जी नलखेड़ा धाम में भक्त की कुंडली और मुकदमे की परिस्थितियों के अनुसार शुभ मुहूर्त में इसे विधिपूर्वक संपन्न करते हैं।"
    }
  },
  {
    q: {
      en: "What other Vedic puja services does Acharya Ji offer at Nalkheda Dham?",
      hi: "आचार्य जी नलखेड़ा धाम में अन्य कौन सी वैदिक पूजा सेवाएं प्रदान करते हैं?"
    },
    a: {
      en: "**In addition to Maa Baglamukhi Havans, Acharya Ji offers various authentic Vedic ceremonies at Nalkheda Dham including Vyavahik Badha Nivaran, Santan Prapti Puja, and Lakshmi Prapti Havan.** He also conducts Pitra Dosh and Kaal Sarp Dosh remedies, planetary pacification (Navgraha Shanti), and business growth (Vyapar Vriddhi) rituals, ensuring that each follows sacred scriptural practices.",
      hi: "**माँ बगलामुखी हवन के अलावा, आचार्य जी नलखेड़ा धाम में कई अन्य प्रामाणिक वैदिक पूजाएं संपन्न करते हैं जैसे वैवाहिक बाधा निवारण, संतान प्राप्ति पूजा, और लक्ष्मी प्राप्ति हवन।** वे पितृ दोष, कालसर्प दोष निवारण, नवग्रह शांति और व्यापार वृद्धि पूजा भी पूर्ण विधि-विधान से संपन्न करते हैं।"
    }
  },
  {
    q: {
      en: "What is Siddh Peeth Maa Baglamukhi Mandir Nalkheda Dham and why is it spiritually significant?",
      hi: "सिद्ध पीठ माँ बगलामुखी मंदिर नलखेड़ा धाम क्या है और इसका आध्यात्मिक महत्व क्या है?"
    },
    a: {
      en: "**Siddh Peeth Maa Baglamukhi Mandir in Nalkheda is one of India's oldest and most spiritually charged temples, dating back to the Mahabharata era when Yudhisthira installed the deity.** The temple houses a self-manifested (Swayambhu) idol of the Tri-Shakti (Maa Baglamukhi, Maa Lakshmi, and Maa Saraswati), making it a powerful center of intense spiritual energy and swift divine blessings.",
      hi: "**नलखेड़ा में स्थित सिद्ध पीठ माँ बगलामुखी मंदिर भारत के सबसे प्राचीन और जाग्रत शक्ति केंद्रों में से एक है, जिसकी स्थापना महाभारत काल में पांडवों द्वारा की गई थी।** मंदिर में माँ बगलामुखी, माँ लक्ष्मी और माँ सरस्वती की स्वयंभू मूर्तियाँ एक साथ विराजमान हैं, जो इसे अत्यंत फलदायी और शक्तिशाली सिद्ध पीठ बनाती हैं।"
    }
  },
  {
    q: {
      en: "How can I reach Nalkheda Dham for darshan and puja?",
      hi: "दर्शन और पूजा के लिए मैं नलखेड़ा धाम कैसे पहुँच सकता हूँ?"
    },
    a: {
      en: "**Nalkheda Dham in Madhya Pradesh is easily accessible by air through Indore Airport (~150 km) or by train via Ujjain Junction (~100 km).** Regular buses and private cabs connect Nalkheda to both cities. Since special rituals require specific Muhurtas and materials, it is highly recommended to speak with Acharya Ji at +91 79095 97033 before planning your visit.",
      hi: "**मध्य प्रदेश में स्थित नलखेड़ा धाम हवाई मार्ग से इंदौर हवाई अड्डे (~150 किमी) या रेल मार्ग से उज्जैन जंक्शन (~100 किमी) के माध्यम से आसानी से पहुँचा जा सकता है।** यहाँ से मंदिर के लिए नियमित बसें और टैक्सियां उपलब्ध हैं। चूंकि विशेष अनुष्ठानों के लिए शुभ मुहूर्त और विशिष्ट सामग्रियों की आवश्यकता होती है, इसलिए आने से पहले आचार्य जी से +91 79095 97033 पर बात करने की सलाह दी जाती है।"
    }
  },
  {
    q: {
      en: "What is Vastu Shastra Paramarsh and how can Acharya Ji help?",
      hi: "वास्तु शास्त्र परामर्श क्या है और आचार्य जी इसमें कैसे मदद कर सकते हैं?"
    },
    a: {
      en: "**Vastu Shastra Paramarsh by Acharya Pt. Rudraksh Rajpurohit is a spiritual and architectural consultation to identify and correct energy blockages in your home, office, or business.** By harmonizing the five elements (Panchabhuta) as per Vedic Vastu principles, it helps resolve financial leaks, health issues, or family disputes without requiring destructive structural changes.",
      hi: "**आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा वास्तु शास्त्र परामर्श एक आध्यात्मिक एवं संरचनात्मक विश्लेषण है, जिसका उद्देश्य आपके निवास या व्यावसायिक स्थल में ऊर्जा का संतुलन स्थापित करना है।** वैदिक सिद्धांतों के अनुसार ऊर्जा प्रवाह को अनुकूल बनाकर, यह बिना किसी तोड़-फोड़ के घर में सुख-समृद्धि, उत्तम स्वास्थ्य और मानसिक शांति लाने में सहायक होता है।"
    }
  },
  {
    q: {
      en: "Is the puja process transparent and trustworthy? What can I expect after booking?",
      hi: "क्या पूजा प्रक्रिया पारदर्शी और विश्वसनीय है? बुकिंग के बाद मैं क्या उम्मीद कर सकता हूँ?"
    },
    a: {
      en: "**Yes, the booking and performing of every Havan or Puja under Acharya Ji is completely transparent, including a personal Sankalp and sending of sacred Prasad.** Once you contact Acharya Ji, he will consult your birth details or planetary alignments to suggest the appropriate ritual and Muhurta. The entire ritual is conducted with strict Vedic precision, and the blessed Prasad and Raksha Sutra are sent directly to your address.",
      hi: "**हाँ, आचार्य जी के मार्गदर्शन में होने वाली प्रत्येक पूजा पूर्ण शुचिता, सत्यता और शास्त्रीय मर्यादा के साथ अत्यंत पारदर्शी तरीके से संपन्न की जाती है।** संपर्क करने पर आचार्य जी आपकी कुंडली या ग्रह बाधाओं का अध्ययन कर उचित अनुष्ठान एवं शुभ मुहूर्त तय करते हैं। संपूर्ण अनुष्ठान के बाद, अभिमंत्रित रक्षा सूत्र, भस्म और प्रसाद सीधे आपके पते पर भेज दिया जाता है।"
    }
  }
];

// Helper function to render text with bold tags
const formatText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx} className="font-extrabold text-gold">{part.slice(2, -2)}</strong>;
    }
    // Handle bullet lists and line breaks
    if (part.includes("\n")) {
      return part.split("\n").map((line, lIdx) => (
        <span key={`${idx}-${lIdx}`} className="block my-1.5 pl-2">
          {line.startsWith("- ") ? <span className="inline-block mr-2 text-gold">•</span> : null}
          {line.startsWith("- ") ? line.slice(2) : line}
        </span>
      ));
    }
    return part;
  });
};

export default function FAQSection({ className = "" }: { className?: string }) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-12 md:py-20 bg-white border-t border-gray-100 relative overflow-hidden ${className}`}>
      {/* Decorative glows */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-gold/3 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-amber-50/20 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-sacred max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === "en" ? "Common Questions" : "सामान्य प्रश्न"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === "en" ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
          </h2>
          <p className="text-gray-600 text-xs md:text-sm font-medium max-w-xl mx-auto leading-relaxed">
            {lang === "en"
              ? "All your queries answered about Maa Baglamukhi Havan, Vedic Pujas, and booking processes at Nalkheda Dham."
              : "माँ बगलामुखी हवन, वैदिक पूजा और नलखेड़ा धाम में बुकिंग प्रक्रियाओं के बारे में आपके सभी प्रश्नों के उत्तर।"}
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden hover:border-gold/30 transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-cinzel font-bold text-gray-900 hover:text-gold transition-colors duration-300 cursor-pointer select-none"
                >
                  <span className="text-xs md:text-sm lg:text-base leading-snug pr-4">
                    {item.q[lang]}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-gold flex-shrink-0"
                  >
                    <FaChevronDown size={14} />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-gray-50 text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                        {formatText(item.a[lang])}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Contact Plaque */}
        <div className="mt-12 md:mt-16 bg-gradient-to-tr from-gold/5 to-orange-100/10 border border-gold/20 rounded-3xl p-6 text-center max-w-2xl mx-auto shadow-sm">
          <h4 className="text-sm md:text-base font-bold font-cinzel text-gray-900 mb-2">
            {lang === "en" ? "Still Have Questions?" : "अभी भी कोई प्रश्न है?"}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 font-semibold mb-4">
            {lang === "en"
              ? "Feel free to contact Acharya Pt. Rudraksh Rajpurohit directly for any customized spiritual guidance."
              : "किसी भी अनुकूलित आध्यात्मिक मार्गदर्शन के लिए सीधे आचार्य पं. रुद्राक्ष राजपुरोहित से संपर्क करें।"}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs font-bold text-gray-700">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <FaPhoneAlt className="text-gold" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
              <FaEnvelope className="text-gold" />
              <span>{SITE_CONFIG.email}</span>
            </a>
            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gold" />
              <span>{lang === "en" ? "Nalkheda Dham, MP" : "नलखेड़ा धाम, मध्य प्रदेश"}</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
