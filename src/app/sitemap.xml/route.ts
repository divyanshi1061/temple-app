import { SERVICES } from "@/lib/constants";
import { ARTICLES } from "@/lib/articles";
import { ALL_PHOTOS } from "@/lib/photos";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = "https://www.panditmaabaglamukhi.com";
  const today = new Date().toISOString().split("T")[0];

  // Build XML sitemap content
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // 1. Static Pages
  const staticPages = [
    { url: baseUrl, changefreq: "daily", priority: "1.0", lastmod: today, images: ["/og-image.png"] },
    { url: `${baseUrl}/services`, changefreq: "weekly", priority: "0.9", lastmod: today, images: ["/havan-upload-1.webp"] },
    { url: `${baseUrl}/gallery`, changefreq: "weekly", priority: "0.8", lastmod: today, isGallery: true },
    { url: `${baseUrl}/about`, changefreq: "monthly", priority: "0.8", lastmod: "2026-05-20", images: ["/acharya-new.webp"] },
    { url: `${baseUrl}/articles`, changefreq: "weekly", priority: "0.8", lastmod: today, images: ["/real-puja-plate.webp"] },
    { url: `${baseUrl}/book`, changefreq: "monthly", priority: "0.7", lastmod: "2026-05-15", images: ["/mata.webp"] },
    { url: `${baseUrl}/privacy`, changefreq: "monthly", priority: "0.3", lastmod: "2026-04-01" },
    { url: `${baseUrl}/terms`, changefreq: "monthly", priority: "0.3", lastmod: "2026-04-01" },
    { url: `${baseUrl}/refund-policy`, changefreq: "monthly", priority: "0.3", lastmod: "2026-04-01" }
  ];

  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>`;

    // Add hreflang alternates for all pages
    xml += `
    <xhtml:link rel="alternate" hreflang="en-IN" href="${page.url}" />
    <xhtml:link rel="alternate" hreflang="hi-IN" href="${page.url}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${page.url}" />`;

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
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${baseUrl}/services/${service.id}" />
    <xhtml:link rel="alternate" hreflang="hi-IN" href="${baseUrl}/services/${service.id}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/services/${service.id}" />`;
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
    <lastmod>${article.date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="en-IN" href="${baseUrl}/articles/${article.id}" />
    <xhtml:link rel="alternate" hreflang="hi-IN" href="${baseUrl}/articles/${article.id}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/articles/${article.id}" />`;
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
