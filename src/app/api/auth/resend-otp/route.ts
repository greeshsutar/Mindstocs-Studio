import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required.' },
        { status: 400 }
      );
    }

    const result = await AuthService.resendOtp(email);

    return NextResponse.json({
      success: true,
      message: 'A fresh verification code has been sent.',
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to resend OTP' },
      { status: 400 }
    );
  }
}
