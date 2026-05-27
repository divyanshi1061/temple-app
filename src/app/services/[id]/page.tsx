import { SERVICES } from "@/lib/constants";
import ServiceDetailClient from "@/components/services/ServiceDetailClient";
import { Metadata } from "next";

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    id: service.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

function getImageDimensions(imageUrl: string | undefined): { width: number; height: number } {
  if (!imageUrl) {
    return { width: 1200, height: 630 };
  }
  const url = imageUrl.toLowerCase();
  if (url.includes("og-image")) return { width: 1200, height: 630 };
  if (
    url.includes("havan-upload-1") ||
    url.includes("havan-upload-2") ||
    url.includes("havan-upload-3") ||
    url.includes("baglamukhi-anusthan-new") ||
    url.includes("real-havan-kund") ||
    url.includes("real-puja-plate")
  ) {
    return { width: 1024, height: 819 };
  }
  if (
    url.includes("mrityunjay-new") ||
    url.includes("acharya-new") ||
    url.includes("new-havan-3") ||
    url.includes("new-havan-5")
  ) {
    return { width: 731, height: 1024 };
  }
  if (
    url.includes("new-havan-1") ||
    url.includes("new-havan-4") ||
    url.includes("temple-tower") ||
    url.includes("mata-baglamukhi")
  ) {
    return { width: 576, height: 1024 };
  }
  if (
    url.includes("new-upload-6") ||
    url.includes("new-upload-7") ||
    url.includes("new-upload-8") ||
    url.includes("new-upload-9") ||
    url.includes("new-upload-10") ||
    url.includes("temple-bhog-area") ||
    url.includes("temple-devotees-1") ||
    url.includes("temple-dome-night") ||
    url.includes("temple-entrance-1") ||
    url.includes("temple-inside-1") ||
    url.includes("temple-lion-gate") ||
    url.includes("temple-night-1") ||
    url.includes("temple-night-2") ||
    url.includes("temple-side-1") ||
    url.includes("gallery-new-3")
  ) {
    return { width: 1024, height: 576 };
  }
  if (url.includes("img_5112") || url.includes("img_5116")) return { width: 1200, height: 675 };
  if (url.includes("banner-new")) return { width: 1024, height: 682 };
  if (url.includes("mata-temple-exterior")) return { width: 1024, height: 658 };
  if (url === "/mata.webp") return { width: 1080, height: 1632 };
  if (url === "/mata2.webp" || url === "/mata3.webp") return { width: 1200, height: 2133 };
  if (url.includes("logo")) return { width: 1024, height: 1024 };
  return { width: 1024, height: 1024 };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const rawService = SERVICES.find((s) => s.id === resolvedParams.id);
  if (!rawService) {
    return {
      title: "Divine Service Not Found",
    };
  }

  const title = `${rawService.title.en} | Acharya Pt. Rudraksh Rajpurohit`;
  const description = rawService.description.en;

  const ogImgUrl = rawService.image || "/logo.webp";
  const { width, height } = getImageDimensions(ogImgUrl);

  return {
    title,
    description,
    keywords: [
      "Pandit Maa Baglamukhi",
      "Bagalamukhi Pandit",
      "Mandir Pujari",
      "Baglamukhi Pujari",
      rawService.title.en,
      rawService.title.hi,
      "Maa Baglamukhi",
      "Nalkheda Dham",
      "Pt Rudraksh Rajpurohit",
      rawService.category || "puja",
      rawService.category || "puja",
      "Vedic ritual",
      "online puja booking",
    ],
    alternates: {
      canonical: `https://www.panditmaabaglamukhi.com/services/${resolvedParams.id}`,
      languages: {
        "en-IN": `https://www.panditmaabaglamukhi.com/services/${resolvedParams.id}`,
        "hi-IN": `https://www.panditmaabaglamukhi.com/services/${resolvedParams.id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.panditmaabaglamukhi.com/services/${resolvedParams.id}`,
      siteName: "Maa Baglamukhi Nalkheda Dham",
      images: [
        {
          url: ogImgUrl,
          width,
          height,
          alt: rawService.title.en,
        },
      ],
      type: "website",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImgUrl],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;
  const rawService = SERVICES.find((s) => s.id === serviceId);

  return <ServiceDetailClient rawService={rawService} />;
}
