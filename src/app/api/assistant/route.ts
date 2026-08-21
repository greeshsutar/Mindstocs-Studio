import { NextRequest, NextResponse } from 'next/server';
import { generateRAGResponse } from '@/lib/assistant/rag-engine';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';

// Input sanitization
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

    // Execute RAG Knowledge Retrieval & Answer Generation Pipeline
    const ragResult = await generateRAGResponse(sanitizedMessage);

    console.log(`[RAG Assistant Query]: "${sanitizedMessage}" -> Found ${ragResult.sources.length} sources (Confidence: ${(ragResult.confidence * 100).toFixed(0)}%)`);

    return NextResponse.json({
      message: ragResult.answer,
      sources: ragResult.sources,
      confidence: ragResult.confidence,
      suggestedActions: ragResult.suggestedActions || [],
      cta: ragResult.cta,
      ctaType: ragResult.cta?.type || 'none',
    });
  } catch (error) {
    console.error('[Assistant API Error]:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
