import { Metadata } from "next";
import { SERVICES } from "@/lib/constants";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
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

  const ogImgUrl = service.image || "/logo.webp";
  const { width, height } = getImageDimensions(ogImgUrl);

  return {
    title: titleText,
    description: descriptionText.substring(0, 155),
    keywords: [
      "Pandit Maa Baglamukhi",
      "Bagalamukhi Pandit",
      "Mandir Pujari",
      "Baglamukhi Pujari",
      service.title.en,
      service.title.hi,
      "Maa Baglamukhi Temple Nalkheda",
      "Pt. Rudraksh Rajpurohit",
      "Nalkheda puja booking",
      "Siddh Peeth Nalkheda Havan"
    ].join(", "),
    alternates: {
      canonical: `https://www.panditmaabaglamukhi.com/services/${id}`,
      languages: {
        "en-IN": `https://www.panditmaabaglamukhi.com/services/${id}`,
        "hi-IN": `https://www.panditmaabaglamukhi.com/services/${id}`,
      },
    },
    openGraph: {
      title: `${service.title.en} | Maa Baglamukhi Nalkheda`,
      description: descriptionText.substring(0, 155),
      url: `https://www.panditmaabaglamukhi.com/services/${id}`,
      siteName: "Maa Baglamukhi Nalkheda Dham",
      images: [
        {
          url: ogImgUrl,
          width,
          height,
          alt: `${service.title.en} Puja Ceremony`,
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title.en} | Maa Baglamukhi Nalkheda`,
      description: descriptionText.substring(0, 155),
      images: [ogImgUrl],
    }
  };
}

export default function ServiceDetailLayout({ children }: Props) {
  return <>{children}</>;
}
