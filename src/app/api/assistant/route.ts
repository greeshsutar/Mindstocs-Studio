import { NextRequest, NextResponse } from 'next/server';
import { matchAssistantResponse } from '@/data/assistant-knowledge';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';

// Simple input sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`assistant:${clientIp}`, RateLimitPresets.ASSISTANT_AI);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Assistant rate limit reached. Please wait a moment before sending more queries.'
      );
    }

    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message content is required.' },
        { status: 400 }
      );
    }

    const sanitizedMessage = sanitizeInput(message);

    // Default to our secure local rule-based engine to prevent hallucinations
    const matched = matchAssistantResponse(sanitizedMessage);

    console.log(`[Assistant Query]: ${sanitizedMessage} -> Resolved: ${matched.message.slice(0, 50)}...`);

    return NextResponse.json({
      message: matched.message,
      suggestedActions: matched.suggestedActions || [],
      ctaType: matched.ctaType || 'none',
    });
  } catch (error) {
    console.error('[Assistant API Error]:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
