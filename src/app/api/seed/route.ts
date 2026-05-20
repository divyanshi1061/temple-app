import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Service, About, GalleryImage, Video, Header, Testimonial } from '@/lib/models';
import { SERVICES, TESTIMONIALS } from '@/lib/constants';

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Seed Services
    await Service.deleteMany({});
    const dbServices = SERVICES.map(s => ({
      titleEn: s.title.en,
      titleHi: s.title.hi,
      descriptionEn: s.description.en,
      descriptionHi: s.description.hi,
      longDescriptionEn: s.longDescription.en,
      longDescriptionHi: s.longDescription.hi,
      benefitsEn: s.benefits.en,
      benefitsHi: s.benefits.hi,
      durationEn: s.duration.en,
      durationHi: s.duration.hi,
      category: s.category,
      popular: s.popular || false,
      image: s.image,
    }));
    await Service.insertMany(dbServices);

    // 2. Seed Testimonials
    await Testimonial.deleteMany({});
    const dbTestimonials = TESTIMONIALS.map(t => ({
      nameEn: t.name,
      nameHi: t.name,
      locationEn: t.location.en,
      locationHi: t.location.hi,
      textEn: t.text.en,
      textHi: t.text.hi,
      rating: t.rating || 5,
    }));
    await Testimonial.insertMany(dbTestimonials);

    // 3. Seed About
    await About.deleteMany({});
    await About.create({
      titleEn: "Acharya Pt. Rudraksh Rajpurohit",
      titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
      descriptionEn: "Acharya Pt. Rudraksh Rajpurohit is a highly revered Vedic priest and Tantra Sadhak based at the sacred Nalkheda Dham. With deep spiritual practice, he conducts authentic rituals with extreme devotion and Vedic precision.",
      descriptionHi: "आचार्य पं. रुद्राक्ष राजपुरोहित एक अत्यधिक सम्मानित वैदिक पुरोहित और तंत्र साधक हैं जो पवित्र नलखेड़ा धाम में स्थित हैं। गहन आध्यात्मिक अभ्यास के साथ, वे अत्यधिक भक्ति और वैदिक सटीकता के साथ प्रामाणिक अनुष्ठान संचालित करते हैं।",
      missionEn: "The magnificent temple of Goddess Maa Baglamukhi is located in Nalkheda, Agar Malwa district, approximately 100 kilometers from Ujjain. Situated on the banks of the Lakhundar River, this temple is highly significant from both religious and tantric perspectives. The idol of Maa Baglamukhi installed here dates back to the Pandava era, as mentioned in the Kalika Purana. Among the idols in the temple, Maa Baglamukhi sits in the center, flanked by Maa Lakshmi on the right and Maa Saraswati on the left in the form of 'Pindis'. During the Dwapara Yuga, while the Pandavas were in exile, Lord Krishna advised them to worship Maa Baglamukhi to ensure victory. Among the Ten Mahavidyas, Maa Baglamukhi is the eighth. Her worship and rituals are highly effective and precise. The temple is more than 500 years old, serving as a primary Siddh Peeth in India. Sacred trees like Bel, Champa, White Aak, Amla, Neem, and Peepal stand together here. The Lakhundar River (anciently named Lakshmana) flows perennially behind the temple, enhancing its natural beauty. Many saints' tombs lie on the riverbanks, indicating a historic presence of ascetics. The surrounding cremation grounds (Muktidham) in all four directions further establish Nalkheda Dham as a powerful center for Tantra and Sadhana.",
      missionHi: "उज्जैन से लगभग 100 किलोमीटर दूरी पर आगर मालवा जिले के नलखेडा में मां बगलामुखी मंदिर स्थित है। यह मंदिर लखुन्दर नदी के तट पर स्थित है। मंदिर धार्मिक एवं तांत्रिक दृष्टि से महत्वपूर्ण है। मंदिर में स्थित मां बगलामुखी की मुर्ति पाण्डव कालीन है। इसका प्रमाण कालिका पुराण में बताया गया है। मंदिर में स्थित मुर्तियों में बीच में मां बगलामुखी , दाए महालक्ष्मी व बाऐं मां सरस्वती पीण्डी के रूप में विराजित है। द्वापर युग में अज्ञातवास के समय पाण्डवों को भगवान श्रीकृष्ण ने बताया था की तुम मां बगलामुखी की साधना करो । दस महाविद्याओं में मां बगलामुखी अष्टम महाविद्या है। मां बगलामुखी की साधना अचुक होती है। यह मंदिर 500 वर्ष से भी अधिक पुराना है। त्रिशक्ति मां का मंदिर भारत वर्ष में प्रधान सिद्ध पीठ नलखेड़ा में स्थित है। बेल पत्र, चंपा, सफेद आंकड़े, आंवले तथा निम्न एवं पीपल के वृक्ष एक साथ स्थित है । मंदिर के पीछे लखुन्दर नदी (पुरातत्व नाम लक्ष्मणा) का पानी वर्ष भर रहता है जो प्राकृतिक सौंदर्य को दर्शाता है। नदी के किनारे कई संतो की समाधियां स्थित है। पुर्व में बड़ी संख्या में संतो के रहने का प्रमाण मिलता है। मंदिर के चारों दिशाओं में पुर्व से श्मशान (मुक्तिधाम) है जो साधना एंव तन्त्र स्थल होने का प्रमाण है।",
      visionEn: "The magnificent temple of Goddess Maa Baglamukhi is located on the banks of the Lakhundar River in Nalkheda, Agar Malwa district. This temple holds immense significance for both religious worship and tantric sadhanas. The Baglamukhi Havan (fire ritual) performed here is famous worldwide. Devotees from all over India and abroad visit Nalkheda Dham for sacred darshan, potent havans, and holy prayers, where their innermost wishes are fulfilled.",
      visionHi: "मां बगलामुखी माता का भव्य मंदिर आगर-मालवा जिले के नलखेड़ा में लखुंदर नदी के तट पर स्थित है। यह मंदिर धार्मिक और तांत्रिक दोनों ही तरह की साधनाओं के लिए महत्वपूर्ण है। यहां किया जाने वाला बगलामुखी हवन (अग्नि अनुष्ठान) दुनिया भर में प्रसिद्ध है। भारत और अन्य देशों से लोग दर्शन (पूजा), हवन और पूजा (प्रार्थना) के लिए आते हैं। यहां भक्तों की मनोकामनाएं पूरी होती हैं।"
    });

    // 4. Seed Gallery Images
    await GalleryImage.deleteMany({});
    const galleryItems = [
      { title: "Sacred Havan Kund Agni", category: "ceremony", url: "real-havan-kund.jpg" },
      { title: "Holy Puja Ingredients", category: "ceremony", url: "real-puja-plate.jpg" },
      { title: "Maa Baglamukhi Temple Exterior", category: "temple", url: "mata-temple-exterior.jpg" },
      { title: "Maa Baglamukhi Sacred Idol", category: "temple", url: "mata-idol-1.jpg" },
      { title: "Decorated Mata Idol", category: "temple", url: "mata-idol-2.jpg" },
      { title: "Temple at Sunset", category: "temple", url: "temple-sunset.png" },
      { title: "Sacred Havan Ceremony", category: "ceremony", url: "havan-upload-1.jpg" },
      { title: "Maa Baglamukhi Havan", category: "ceremony", url: "havan-upload-2.jpg" },
      { title: "Lal Mirchi Havan", category: "ceremony", url: "havan-upload-3.jpg" },
      { title: "Tantric Havan Ritual", category: "ceremony", url: "havan-upload-4.jpg" },
    ];
    await GalleryImage.insertMany(galleryItems);

    // 5. Seed Videos
    await Video.deleteMany({});
    const videoItems = [
      { title: "Maa Baglamukhi Darshan", url: "8KwG82gkkYA" },
      { title: "Maa Baglamukhi Havan", url: "6nuT2qMTnK0" },
      { title: "Nalkheda Dham Darshan", url: "tPOJesFzepA" }
    ];
    await Video.insertMany(videoItems);

    // 6. Seed Header
    await Header.deleteMany({});
    await Header.create({
      headingEn: "Acharya Pt. Rudraksh Rajpurohit",
      headingHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
      subheadingEn: "Siddh Peeth Maa Baglamukhi Temple — Nalkheda Dham",
      subheadingHi: "सिद्ध पीठ माँ बगलामुखी मंदिर — नलखेड़ा धाम",
    });

    return NextResponse.json({ message: 'Database seeded successfully with corrected fake data!' });
  } catch (error: unknown) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: 'Failed to seed database', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
