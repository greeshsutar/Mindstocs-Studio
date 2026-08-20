import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }

    const result = await AuthService.signup({ name, email, password });

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email.',
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Signup failed' },
      { status: 400 }
    );
  }
}
