import crypto from 'crypto';
import { OTPModel } from '../models/otp.model';
import { MailService } from './mail.service';
import { config } from '../config/env';

export const OTPService = {
  generateCode(): string {
    // Generate a secure 6-digit numeric OTP (e.g. 100000 - 999999)
    return crypto.randomInt(100000, 999999).toString();
  },

  async createAndSendOTP(email: string, userName?: string, type: string = 'signup_verification'): Promise<{ success: boolean; expiresInMinutes: number }> {
    const otp = this.generateCode();

    // Store in DB with 5-minute expiry
    await OTPModel.createOTP(email, otp, config.otp.expiresInMinutes, type);

    // Send via email using Nodemailer
    await MailService.sendOTPEmail(email, otp, userName);

    return {
      success: true,
      expiresInMinutes: config.otp.expiresInMinutes,
    };
  },

  async verifyOTP(email: string, otp: string, type: string = 'signup_verification'): Promise<boolean> {
    const record = await OTPModel.findLatestValidOTP(email, otp, type);
    if (!record) {
      return false;
    }

    // Clean up consumed OTP
    await OTPModel.deleteOTP(record.id);
    return true;
  },
};
