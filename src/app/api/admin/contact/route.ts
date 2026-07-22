import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContactConfig } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

// POST /api/admin/contact — update contact configuration
export async function POST(req: NextRequest) {
  try {
    const adminPayload = verifyAdminToken(req);
    if (!adminPayload) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await req.json().catch(() => ({}));
    const { phone, whatsapp, email, address } = body;

    if (!phone || !whatsapp || !email || !address) {
      return NextResponse.json({ message: 'All contact fields (phone, whatsapp, email, address) are required' }, { status: 400 });
    }

    await ContactConfig.deleteMany({});
    const newConfig = await ContactConfig.create({ phone, whatsapp, email, address });

    return NextResponse.json({ message: 'Contact details updated successfully', contact: newConfig });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update contact details', error: error.message }, { status: 500 });
  }
}
