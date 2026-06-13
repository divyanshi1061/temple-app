import { SERVICES } from "@/lib/constants";
import Link from "next/link";
import ServicesPageClient from "@/components/services/ServicesPageClient";

// SEO: This is a SERVER COMPONENT — all content below is rendered as static HTML
// and is fully crawlable by search engines. The ServicesPageClient adds animations.

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Vedic Pujas & Havans | Pandit Maa Baglamukhi | Maa Bagalamukhi Pandit",
  "description": "Explore authentic Vedic Pujas and powerful Havans guided by Pandit Maa Baglamukhi specialist Acharya Pt. Rudraksh Rajpurohit (Maa Bagalamukhi Pandit) at Nalkheda Dham.",
  "url": "https://www.panditmaabaglamukhi.com/services",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": SERVICES.length,
    "itemListElement": SERVICES.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": `${service.title.en} | ${service.title.hi}`,
        "description": service.description.en,
        "url": `https://www.panditmaabaglamukhi.com/services/${service.id}`,
        "provider": {
          "@type": "Person",
          "name": "Acharya Pt. Rudraksh Rajpurohit",
          "url": "https://www.panditmaabaglamukhi.com"
        }
      }
    }))
  }
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      {/* 
        Server-rendered SEO content: hidden visually but fully crawlable.
        This ensures Google indexes all service titles, descriptions, and links
        even though the visual UI is rendered by the client component.
      */}
      <div className="sr-only" aria-hidden="false">
        <h1>Divine Services & Rituals | Maa Baglamukhi Havan Nalkheda | दिव्य सेवाएं और अनुष्ठान</h1>
        <p>
          Explore 19+ authentic Vedic Pujas, Tantric Havans, and powerful Anusthans by Acharya Pt. Rudraksh Rajpurohit 
          at Siddh Peeth Nalkheda Dham. Book Baglamukhi Havan, Lal Mirchi Havan, Court Case Victory Puja, Shatru Stambhan and more.
        </p>
        <nav aria-label="Services list">
          <ul>
            {SERVICES.map((service) => (
              <li key={service.id}>
                <Link href={`/services/${service.id}`}>
                  <h2>{service.title.en} | {service.title.hi}</h2>
                  <p>{service.description.en}</p>
                  <p>{service.description.hi}</p>
                  <span>Category: {service.category || 'Puja'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Visual client component with animations */}
      <ServicesPageClient />
    </>
  );
}
