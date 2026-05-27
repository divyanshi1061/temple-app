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
      en: "Acharya Pt. Rudraksh Rajpurohit is a highly revered **Vedic Pandit and Baglamukhi Sadhak** based at **Siddh Peeth Maa Baglamukhi Mandir, Nalkheda Dham**, Madhya Pradesh. With decades of experience in **Tantra Sadhana**, **Vedic Anusthan**, and authentic havan rituals, he is widely regarded as the **best pandit for Baglamukhi Havan in Nalkheda**. He strictly adheres to pure Vedic scriptures, making every ritual spiritually potent and result-oriented.",
      hi: "आचार्य पं. रुद्राक्ष राजपुरोहित मध्य प्रदेश के नलखेड़ा धाम में पवित्र सिद्ध पीठ माँ बगलामुखी मंदिर के एक अत्यंत प्रतिष्ठित **वैदिक पंडित और बगलामुखी साधक** हैं। **तंत्र साधना**, **वैदिक अनुष्ठान** और प्रामाणिक हवन अनुष्ठानों में दशकों के अनुभव के साथ, उन्हें व्यापक रूप से **नलखेड़ा में बगलामुखी हवन के लिए सर्वश्रेष्ठ पंडित** माना जाता है। वे विशुद्ध रूप से वैदिक शास्त्रों का पालन करते हैं, जिससे प्रत्येक अनुष्ठान आध्यात्मिक रूप से शक्तिशाली और फलदायी बनता है।"
    }
  },
  {
    q: {
      en: "What is Maa Baglamukhi Havan and what are its benefits?",
      hi: "माँ बगलामुखी हवन क्या है और इसके क्या लाभ हैं?"
    },
    a: {
      en: "**Maa Baglamukhi Havan** is a powerful Tantric fire ritual performed by chanting the Baglamukhi Beej Mantra (*ॐ ह्लीं बगलामुखी*) with sacred offerings into the havan kund. It is believed to: **destroy enemies**, **remove evil eye (nazar dosha)**, grant **court case victory (Nyayalay Vijay)**, bring **protection from negative energies**, and **fulfill all desires**. Acharya Ji performs this havan at the energetically charged **Siddh Peeth Nalkheda Dham**.",
      hi: "**माँ बगलामुखी हवन** एक शक्तिशाली तांत्रिक अग्नि अनुष्ठान है जो पवित्र अग्नि कुंड में विशेष आहुतियों के साथ बगलामुखी बीज मंत्र (*ॐ ह्लीं बगलामुखी*) का जाप करके किया जाता है। ऐसा माना जाता है कि यह: **शत्रुओं का नाश** करता है, **बुरी नजर (नजर दोष) को दूर** करता है, **अदालती मामले में विजय (न्यायालय विजय)** दिलाता है, **नकारात्मक ऊर्जाओं से सुरक्षा** प्रदान करता है, और **सभी इच्छाओं को पूरा** करता है। आचार्य जी इस हवन को ऊर्जा से भरे **सिद्ध पीठ नलखेड़ा धाम** में संपन्न करते हैं।"
    }
  },
  {
    q: {
      en: "What is Maa Baglamukhi 36 Lakh Jaap and Sawa Lakh Jaap? Who should book it?",
      hi: "माँ बगलामुखी 36 लाख जाप और सवा लाख जाप क्या है? इसे किसे बुक करना चाहिए?"
    },
    a: {
      en: "The **Maa Baglamukhi 36 Lakh Jaap** and **Sawa Lakh Jaap** are extensive mantra chanting anusthans where the **Baglamukhi mantra** is recited lakhs of times with complete Vedic discipline. These are recommended for people facing severe **enemy problems, legal disputes, business losses, black magic effects**, or those seeking ultimate divine protection. You can **book Baglamukhi Jaap online** through Acharya Ji's website.",
      hi: "**माँ बगलामुखी 36 लाख जाप** और **सवा लाख जाप** व्यापक मंत्र जाप अनुष्ठान हैं जहाँ पूर्ण वैदिक अनुशासन के साथ **बगलामुखी मंत्र** का लाखों बार जाप किया जाता है। ये उन लोगों के लिए अनुशंसित हैं जो गंभीर **शत्रु समस्याओं, कानूनी विवादों, व्यावसायिक नुकसान, काले जादू के प्रभाव** का सामना कर रहे हैं या जो परम दिव्य सुरक्षा चाहते हैं। आप आचार्य जी की वेबसाइट के माध्यम से **बगलामुखी जाप ऑनलाइन बुक** कर सकते हैं।"
    }
  },
  {
    q: {
      en: "Can I book Maa Baglamukhi Havan online? How does it work for remote devotees?",
      hi: "क्या मैं माँ बगलामुखी हवन ऑनलाइन बुक कर सकता हूँ? दूर रहने वाले भक्तों के लिए यह कैसे काम करता है?"
    },
    a: {
      en: "Yes! Acharya Pt. Rudraksh Rajpurohit offers **Maa Baglamukhi Havan online booking** for devotees worldwide. The process involves an **online sankalp** (resolution taken on your behalf), after which the havan or anusthan is performed at **Nalkheda Dham Siddh Peeth** with full Vedic rituals. Devotees can connect via WhatsApp at **+91 79095 97033** or email **mabaglamukhi66@gmail.com** to schedule.",
      hi: "हाँ! आचार्य पं. रुद्राक्ष राजपुरोहित दुनिया भर के भक्तों के लिए **माँ बगलामुखी हवन ऑनलाइन बुकिंग** की सुविधा प्रदान करते हैं। इस प्रक्रिया में एक **ऑनलाइन संकल्प** (आपकी ओर से लिया गया संकल्प) शामिल है, जिसके बाद पूर्ण वैदिक अनुष्ठानों के साथ **नलखेड़ा धाम सिद्ध पीठ** में हवन या अनुष्ठान किया जाता है। भक्त बुकिंग के लिए व्हाट्सएप पर **+91 79095 97033** या ईमेल **mabaglamukhi66@gmail.com** पर संपर्क कर सकते हैं।"
    }
  },
  {
    q: {
      en: "What is Nyayalay Vijay Puja and can it help me win my court case?",
      hi: "क्या न्यायालय विजय पूजा मेरे कोर्ट केस को जीतने में मदद कर सकती है?"
    },
    a: {
      en: "**Nyayalay Vijay Puja** is a specialized Tantric ritual performed to invoke Maa Baglamukhi's power to **stambhan** (paralyze) the opposition and ensure **court case victory**. Devotees from across India have reported favorable legal outcomes after this puja. Acharya Ji performs it with full **Vedic precision at Siddh Peeth Nalkheda**. Contact him for a personalized consultation based on your specific legal matter.",
      hi: "**न्यायालय विजय पूजा** एक विशेष तांत्रिक अनुष्ठान है जो विरोधियों को **स्तंभित** करने और **अदालती मामले में जीत** सुनिश्चित करने के लिए माँ बगलामुखी की शक्ति का आह्वान करने के लिए किया जाता है। पूरे भारत से भक्तों ने इस पूजा के बाद अनुकूल कानूनी परिणामों का अनुभव किया है। आचार्य जी इसे **सिद्ध पीठ नलखेड़ा में पूर्ण वैदिक सटीकता** के साथ संपन्न करते हैं। अपने विशिष्ट कानूनी मामले के आधार पर व्यक्तिगत परामर्श के लिए उनसे संपर्क करें।"
    }
  },
  {
    q: {
      en: "What other Vedic puja services does Acharya Ji offer at Nalkheda Dham?",
      hi: "आचार्य जी नलखेड़ा धाम में अन्य कौन सी वैदिक पूजा सेवाएं प्रदान करते हैं?"
    },
    a: {
      en: "Acharya Pt. Rudraksh Rajpurohit offers a wide range of **Vedic and Tantric puja services** including:\n- **Vyavahik Badha Nivaran** (marriage obstacles removal)\n- **Santan Prapti Puja** (blessings for a child)\n- **Lakshmi Prapti Havan** (wealth and prosperity)\n- **Nav Graha Shanti Puja**\n- **Pitra Dosh & Kaal Sarp Dosh Nivaran**\n- **Vashikaran & Akarshan Puja**\n- **Vyapar Vriddhi Havan** (business growth)\n- **Shatru Nashak / Shatru Stambhan Havan**\n- **Moh Ucchatan Puja**\n- **Vastu Shastra Paramarsh** (Vastu consultation)",
      hi: "आचार्य पं. रुद्राक्ष राजपुरोहित **वैदिक और तांत्रिक पूजा सेवाओं** की एक विस्तृत श्रृंखला प्रदान करते हैं जिसमें शामिल हैं:\n- **वैवाहिक बाधा निवारण** (विवाह की बाधाओं को दूर करना)\n- **संतान प्राप्ति पूजा** (संतान सुख के लिए आशीर्वाद)\n- **लक्ष्मी प्राप्ति हवन** (धन और समृद्धि)\n- **नवग्रह शांति पूजा**\n- **पितृ दोष और काल सर्प दोष निवारण**\n- **वशीकरण और आकर्षण पूजा**\n- **व्यापार वृद्धि हवन** (व्यवसाय में वृद्धि)\n- **शत्रु नाशक / शत्रु स्तंभन हवन**\n- **मोह उच्चाटन पूजा**\n- **वास्तु शास्त्र परामर्श** (वास्तु सलाह)"
    }
  },
  {
    q: {
      en: "What is Siddh Peeth Maa Baglamukhi Mandir Nalkheda Dham and why is it spiritually significant?",
      hi: "सिद्ध पीठ माँ बगलामुखी मंदिर नलखेड़ा धाम क्या है और इसका आध्यात्मिक महत्व क्या है?"
    },
    a: {
      en: "**Siddh Peeth Maa Baglamukhi Mandir Nalkheda Dham** is one of the most powerful **Baglamukhi Shakti Peethas** in India, situated on the banks of the sacred **Lakhundar River** in Nalkheda, District Agar Malwa, Madhya Pradesh. Dating back to the **Pandava era**, this ancient temple is world-renowned for its intense **Vedic Pujas and Tantra Havans**. It is believed that prayers offered here yield **swift and powerful results** due to the immense spiritual energy of the Siddh Peeth.",
      hi: "**सिद्ध पीठ माँ बगलामुखी मंदिर नलखेड़ा धाम** भारत में सबसे शक्तिशाली **बगलामुखी शक्ति पीठों** में से एक है, जो मध्य प्रदेश के आगर मालवा जिले के नलखेड़ा में पवित्र **लखूंदर नदी** के तट पर स्थित है। **पांडव काल** का यह प्राचीन मंदिर अपने गहन **वैदिक पूजा और तंत्र हवन** के लिए दुनिया भर में प्रसिद्ध है। ऐसा माना जाता है कि सिद्ध पीठ की असीम आध्यात्मिक ऊर्जा के कारण यहाँ की गई प्रार्थनाओं के **शीघ्र और शक्तिशाली परिणाम** मिलते हैं।"
    }
  },
  {
    q: {
      en: "How can I reach Nalkheda Dham for darshan and puja?",
      hi: "दर्शन और पूजा के लिए मैं नलखेड़ा धाम कैसे पहुँच सकता हूँ?"
    },
    a: {
      en: "**Nalkheda Dham, MP 465445** is well-connected:\n- **By Air:** Nearest airport is **Devi Ahilya Bai Holkar Airport, Indore** (~150 km)\n- **By Train:** Nearest major station is **Ujjain Junction** (~100 km)\n- **By Road:** Easily accessible from **Ujjain (100 km), Indore (150 km), and Bhopal (220 km)**\n\nFor prior appointment or **puja booking at Nalkheda Dham**, call or WhatsApp: **+91 79095 97033**",
      hi: "**नलखेड़ा धाम, मध्य प्रदेश 465445** अच्छी तरह से जुड़ा हुआ है:\n- **हवाई मार्ग:** निकटतम हवाई अड्डा **देवी अहिल्या बाई होलकर हवाई अड्डा, इंदौर** (~150 किमी) है।\n- **ट्रेन द्वारा:** निकटतम प्रमुख स्टेशन **उज्जैन जंक्शन** (~100 किमी) है।\n- **सड़क मार्ग:** **उज्जैन (100 किमी), इंदौर (150 किमी), और भोपाल (220 किमी)** से सड़क मार्ग द्वारा आसानी से पहुँचा जा सकता है।\n\nपूर्व नियुक्ति या **नलखेड़ा धाम में पूजा बुकिंग** के लिए कॉल या व्हाट्सएप करें: **+91 79095 97033**"
    }
  },
  {
    q: {
      en: "What is Vastu Shastra Paramarsh and how can Acharya Ji help?",
      hi: "वास्तु शास्त्र परामर्श क्या है और आचार्य जी इसमें कैसे मदद कर सकते हैं?"
    },
    a: {
      en: "**Vastu Shastra Paramarsh** by Acharya Pt. Rudraksh Rajpurohit is an expert consultation to identify and correct **Vastu doshas** in your home, office, or business premises. By harmonizing energy flows as per **Vedic Vastu principles**, it helps bring **prosperity, health, and peace** to the household. Online consultations are also available.",
      hi: "आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा **वास्तु शास्त्र परामर्श** आपके घर, कार्यालय या व्यावसायिक परिसर में **वास्तु दोषों** की पहचान करने और उन्हें ठीक करने के लिए एक विशेषज्ञ परामर्श है। **वैदिक वास्तु सिद्धांतों** के अनुसार ऊर्जा प्रवाह को सुसंगत बनाकर, यह परिवार में **समृद्धि, स्वास्थ्य और शांति** लाने में मदद करता है। ऑनलाइन परामर्श भी उपलब्ध हैं।"
    }
  },
  {
    q: {
      en: "Is the puja process transparent and trustworthy? What can I expect after booking?",
      hi: "क्या पूजा प्रक्रिया पारदर्शी और विश्वसनीय है? बुकिंग के बाद मैं क्या उम्मीद कर सकता हूँ?"
    },
    a: {
      en: "Absolutely. Acharya Ji follows a **secure and transparent booking process**. Once you connect via phone, WhatsApp, or the inquiry form on the website, you will receive complete details about the puja procedure, timing (**muhurta**), sankalp process, and expected outcomes. The entire **Maa Baglamukhi Havan or Anusthan** is conducted at **Siddh Peeth Nalkheda Dham** with full scriptural compliance. Many devotees across India and abroad have experienced life-changing results.",
      hi: "बिल्कुल। आचार्य जी एक **सुरक्षित और पारदर्शी बुकिंग प्रक्रिया** का पालन करते हैं। एक बार जब आप फोन, व्हाट्सएप या वेबसाइट पर पूछताछ फॉर्म के माध्यम से जुड़ते हैं, तो आपको पूजा प्रक्रिया, समय (**मुहूर्त**), संकल्प प्रक्रिया और अपेक्षित परिणामों के बारे में पूरी जानकारी दी जाएगी। संपूर्ण **माँ बगलामुखी हवन या अनुष्ठान** पूर्ण शास्त्रीय अनुपालन के साथ **सिद्ध पीठ नलखेड़ा धाम** में आयोजित किया जाता है। भारत और विदेशों के कई भक्तों ने जीवन बदलने वाले परिणामों का अनुभव किया है।"
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
                    {idx + 1}. {item.q[lang]}
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
