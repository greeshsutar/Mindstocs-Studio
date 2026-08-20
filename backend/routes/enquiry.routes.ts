import { Router } from 'express';
import { EnquiryController } from '../controllers/enquiry.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

// Public: Submit customer enquiry
router.post('/', EnquiryController.createEnquiry);

// Protected: View enquiries (Admin / authenticated users)
router.get('/', authenticateJWT, EnquiryController.getEnquiries);

export const enquiryRoutes = router;
