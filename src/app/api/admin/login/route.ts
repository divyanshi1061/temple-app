import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Admin } from '@/lib/models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jnbdnn11233nncdj';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({}));
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
    }

    // Auto-initialize admin account if DB has no admin record
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const defaultUsername = process.env.ADMIN_USERNAME || 'admin_rudrakshPandit';
      const defaultPassword = process.env.ADMIN_PASSWORD || 'Rudrakh_balamukhi_x12w225';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);
      await Admin.create({ username: defaultUsername, passwordHash: hashedPassword });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '4h' }
    );

    const response = NextResponse.json({
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 4 * 60 * 60, // 4 hours in seconds
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login Route Error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
