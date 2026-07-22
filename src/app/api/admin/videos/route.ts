import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Video } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';
import { validateVideoFile, isAllowedYouTubeUrl } from '@/lib/serverValidation';

const cleanYouTubeUrl = (url: string): string => {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[1] && match[1].length === 11) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
};

// POST /api/admin/videos — add YouTube embed or upload video file
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
      const type = (formData.get('type') as string) || 'embed';
      const embedUrl = formData.get('url') as string;
      const videoFile = formData.get('videoFile') as File;

      if (type === 'embed') {
        if (!embedUrl) {
          return NextResponse.json({ message: 'Embed URL is required' }, { status: 400 });
        }
        if (!isAllowedYouTubeUrl(embedUrl)) {
          return NextResponse.json({ message: 'Invalid URL. Only YouTube links are allowed.' }, { status: 400 });
        }
        const cleanUrl = cleanYouTubeUrl(embedUrl);
        const newVideo = await Video.create({ title, videoId: `yt-${Date.now()}`, url: cleanUrl });
        return NextResponse.json({ message: 'Video added successfully', video: newVideo }, { status: 201 });
      }

      if (type === 'upload') {
        if (!videoFile) {
          return NextResponse.json({ message: 'Video file is required' }, { status: 400 });
        }
        const validation = await validateVideoFile(videoFile);
        if (!validation.valid) {
          return NextResponse.json({ message: validation.error }, { status: 400 });
        }
        const bytes = await videoFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const mime = videoFile.type || 'video/mp4';
        const url = `data:${mime};base64,${buffer.toString('base64')}`;
        const newVideo = await Video.create({ title, videoId: `vid-${Date.now()}`, url });
        return NextResponse.json({ message: 'Video uploaded successfully', video: newVideo }, { status: 201 });
      }

      return NextResponse.json({ message: 'Invalid video type' }, { status: 400 });
    }

    // JSON body fallback
    const body = await req.json().catch(() => ({}));
    const { title, url, videoId } = body;
    if (!title || !url) {
      return NextResponse.json({ message: 'Title and URL are required' }, { status: 400 });
    }
    if (!isAllowedYouTubeUrl(url)) {
      return NextResponse.json({ message: 'Invalid URL. Only YouTube links are allowed.' }, { status: 400 });
    }
    const newVideo = await Video.create({ title, videoId: videoId || `vid-${Date.now()}`, url: cleanYouTubeUrl(url) });
    return NextResponse.json({ message: 'Video added successfully', video: newVideo }, { status: 201 });
  } catch (error: any) {
    console.error('Admin Videos POST Error:', error);
    return NextResponse.json({ message: 'Failed to save video', error: error.message }, { status: 500 });
  }
}
