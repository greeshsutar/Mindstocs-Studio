import { NextRequest, NextResponse } from 'next/server';
import { EnquiryService } from '@/../backend/services/enquiry.service';

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
    const { name, company, email, phone, service, description, message, timeline, budget } = body;

    const projectMessage = message || description;

    // Server-side validation
    const errors: string[] = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name is required (minimum 2 characters).');
    }

    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      errors.push('A valid email address is required.');
    }

    if (!projectMessage || typeof projectMessage !== 'string' || projectMessage.trim().length < 5) {
      errors.push('Project description or message is required.');
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Save to Database and trigger both confirmation & admin alert emails
    const enquiry = await EnquiryService.submitEnquiry({
      name: sanitize(name),
      company: sanitize(company || ''),
      email: sanitize(email),
      phone: sanitize(phone || ''),
      service: sanitize(service || ''),
      message: sanitize(projectMessage),
      timeline: sanitize(timeline || ''),
      budget: sanitize(budget || ''),
    });

    console.log('[Contact API] Saved enquiry and dispatched emails:', enquiry.id);

    return NextResponse.json({
      success: true,
      message: 'Project brief received. Confirmation email sent.',
      data: enquiry,
    });
  } catch (error: any) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      { success: false, errors: [error.message || 'Failed to process enquiry.'] },
      { status: 500 }
    );
  }
}
