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
        "@id": "https://www.panditmaabaglamukhi.com/#person",
        "name": "Acharya Pt. Rudraksh Rajpurohit",
        "alternateName": ["Rudraksh Rajpurohit", "Pt. Rudraksh Rajpurohit"],
        "jobTitle": "Vedic Priest & Bagalmukhi Sadhak",
        "description": "Highly revered Vedic Priest & Bagalmukhi Sadhak based at the sacred Siddh Peeth Maa Baglamukhi Temple, Nalkheda, conducting high-potency Havans, Anusthans and Vedic Pujas.",
        "image": "https://www.panditmaabaglamukhi.com/acharya-new.webp",
        "url": "https://www.panditmaabaglamukhi.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Nalkheda",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "465445",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.facebook.com/people/Maa-Baglamukhi-Darshan/61586592862432/?mibextid=wwXIfr&rdid=Jgsjq9UYv0FIJt4Z&share_url=https%3A%2F%2Fwww.facebook.com",
          "https://instagram.com/maabaglamukhidarshan",
          "https://youtube.com/@maabaglamukhidarshan-d2e"
        ]
      },
      {
        "@type": "PlaceOfWorship",
        "@id": "https://www.panditmaabaglamukhi.com/#temple",
        "name": "Siddh Peeth Maa Baglamukhi Temple Dham",
        "description": "The sacred, historical, and highly potent Siddh Peeth of Goddess Maa Baglamukhi situated on the banks of Lakhunder River in Nalkheda, Agar Malwa, Madhya Pradesh.",
        "url": "https://www.panditmaabaglamukhi.com",
        "telephone": "+91 79095 97033",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Near Maa Baglamukhi Mandir",
          "addressLocality": "Nalkheda",
          "addressRegion": "Madhya Pradesh",
          "postalCode": "465445",
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
      },
      {
        "@type": "WebSite",
        "@id": "https://www.panditmaabaglamukhi.com/#website",
        "url": "https://www.panditmaabaglamukhi.com",
        "name": "Maa Baglamukhi Havan & Puja – Nalkheda Dham",
        "description": "Book authentic Vedic Pujas and Havans at Siddh Peeth Maa Baglamukhi Dham, Nalkheda",
        "publisher": { "@id": "https://www.panditmaabaglamukhi.com/#person" }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.panditmaabaglamukhi.com/#breadcrumb",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.panditmaabaglamukhi.com" },
          { "@type": "ListItem", "position": 2, "name": "Sacred Services", "item": "https://www.panditmaabaglamukhi.com/services" },
          { "@type": "ListItem", "position": 3, "name": "About Temple", "item": "https://www.panditmaabaglamukhi.com/about" },
          { "@type": "ListItem", "position": 4, "name": "Gallery", "item": "https://www.panditmaabaglamukhi.com/gallery" },
          { "@type": "ListItem", "position": 5, "name": "Book Puja", "item": "https://www.panditmaabaglamukhi.com/book" }
        ]
      },
      {
        "@type": "Service",
        "@id": "https://www.panditmaabaglamukhi.com/#services",
        "serviceType": "Vedic Puja & Havan",
        "provider": { "@id": "https://www.panditmaabaglamukhi.com/#person" },
        "areaServed": { "@type": "Country", "name": "India" },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Sacred Vedic Services",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Maa Baglamukhi 36 Lakh & Sawa Lakh Jaap",
                  "description": "Extensive chanting of Maa Baglamukhi mantras for protection."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Maa Baglamukhi Vishesh Havan",
                  "description": "Special fire ritual dedicated to Maa Baglamukhi."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Nyayalay Vijay - Court Case Victory Puja",
                  "description": "Rituals to gain victory in pending legal cases."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Shatru Stambhan Anusthan",
                  "description": "Tantric rituals to paralyze enemy actions."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Vastu Shastra Paramarsh",
                  "description": "Expert Vastu consultation to harmonize energy flows."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 6,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Nav Graha Shanti Puja",
                  "description": "Pacification of all nine planets."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 7,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Maha Mrityunjay Anusthan",
                  "description": "Intense chanting of Maha Mrityunjay mantra."
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 8,
              "item": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Santan Prapti Puja",
                  "description": "Divine rituals seeking blessings for children."
                }
              }
            }
          ]
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
      <div className="relative bg-sacred-white pb-4 overflow-hidden">
        {/* Spiritual background image at back of reel */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "url('/hero-spiritual-bg.webp')",
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
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
