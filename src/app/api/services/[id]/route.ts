import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Service } from '@/lib/models';
import { SERVICES } from '@/lib/constants';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const service = await Service.findById(resolvedParams.id);
    if (!service) {
        return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }
    
    const sObj = service.toObject();
    if (!sObj.image) {
      const constantService = SERVICES.find(cs => cs.title.en === sObj.titleEn || cs.title.hi === sObj.titleHi);
      if (constantService && constantService.image) {
        sObj.image = constantService.image;
      } else {
        sObj.image = '/new-havan-1.jpg'; // General fallback
      }
    }

    return NextResponse.json(sObj);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service' }, { status: 500 });
  }
}
