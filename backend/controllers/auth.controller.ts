import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { formatSuccess, formatError } from '../utils/response';

export const AuthController = {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json(formatError('Name, email, and password are required.'));
      }

      if (password.length < 6) {
        return res.status(400).json(formatError('Password must be at least 6 characters long.'));
      }

      const result = await AuthService.signup({ name, email, password });
      return res.status(201).json(formatSuccess(result, 'Signup initiated. Please verify your OTP to complete registration.'));
    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json(formatError('Email and 6-digit OTP code are required.'));
      }

      const result = await AuthService.verifyOtpAndActivate(email, otp);
      return res.status(200).json(formatSuccess(result, 'Account verified successfully. Welcome!'));
    } catch (error) {
      next(error);
    }
  },

  async resendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json(formatError('Email is required to resend OTP.'));
      }

      const result = await AuthService.resendOtp(email);
      return res.status(200).json(formatSuccess(result, 'A new verification code has been dispatched.'));
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json(formatError('Email and password are required.'));
      }

      const result = await AuthService.login({ email, password });
      return res.status(200).json(formatSuccess(result, 'Login successful.'));
    } catch (error) {
      next(error);
    }
  },

  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json(formatError('Unauthorized'));
      }

      const user = await AuthService.getProfile(req.user.userId);
      return res.status(200).json(formatSuccess(user, 'User profile retrieved successfully.'));
    } catch (error) {
      next(error);
    }
  },
};
