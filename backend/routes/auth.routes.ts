import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Public Authentication Endpoints
router.post('/signup', AuthController.signup);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/resend-otp', AuthController.resendOtp);
router.post('/login', AuthController.login);

// Protected Authentication Endpoints
router.get('/me', authenticateJWT, AuthController.getMe);

export const authRoutes = router;
