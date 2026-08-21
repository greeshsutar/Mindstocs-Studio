import { NextRequest, NextResponse } from 'next/server';
import { EnquiryService } from '@/../backend/services/enquiry.service';
import { getClientIp, checkRateLimit, RateLimitPresets, createRateLimitResponse } from '@/lib/rate-limit';
import { isValidEmail, isValidName, isValidPhone, sanitize } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(`contact:${clientIp}`, RateLimitPresets.CONTACT_FORM);

    if (!rateLimit.allowed) {
      return createRateLimitResponse(
        rateLimit.retryAfterSeconds,
        rateLimit.limit,
        rateLimit.remaining,
        'Too many project briefs submitted. Please wait a few minutes before submitting another brief.'
      );
    }

    const body = await request.json();
    const { name, company, email, phone, service, description, message, timeline, budget } = body;

    const projectMessage = message || description;

    // Server-side validation
    const errors: string[] = [];

    const nameValidation = isValidName(name);
    if (!nameValidation.valid) {
      errors.push(nameValidation.message || 'Invalid name');
    }

    if (!isValidEmail(email)) {
      errors.push('A valid work email address is required.');
    }

    if (phone && !isValidPhone(phone)) {
      errors.push('Please provide a valid phone number or leave it blank.');
    }

    if (!projectMessage || typeof projectMessage !== 'string' || projectMessage.trim().length < 5) {
      errors.push('Project description or message is required (minimum 5 characters).');
    }

    if (projectMessage && projectMessage.length > 5000) {
      errors.push('Project description cannot exceed 5000 characters.');
    }

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    // Save to Database and trigger both confirmation & admin alert emails
    const enquiry = await EnquiryService.submitEnquiry({
      name: sanitize(name, 80),
      company: sanitize(company || '', 100),
      email: email.trim().toLowerCase(),
      phone: sanitize(phone || '', 30),
      service: sanitize(service || '', 80),
      message: sanitize(projectMessage, 5000),
      timeline: sanitize(timeline || '', 50),
      budget: sanitize(budget || '', 50),
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
