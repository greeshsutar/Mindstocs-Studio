import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';
import { isValidEmail, isValidOTP } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`verify-reset-otp:${clientIp}`, RateLimitPresets.OTP_VERIFY);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many invalid verification attempts. Please wait a few minutes or request a new code.'
      );
    }

    const body = await request.json();
    const { email, otp } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!isValidOTP(otp)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid 6-digit numeric OTP code.' },
        { status: 400 }
      );
    }

    const result = await AuthService.verifyResetOtp(email.trim().toLowerCase(), String(otp).trim());

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'OTP verification failed' },
      { status: 400 }
    );
  }
}
