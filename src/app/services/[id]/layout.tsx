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
      title: "Divine Ritual Service",
      description: "Sacred Vedic Yajna and Havan services conducted at Maa Baglamukhi Temple, Nalkheda Dham.",
    };
  }

  const titleText = `${service.title.en} (${service.title.hi})`;
  const descriptionText = `${service.description.en} This sacred Yajna and Havan is personally conducted by Acharya Pt. Rudraksh Rajpurohit at Siddh Peeth Maa Baglamukhi Temple, Nalkheda Dham.`;

  return {
    title: titleText,
    description: descriptionText,
    keywords: [
      service.title.en,
      service.title.hi,
      "Maa Baglamukhi Temple Nalkheda",
      "Pt. Rudraksh Rajpurohit",
      "Nalkheda puja booking",
      "Siddh Peeth Nalkheda Havan"
    ].join(", "),
    alternates: {
      canonical: `/services/${id}`,
    },
  };
}

export default function ServiceDetailLayout({ children }: Props) {
  return <>{children}</>;
}
