import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`verify-otp:${clientIp}`, RateLimitPresets.OTP_VERIFY);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many incorrect OTP attempts. Please wait a few minutes or request a new code.'
      );
    }

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
