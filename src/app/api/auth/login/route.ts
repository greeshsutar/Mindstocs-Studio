import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`login:${clientIp}`, RateLimitPresets.AUTH_STRICT);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many failed login attempts. Please wait a few minutes before trying again.'
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const result = await AuthService.login({ email, password });

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
      data: result,
    });
  } catch (error: any) {
    const statusCode = error.statusCode || 400;
    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Login failed',
        ...(error.requiresOtp && { requiresOtp: true, email: error.email }),
      },
      { status: statusCode }
    );
  }
}
