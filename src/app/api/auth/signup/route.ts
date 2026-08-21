import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/../backend/services/auth.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';
import { isValidEmail, isValidPassword, isValidName, sanitize } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`signup:${clientIp}`, RateLimitPresets.AUTH_STRICT);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many signup attempts from this IP. Please try again in a few minutes.'
      );
    }

    const body = await request.json();
    const { name, email, password } = body;

    const nameValidation = isValidName(name);
    if (!nameValidation.valid) {
      return NextResponse.json(
        { success: false, message: nameValidation.message },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const passValidation = isValidPassword(password);
    if (!passValidation.valid) {
      return NextResponse.json(
        { success: false, message: passValidation.message },
        { status: 400 }
      );
    }

    const result = await AuthService.signup({
      name: sanitize(name, 80),
      email: email.trim().toLowerCase(),
      password,
    });

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
