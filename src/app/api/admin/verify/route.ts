import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const adminPayload = verifyAdminToken(req);
  if (!adminPayload) {
    return NextResponse.json({ authenticated: false, message: 'Invalid or missing token' }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, admin: adminPayload });
}
