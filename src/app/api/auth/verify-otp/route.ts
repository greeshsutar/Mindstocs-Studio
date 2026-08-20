import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and 6-digit OTP are required.' },
        { status: 400 }
      );
    }

    const result = await AuthService.verifyOtpAndActivate(email, otp);

    return NextResponse.json({
      success: true,
      message: 'Account verified successfully. Welcome!',
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'OTP verification failed' },
      { status: 400 }
    );
  }
}
