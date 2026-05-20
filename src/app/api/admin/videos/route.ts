import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Video } from '@/lib/models';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
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
    
    // Extract video ID from URL if full URL is provided
    let url = body.url;
    if (url.includes('youtube.com/watch?v=')) {
      url = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      url = url.split('youtu.be/')[1].split('?')[0];
    }
    body.url = url;

    const video = await Video.create(body);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add video' }, { status: 500 });
  }
}
