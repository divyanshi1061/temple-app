import { Metadata } from "next";
import { ARTICLES } from "@/lib/articles";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

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
  return { width: 1024, height: 1024 }; // Default fallback for square images (karya-mukti.webp, etc.)
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = ARTICLES.find(a => a.id === id);
  if (!article) {
    return {
      title: "Vedic Guidance Article | Pandit Maa Baglamukhi",
    };
  }

  const { width, height } = getImageDimensions(article.image);

  return {
    title: article.metaTitle.en,
    description: article.metaDescription.en,
    alternates: {
      canonical: `https://www.panditmaabaglamukhi.com/articles/${id}`,
      languages: {
        "en-IN": `https://www.panditmaabaglamukhi.com/articles/${id}`,
        "hi-IN": `https://www.panditmaabaglamukhi.com/articles/${id}`,
      },
    },
    openGraph: {
      title: article.metaTitle.en,
      description: article.metaDescription.en,
      url: `https://www.panditmaabaglamukhi.com/articles/${id}`,
      siteName: "Maa Baglamukhi Nalkheda Dham",
      images: [
        {
          url: article.image,
          width,
          height,
          alt: article.title.en,
        }
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
    }
  };
}

export default function ArticleDetailLayout({ children }: Props) {
  return <>{children}</>;
}
