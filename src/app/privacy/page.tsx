"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaOm } from "react-icons/fa";

export default function PrivacyPolicyPage() {
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
            {lang === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
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
                  1. Information We Collect
                </h2>
                <p>
                  We collect personal information that you provide directly to us when booking a puja, submitting an inquiry, or contacting Acharya Pt. Rudraksh Rajpurohit. This information may include your name, contact details (phone, WhatsApp, email), birth details (date, time, and place of birth for Kundali calculation), and payment information.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  2. How We Use Your Information
                </h2>
                <p>
                  The information we collect is utilized strictly to:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-1.5">
                  <li>Perform personalized Vedic Havans and Anusthans based on your astrological details.</li>
                  <li>Respond to your direct inquiries and consultation requests.</li>
                  <li>Process payments securely through authorized payment gateways.</li>
                  <li>Send important booking updates or YouTube darshan links.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  3. Information Sharing and Disclosure
                </h2>
                <p>
                  We value your privacy. Astrological and birth details are kept strictly confidential and shared only with our internal Vedic scholars who perform your requested rituals. We do not sell, rent, or trade your personal information to third parties.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  4. Security of Data
                </h2>
                <p>
                  We implement robust administrative, technical, and physical security measures to safeguard your personal data from unauthorized access, alteration, or disclosure.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  5. Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                  <br />
                  <strong>Email:</strong> mabaglamukhi66@gmail.com
                  <br />
                  <strong>Phone/WhatsApp:</strong> +91 79095 97033
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  1. जानकारी जो हम एकत्र करते हैं
                </h2>
                <p>
                  जब आप कोई पूजा बुक करते हैं, पूछताछ सबमिट करते हैं, या आचार्य पं. रुद्राक्ष राजपुरोहित से संपर्क करते हैं, तो हम आपके द्वारा प्रदान की गई जानकारी एकत्र करते हैं। इसमें आपका नाम, संपर्क विवरण (फ़ोन, व्हाट्सएप, ईमेल), जन्म विवरण (कुंडली विश्लेषण के लिए जन्म तिथि, समय और स्थान) और भुगतान की जानकारी शामिल हो सकती है।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  2. हम आपकी जानकारी का उपयोग कैसे करते हैं
                </h2>
                <p>
                  एकत्र की गई जानकारी का उपयोग निम्नलिखित कार्यों के लिए किया जाता है:
                </p>
                <ul className="list-disc list-inside pl-4 space-y-1.5">
                  <li>आपके ज्योतिषीय विवरण के आधार पर व्यक्तिगत वैदिक हवन और अनुष्ठान संपन्न करना।</li>
                  <li>आपकी पूछताछ और परामर्श अनुरोधों का उत्तर देना।</li>
                  <li>अधिकृत पेमेंट गेटवे के माध्यम से सुरक्षित भुगतान संसाधित करना।</li>
                  <li>बुकिंग अपडेट या दर्शन लिंक भेजना।</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  3. जानकारी साझा करना
                </h2>
                <p>
                  हम आपकी गोपनीयता का सम्मान करते हैं। आपके जन्म और ज्योतिषीय विवरणों को पूरी तरह से गुप्त रखा जाता है और केवल उन्हीं वैदिक आचार्यों के साथ साझा किया जाता है जो आपके अनुष्ठान करते हैं। हम आपकी जानकारी किसी तीसरे पक्ष को बेचते या किराए पर नहीं देते हैं।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  4. डेटा सुरक्षा
                </h2>
                <p>
                  हम आपकी व्यक्तिगत जानकारी को अनधिकृत पहुंच, परिवर्तन या प्रकटीकरण से सुरक्षित रखने के लिए कड़े प्रशासनिक और तकनीकी सुरक्षा उपाय लागू करते हैं।
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl md:text-2xl font-bold font-cinzel text-gray-900 border-l-2 border-gold pl-3">
                  5. हमसे संपर्क करें
                </h2>
                <p>
                  यदि आपके पास गोपनीयता नीति के बारे में कोई प्रश्न हैं, तो हमसे संपर्क करें:
                  <br />
                  <strong>ईमेल:</strong> mabaglamukhi66@gmail.com
                  <br />
                  <strong>फ़ोन/व्हाट्सएप:</strong> +91 79095 97033
                </p>
              </section>
            </>
          )}
        </div>

      </div>
    </main>
  );
}
