import { ARTICLES } from "@/lib/articles";
import ArticleDetailClient from "@/components/articles/ArticleDetailClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    id: article.id,
  }));
}

function getImageDimensions(imageUrl: string): { width: number; height: number } {
  const url = imageUrl.toLowerCase();
  if (url.includes("havan-upload-1") || url.includes("real-havan-kund") || url.includes("real-puja-plate")) {
    return { width: 1024, height: 819 };
  }
  if (url.includes("temple-entrance-1") || url.includes("temple-dome-night")) {
    return { width: 1024, height: 576 };
  }
  if (url.includes("mata-temple-exterior")) {
    return { width: 1024, height: 658 };
  }
  return { width: 1024, height: 1024 };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = ARTICLES.find((a) => a.id === resolvedParams.id);
  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  const { width, height } = getImageDimensions(article.image);

  return {
    title: article.metaTitle.en,
    description: article.metaDescription.en,
    alternates: {
      canonical: `https://www.panditmaabaglamukhi.com/articles/${resolvedParams.id}`,
      languages: {
        "en-IN": `https://www.panditmaabaglamukhi.com/articles/${resolvedParams.id}`,
        "hi-IN": `https://www.panditmaabaglamukhi.com/articles/${resolvedParams.id}`,
      },
    },
    openGraph: {
      title: article.metaTitle.en,
      description: article.metaDescription.en,
      url: `https://www.panditmaabaglamukhi.com/articles/${resolvedParams.id}`,
      siteName: "Maa Baglamukhi Nalkheda Dham",
      images: [
        {
          url: article.image,
          width,
          height,
          alt: article.title.en,
        },
      ],
      type: "article",
      publishedTime: article.date,
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle.en,
      description: article.metaDescription.en,
      images: [article.image],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const article = ARTICLES.find((a) => a.id === resolvedParams.id);

  return <ArticleDetailClient rawArticle={article} />;
}
