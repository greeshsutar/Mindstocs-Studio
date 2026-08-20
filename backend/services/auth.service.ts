import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel, User, CreateUserInput } from '../models/user.model';
import { OTPService } from './otp.service';
import { MailService } from './mail.service';
import { config } from '../config/env';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export const AuthService = {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  generateToken(user: { id: string; email: string; name: string }): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      name: user.name,
    };
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as jwt.SignOptions['expiresIn'],
    });
  },

  verifyToken(token: string): TokenPayload {
    return jwt.verify(token, config.jwt.secret) as TokenPayload;
  },

  async signup(data: { name: string; email: string; password: string }) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const existingUser = await UserModel.findByEmail(normalizedEmail);

    const passwordHash = await this.hashPassword(data.password);

    if (existingUser) {
      if (existingUser.is_verified) {
        throw new Error('An account with this email already exists and is verified. Please log in.');
      }
      // If user exists but is not verified, update details and resend OTP
      await UserModel.updatePasswordAndName(normalizedEmail, data.name, passwordHash);
    } else {
      // Create new unverified user
      await UserModel.create({
        name: data.name,
        email: normalizedEmail,
        password: passwordHash,
        is_verified: false,
      });
    }

    // Generate and send 5-minute OTP
    await OTPService.createAndSendOTP(normalizedEmail, data.name, 'signup_verification');

    return {
      requiresOtp: true,
      email: normalizedEmail,
      message: 'Verification OTP sent to your email. Please verify to complete registration.',
      expiresInMinutes: config.otp.expiresInMinutes,
    };
  },

  async verifyOtpAndActivate(email: string, otp: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserModel.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error('User not found. Please sign up first.');
    }

    const isValid = await OTPService.verifyOTP(normalizedEmail, otp, 'signup_verification');
    if (!isValid) {
      throw new Error('Invalid or expired OTP. Please check the code or request a new one.');
    }

    // Activate user account
    const verifiedUser = await UserModel.markVerified(normalizedEmail);

    // Send Welcome Email
    MailService.sendWelcomeEmail(verifiedUser.email, verifiedUser.name).catch((err) => {
      console.error('[AuthService] Failed to send welcome email:', err);
    });

    // Generate 1-hour JWT Session Token
    const token = this.generateToken(verifiedUser);

    return {
      token,
      user: {
        id: verifiedUser.id,
        name: verifiedUser.name,
        email: verifiedUser.email,
        is_verified: verifiedUser.is_verified,
        created_at: verifiedUser.created_at,
      },
    };
  },

  async resendOtp(email: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserModel.findByEmail(normalizedEmail);

    if (!user) {
      throw new Error('No account found with this email.');
    }

    if (user.is_verified) {
      throw new Error('Account is already verified. You can log in directly.');
    }

    await OTPService.createAndSendOTP(normalizedEmail, user.name, 'signup_verification');

    return {
      requiresOtp: true,
      email: normalizedEmail,
      message: 'A fresh OTP has been sent to your email.',
      expiresInMinutes: config.otp.expiresInMinutes,
    };
  },

  async login(credentials: { email: string; password: string }) {
    const normalizedEmail = credentials.email.trim().toLowerCase();
    const user = await UserModel.findByEmail(normalizedEmail);

    if (!user || !user.password) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordMatch = await this.comparePassword(credentials.password, user.password);
    if (!isPasswordMatch) {
      throw new Error('Invalid email or password.');
    }

    // Unverified users cannot log in
    if (!user.is_verified) {
      // Send fresh OTP automatically for convenience
      try {
        await OTPService.createAndSendOTP(normalizedEmail, user.name, 'signup_verification');
      } catch (err) {
        console.warn('Failed to auto-resend OTP during unverified login attempt:', err);
      }

      const unverifiedError: any = new Error('Email is not verified. Please verify your OTP to log in.');
      unverifiedError.statusCode = 403;
      unverifiedError.requiresOtp = true;
      unverifiedError.email = normalizedEmail;
      throw unverifiedError;
    }

    // User is verified -> issue 1-hour JWT Session Token
    const token = this.generateToken(user);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_verified: user.is_verified,
        created_at: user.created_at,
      },
    };
  },

  async getProfile(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  },
};
