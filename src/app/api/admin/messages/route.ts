import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { ContactMessage } from '@/lib/models';
import { auth } from '@/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const message = await ContactMessage.create(body);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit message' }, { status: 500 });
  }
}
