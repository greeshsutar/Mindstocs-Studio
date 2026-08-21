import { NextRequest, NextResponse } from 'next/server';

interface RateLimitConfig {
  limit: number; // Max allowed requests
  windowMs: number; // Time window in milliseconds
  message?: string; // Custom error message
}

interface RateLimitRecord {
  timestamps: number[];
}

// In-memory store for rate limiting
const store = new Map<string, RateLimitRecord>();

// Cleanup stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      // Keep only timestamps within the last 1 hour
      record.timestamps = record.timestamps.filter((ts) => now - ts < 3600 * 1000);
      if (record.timestamps.length === 0) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Extract client IP from Next.js request headers
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) {
    return cfIp.trim();
  }
  return '127.0.0.1';
}

/**
 * Check if request exceeds rate limit using a sliding window algorithm
 */
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  let record = store.get(key);
  if (!record) {
    record = { timestamps: [] };
    store.set(key, record);
  }

  // Filter out timestamps outside the sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  const currentCount = record.timestamps.length;
  const allowed = currentCount < config.limit;

  if (allowed) {
    record.timestamps.push(now);
  }

  const oldestTimestamp = record.timestamps[0] || now;
  const resetTimeMs = oldestTimestamp + config.windowMs;
  const retryAfterSeconds = Math.max(1, Math.ceil((resetTimeMs - now) / 1000));
  const remaining = Math.max(0, config.limit - record.timestamps.length);

  return {
    allowed,
    limit: config.limit,
    remaining,
    resetTimeMs,
    retryAfterSeconds,
  };
}

/**
 * Standard Rate Limit Presets
 */
export const RateLimitPresets = {
  // Login / Signup / Reset Password (5 requests per 15 minutes)
  AUTH_STRICT: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
    message: 'Too many authentication attempts. Please try again in a few minutes.',
  },
  // Resend OTP / Forgot Password (3 requests per 10 minutes)
  OTP_SENSITIVE: {
    limit: 3,
    windowMs: 10 * 60 * 1000,
    message: 'Too many OTP requests. Please wait a few minutes before requesting a new code.',
  },
  // OTP Verification (10 attempts per 15 minutes to prevent brute forcing)
  OTP_VERIFY: {
    limit: 10,
    windowMs: 15 * 60 * 1000,
    message: 'Too many invalid verification attempts. Please request a new code.',
  },
  // Contact Form (5 submissions per 15 minutes)
  CONTACT_FORM: {
    limit: 5,
    windowMs: 15 * 60 * 1000,
    message: 'Too many project briefs submitted. Please wait a few minutes or reach out on WhatsApp.',
  },
  // Assistant AI (20 messages per 5 minutes)
  ASSISTANT_AI: {
    limit: 20,
    windowMs: 5 * 60 * 1000,
    message: 'Assistant rate limit reached. Please wait a moment before sending more messages.',
  },
};

/**
 * Helper to generate a 429 Too Many Requests response with standard RFC headers
 */
export function createRateLimitResponse(
  retryAfterSeconds: number,
  limit: number,
  remaining: number,
  customMessage?: string
): NextResponse {
  const message =
    customMessage ||
    `Too many requests. Please slow down and try again in ${retryAfterSeconds} seconds.`;

  return NextResponse.json(
    {
      success: false,
      message,
      error: 'Too Many Requests',
      retryAfter: retryAfterSeconds,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSeconds),
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': String(remaining),
      },
    }
  );
}
