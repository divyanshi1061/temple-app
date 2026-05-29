import AboutPageClient from "@/components/about/AboutPageClient";

// SEO: This is a SERVER COMPONENT — all content below is rendered as static HTML
// and is fully crawlable by search engines.

export default function AboutPage() {
  return (
    <>
      {/* 
        Server-rendered SEO content: hidden visually but fully crawlable.
        This ensures Google indexes the complete about page content including 
        temple history, acharya bio, and sacred features.
      */}
      <div className="sr-only" aria-hidden="false">
        <h1>About Maa Baglamukhi Dham & Acharya Pt. Rudraksh Rajpurohit | Nalkheda | माँ बगलामुखी धाम परिचय</h1>
        
        <article>
          <h2>Siddh Peeth Maa Baglamukhi Temple History | माँ बगलामुखी मंदिर का इतिहास</h2>
          <p>
            The magnificent temple of Goddess Maa Baglamukhi is located in Nalkheda, Agar Malwa district, 
            approximately 100 kilometers from Ujjain. Situated on the banks of the Lakhundar River, this temple 
            is highly significant from both religious and tantric perspectives. The idol of Maa Baglamukhi installed 
            here dates back to the Pandava era, as mentioned in the Kalika Purana. Among the idols in the temple, 
            Maa Baglamukhi sits in the center, flanked by Maa Lakshmi on the right and Maa Saraswati on the left 
            in the form of Pindis. The temple is more than 500 years old, serving as a primary Siddh Peeth in India.
          </p>
          <p>
            उज्जैन से लगभग 100 किलोमीटर दूरी पर आगर मालवा जिले के नलखेडा में मां बगलामुखी मंदिर स्थित है। 
            यह मंदिर लखुन्दर नदी के तट पर स्थित है। मंदिर धार्मिक एवं तांत्रिक दृष्टि से महत्वपूर्ण है। 
            मंदिर में स्थित मां बगलामुखी की मुर्ति पाण्डव कालीन है। यह मंदिर 500 वर्ष से भी अधिक पुराना है।
          </p>
        </article>

        <article>
          <h2>Acharya Pt. Rudraksh Rajpurohit | आचार्य पं. रुद्राक्ष राजपुरोहित</h2>
          <p>
            Acharya Pt. Rudraksh Rajpurohit is a highly revered Vedic Priest and Bagalmukhi Sadhak at Nalkheda Dham 
            Siddh Peeth. He dedicates his life to preserving the absolute purity of Vedic rituals and directing 
            Maa Baglamukhi&apos;s protective aura to devotees worldwide. Born into a lineage of spiritual practitioners, 
            he has spent his life mastering Vedic scriptures, Yajna fire rituals, and Tantric protections.
          </p>
          <p>
            आचार्य पं. रुद्राक्ष राजपुरोहित नलखेड़ा धाम सिद्ध पीठ में एक अत्यंत प्रतिष्ठित वैदिक पुरोहित और 
            बगलामुखी साधक हैं। वह वैदिक अनुष्ठानों की पूर्ण शुद्धता को बनाए रखने और दुनिया भर के भक्तों तक 
            माँ बगलामुखी की सुरक्षात्मक ऊर्जा को निर्देशित करने के लिए अपना जीवन समर्पित करते हैं।
          </p>
        </article>

        <article>
          <h2>Sacred Features of Nalkheda Dham | नलखेड़ा धाम की विशेषताएं</h2>
          <h3>Conjoined Sacred Trees | एक साथ स्थित पवित्र वृक्ष</h3>
          <p>Bel, Champa, White Aak, Amla, Neem, and Peepal trees grow conjoined in the temple courtyard.</p>
          <h3>Lakhunder River | लखुन्दर नदी</h3>
          <p>Flows perennially behind the temple with graves of old saints on the banks.</p>
          <h3>Four Muktidhams | चार मुक्तिधाम</h3>
          <p>Encircled by cremation grounds in all four directions, establishing it as a Siddh Tantra Peeth.</p>
        </article>
      </div>

      {/* Visual client component with animations */}
      <AboutPageClient />
    </>
  );
}
