import HeroSection from "@/components/home/HeroSection";
import ImageReel from "@/components/effects/ImageReel";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://rudrakshbaglamukhi.com/#person",
        "name": "Acharya Pt. Rudraksh Rajpurohit",
        "alternateName": ["Rudraksh Rajpurohit", "Pt. Rudraksh Rajpurohit"],
        "jobTitle": "Vedic Priest & Bagalmukhi Sadhak",
        "description": "Highly revered Vedic Priest & Bagalmukhi Sadhak based at the sacred Siddh Peeth Maa Baglamukhi Temple, Nalkheda, conducting high-potency Havans, Anusthans and Vedic Pujas.",
        "image": "https://rudrakshbaglamukhi.com/real-gallery-1.jpg",
        "url": "https://rudrakshbaglamukhi.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nalkheda",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "465441",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.facebook.com/people/Maa-Baglamukhi-Darshan/61586592862432/?mibextid=wwXIfr&rdid=Jgsjq9UYv0FIJt4Z&share_url=https%3A%2F%2Fwww.facebook.com",
          "https://instagram.com/maabaglamukhidarshan"
        ]
      },
      {
        "@type": "PlaceOfWorship",
        "@id": "https://rudrakshbaglamukhi.com/#temple",
        "name": "Siddh Peeth Maa Baglamukhi Temple Dham",
        "description": "The sacred, historical, and highly potent Siddh Peeth of Goddess Maa Baglamukhi situated on the banks of Lakhunder River in Nalkheda, Agar Malwa, Madhya Pradesh.",
        "url": "https://rudrakshbaglamukhi.com",
        "telephone": "+91 79095 97033",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Maa Baglamukhi Mandir",
          "addressLocality": "Nalkheda",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "465441",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 23.9576,
          "longitude": 76.2415
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "05:00",
          "closes": "23:00"
        }
      }
    ]
  };

  return (
    <>
      {/* Schema.org Structured Data for Rich Snippet SEO indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <HeroSection />
      {/* ─── Seamless Infinite Image Reel ─── */}
      <div className="relative bg-sacred-white border-b border-gray-100/60 pb-4 overflow-hidden">
        {/* Spiritual background image at back of reel */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "url('/hero-spiritual-bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Soft elegant glowing gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-orange-500/5 to-amber-500/5 pointer-events-none z-0" />
        <div className="relative z-10">
          <ImageReel />
        </div>
      </div>
      <div className="sacred-divider" />
      <ServicesSection />
      <div className="sacred-divider" />
      <AboutSection />
      <div className="sacred-divider" />
      <GallerySection />
      <div className="sacred-divider" />
      <TestimonialsSection />
      <div className="sacred-divider" />
      <ContactSection />
    </>
  );
}
