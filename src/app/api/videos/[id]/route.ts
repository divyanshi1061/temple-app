import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Video } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminPayload = verifyAdminToken(req);
    if (!adminPayload) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const deleted = await Video.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Video deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to delete video', error: error.message }, { status: 500 });
  }
}
