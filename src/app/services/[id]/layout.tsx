import { Metadata } from "next";
import { SERVICES } from "@/lib/constants";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = SERVICES.find(s => s.id === id);
  if (!service) {
    return {
      title: "Divine Ritual Service | Maa Baglamukhi Nalkheda Dham",
      description: "Sacred Vedic Yajna and Havan services conducted at Maa Baglamukhi Temple, Nalkheda Dham.",
      alternates: {
        canonical: "https://www.panditmaabaglamukhi.com/services",
      }
    };
  }

  const titleText = `${service.title.en} - ${service.title.hi} | Book Havan & Puja`;
  const shortDesc = service.description.en.length > 105 
    ? `${service.description.en.substring(0, 105)}...` 
    : service.description.en;
  const descriptionText = `Book authentic ${service.title.en} Havan performed by Acharya Pt. Rudraksh at Siddh Peeth Nalkheda. ${shortDesc} 🙏`;

  return {
    title: titleText,
    description: descriptionText.substring(0, 155),
    keywords: [
      service.title.en,
      service.title.hi,
      "Maa Baglamukhi Temple Nalkheda",
      "Pt. Rudraksh Rajpurohit",
      "Nalkheda puja booking",
      "Siddh Peeth Nalkheda Havan"
    ].join(", "),
    alternates: {
      canonical: `https://www.panditmaabaglamukhi.com/services/${id}`,
    },
    openGraph: {
      title: `${service.title.en} | Maa Baglamukhi Nalkheda`,
      description: descriptionText.substring(0, 155),
      url: `https://www.panditmaabaglamukhi.com/services/${id}`,
      siteName: "Maa Baglamukhi Nalkheda Dham",
      images: [
        {
          url: service.image || "/logo.webp",
          width: 800,
          height: 600,
          alt: `${service.title.en} Puja Ceremony`,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title.en} | Maa Baglamukhi Nalkheda`,
      description: descriptionText.substring(0, 155),
      images: [service.image || "/logo.webp"],
    }
  };
}

export default function ServiceDetailLayout({ children }: Props) {
  return <>{children}</>;
}
