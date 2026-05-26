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
    alternates: {
      canonical: `https://www.panditmaabaglamukhi.com/services/${resolvedParams.id}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.panditmaabaglamukhi.com/services/${resolvedParams.id}`,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const serviceId = resolvedParams.id;
  const rawService = SERVICES.find((s) => s.id === serviceId);

  return <ServiceDetailClient rawService={rawService} />;
}
