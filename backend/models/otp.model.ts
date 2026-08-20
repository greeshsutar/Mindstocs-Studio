import { supabase } from '../config/supabase';

export interface OTPRecord {
  id: string;
  email: string;
  otp: string;
  type: string;
  expires_at: string;
  created_at: string;
}

export const OTPModel = {
  async createOTP(email: string, otp: string, expiresInMinutes: number = 5, type: string = 'signup_verification'): Promise<OTPRecord> {
    const normalizedEmail = email.trim().toLowerCase();
    
    // Invalidate/delete previous OTPs for this email & type
    await supabase
      .from('otps')
      .delete()
      .eq('email', normalizedEmail)
      .eq('type', type);

    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('otps')
      .insert({
        email: normalizedEmail,
        otp,
        type,
        expires_at: expiresAt,
      })
      .select('*')
      .single();

    if (error) {
      throw new Error(`Database error saving OTP: ${error.message}`);
    }
    return data;
  },

  async findLatestValidOTP(email: string, otp: string, type: string = 'signup_verification'): Promise<OTPRecord | null> {
    const normalizedEmail = email.trim().toLowerCase();
    const nowIso = new Date().toISOString();

    const { data, error } = await supabase
      .from('otps')
      .select('*')
      .eq('email', normalizedEmail)
      .eq('otp', otp.trim())
      .eq('type', type)
      .gt('expires_at', nowIso)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error verifying OTP: ${error.message}`);
    }
    return data;
  },

  async deleteOTP(id: string): Promise<void> {
    const { error } = await supabase.from('otps').delete().eq('id', id);
    if (error) {
      console.error(`Failed to delete consumed OTP: ${error.message}`);
    }
  },
};
