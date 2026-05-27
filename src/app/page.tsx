import HeroSection from "@/components/home/HeroSection";
import ImageReel from "@/components/effects/ImageReel";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import GallerySection from "@/components/home/GallerySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";

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
        "@type": "ProfessionalService",
        "@id": "https://www.panditmaabaglamukhi.com/#service-provider",
        "name": "Acharya Pt. Rudraksh Rajpurohit - Best Pandit for Maa Baglamukhi Puja & Havan in Nalkheda",
        "alternateName": [
          "Maa Baglamukhi Pandit Nalkheda Dham",
          "Maa Baglamukhi Pandit Naval Sharma Services Nalkheda",
          "Maa Baglamukhi Pandit Arun Sharma Services Nalkheda",
          "Baglamukhi Pujan Pandit Bajrang Sharma Ji Services Nalkheda",
          "बगलामुखी पूजा पंडित नलखेड़ा",
          "बगलामुखी हवन पंडित"
        ],
        "image": "https://www.panditmaabaglamukhi.com/acharya-new.webp",
        "priceRange": "$$",
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
        "url": "https://www.panditmaabaglamukhi.com",
        "logo": "https://www.panditmaabaglamukhi.com/logo.webp",
        "sameAs": [
          "https://www.facebook.com/people/Maa-Baglamukhi-Darshan/61586592862432/",
          "https://instagram.com/maabaglamukhidarshan",
          "https://youtube.com/@maabaglamukhidarshan-d2e"
        ]
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Maa Baglamukhi Havan and how is it performed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Maa Baglamukhi Havan is a sacred Vedic fire ritual (Yajna) dedicated to Goddess Baglamukhi, the eighth Mahavidya. It is performed by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Nalkheda Dham using Tantrokt Samagri and strict scriptural protocols. The Havan is performed for victory, protection, enemy neutralization, and fulfillment of desires."
        }
      },
      {
        "@type": "Question",
        "name": "Where is Maa Baglamukhi Temple Nalkheda Dham located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Siddh Peeth Maa Baglamukhi Temple is located in Nalkheda, Agar Malwa district, Madhya Pradesh, India (PIN 465445), approximately 100 km from Ujjain. It is situated on the banks of the Lakhundar River."
        }
      },
      {
        "@type": "Question",
        "name": "How can I book a puja or havan online at Nalkheda Dham?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can book pujas and havans online through our website at panditmaabaglamukhi.com/book or by contacting Acharya Pt. Rudraksh Rajpurohit directly on WhatsApp at +91 79095 97033. Provide your name, gotra, and birth details for personalized rituals."
        }
      },
      {
        "@type": "Question",
        "name": "What services does Acharya Pt. Rudraksh Rajpurohit offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acharya Pt. Rudraksh Rajpurohit offers 19+ sacred services including Maa Baglamukhi Havan, Lal Mirchi Havan, Sawa Lakh & 36 Lakh Jaap, Court Case Victory Puja (Nyayalay Vijay), Shatru Stambhan, Nav Graha Shanti, Maha Mrityunjay Anusthan, Santan Prapti, Vyapar Vraddhi, Vastu Shastra consultation, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Maa Baglamukhi Temple at Nalkheda historically significant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the temple is over 500 years old and its idol dates back to the Pandava era, as mentioned in the Kalika Purana. The temple houses Tri-Shakti — Maa Baglamukhi (center), Maa Lakshmi (right), and Maa Saraswati (left). Sacred trees like Bel, Champa, Neem, and Peepal grow conjoined in the courtyard."
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
      {/* FAQ Schema for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
      <FAQSection />
    </>
  );
}
