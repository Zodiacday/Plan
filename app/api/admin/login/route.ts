import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// In production, use environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'plugdude2025';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === ADMIN_PASSWORD) {
      // Create a simple session token (in production, use proper JWT)
      const cookieStore = await cookies();
      cookieStore.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    );
  }
}
