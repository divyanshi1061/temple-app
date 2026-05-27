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
          url: rawService.image || "/logo.webp",
          width: 800,
          height: 600,
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
      images: [rawService.image || "/logo.webp"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;
  const rawService = SERVICES.find((s) => s.id === serviceId);

  return <ServiceDetailClient rawService={rawService} />;
}
