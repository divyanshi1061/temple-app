import { SERVICES } from "@/lib/constants";
import { ARTICLES } from "@/lib/articles";
import { ALL_PHOTOS } from "@/lib/photos";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://www.panditmaabaglamukhi.com";

  // Build XML sitemap content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  // 1. Static Pages
  const staticPages = [
    { url: baseUrl, changefreq: "daily", priority: "1.0", images: ["/og-image.png"] },
    { url: `${baseUrl}/services`, changefreq: "weekly", priority: "0.9", images: ["/havan-upload-1.webp"] },
    { url: `${baseUrl}/gallery`, changefreq: "weekly", priority: "0.8", isGallery: true },
    { url: `${baseUrl}/about`, changefreq: "monthly", priority: "0.8", images: ["/acharya-new.webp"] },
    { url: `${baseUrl}/articles`, changefreq: "weekly", priority: "0.8", images: ["/real-puja-plate.webp"] },
    { url: `${baseUrl}/book`, changefreq: "monthly", priority: "0.7", images: ["/mata.webp"] },
    { url: `${baseUrl}/privacy`, changefreq: "monthly", priority: "0.3" },
    { url: `${baseUrl}/terms`, changefreq: "monthly", priority: "0.3" },
    { url: `${baseUrl}/refund-policy`, changefreq: "monthly", priority: "0.3" }
  ];

  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

    if (page.isGallery) {
      ALL_PHOTOS.forEach((photo) => {
        xml += `
    <image:image>
      <image:loc>${baseUrl}${photo.url}</image:loc>
      <image:title><![CDATA[${photo.titleEn} - Maa Baglamukhi Temple Nalkheda]]></image:title>
      <image:caption><![CDATA[${photo.descEn}]]></image:caption>
    </image:image>`;
      });
    } else if (page.images) {
      page.images.forEach((img) => {
        xml += `
    <image:image>
      <image:loc>${baseUrl}${img}</image:loc>
    </image:image>`;
      });
    }

    xml += `
  </url>`;
  });

  // 2. Services
  SERVICES.forEach((service) => {
    xml += `
  <url>
    <loc>${baseUrl}/services/${service.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
    if (service.image) {
      xml += `
    <image:image>
      <image:loc>${baseUrl}${service.image}</image:loc>
      <image:title><![CDATA[${service.title.en} - Maa Baglamukhi Pandit Nalkheda]]></image:title>
      <image:caption><![CDATA[${service.description.en}]]></image:caption>
    </image:image>`;
    }
    xml += `
  </url>`;
  });

  // 3. Articles
  ARTICLES.forEach((article) => {
    xml += `
  <url>
    <loc>${baseUrl}/articles/${article.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>`;
    if (article.image) {
      xml += `
    <image:image>
      <image:loc>${baseUrl}${article.image}</image:loc>
      <image:title><![CDATA[${article.title.en} - Maa Baglamukhi Pandit Nalkheda]]></image:title>
      <image:caption><![CDATA[${article.description.en}]]></image:caption>
    </image:image>`;
    }
    xml += `
  </url>`;
  });

  xml += `
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200"
    }
  });
}
