// ============================================================
// TEMPLE GALLERY PHOTOS DATA
// Shared constants for client pages and server sitemap route
// ============================================================

export type PhotoItem = {
  id: string;
  url: string;
  aspect: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
};

export const ALL_PHOTOS: PhotoItem[] = [
  {
    id: "mrityunjay-new",
    url: "/mrityunjay-new.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Maha Mrityunjay Anusthan",
    titleHi: "महामृत्युंजय अनुष्ठान",
    descEn: "Maha Mrityunjay ritual conducted for health, longevity, and spiritual protection.",
    descHi: "स्वास्थ्य, दीर्घायु और आध्यात्मिक सुरक्षा के लिए आयोजित महामृत्युंजय अनुष्ठान।"
  },
  {
    id: "acharya-new",
    url: "/acharya-new.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Acharya Pt. Rudraksh Rajpurohit",
    titleHi: "आचार्य पं. रुद्राक्ष राजपुरोहित",
    descEn: "Acharya Pt. Rudraksh Rajpurohit conducting sacred rituals and prayers at the temple.",
    descHi: "मंदिर में अनुष्ठान और पूजा का संपादन करते आचार्य पं. रुद्राक्ष राजपुरोहित।"
  },
  // COLUMN 1
  {
    id: "col1-3",
    url: "/havan-upload-1.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Sacred Vedic Havan",
    titleHi: "पवित्र वैदिक हवन",
    descEn: "Performing traditional Yajna and Havans according to ancient Vedic scriptures.",
    descHi: "प्राचीन वैदिक ग्रंथों के अनुसार पारंपरिक यज्ञ और हवन का संपादन।"
  },
  {
    id: "col1-4",
    url: "/temple-night-1.webp",
    aspect: "aspect-square",
    titleEn: "Temple Under Night Sky",
    titleHi: "रात्रि में देदीप्यमान मंदिर",
    descEn: "The magnificent night view of the illuminated Maa Baglamukhi temple.",
    descHi: "रोशनी से जगमगाते माँ बैगलामुखी मंदिर का भव्य रात्रिकालीन दृश्य।"
  },
  // COLUMN 2
  {
    id: "col2-1",
    url: "/new-havan-1.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Siddh Peeth Puja",
    titleHi: "सिद्ध पीठ पूजा",
    descEn: "Intricate arrangements during a special puja ritual at the temple.",
    descHi: "मंदिर में एक विशेष पूजा अनुष्ठान के दौरान जटिल व्यवस्था।"
  },
  {
    id: "col2-2",
    url: "/new-havan-2.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Havan Ritual 2",
    titleHi: "हवन अनुष्ठान 2",
    descEn: "A second sacred Havan ritual captured during the devotions at Nalkheda Dham.",
    descHi: "नलखेड़ा धाम में समर्पण के दौरान एक दूसरा पवित्र हवन अनुष्ठान।"
  },
  {
    id: "col2-4",
    url: "/new-havan-3.webp",
    aspect: "aspect-[4/3]",
    titleEn: "Devotees Gathering",
    titleHi: "भक्तों का जमघट",
    descEn: "Devotees joining hands in prayer during a powerful community havan.",
    descHi: "एक शक्तिशाली सामूहिक हवन के दौरान प्रार्थना में हाथ जोड़ते भक्तगण।"
  },
  {
    id: "col2-5",
    url: "/new-upload-10.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Community Ritual",
    titleHi: "सामुदायिक अनुष्ठान",
    descEn: "Captured moments from recent temple activities.",
    descHi: "हालिया मंदिर गतिविधियों से लिए गए दृश्य।"
  },
  {
    id: "col2-6",
    url: "/new-upload-9.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Offering",
    titleHi: "मंदिर अर्पण",
    descEn: "Offerings prepared for the evening puja.",
    descHi: "शाम की पूजा के लिए तैयार किए गए अर्पण।"
  },
  {
    id: "col2-7",
    url: "/new-upload-8.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Puja Preparation",
    titleHi: "पूजा तैयारी",
    descEn: "Preparations and arrangements behind the ritual.",
    descHi: "अनुष्ठान के पीछे की तैयारी और व्यवस्थाएं।"
  },
  {
    id: "col2-8",
    url: "/new-upload-7.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Altar Details",
    titleHi: "वेदिका विवरण",
    descEn: "Close-up details from the temple altar.",
    descHi: "मंदिर वेदी के क्लोज़-अप विवरण।"
  },
  {
    id: "col2-9",
    url: "/IMG_5116.JPG.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Devotional Moment",
    titleHi: "भक्ति क्षण",
    descEn: "A candid devotional photograph.",
    descHi: "एक सहज भक्ति पूर्ण फ़ोटो।"
  },
  // COLUMN 3
  {
    id: "col3-1",
    url: "/real-havan-kund.webp",
    aspect: "aspect-[4/3]",
    titleEn: "Agni Dev - Havan Fire",
    titleHi: "अग्नि देव - हवन कुंड",
    descEn: "The sacred fire consuming offerings in the central Havan Kund.",
    descHi: "मुख्य हवन कुंड में आहुति ग्रहण करती पवित्र अग्नि।"
  },
  {
    id: "col3-2",
    url: "/temple-tower.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Golden Shikhar Dome",
    titleHi: "स्वर्ण शिखर गुंबद",
    descEn: "The soaring Shikhar of the temple standing tall as a beacon of cosmic energy.",
    descHi: "ब्रह्मांडीय ऊर्जा के प्रकाशस्तंभ के रूप में खड़ा मंदिर का ऊंचा शिखर।"
  },
  {
    id: "col3-3",
    url: "/mata-baglamukhi.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Baglamukhi Idol",
    titleHi: "माँ बगलामुखी प्रतिमा",
    descEn: "The divine idol of Maa Baglamukhi decorated for the temple ceremony.",
    descHi: "मंदिर समारोह के लिए सजाई गई माँ बगलामुखी की दिव्य मूर्ति।"
  },
  {
    id: "col3-4",
    url: "/new-havan-5.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Prasad and Offerings",
    titleHi: "प्रसाद एवं हवन सामग्री",
    descEn: "Prepared offerings and sacred materials ready for the havan.",
    descHi: "हवन के लिए तैयार की गई पूजा और पवित्र सामग्री।"
  },
  {
    id: "col3-5",
    url: "/real-puja-plate.webp",
    aspect: "aspect-[16/6]",
    titleEn: "Vedic Puja Plate",
    titleHi: "वैदिक पूजा थाली",
    descEn: "A close-up of the ceremonial plate arranged with kumkum, flowers, and lamps.",
    descHi: "कुमकुम, फूलों और दीयों से सजी हुई अनुष्ठान की थाली।"
  },
  {
    id: "col3-6",
    url: "/IMG_5112.JPG.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Devotee",
    titleHi: "मंदिर श्रद्धालु",
    descEn: "Portrait from the temple gathering.",
    descHi: "मंदिर के समागम से लिया गया चित्र।"
  },
  {
    id: "col3-7",
    url: "/mata.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Maa Image",
    titleHi: "माँ का चित्र",
    descEn: "A revered portrait used in ceremonial rites.",
    descHi: "अनुष्ठानों में उपयोग किया जाने वाला पूजनीय चित्र।"
  },
  // COLUMN 4
  {
    id: "col4-1",
    url: "/temple-entrance-1.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Entrance Gates",
    titleHi: "मंदिर प्रवेश द्वार",
    descEn: "The decorative and grand entrance welcoming devotees into the temple.",
    descHi: "भक्तों का मंदिर में स्वागत करता हुआ भव्य और कलात्मक प्रवेश द्वार।"
  },
  {
    id: "col4-2",
    url: "/temple-inside-1.webp",
    aspect: "aspect-[4/3]",
    titleEn: "Sacred Inner Sanctuary",
    titleHi: "पवित्र अंतःस्थल",
    descEn: "Inside the main prayer hall filled with vibrations of ancient chants.",
    descHi: "मुख्य प्रार्थना कक्ष के भीतर प्राचीन मंत्रोच्चार की तरंगें।"
  },
  {
    id: "col4-3",
    url: "/temple-devotees-1.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Gathering of Seekers",
    titleHi: "साधकों का समागम",
    descEn: "Devotees sitting together waiting for the evening maha-aarti.",
    descHi: "शाम की महा-आरती की प्रतीक्षा में एक साथ बैठे श्रद्धालु।"
  },
  {
    id: "col4-6",
    url: "/temple-lion-gate.webp",
    aspect: "aspect-[3/4]",
    titleEn: "Temple Lion Gate",
    titleHi: "मंदिर सिंह द्वार",
    descEn: "The ornate lion gate at the temple entrance symbolizing strength and protection.",
    descHi: "शक्ति और सुरक्षा का प्रतीक मंदिर के प्रवेश द्वार का शानदार सिंह द्वार।"
  },
  {
    id: "col4-7",
    url: "/temple-dome-night.webp",
    aspect: "aspect-[4/3]",
    titleEn: "Temple Dome Night",
    titleHi: "मंदिर गुंबद रात में",
    descEn: "The illuminated dome captured against the night sky.",
    descHi: "रात्रि आकाश के खिलाफ रोशन गुंबद का दृश्य।"
  },
  {
    id: "col4-8",
    url: "/temple-night-2.webp",
    aspect: "aspect-square",
    titleEn: "Gilded Temple architecture",
    titleHi: "स्वर्ण मण्डित वास्तुकला",
    descEn: "The glowing dome of the temple reflecting spiritual glory.",
    descHi: "आध्यात्मिक वैभव को दर्शाती मंदिर की चमकती हुई गुंबद।"
  }
];
