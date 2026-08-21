import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';
import { isValidEmail, isValidPassword } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`reset-password:${clientIp}`, RateLimitPresets.AUTH_STRICT);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many password reset attempts. Please wait a few minutes before trying again.'
      );
    }

    const body = await request.json();
    const { email, resetToken, newPassword } = body;

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (!resetToken || typeof resetToken !== 'string' || resetToken.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Valid password reset authorization token is required.' },
        { status: 400 }
      );
    }

    const passValidation = isValidPassword(newPassword);
    if (!passValidation.valid) {
      return NextResponse.json(
        { success: false, message: passValidation.message },
        { status: 400 }
      );
    }

    const result = await AuthService.resetPassword({
      email: email.trim().toLowerCase(),
      resetToken: resetToken.trim(),
      newPassword,
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to reset password' },
      { status: 400 }
    );
  }
}
