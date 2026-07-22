import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryImage } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';
import { validateImageFile } from '@/lib/serverValidation';

// POST /api/admin/gallery — upload new images (multipart/form-data)
export async function POST(req: NextRequest) {
  try {
    const adminPayload = verifyAdminToken(req);
    if (!adminPayload) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await req.formData();
    const caption = (formData.get('caption') as string) || '';
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ message: 'No image files provided' }, { status: 400 });
    }

    const savedImages = [];
    for (const file of files) {
      const validation = await validateImageFile(file);
      if (!validation.valid) {
        return NextResponse.json({ message: validation.error }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mime = file.type || 'image/jpeg';
      const url = `data:${mime};base64,${buffer.toString('base64')}`;

      const newImage = await GalleryImage.create({
        filename: file.name || `image-${Date.now()}`,
        caption,
        url,
      });
      savedImages.push(newImage);
    }

    return NextResponse.json({ message: 'Images uploaded successfully', images: savedImages }, { status: 201 });
  } catch (error: any) {
    console.error('Admin Gallery POST Error:', error);
    return NextResponse.json({ message: 'Failed to upload images', error: error.message }, { status: 500 });
  }
}
