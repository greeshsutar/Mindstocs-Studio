import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  supabase: {
    url: process.env.SUPABASE_URL || 'https://jbcdkakplpefcmrfpwru.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiY2RrYWtwbHBlZmNtcmZwd3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMTgyNzIsImV4cCI6MjEwMjc5NDI3Mn0.vqV06uIxoJOHZHDVI6QQ3bYQ8KzVMG4lyYJZkXFeoO4',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'mindstocs_studio_super_secret_jwt_key_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  },
  otp: {
    expiresInMinutes: Number(process.env.OTP_EXPIRES_IN_MINUTES) || 5,
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE !== 'false',
    user: process.env.SMTP_USER || 'girishsutar32@gmail.com',
    pass: process.env.SMTP_PASS || 'qqarnyrkhwtbokaa',
    from: process.env.EMAIL_FROM || '"Mindstocs Studio" <girishsutar32@gmail.com>',
    adminEmail: process.env.ADMIN_EMAIL || 'girishsutar32@gmail.com',
  },
};
