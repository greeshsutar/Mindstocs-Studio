/**
 * Centralized Input Validation & Sanitization Utility for MindStocs Studio
 */

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const OTP_REGEX = /^\d{6}$/;
const PHONE_REGEX = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?)?[\d\s.-]{5,16}$/;

/**
 * Validate standard email format
 */
export function isValidEmail(email: unknown): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return EMAIL_REGEX.test(trimmed);
}

/**
 * Validate 6-digit numeric OTP code
 */
export function isValidOTP(otp: unknown): boolean {
  if (!otp || typeof otp !== 'string') return false;
  return OTP_REGEX.test(otp.trim());
}

/**
 * Validate user password strength
 */
export function isValidPassword(password: unknown): { valid: boolean; message?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters long.' };
  }
  if (password.length > 128) {
    return { valid: false, message: 'Password cannot exceed 128 characters.' };
  }
  return { valid: true };
}

/**
 * Validate full name
 */
export function isValidName(name: unknown): { valid: boolean; message?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, message: 'Name is required.' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters long.' };
  }
  if (trimmed.length > 80) {
    return { valid: false, message: 'Name cannot exceed 80 characters.' };
  }
  return { valid: true };
}

/**
 * Validate phone number format (if provided)
 */
export function isValidPhone(phone: unknown): boolean {
  if (!phone || typeof phone !== 'string') return true; // Phone is optional
  const trimmed = phone.trim();
  if (trimmed.length === 0) return true;
  return PHONE_REGEX.test(trimmed);
}

/**
 * Sanitize strings against XSS / HTML injection and enforce max lengths
 */
export function sanitize(input: unknown, maxLength = 2000): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLength);
}
