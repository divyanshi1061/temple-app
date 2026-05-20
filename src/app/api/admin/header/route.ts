import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Header } from '@/lib/models';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const header = await Header.findOne();
    return NextResponse.json(header || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch header content' }, { status: 500 });
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
    
    let header = await Header.findOne();
    if (header) {
      header = await Header.findByIdAndUpdate(header._id, body, { new: true });
    } else {
      header = await Header.create(body);
    }
    
    return NextResponse.json(header);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update header content' }, { status: 500 });
  }
}
