import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Acharya Pt Rudraksh Rajpurohit & Siddh Peeth Nalkheda Dham",
  description: "Learn about the ancient history of Siddh Peeth Maa Baglamukhi Temple at Nalkheda Dham and the spiritual lineage of Vedic Priest Acharya Pt Rudraksh Rajpurohit.",
  keywords: [
    "Acharya Pt Rudraksh Rajpurohit",
    "Maa Baglamukhi Temple Nalkheda history",
    "Baglamukhi Sadhak Nalkheda",
    "Vedic Priest Nalkheda Dham",
    "Pandava era temple Nalkheda",
    "Nalkheda temple history"
  ].join(", "),
  alternates: {
    canonical: "https://www.panditmaabaglamukhi.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
