import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';
import { isValidEmail } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`resend-otp:${clientIp}`, RateLimitPresets.OTP_SENSITIVE);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many OTP requests. Please wait a few minutes before requesting another code.'
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const result = await AuthService.resendOtp(email.trim().toLowerCase());

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
