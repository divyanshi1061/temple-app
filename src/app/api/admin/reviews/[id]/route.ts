import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Review } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

export async function PUT(
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
    const body = await req.json().catch(() => ({}));

    const review = await Review.findById(id);
    if (!review) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    if (typeof body.approved === 'boolean') {
      review.approved = body.approved;
    } else {
      review.approved = !review.approved; // toggle
    }

    await review.save();
    return NextResponse.json({ message: 'Review status updated successfully', review });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update review', error: error.message }, { status: 500 });
  }
}

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

    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Review deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to delete review', error: error.message }, { status: 500 });
  }
}
