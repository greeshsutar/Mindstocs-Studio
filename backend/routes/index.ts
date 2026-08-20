import { Router } from 'express';
import { authRoutes } from './auth.routes';
import { enquiryRoutes } from './enquiry.routes';

const router = Router();

// Mount Feature Routes
router.use('/auth', authRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/contact', enquiryRoutes); // Alias for frontend /api/contact compatibility

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const apiRoutes = router;
export * from './customer.routes';
export * from './auth.routes';
export * from './enquiry.routes';
