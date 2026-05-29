import { ARTICLES } from "@/lib/articles";
import Link from "next/link";
import ArticlesPageClient from "@/components/articles/ArticlesPageClient";

// SEO: This is a SERVER COMPONENT — all content below is rendered as static HTML
// and is fully crawlable by search engines.

export default function ArticlesPage() {
  return (
    <>
      {/* 
        Server-rendered SEO content: hidden visually but fully crawlable.
        Ensures Google indexes all article titles, descriptions, dates, and links.
      */}
      <div className="sr-only" aria-hidden="false">
        <h1>Vedic Guidance & Spiritual Articles | माँ बगलामुखी आध्यात्मिक लेख | Pandit Maa Baglamukhi Nalkheda</h1>
        <p>
          Explore authentic articles on Maa Baglamukhi temple history, ritual benefits, mantra meanings, 
          hawan processes, travel guides, and festival updates at Nalkheda Dham by Acharya Pt. Rudraksh Rajpurohit.
        </p>
        <nav aria-label="Articles list">
          <ul>
            {ARTICLES.map((article) => (
              <li key={article.id}>
                <Link href={`/articles/${article.id}`}>
                  <h2>{article.title.en} | {article.title.hi}</h2>
                  <p>{article.description.en}</p>
                  <p>{article.description.hi}</p>
                  <span>Category: {article.category.en} | {article.category.hi}</span>
                  <time dateTime={article.date}>{article.date}</time>
                  <span>{article.readTime.en}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Visual client component with animations */}
      <ArticlesPageClient />
    </>
  );
}
