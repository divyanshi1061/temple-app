"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaOm } from "react-icons/fa";

export default function TermsPage() {
  const { lang } = useLanguage();

  return (
    <main className="min-h-screen bg-sacred-white pt-32 pb-20 font-outfit text-gray-800">
      <div className="container-sacred max-w-4xl mx-auto px-6">
        
        {/* Back link */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gold uppercase tracking-wider transition-colors">
            <FaArrowLeft /> {lang === 'en' ? 'Back to Home' : 'मुख्य पृष्ठ पर लौटें'}
          </Link>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-12 border-b border-gray-150 pb-8">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold text-2xl mx-auto mb-4">
            <FaOm />
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-cinzel tracking-tight text-gray-900 uppercase">
            {lang === 'en' ? 'Terms & Conditions' : 'नियम और शर्तें'}
          </h1>
          <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-3">
            {lang === 'en' ? 'Effective Date: May 26, 2026' : 'प्रभावी तिथि: २६ मई, २०२६'}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 leading-relaxed font-semibold text-gray-650 text-sm md:text-base">
          {lang === 'en' ? (
            <>
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing this website and booking any Vedic Pujas, Havans, or Anusthan services guided by Acharya Pt. Rudraksh Rajpurohit, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  2. Booking and Consultation Guidelines
                </h2>
                <p>
                  All puja bookings must be made with correct birth details (Name, Gotra, Date of Birth, Time, and Place) to ensure the spiritual efficacy of the rituals. Consultations with Acharya Ji are highly personalized and subject to availability.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  3. Execution of Pujas and Live Broadcasts
                </h2>
                <p>
                  Vedic Pujas and Havans are performed strictly according to scriptural dictates. For online bookings, photos or live video link options (via YouTube or WhatsApp) will be shared with the devotee as per the chosen booking package details.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  4. Disclaimer on Outcome Claims
                </h2>
                <p>
                  Spiritual and astrological practices represent belief systems rooted in ancient scriptures. While we dedicate full purity and effort to every ritual, outcomes depend on individual faith, karmic patterns, and divine will. These services should not be a substitute for professional legal, medical, or financial advice.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  5. Governing Law
                </h2>
                <p>
                  Any dispute arising out of or in connection with these terms, website access, or puja services shall be subject to the exclusive jurisdiction of the local courts of Agar Malwa district, Madhya Pradesh, India.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  1. शर्तों की स्वीकृति
                </h2>
                <p>
                  इस वेबसाइट का उपयोग करके और आचार्य पं. रुद्राक्ष राजपुरोहित द्वारा निर्देशित किसी भी वैदिक पूजा, हवन, या अनुष्ठान सेवाओं को बुक करके, आप इन नियमों और शर्तों का पालन करने के लिए सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया हमारी सेवाओं का उपयोग न करें।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  2. बुकिंग और परामर्श दिशानिर्देश
                </h2>
                <p>
                  अनुष्ठानों की आध्यात्मिक प्रभावशीलता सुनिश्चित करने के लिए सभी पूजा बुकिंग सही जन्म विवरण (नाम, गोत्र, जन्म तिथि, समय और स्थान) के साथ की जानी चाहिए। आचार्य जी के साथ परामर्श अत्यंत व्यक्तिगत हैं और उपलब्धता के अधीन हैं।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  3. पूजा संपादन और लाइव प्रसारण
                </h2>
                <p>
                  वैदिक पूजा और हवन पूरी तरह से शास्त्रों के अनुसार किए जाते हैं। ऑनलाइन बुकिंग के लिए, चुने गए पैकेज के अनुसार भक्तों के साथ तस्वीरें या लाइव वीडियो लिंक (यूट्यूब या व्हाट्सएप के माध्यम से) साझा किए जाएंगे।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  4. आध्यात्मिक परिणामों पर अस्वीकरण
                </h2>
                <p>
                  आध्यात्मिक और ज्योतिषीय प्रथाएं प्राचीन शास्त्रों में निहित विश्वास प्रणालियों का प्रतिनिधित्व करती हैं। हालांकि हम प्रत्येक अनुष्ठान में पूर्ण शुद्धता और प्रयास समर्पित करते हैं, लेकिन परिणाम व्यक्तिगत विश्वास, कर्म और ईश्वरीय इच्छा पर निर्भर करते हैं। इन सेवाओं को पेशेवर कानूनी, चिकित्सा, या वित्तीय सलाह का विकल्प नहीं माना जाना चाहिए।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  5. लागू कानून
                </h2>
                <p>
                  इन शर्तों, वेबसाइट एक्सेस, या पूजा सेवाओं से संबंधित किसी भी विवाद को आगर मालवा जिला, मध्य प्रदेश, भारत के स्थानीय न्यायालयों के क्षेत्राधिकार के अधीन माना जाएगा।
                </p>
              </section>
            </>
          )}
        </div>

      </div>
    </main>
  );
}
