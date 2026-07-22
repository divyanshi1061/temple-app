import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ContactConfig } from '@/lib/models';
import { verifyAdminToken } from '@/lib/auth';

const DEFAULT_CONTACT = {
  phone: '+919926616016',
  whatsapp: '919926616016',
  email: 'rudrakshrajpurohit54@gmail.com',
  address: 'Shri Baglamukhi Mandir, Nalkheda, District Agar Malwa, Madhya Pradesh - 465445',
};

export async function GET() {
  try {
    await connectDB();
    const config = await ContactConfig.findOne();
    if (!config) {
      return NextResponse.json(DEFAULT_CONTACT);
    }
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json(DEFAULT_CONTACT);
  }
}

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
      return NextResponse.json({ message: 'All contact fields are required' }, { status: 400 });
    }

    await ContactConfig.deleteMany({});
    const newConfig = await ContactConfig.create({ phone, whatsapp, email, address });

    return NextResponse.json({ message: 'Contact details updated successfully', contact: newConfig }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Failed to update contact details', error: error.message }, { status: 500 });
  }
}
