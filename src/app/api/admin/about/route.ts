import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { About } from '@/lib/models';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const about = await About.findOne();
    return NextResponse.json(about || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about content' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const body = await req.json();
    
    // There should only be one about document
    let about = await About.findOne();
    if (about) {
      about = await About.findByIdAndUpdate(about._id, body, { new: true });
    } else {
      about = await About.create(body);
    }
    
    return NextResponse.json(about);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about content' }, { status: 500 });
  }
}
