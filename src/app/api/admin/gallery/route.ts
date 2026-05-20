import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { GalleryImage } from '@/lib/models';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const images = await GalleryImage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    const image = await GalleryImage.create(body);
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add image' }, { status: 500 });
  }
}
