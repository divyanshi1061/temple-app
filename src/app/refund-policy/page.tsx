"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaOm } from "react-icons/fa";

export default function RefundPolicyPage() {
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
            {lang === 'en' ? 'Cancellation & Refund' : 'रद्दीकरण और धन वापसी'}
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
                  1. Booking Materials and Consumables
                </h2>
                <p>
                  For Vedic Pujas, Havans, and Anusthans, significant preparations are made in advance, including the procurement of sacred ingredients (Samagri), arranging specialized pandits, and scheduling the auspicious time (Muhurat). Therefore, costs associated with puja materials and pre-allocated arrangements are non-refundable once acquired.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  2. Cancellation and Rescheduling Policy
                </h2>
                <p>
                  We understand that circumstances can change. Devotees may request to reschedule a booked puja or consultation to a future date free of charge, provided the request is made at least <strong>48 hours</strong> prior to the scheduled Muhurat.
                  <br />
                  To request rescheduling, please contact us directly on WhatsApp at <strong>+91 79095 97033</strong> or via email.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  3. Refund Terms
                </h2>
                <p>
                  Refund requests for bookings canceled at least 48 hours in advance will be processed within 5-7 business days, minus payment gateway charges and any expenses already incurred for puja materials. Cancellations made within 48 hours of the scheduled Muhurat are not eligible for a refund, but rescheduling can be discussed under special circumstances.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  4. Non-performance of Rituals
                </h2>
                <p>
                  In the rare event that a booked ritual cannot be performed by our team due to unforeseen circumstances (force majeure or health emergencies), devotees will be offered a choice between a <strong>100% full refund</strong> or rescheduling to another mutually agreed auspicious date.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  1. पूजा सामग्री और अग्रिम व्यवस्था
                </h2>
                <p>
                  वैदिक पूजा, हवन और अनुष्ठानों के लिए पहले से ही महत्वपूर्ण तैयारियां की जाती हैं, जिनमें पवित्र हवन सामग्री की खरीद, विशिष्ट आचार्यों की व्यवस्था और शुभ मुहूर्त का निर्धारण शामिल है। इसलिए, पूजा सामग्री और पूर्व-आवंटित व्यवस्थाओं से जुड़े खर्च एक बार सामग्री खरीदने के बाद वापस नहीं किए जा सकते।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  2. रद्दीकरण और पुनर्निर्धारण नीति
                </h2>
                <p>
                  हम समझते हैं कि परिस्थितियाँ बदल सकती हैं। भक्त निर्धारित मुहूर्त से कम से कम <strong>48 घंटे</strong> पहले अनुरोध करके, भविष्य की किसी अन्य तिथि के लिए बुक की गई पूजा या परामर्श को मुफ्त में पुनर्निर्धारित (reschedule) कर सकते हैं।
                  <br />
                  पुनर्निर्धारण के लिए, कृपया हमसे सीधे व्हाट्सएप <strong>+91 79095 97033</strong> पर संपर्क करें।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  3. रिफंड के नियम
                </h2>
                <p>
                  निर्धारित मुहूर्त से 48 घंटे पहले रद्द किए गए बुकिंग के लिए रिफंड अनुरोध 5-7 कार्य दिवसों के भीतर संसाधित किए जाएंगे, जिसमें से पेमेंट गेटवे शुल्क और पूजा सामग्री के लिए पहले से किए गए खर्च की कटौती की जा सकती है। मुहूर्त के 48 घंटों के भीतर किए गए रद्दीकरण पर कोई रिफंड नहीं दिया जाएगा, लेकिन विशेष परिस्थितियों में पुनर्निर्धारण पर विचार किया जा सकता है।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  4. अनुष्ठान संपन्न न होने की स्थिति में
                </h2>
                <p>
                  किसी अप्रत्याशित परिस्थिति (जैसे स्वास्थ्य संबंधी समस्या) के कारण यदि हमारे द्वारा अनुष्ठान संपन्न नहीं किया जा पाता है, तो भक्तों को <strong>100% पूर्ण रिफंड</strong> दिया जाएगा या उनकी सहमति से किसी अन्य शुभ तिथि पर अनुष्ठान संपन्न किया जाएगा।
                </p>
              </section>
            </>
          )}
        </div>

      </div>
    </main>
  );
}
