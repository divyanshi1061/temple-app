import { NextResponse } from 'next/server';
import { SERVICES } from '@/lib/constants';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const s = SERVICES.find(item => item.id === resolvedParams.id);
    if (!s) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    const sObj = {
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
    };

    return NextResponse.json(sObj);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}
