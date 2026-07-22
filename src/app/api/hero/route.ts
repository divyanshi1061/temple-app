import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { HeroImage } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const hero = await HeroImage.findOne().sort({ uploadedAt: -1 });
    if (!hero) {
      return NextResponse.json({ url: '/acharya-new.webp', filename: 'acharya-new.webp' });
    }
    return NextResponse.json(hero);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve hero image', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminPayload = verifyAdminToken(req);
    if (!adminPayload) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const contentType = req.headers.get('content-type') || '';

    let url = '';
    let filename = `hero-${Date.now()}`;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('image') as File;

      if (!file) {
        return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
      }

      filename = file.name || filename;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mime = file.type || 'image/webp';
      url = `data:${mime};base64,${buffer.toString('base64')}`;
    } else {
      const body = await req.json().catch(() => ({}));
      if (body.url) url = body.url;
      if (body.filename) filename = body.filename;
    }

    if (!url) {
      return NextResponse.json({ message: 'Hero image URL or file is required' }, { status: 400 });
    }

    // Upsert hero image config
    await HeroImage.deleteMany({});
    const newHero = await HeroImage.create({ filename, url });

    return NextResponse.json({ message: 'Hero image updated successfully', hero: newHero }, { status: 200 });
  } catch (error: any) {
    console.error('Hero POST Error:', error);
    return NextResponse.json({ message: 'Failed to update hero image', error: error.message }, { status: 500 });
  }
}
