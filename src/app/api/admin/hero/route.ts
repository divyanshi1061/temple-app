import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { HeroImage } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';
import { validateImageFile } from '@/lib/serverValidation';

// POST /api/admin/hero — upload new hero portrait image
export async function POST(req: NextRequest) {
  try {
    const adminPayload = verifyAdminToken(req);
    if (!adminPayload) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await req.formData();
    // The admin page uploads with field name "heroImage"
    const file = (formData.get('heroImage') || formData.get('image')) as File;

    if (!file) {
      return NextResponse.json({ message: 'No image file provided' }, { status: 400 });
    }

    const validation = await validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json({ message: validation.error }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mime = file.type || 'image/webp';
    const url = `data:${mime};base64,${buffer.toString('base64')}`;
    const filename = file.name || `hero-${Date.now()}`;

    // Replace existing hero image (only one active at a time)
    await HeroImage.deleteMany({});
    const newHero = await HeroImage.create({ filename, url });

    return NextResponse.json({ message: 'Hero image updated successfully', hero: newHero });
  } catch (error: any) {
    console.error('Admin Hero POST Error:', error);
    return NextResponse.json({ message: 'Failed to update hero image', error: error.message }, { status: 500 });
  }
}
