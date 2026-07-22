import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Review } from '@/lib/models';

// In-memory rate limiting map for reviews (IP -> { count, expiresAt })
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REVIEWS_PER_WINDOW = 5;

export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to retrieve reviews', error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json().catch(() => ({}));
    const { name, rating, comment, location } = body;

    if (!name || !rating || !comment) {
      return NextResponse.json({ message: 'Name, rating, and comment are required' }, { status: 400 });
    }

    // Rate limiting check
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now < rateData.expiresAt) {
      if (rateData.count >= MAX_REVIEWS_PER_WINDOW) {
        return NextResponse.json({ message: 'Too many reviews submitted. Please try again later.' }, { status: 429 });
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    }

    // Clean up old entries occasionally (simple garbage collection)
    if (Math.random() < 0.1) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.expiresAt) {
          rateLimitMap.delete(key);
        }
      }
    }

    const newReview = await Review.create({
      name,
      rating: Number(rating),
      comment,
      location: location || '',
      approved: false, // New reviews require admin approval
    });

    return NextResponse.json({ message: 'Review submitted successfully. It will be visible after verification.', review: newReview }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to submit review', error: error.message }, { status: 500 });
  }
}
