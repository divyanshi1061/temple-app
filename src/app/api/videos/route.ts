import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Video } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find().sort({ uploadedAt: -1 });
    return NextResponse.json(videos);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve videos', error: error.message }, { status: 500 });
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
      const title = (formData.get('title') as string) || 'Ritual Video';
      const file = formData.get('video') as File;

      if (!file) {
        return NextResponse.json({ message: 'No video file provided' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mime = file.type || 'video/mp4';
      const base64Data = `data:${mime};base64,${buffer.toString('base64')}`;

      const newVideo = await Video.create({
        title,
        videoId: `vid-${Date.now()}`,
        url: base64Data,
      });

      return NextResponse.json({ message: 'Video uploaded successfully', video: newVideo }, { status: 201 });
    } else {
      const body = await req.json().catch(() => ({}));
      const { title, videoId, url } = body;

      if (!title || (!videoId && !url)) {
        return NextResponse.json({ message: 'Title and videoId or url are required' }, { status: 400 });
      }

      const finalUrl = url || `https://www.youtube.com/watch?v=${videoId}`;
      const newVideo = await Video.create({
        title,
        videoId: videoId || `yt-${Date.now()}`,
        url: finalUrl,
      });

      return NextResponse.json({ message: 'Video saved successfully', video: newVideo }, { status: 201 });
    }
  } catch (error: any) {
    console.error('Video POST Error:', error);
    return NextResponse.json({ message: 'Failed to save video', error: error.message }, { status: 500 });
  }
}
