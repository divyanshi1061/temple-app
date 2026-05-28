"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaOm } from "react-icons/fa";

export default function HindiSEOSection() {
  const { lang } = useLanguage();

  return (
    <section className="relative py-12 md:py-20 bg-white border-t border-gray-100 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sacred-pattern opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-sacred max-w-5xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <span className="inline-flex items-center text-gold text-[10px] tracking-[0.2em] uppercase font-bold bg-gold/10 px-3.5 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm mb-3">
            {lang === "en" ? "Sacred Knowledge" : "पवित्र ज्ञान"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 font-cinzel leading-tight mb-3">
            {lang === "en" ? "Divine Teachings & Significance" : "दिव्य शिक्षाएं एवं महत्व"}
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-4" />
        </div>

        <div className="space-y-10 md:space-y-14">

          {/* Block 1: Baglamukhi Beej Mantra */}
          <motion.div
            className="bg-gradient-to-tr from-gold/5 to-amber-50/30 border border-gold/15 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <FaOm className="text-lg" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold font-cinzel text-gray-900">
                {lang === "en" ? "Maa Baglamukhi Beej Mantra" : "माँ बगलामुखी बीज मंत्र"}
              </h3>
            </div>

            {/* Mantra Display */}
            <div className="text-center bg-white/80 border border-gold/20 rounded-xl py-4 px-3 mb-5 shadow-sm">
              <p className="text-lg md:text-2xl font-bold text-gold font-cinzel tracking-wider leading-relaxed">
                ॐ ह्लीं बगलामुखी सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा
              </p>
            </div>

            <div className="text-sm md:text-base text-gray-700 leading-relaxed font-medium space-y-3">
              <p>
                {lang === "en"
                  ? "The Baglamukhi Beej Mantra (ॐ ह्लीं) is one of the most potent mantras in Tantric traditions. Goddess Baglamukhi, the eighth Mahavidya, is also known as 'Pitambara Devi' because of her yellow-robed form. This mantra is specifically chanted to paralyze (Stambhan) the speech, movement, and intellect of enemies and hostile forces. It is widely used by sadhaks across India for court case victory, shatru nashak, and protection from black magic."
                  : "बगलामुखी बीज मंत्र (ॐ ह्लीं) तांत्रिक परंपराओं में सबसे शक्तिशाली मंत्रों में से एक है। देवी बगलामुखी, आठवीं महाविद्या, को उनके पीले वस्त्रों के कारण 'पीताम्बरा देवी' के नाम से भी जाना जाता है। यह मंत्र विशेष रूप से शत्रुओं और शत्रुतापूर्ण शक्तियों की वाणी, गति और बुद्धि को स्तंभित (पंगु) करने के लिए जपा जाता है। इसका उपयोग भारत भर के साधकों द्वारा न्यायालय विजय, शत्रु नाश और काले जादू से सुरक्षा के लिए व्यापक रूप से किया जाता है।"}
              </p>
              <p>
                {lang === "en"
                  ? "At Siddh Peeth Nalkheda Dham, Acharya Pt. Rudraksh Rajpurohit performs Sawa Lakh (1,25,000) and 36 Lakh Baglamukhi Mantra Jaap with extreme Vedic discipline. The mantra jaap is performed with specific Tantrokt Samagri, under auspicious muhurta, ensuring maximum spiritual potency and divine protection for the devotee."
                  : "सिद्ध पीठ नलखेड़ा धाम में, आचार्य पं. रुद्राक्ष राजपुरोहित सवा लाख (1,25,000) और 36 लाख बगलामुखी मंत्र जाप अत्यंत वैदिक अनुशासन के साथ संपन्न करते हैं। मंत्र जाप विशिष्ट तंत्रोक्त सामग्री के साथ, शुभ मुहूर्त में किया जाता है, जिससे भक्त को अधिकतम आध्यात्मिक शक्ति और दिव्य सुरक्षा सुनिश्चित होती है।"}
              </p>
            </div>
          </motion.div>

          {/* Block 2: Nalkheda Dham Ka Mahatva */}
          <motion.div
            className="bg-gradient-to-tr from-amber-50/30 to-gold/5 border border-gold/15 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <FaOm className="text-lg" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold font-cinzel text-gray-900">
                {lang === "en" ? "Significance of Nalkheda Dham (नलखेड़ा धाम का महत्व)" : "नलखेड़ा धाम का महत्व"}
              </h3>
            </div>

            <div className="text-sm md:text-base text-gray-700 leading-relaxed font-medium space-y-3">
              <p>
                {lang === "en"
                  ? "Siddh Peeth Maa Baglamukhi Temple at Nalkheda, Agar Malwa, Madhya Pradesh is one of the most ancient and spiritually potent Shakti Peethas in India. Situated on the banks of the sacred Lakhundar River, this temple dates back to the Pandava era as mentioned in the Kalika Purana. The temple houses the divine Tri-Shakti — Maa Baglamukhi (center), Maa Lakshmi (right), and Maa Saraswati (left)."
                  : "नलखेड़ा, आगर मालवा, मध्य प्रदेश में स्थित सिद्ध पीठ माँ बगलामुखी मंदिर भारत के सबसे प्राचीन और आध्यात्मिक रूप से शक्तिशाली शक्ति पीठों में से एक है। पवित्र लखुंदर नदी के तट पर स्थित यह मंदिर कालिका पुराण में वर्णित पांडव कालीन है। मंदिर में दिव्य त्रि-शक्ति विराजमान हैं — माँ बगलामुखी (मध्य में), माँ लक्ष्मी (दाईं ओर) और माँ सरस्वती (बाईं ओर)।"}
              </p>
              <p>
                {lang === "en"
                  ? "In the temple courtyard, sacred trees including Bel, Champa, Neem, and Peepal grow intertwined from a single root — a divine phenomenon found nowhere else. Thousands of devotees from across India visit Nalkheda Dham annually seeking blessings for court case victory, enemy protection, business growth, and removal of life obstacles. The temple's spiritual potency is believed to amplify the effects of every Havan and Anusthan performed within its premises."
                  : "मंदिर के प्रांगण में बेल, चंपा, नीम और पीपल के पवित्र वृक्ष एक ही जड़ से जुड़े हुए उगते हैं — एक ऐसा दिव्य चमत्कार जो अन्यत्र कहीं नहीं मिलता। पूरे भारत से हजारों भक्त प्रतिवर्ष नलखेड़ा धाम में न्यायालय विजय, शत्रु सुरक्षा, व्यापार वृद्धि और जीवन की बाधाओं के निवारण के लिए आशीर्वाद लेने आते हैं। माना जाता है कि मंदिर की आध्यात्मिक शक्ति इसके परिसर में किए गए प्रत्येक हवन और अनुष्ठान के प्रभाव को कई गुना बढ़ा देती है।"}
              </p>
            </div>
          </motion.div>

          {/* Block 3: Acharya Ji Bio */}
          <motion.div
            className="bg-gradient-to-tr from-gold/5 to-orange-50/20 border border-gold/15 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                <FaOm className="text-lg" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold font-cinzel text-gray-900">
                {lang === "en" ? "About Acharya Pt. Rudraksh Rajpurohit" : "आचार्य पं. रुद्राक्ष राजपुरोहित के बारे में"}
              </h3>
            </div>

            <div className="text-sm md:text-base text-gray-700 leading-relaxed font-medium space-y-3">
              <p>
                {lang === "en"
                  ? "Acharya Pt. Rudraksh Rajpurohit is a highly revered Vedic Priest, Bagalmukhi Sadhak, and Tantric scholar based at the sacred Siddh Peeth Maa Baglamukhi Temple, Nalkheda Dham, Madhya Pradesh. With decades of dedication to Vedic Sadhana and Tantra, he has guided thousands of devotees through transformative rituals including Baglamukhi Havan, Lal Mirchi Havan, Nyayalay Vijay Puja, and Shatru Stambhan."
                  : "आचार्य पं. रुद्राक्ष राजपुरोहित मध्य प्रदेश के पवित्र सिद्ध पीठ माँ बगलामुखी मंदिर, नलखेड़ा धाम में स्थित एक अत्यंत प्रतिष्ठित वैदिक पुजारी, बगलामुखी साधक और तांत्रिक विद्वान हैं। वैदिक साधना और तंत्र के प्रति दशकों के समर्पण के साथ, उन्होंने बगलामुखी हवन, लाल मिर्ची हवन, न्यायालय विजय पूजा और शत्रु स्तंभन सहित परिवर्तनकारी अनुष्ठानों के माध्यम से हजारों भक्तों का मार्गदर्शन किया है।"}
              </p>
              <p>
                {lang === "en"
                  ? "He strictly follows authentic Vedic scriptures and uses only pure Tantrokt Samagri (prescribed offerings) in every ritual. Known for his compassion and spiritual integrity, Acharya Ji offers both in-person and online Havan and Anusthan services for devotees across India and abroad. Whether you need Vashikaran, Vyapar Vraddhi, Santan Prapti, Maha Mrityunjay Anusthan, or any other Vedic remedy — Acharya Pt. Rudraksh Rajpurohit provides personalized guidance with guaranteed spiritual purity."
                  : "वे प्रत्येक अनुष्ठान में प्रामाणिक वैदिक शास्त्रों का सख्ती से पालन करते हैं और केवल शुद्ध तंत्रोक्त सामग्री (निर्धारित आहुतियाँ) का उपयोग करते हैं। अपनी करुणा और आध्यात्मिक सत्यनिष्ठा के लिए जाने जाने वाले आचार्य जी भारत और विदेशों के भक्तों के लिए व्यक्तिगत और ऑनलाइन दोनों प्रकार की हवन और अनुष्ठान सेवाएं प्रदान करते हैं। चाहे आपको वशीकरण, व्यापार वृद्धि, संतान प्राप्ति, महामृत्युंजय अनुष्ठान या कोई अन्य वैदिक उपाय चाहिए — आचार्य पं. रुद्राक्ष राजपुरोहित गारंटीड आध्यात्मिक शुद्धता के साथ व्यक्तिगत मार्गदर्शन प्रदान करते हैं।"}
              </p>
              <p className="text-xs text-gray-500 font-bold mt-4">
                {lang === "en"
                  ? "📞 Contact: +91 79095 97033 | ✉ Email: mabaglamukhi66@gmail.com | 📍 Nalkheda, Agar Malwa, MP 465445"
                  : "📞 संपर्क: +91 79095 97033 | ✉ ईमेल: mabaglamukhi66@gmail.com | 📍 नलखेड़ा, आगर मालवा, मध्य प्रदेश 465445"}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
