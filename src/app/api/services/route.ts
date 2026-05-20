import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Service } from '@/lib/models';
import { SERVICES } from '@/lib/constants';

export async function GET() {
  try {
    await connectToDatabase();
    const services = await Service.find({}).sort({ createdAt: -1 });
    
    const enrichedServices = services.map(s => {
      const sObj = s.toObject();
      if (!sObj.image) {
        const constantService = SERVICES.find(cs => cs.title.en === sObj.titleEn || cs.title.hi === sObj.titleHi);
        if (constantService && constantService.image) {
          sObj.image = constantService.image;
        } else {
          sObj.image = '/new-havan-1.jpg'; // General fallback
        }
      }
      return sObj;
    });

    return NextResponse.json(enrichedServices);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
