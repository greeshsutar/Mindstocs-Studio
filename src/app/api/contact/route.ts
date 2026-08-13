import { NextRequest, NextResponse } from 'next/server';

// Simple input sanitization
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, 5000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, service, description, timeline, budget } = body;

    // Server-side validation
    const errors: string[] = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters).');
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      errors.push('A valid email address is required.');
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      errors.push('Project description is required (minimum 10 characters).');
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Sanitize all fields
    const sanitizedData = {
      name: sanitize(name),
      company: sanitize(company || ''),
      email: sanitize(email),
      phone: sanitize(phone || ''),
      service: sanitize(service || ''),
      description: sanitize(description),
      timeline: sanitize(timeline || ''),
      budget: sanitize(budget || ''),
      submittedAt: new Date().toISOString(),
    };

    // TODO: Plug in email provider here (Resend, Nodemailer, webhook, etc.)
    // For now, log the submission (visible in server console during development)
    console.log('[Contact Form Submission]', sanitizedData);

    return NextResponse.json({
      success: true,
      message: 'Project brief received.',
    });
  } catch {
    return NextResponse.json(
      { success: false, errors: ['Invalid request.'] },
      { status: 400 }
    );
  }
}
