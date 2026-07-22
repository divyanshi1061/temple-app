import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { GalleryImage } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find().sort({ uploadedAt: -1 });
    return NextResponse.json(images);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve gallery images', error: error.message }, { status: 500 });
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
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const caption = (formData.get('caption') as string) || '';
      const files = formData.getAll('images') as File[];

      if (!files || files.length === 0) {
        return NextResponse.json({ message: 'No image files provided' }, { status: 400 });
      }

      const savedImages = [];
      for (const file of files) {
        // Convert file buffer to Data URL (base64) so it works seamlessly anywhere without disk storage
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mime = file.type || 'image/jpeg';
        const base64Data = `data:${mime};base64,${buffer.toString('base64')}`;

        const newImage = await GalleryImage.create({
          filename: file.name || `image-${Date.now()}`,
          caption,
          url: base64Data,
        });
        savedImages.push(newImage);
      }

      return NextResponse.json({ message: 'Images uploaded successfully', images: savedImages }, { status: 201 });
    } else {
      const body = await req.json().catch(() => ({}));
      const { url, caption, filename } = body;
      if (!url) {
        return NextResponse.json({ message: 'Image URL is required' }, { status: 400 });
      }
      const newImage = await GalleryImage.create({
        filename: filename || `image-${Date.now()}`,
        caption: caption || '',
        url,
      });
      return NextResponse.json({ message: 'Image added successfully', image: newImage }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Gallery POST Error:', error);
    return NextResponse.json({ message: 'Failed to upload image', error: error.message }, { status: 500 });
  }
}
