import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/constants';

export async function GET() {
  try {
    const dbServices = SERVICES.map(s => ({
      _id: s.id,
      titleEn: s.title.en,
      titleHi: s.title.hi,
      descriptionEn: s.description.en,
      descriptionHi: s.description.hi,
      longDescriptionEn: s.longDescription?.en || "",
      longDescriptionHi: s.longDescription?.hi || "",
      category: s.category || "puja",
      image: s.image || "/new-havan-1.jpg",
      popular: s.popular || false,
    }));
    return NextResponse.json(dbServices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
