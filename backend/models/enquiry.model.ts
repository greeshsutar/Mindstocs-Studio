import { supabase } from '../config/supabase';

export interface Enquiry {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone?: string | null;
  service?: string | null;
  message: string;
  timeline?: string | null;
  budget?: string | null;
  status: string;
  created_at: string;
}

export interface CreateEnquiryInput {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  timeline?: string;
  budget?: string;
}

export const EnquiryModel = {
  async create(input: CreateEnquiryInput): Promise<Enquiry> {
    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        name: input.name.trim(),
        company: input.company?.trim() || null,
        email: input.email.trim().toLowerCase(),
        phone: input.phone?.trim() || null,
        service: input.service?.trim() || null,
        message: input.message.trim(),
        timeline: input.timeline?.trim() || null,
        budget: input.budget?.trim() || null,
        status: 'pending',
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Database error saving enquiry: ${error.message}`);
    }
    return data;
  },

  async findAll(limit: number = 50): Promise<Enquiry[]> {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      throw new Error(`Database error fetching enquiries: ${error.message}`);
    }
    return data || [];
  },

  async findById(id: string): Promise<Enquiry | null> {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error finding enquiry: ${error.message}`);
    }
    return data;
  },
};
