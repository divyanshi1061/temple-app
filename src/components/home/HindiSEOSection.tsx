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
                {lang === "en" ? "How to Chant the Maa Baglamukhi Beej Mantra?" : "माँ बगलामुखी बीज मंत्र का जाप कैसे करें?"}
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
                  ? "**Summary: Chanting the Beej Mantra (ॐ ह्लीं) with yellow turmeric beads under the guidance of a qualified Pandit activates its protective shield.** As a dedicated sadhak at Siddh Peeth Nalkheda Dham, I guide devotees on how to correctly chant the Beej Mantra (ॐ ह्लीं). Goddess Baglamukhi, the eighth Mahavidya, is also known as 'Pitambara Devi' (the yellow-robed Mother). This mantra is chanted to paralyze (Stambhan) the malicious speech, movement, and negative intentions of adversaries. Devotees throughout India use this practice to secure victory in long-standing legal cases, destroy enemy plots, and seek protection from black magic."
                  : "**सारांश: एक योग्य पंडित के मार्गदर्शन में हल्दी की माला से बीज मंत्र (ॐ ह्लीं) का जाप करने से सुरक्षा कवच सक्रिय होता है।** सिद्ध पीठ नलखेड़ा धाम में एक साधक के रूप में, मैं भक्तों को बीज मंत्र (ॐ ह्लीं) के सही जप विधान का मार्गदर्शन करता हूँ। देवी बगलामुखी, जो आठवीं महाविद्या हैं, उन्हें पीले वस्त्रों के कारण 'पीताम्बरा देवी' भी कहा जाता है। यह मंत्र विशेष रूप से शत्रुओं की कुत्सित वाणी, दुर्भावना और गतिविधियों को स्तंभित (शांत) करने के लिए जपा जाता है। भारत भर के श्रद्धालु न्यायालयों में विजय, शत्रु बाधा से मुक्ति और नकारात्मक शक्तियों से सुरक्षा के लिए इस साधना का आश्रय लेते हैं।"}
              </p>
              <p>
                {lang === "en"
                  ? "At our temple, we perform the Sawa Lakh (1,25,000) and 36 Lakh Baglamukhi Mantra Jaap under strict Vedic discipline. I lead our team of learned scholars in conducting these recitations with energized Tantrokt samagri under astrologically auspicious muhurtas, ensuring that the devotee receives maximum spiritual energy and divine safety."
                  : "हमारे सिद्ध पीठ में, हम अत्यंत कड़े वैदिक अनुशासन के साथ सवा लाख (1,25,000) और 36 लाख बगलामुखी मंत्र जाप अनुष्ठान संपन्न करते हैं। मैं स्वयं हमारे योग्य पुरोहितों के साथ शुभ मुहूर्त में अभिमंत्रित तंत्रोक्त सामग्रियों द्वारा यह जाप करता हूँ, जिससे भक्त को माँ की असीम सुरक्षा और ऊर्जा प्राप्त हो सके।"}
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
                {lang === "en" ? "Why is Siddh Peeth Nalkheda Dham so spiritually powerful?" : "सिद्ध पीठ नलखेड़ा धाम आध्यात्मिक रूप से इतना शक्तिशाली क्यों है?"}
              </h3>
            </div>

            <div className="text-sm md:text-base text-gray-700 leading-relaxed font-medium space-y-3">
              <p>
                {lang === "en"
                  ? "**Summary: Nalkheda Dham is an ancient, self-manifested Siddh Peeth situated on the Lakhundar River where Lord Krishna advised the Pandavas to perform Baglamukhi Sadhana.** Our temple is situated on the sacred banks of the Lakhundar River (ancient Lakshmana River) in Nalkheda, Madhya Pradesh, representing one of the oldest Shakti Peethas in India. According to the *Kalika Purana*, the divine Tri-Shakti—Maa Baglamukhi, Maa Lakshmi, and Maa Saraswati—reside here together. The self-manifested idol dates back to the Dwapara Yuga. When the Pandavas faced their greatest crisis before the Kurukshetra war, Lord Krishna personally directed them to perform sadhana here to secure victory."
                  : "**सारांश: नलखेड़ा धाम लखुंदर नदी के तट पर स्थित एक प्राचीन सिद्ध पीठ है, जहाँ भगवान श्रीकृष्ण ने पांडवों को महाभारत युद्ध में विजय के लिए बगलामुखी साधना करने का निर्देश दिया था।** हमारा यह मंदिर मध्य प्रदेश के नलखेड़ा में पवित्र लखुंदर नदी (प्राचीन लक्ष्मणा नदी) के पावन तट पर स्थित है, जो भारत के सबसे प्राचीन और जाग्रत शक्तिपीठों में से एक है। *कालिका पुराण* के अनुसार, यहाँ त्रि-शक्ति—माँ बगलामुखी, माँ लक्ष्मी और माँ सरस्वती पिंडी रूप में विराजमान हैं। द्वापर युग में जब पांडवों पर बड़ा संकट आया, तब स्वयं भगवान श्रीकृष्ण ने उन्हें यहाँ विजय साधना करने का मार्गदर्शन दिया था।"}
              </p>
              <p>
                {lang === "en"
                  ? "In our temple courtyard, you will witness a divine phenomenon: sacred trees of Bel, Champa, Neem, and Peepal all grow conjoined from a single root. Thousands of devotees journey to Nalkheda Dham every year to seek blessings for business growth, debt relief, health issues, and legal resolution. The high spiritual vibration of this land amplifies the impact of every havan and anusthan we perform."
                  : "हमारे मंदिर के प्रांगण में एक अद्भुत प्राकृतिक चमत्कार दिखाई देता है, जहाँ बेल, चंपा, नीम और पीपल के पवित्र वृक्ष एक ही जड़ से जुड़े उग रहे हैं। हर वर्ष हजारों श्रद्धालु व्यापारिक उन्नति, ऋण मुक्ति, आरोग्य और अदालती विजय के लिए यहाँ आते हैं। इस भूमि की पवित्र ऊर्जा हमारे द्वारा किए जाने वाले प्रत्येक हवन और अनुष्ठान के प्रभाव को कई गुना बढ़ा देती है।"}
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
                {lang === "en" ? "Who is Acharya Pt. Rudraksh Rajpurohit?" : "आचार्य पं. रुद्राक्ष राजपुरोहित कौन हैं?"}
              </h3>
            </div>

            <div className="text-sm md:text-base text-gray-700 leading-relaxed font-medium space-y-3">
              <p>
                {lang === "en"
                  ? "**Summary: Acharya Pt. Rudraksh Rajpurohit is a traditional Vedic Priest and Tantric scholar dedicated to preserving scriptural purity at Maa Baglamukhi Siddh Peeth.** I am Acharya Pt. Rudraksh Rajpurohit, a dedicated servant and priest at the Siddh Peeth Maa Baglamukhi Temple. Carrying forward the sacred legacy of our ancestors, I have dedicated decades to the study and practice of Vedic sadhana and Tantra. I help devotees navigate life's challenges by conducting authentic rituals like the Baglamukhi Havan, Lal Mirchi Havan, Nyayalay Vijay Puja, and Shatru Stambhan."
                  : "**सारांश: आचार्य पं. रुद्राक्ष राजपुरोहित माँ बगलामुखी सिद्ध पीठ में शास्त्रीय शुद्धता बनाए रखने के लिए समर्पित एक पारंपरिक वैदिक पुजारी और तांत्रिक विद्वान हैं।** मैं, आचार्य पं. रुद्राक्ष राजपुरोहित, सिद्ध पीठ माँ बगलामुखी मंदिर में पीढ़ियों से चली आ रही परंपरा का निर्वहन करने वाला एक विनम्र पुरोहित और साधक हूँ। दशकों से वैदिक साधना और तंत्र के अध्ययन में लीन रहते हुए, मैंने देश-विदेश के हजारों श्रद्धालुओं का मार्गदर्शन किया है। मैं उनके जीवन की समस्याओं के निवारण के लिए बगलामुखी हवन, उग्र लाल मिर्ची हवन, न्यायालय विजय पूजा और शत्रु स्तंभन जैसे वैदिक अनुष्ठानों का संचालन करता हूँ।"}
              </p>
              <p>
                {lang === "en"
                  ? "I strictly adhere to the guidelines of the scriptures, using only pure, authentic Tantrokt samagri in every ceremony. Whether you require guidance for relationship resolution, business expansion, family protection, or planetary remedies, I provide personal consultations and perform these pujas both in-person and online with absolute spiritual dedication."
                  : "मैं प्रत्येक अनुष्ठान में पूर्ण शुद्धता का ध्यान रखता हूँ और केवल शास्त्रों में वर्णित पीत एवं तंत्रोक्त पूजन सामग्रियों का ही उपयोग करता हूँ। चाहे आपको वैवाहिक कलह, व्यापारिक रुकावटों, शत्रु भय या ग्रह बाधाओं के निवारण के लिए उपाय चाहिए—मैं व्यक्तिगत रूप से या ऑनलाइन माध्यम से पूर्ण वैदिक निष्ठा के साथ पूजा संपन्न कर आपका मार्गदर्शन करता हूँ।"}
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
