import { Request, Response, NextFunction } from 'express';
import { EnquiryService } from '../services/enquiry.service';
import { formatSuccess, formatError } from '../utils/response';

export const EnquiryController = {
  async createEnquiry(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, company, email, phone, service, message, description, timeline, budget } = req.body;

      const projectMessage = message || description;

      if (!name || !email || !projectMessage) {
        return res.status(400).json(formatError('Name, email, and project message/description are required.'));
      }

      const enquiry = await EnquiryService.submitEnquiry({
        name,
        company,
        email,
        phone,
        service,
        message: projectMessage,
        timeline,
        budget,
      });

      return res.status(201).json(formatSuccess(enquiry, 'Thank you for your enquiry. Confirmation email has been sent and our team will get back to you within 24 hours.'));
    } catch (error) {
      next(error);
    }
  },

  async getEnquiries(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = Number(req.query.limit) || 50;
      const enquiries = await EnquiryService.listEnquiries(limit);
      return res.status(200).json(formatSuccess(enquiries, 'Enquiries retrieved successfully.'));
    } catch (error) {
      next(error);
    }
  },
};
