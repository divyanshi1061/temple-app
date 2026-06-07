"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaOm } from "react-icons/fa";
import Image from "next/image";

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
                  ? "**Summary: Chanting the sacred Beej Mantra (ॐ ह्लीं) with yellow turmeric beads under correct guidance invokes the protective grace of Pitambara Devi.** I guide devotees in the precise Vedic discipline of chanting this potent Beej Mantra. Goddess Baglamukhi, the eighth Mahavidya, represents the divine cosmic force of stambhan—the quiet power that silences negative criticism, halts hostile conspiracies, and pacifies legal disputes. By practicing this recitation with purity, devotees find mental strength and protection from unseen adversarial forces."
                  : "**सारांश: एक योग्य मार्गदर्शक के तहत हल्दी की पवित्र माला से मंत्र का जाप करने से देवी का सुरक्षा चक्र जाग्रत होता है।** मैं भक्तों को इस अत्यंत प्रभावशाली बीज मंत्र (ॐ ह्लीं) के सही जप विधान और शुचिता के नियमों का अभ्यास कराता हूँ। अष्टम महाविद्या माँ बगलामुखी ब्रह्मांड की उस शक्ति का प्रतीक हैं जो शत्रुओं की नकारात्मक वाणी, दुर्भावना और अनुचित गतिविधियों को शांत (स्तंभित) करती है। पूर्ण निष्ठा के साथ इस मंत्र का आश्रय लेने से भक्तों को अदालती मामलों, व्यावसायिक ईर्ष्या और मानसिक चिंताओं से मुक्ति मिलती है।"}
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="lg:col-span-7 text-sm md:text-base text-gray-700 leading-relaxed font-medium space-y-3">
                <p>
                  {lang === "en"
                    ? "**Summary: Situated in Nalkheda, Agar Malwa, Madhya Pradesh, the Siddh Peeth Maa Baglamukhi Temple is one of India's most ancient and spiritually powerful Goddess temples.** Our temple stands on the sacred banks of the Lakhundar River (ancient Lakshmana River) in Madhya Pradesh, carrying an aura that has drawn seekers for millennia. As documented in ancient chronicles, this sanctum is unique because the Tri-Shakti—Maa Baglamukhi, Maa Lakshmi, and Maa Saraswati—are worshiped together in their self-manifested forms. It is here that the Pandavas sat in silent meditation before the battle of Kurukshetra, seeking the strength to overcome their formidable adversaries."
                    : "**सारांश: नलखेड़ा, आगर मालवा, मध्य प्रदेश में स्थित सिद्ध पीठ माँ बगलामुखी मंदिर भारत के सबसे प्राचीन और आध्यात्मिक रूप से शक्तिशाली देवी मंदिरों में से एक है।** यह पावन मंदिर मध्य प्रदेश के नलखेड़ा में प्रवाहित पवित्र लखुंदर नदी (प्राचीन लक्ष्मणा नदी) के तट पर स्थित है, जो हजारों वर्षों से साधकों के लिए श्रद्धा का केंद्र रहा है। शास्त्रों के अनुसार, इस सिद्ध पीठ में त्रि-शक्ति—माँ बगलामुखी, माँ लक्ष्मी और माँ सरस्वती एक ही वेदी पर विराजमान हैं। महाभारत युद्ध से पूर्व, विषम परिस्थितियों में पांडवों ने इसी स्थान पर अनुष्ठान कर विजयश्री का आशीर्वाद प्राप्त किया था।"}
                </p>
                <p>
                  {lang === "en"
                    ? "In our temple courtyard, you will witness a divine phenomenon: sacred trees of Bel, Champa, Neem, and Peepal all grow conjoined from a single root. Thousands of devotees journey to Nalkheda Dham every year to seek blessings for business growth, debt relief, health issues, and legal resolution. The high spiritual vibration of this land amplifies the impact of every havan and anusthan we perform."
                    : "हमारे मंदिर के प्रांगण में एक अद्भुत प्राकृतिक चमत्कार दिखाई देता है, जहाँ बेल, चंपा, नीम और पीपल के पवित्र वृक्ष एक ही जड़ से जुड़े उग रहे हैं। हर वर्ष हजारों श्रद्धालु व्यापारिक उन्नति, ऋण मुक्ति, आरोग्य और अदालती विजय के लिए यहाँ आते हैं। इस भूमि की पवित्र ऊर्जा हमारे द्वारा किए जाने वाले प्रत्येक हवन और अनुष्ठान के प्रभाव को कई गुना बढ़ा देती है।"}
                </p>
              </div>
              <div className="lg:col-span-5 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-gold/25 bg-gray-50/50">
                  <Image
                    src="/baglamukhi-anusthan-new.webp"
                    alt="Maa Baglamukhi Anusthan"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
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
                  ? "**Summary: Acharya Pt. Rudraksh Rajpurohit dedicates his life to performing authentic Vedic Havans and guiding devotees through complex life crises.** Carrying forward the sacred traditions of my ancestors, I have devoted my life to serving Maa Baglamukhi and mastering the scriptures. I assist devotees from all walks of life by conducting traditional Vedic Pujas and Havans, ensuring that each mantra is chanted with absolute phonetic accuracy and pure intent to resolve planetary afflictions, legal troubles, and emotional blockages."
                  : "**सारांश: आचार्य पं. रुद्राक्ष राजपुरोहित पूर्ण शास्त्रीय शुद्धता के साथ हवन संपन्न करने और श्रद्धालुओं को संकटों से उभारने के लिए समर्पित हैं।** अपने पूर्वजों की पवित्र गुरु-शिष्य परंपरा का निर्वहन करते हुए, मैंने अपना जीवन माँ बगलामुखी की सेवा और शास्त्रों के अध्ययन में समर्पित किया है। मैं देश-विदेश के भक्तों की सहायता के लिए शास्त्र-सम्मत वैदिक पूजा और हवन संपन्न करता हूँ, जिसमें प्रत्येक मंत्रोच्चार पूर्ण स्वर-शुद्धि और सात्विक संकल्प के साथ किया जाता है, ताकि उन्हें ग्रह बाधाओं, शत्रु बाधा और मानसिक तनाव से मुक्ति मिल सके।"}
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
