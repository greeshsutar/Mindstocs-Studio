import { NextRequest, NextResponse } from 'next/server';
import { matchAssistantResponse } from '@/data/assistant-knowledge';

// Simple input sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 1000);
}

export async function POST(request: NextRequest) {
  try {
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

    // Optional LLM webhook / backend API key check (e.g., if a developer configures it later)
    // If process.env.OPENAI_API_KEY is present, we could optionally call it for more fluent conversation.
    // For now, we rely on the strict client rule-base to guarantee accuracy and zero hallucinations.
    console.log(`[Assistant Query]: ${sanitizedMessage} -> Resolved: ${matched.message.slice(0, 50)}...`);

    return NextResponse.json({
      message: matched.message,
      suggestedActions: matched.suggestedActions || [],
      ctaType: matched.ctaType || 'none'
    });

  } catch (error) {
    console.error('[Assistant API Error]:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
