import { EnquiryModel, CreateEnquiryInput, Enquiry } from '../models/enquiry.model';
import { MailService } from './mail.service';

export const EnquiryService = {
  async submitEnquiry(input: CreateEnquiryInput): Promise<Enquiry> {
    // 1. Store enquiry in Supabase database
    const savedEnquiry = await EnquiryModel.create(input);

    // Prepare email payload
    const emailData = {
      id: savedEnquiry.id,
      name: savedEnquiry.name,
      email: savedEnquiry.email,
      phone: savedEnquiry.phone || undefined,
      company: savedEnquiry.company || undefined,
      service: savedEnquiry.service || undefined,
      message: savedEnquiry.message,
      timeline: savedEnquiry.timeline || undefined,
      budget: savedEnquiry.budget || undefined,
      createdAt: savedEnquiry.created_at,
    };

    // 2. Send confirmation email to the customer who submitted the enquiry (async)
    MailService.sendEnquiryConfirmationEmail(emailData).catch((err) => {
      console.error('[EnquiryService] Error sending customer confirmation email:', err);
    });

    // 3. Send notification email to Admin with complete details (async)
    MailService.sendAdminEnquiryNotificationEmail(emailData).catch((err) => {
      console.error('[EnquiryService] Error sending admin notification email:', err);
    });

    return savedEnquiry;
  },

  async listEnquiries(limit: number = 50): Promise<Enquiry[]> {
    return EnquiryModel.findAll(limit);
  },

  async getEnquiry(id: string): Promise<Enquiry | null> {
    return EnquiryModel.findById(id);
  },
};
