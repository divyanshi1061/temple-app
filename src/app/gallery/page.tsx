import { ALL_PHOTOS } from "@/lib/photos";
import GalleryPageClient from "@/components/gallery/GalleryPageClient";

// SEO: This is a SERVER COMPONENT — all content below is rendered as static HTML
// and is fully crawlable by search engines.

const YOUTUBE_VIDEOS = [
  {
    id: "1IQSzL-D78M",
    titleEn: "Maa Baglamukhi Maha Havan",
    titleHi: "माँ बगलामुखी महा हवन"
  },
  {
    id: "6nuT2qMTnK0",
    titleEn: "Maa Baglamukhi Darshan",
    titleHi: "माँ बगलामुखी दर्शन"
  },
  {
    id: "61ZxvQ1Ei9M",
    titleEn: "Maa Baglamukhi Divya Havan",
    titleHi: "माँ बगलामुखी दिव्य हवन"
  },
  {
    id: "latHG7htf1M",
    titleEn: "Maa Baglamukhi Shringar",
    titleHi: "माँ बगलामुखी श्रृंगार"
  },
  {
    id: "8KwG82gkkYA",
    titleEn: "Maa Baglamukhi Aarti",
    titleHi: "माँ बगलामुखी आरती"
  },
  {
    id: "C9iVhfuGFow",
    titleEn: "Maa Baglamukhi Sadhana",
    titleHi: "माँ बगलामुखी साधना"
  }
];

export default function GalleryPage() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Maa Baglamukhi Temple Gallery & Videos",
    "description": "Photographs capturing the shringar, daily darshan, and sacred details of Maa Baglamukhi Temple at Nalkheda Dham.",
    "image": ALL_PHOTOS.map((photo) => ({
      "@type": "ImageObject",
      "contentUrl": `https://www.panditmaabaglamukhi.com${photo.url.startsWith('/') ? photo.url : '/' + photo.url}`,
      "name": photo.titleEn,
      "description": photo.descEn
    }))
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-gray-900 font-outfit select-none pb-24 pt-28 relative overflow-hidden">
      {/* ImageGallery Schema for Google Image search indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
      />
      
      {/* Subtle spiritual background watermark */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "url('/hero-spiritual-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Soft luxury background orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-200/5 rounded-full blur-[100px] opacity-50 pointer-events-none z-0" />

      {/* Centered Editorial Brand Header */}
      <div className="w-full text-center pb-6 border-b border-gray-200/50 max-w-[1440px] mx-auto mt-6 px-6 relative z-10">
        <h1 className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-gray-800 font-outfit">
          Maa Baglamukhi Temple Gallery & Videos | माँ बगलामुखी मंदिर गैलरी और वीडियो
        </h1>
      </div>

      {/* ─── CRAWLABLE STATIC HTML FOR SEO ─── */}
      <div className="sr-only" aria-hidden="true">
        <h2>Sacred Temple Videos</h2>
        <ul>
          {YOUTUBE_VIDEOS.map((vid) => (
            <li key={vid.id}>
              <h3>{vid.titleEn} - {vid.titleHi}</h3>
              <a href={`https://www.youtube.com/watch?v=${vid.id}`}>Watch {vid.titleEn} on YouTube</a>
            </li>
          ))}
        </ul>

        <h2>Sacred Gallery Photos</h2>
        <ul>
          {ALL_PHOTOS.map((photo) => (
            <li key={photo.id}>
              <img src={photo.url} alt={`${photo.titleEn} - ${photo.titleHi}`} />
              <h3>{photo.titleEn} / {photo.titleHi}</h3>
              <p>{photo.descEn} / {photo.descHi}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── CLIENT WRAPPER FOR HIGH-END INTERACTIVE AND ANIMATED UI ─── */}
      <GalleryPageClient />
    </div>
  );
}
