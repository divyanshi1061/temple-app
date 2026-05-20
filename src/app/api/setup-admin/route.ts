import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/db';
import { AdminUser } from '@/lib/models';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    if (!secret || secret !== process.env.NEXTAUTH_SECRET) {
      return NextResponse.json({ error: 'Unauthorized. Provide secret query parameter.' }, { status: 401 });
    }

    await connectToDatabase();
    
    const adminExists = await AdminUser.findOne({ email: 'admin@rudrakshbaglamukhi.com' });
    
    if (adminExists) {
      return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await AdminUser.create({
      name: 'Admin',
      email: 'admin@rudrakshbaglamukhi.com',
      password: hashedPassword,
      role: 'admin'
    });

    return NextResponse.json({ message: 'Admin created successfully. Email: admin@rudrakshbaglamukhi.com, Password: admin123' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
  }
}
