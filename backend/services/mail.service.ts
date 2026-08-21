import nodemailer from 'nodemailer';
import { config } from '../config/env';

// Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export interface EnquiryEmailData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  timeline?: string;
  budget?: string;
  createdAt?: string;
}

// Brand Header Component
const getBrandHeader = (subtitle: string = 'Digital Engineering & Quantitative Systems') => `
  <tr>
    <td align="center" style="padding: 40px 0 28px 0;">
      <table border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <!-- Brand Icon & Name -->
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); width: 36px; height: 36px; border-radius: 10px; text-align: center; vertical-align: middle; box-shadow: 0 8px 16px rgba(99, 102, 241, 0.35);">
                  <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 900; color: #ffffff; line-height: 36px; display: block;">M</span>
                </td>
                <td style="padding-left: 14px; text-align: left;">
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 800; letter-spacing: 1px; color: #ffffff; text-transform: uppercase;">
                    MINDSTOCS <span style="color: #818cf8;">STUDIO</span>
                  </div>
                  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; color: #64748b; text-transform: uppercase; margin-top: 2px;">
                    ${subtitle}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`;

// Brand Footer Component
const getBrandFooter = () => `
  <tr>
    <td style="background: #08090d; padding: 28px 40px; border-top: 1px solid #161a26; text-align: center;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center">
            <p style="margin: 0 0 10px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; color: #64748b; line-height: 1.5;">
              Mindstocs Studio &bull; Next-Gen Software Engineering, Algorithmic Trading &amp; Growth Solutions
            </p>
            <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #475569;">
              &copy; ${new Date().getFullYear()} Mindstocs Studio. All rights reserved. &bull; Secure Automated Delivery
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
`;

export const MailService = {
  // 1. Send 6-Digit OTP Email
  async sendOTPEmail(to: string, otp: string, userName?: string): Promise<boolean> {
    const displayName = userName || 'User';

    // Format OTP characters for sleek visual spacing
    const otpChars = otp.split('');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Security Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040507; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #040507; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background: #0c0e14; border-radius: 20px; border: 1px solid #1c2232; box-shadow: 0 25px 60px rgba(0,0,0,0.8); overflow: hidden;">
                <!-- Glowing Top Gradient Bar -->
                <tr>
                  <td height="5" style="background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #38bdf8 100%);"></td>
                </tr>

                <!-- Brand Header -->
                ${getBrandHeader('Security & Identity Verification')}

                <!-- Main Content -->
                <tr>
                  <td style="padding: 0 44px 40px 44px; text-align: center;">
                    <!-- Badge -->
                    <div style="display: inline-block; background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.28); color: #a5b4fc; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 16px; border-radius: 30px; margin-bottom: 20px;">
                      🔒 One-Time Passcode
                    </div>

                    <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 12px 0;">
                      Verify Your Email Address
                    </h1>
                    <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0 0 32px 0;">
                      Hello <strong style="color: #f1f5f9;">${displayName}</strong>, enter the 6-digit authorization code below to complete your registration with Mindstocs Studio.
                    </p>

                    <!-- Segmented OTP Digit Boxes -->
                    <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 28px auto;">
                      <tr>
                        ${otpChars.map((digit) => `
                          <td style="padding: 0 4px;">
                            <div style="width: 48px; height: 60px; line-height: 60px; background: linear-gradient(180deg, #151824 0%, #0f121a 100%); border: 1px solid #2d354d; border-radius: 12px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 28px; font-weight: 800; color: #818cf8; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,0.4);">
                              ${digit}
                            </div>
                          </td>
                        `).join('')}
                      </tr>
                    </table>

                    <!-- Expiry Timer Pill -->
                    <div style="margin-bottom: 32px;">
                      <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                        <tr>
                          <td style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 20px; padding: 8px 18px;">
                            <span style="font-size: 12px; font-weight: 600; color: #f87171; display: inline-flex; align-items: center;">
                              ⏱️ This code will expire in <strong style="margin-left: 4px; color: #fca5a5;">${config.otp.expiresInMinutes} minutes</strong>
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Security Info Box -->
                    <div style="background: #11141e; border: 1px solid #1e2538; border-radius: 12px; padding: 18px; text-align: left;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="24" valign="top" style="font-size: 14px; line-height: 1;">🛡️</td>
                          <td style="padding-left: 10px; font-size: 12px; color: #64748b; line-height: 1.6;">
                            Never share this verification code with anyone. Mindstocs Studio representatives will never ask for your authentication codes.
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                ${getBrandFooter()}
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: config.smtp.from,
        to,
        subject: `${otp} is your Mindstocs Studio verification code`,
        text: `Your verification code is ${otp}. It will expire in ${config.otp.expiresInMinutes} minutes.`,
        html: htmlContent,
      });

      console.log(`[MailService] OTP email dispatched to ${to}. MessageId: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`[MailService] Error sending OTP email to ${to}:`, error);
      throw new Error(`Failed to send verification email: ${(error as Error).message}`);
    }
  },

  // 1.1 Send Password Reset OTP Email
  async sendPasswordResetOTPEmail(to: string, otp: string, userName?: string): Promise<boolean> {
    const displayName = userName || 'Client';
    const otpChars = otp.split('');

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040507; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #040507; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background: #0c0e14; border-radius: 20px; border: 1px solid #1c2232; box-shadow: 0 25px 60px rgba(0,0,0,0.8); overflow: hidden;">
                <!-- Glowing Top Gradient Bar -->
                <tr>
                  <td height="5" style="background: linear-gradient(90deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%);"></td>
                </tr>

                <!-- Brand Header -->
                ${getBrandHeader('Password Reset Authorization')}

                <!-- Main Content -->
                <tr>
                  <td style="padding: 0 44px 40px 44px; text-align: center;">
                    <!-- Badge -->
                    <div style="display: inline-block; background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); color: #fbbf24; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 16px; border-radius: 30px; margin-bottom: 20px;">
                      🔑 Password Reset OTP
                    </div>

                    <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 12px 0;">
                      Reset Your Password
                    </h1>
                    <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0 0 32px 0;">
                      Hello <strong style="color: #f1f5f9;">${displayName}</strong>, we received a request to reset your Mindstocs Studio account password. Use the 6-digit verification code below to authorize your password change.
                    </p>

                    <!-- Segmented OTP Digit Boxes -->
                    <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto 28px auto;">
                      <tr>
                        ${otpChars.map((digit) => `
                          <td style="padding: 0 4px;">
                            <div style="width: 48px; height: 60px; line-height: 60px; background: linear-gradient(180deg, #151824 0%, #0f121a 100%); border: 1px solid #2d354d; border-radius: 12px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 28px; font-weight: 800; color: #fbbf24; text-align: center; box-shadow: 0 8px 20px rgba(0,0,0,0.4);">
                              ${digit}
                            </div>
                          </td>
                        `).join('')}
                      </tr>
                    </table>

                    <!-- Expiry Timer Pill -->
                    <div style="margin-bottom: 32px;">
                      <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                        <tr>
                          <td style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 20px; padding: 8px 18px;">
                            <span style="font-size: 12px; font-weight: 600; color: #f87171; display: inline-flex; align-items: center;">
                              ⏱️ This code will expire in <strong style="margin-left: 4px; color: #fca5a5;">${config.otp.expiresInMinutes} minutes</strong>
                            </span>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Security Info Box -->
                    <div style="background: #11141e; border: 1px solid #1e2538; border-radius: 12px; padding: 18px; text-align: left;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="24" valign="top" style="font-size: 14px; line-height: 1;">🛡️</td>
                          <td style="padding-left: 10px; font-size: 12px; color: #64748b; line-height: 1.6;">
                            If you did not request a password reset, you can safely ignore this email. Your current password will remain unchanged.
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                ${getBrandFooter()}
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: config.smtp.from,
        to,
        subject: `${otp} is your Mindstocs Studio password reset code`,
        text: `Your password reset code is ${otp}. It will expire in ${config.otp.expiresInMinutes} minutes.`,
        html: htmlContent,
      });

      console.log(`[MailService] Password reset OTP email dispatched to ${to}. MessageId: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`[MailService] Error sending password reset OTP email to ${to}:`, error);
      throw new Error(`Failed to send password reset email: ${(error as Error).message}`);
    }
  },

  // 1.2 Send Password Change Notification
  async sendPasswordResetSuccessEmail(to: string, userName?: string): Promise<boolean> {
    const displayName = userName || 'Client';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040507; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #040507; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 540px; background: #0c0e14; border-radius: 20px; border: 1px solid #1c2232; box-shadow: 0 25px 60px rgba(0,0,0,0.8); overflow: hidden;">
                <!-- Glowing Top Gradient Bar -->
                <tr>
                  <td height="5" style="background: linear-gradient(90deg, #10b981 0%, #6366f1 100%);"></td>
                </tr>

                <!-- Brand Header -->
                ${getBrandHeader('Security Notification')}

                <!-- Main Content -->
                <tr>
                  <td style="padding: 0 44px 40px 44px; text-align: center;">
                    <!-- Badge -->
                    <div style="display: inline-block; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 16px; border-radius: 30px; margin-bottom: 20px;">
                      ✓ Password Updated
                    </div>

                    <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 12px 0;">
                      Password Changed Successfully
                    </h1>
                    <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0 0 24px 0;">
                      Hello <strong style="color: #f1f5f9;">${displayName}</strong>, your account password has been updated successfully. You can now use your new password to sign in.
                    </p>

                    <div style="background: #11141e; border: 1px solid #1e2538; border-radius: 12px; padding: 18px; text-align: left;">
                      <p style="font-size: 12px; color: #64748b; line-height: 1.6; margin: 0;">
                        If you did not perform this password change, please contact our security team immediately by replying to this email.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                ${getBrandFooter()}
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: config.smtp.from,
        to,
        subject: `Your Mindstocs Studio password has been changed`,
        text: `Hello ${displayName}, your password has been successfully updated.`,
        html: htmlContent,
      });
      return true;
    } catch (err) {
      console.error(`[MailService] Error sending password changed notification to ${to}:`, err);
      return false;
    }
  },

  // 2. Send Welcome Email upon successful registration
  async sendWelcomeEmail(to: string, userName: string): Promise<boolean> {
    const displayName = userName || 'Partner';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Mindstocs Studio</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040507; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #040507; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background: #0c0e14; border-radius: 20px; border: 1px solid #1c2232; box-shadow: 0 25px 60px rgba(0,0,0,0.8); overflow: hidden;">
                <!-- Glowing Top Gradient Bar -->
                <tr>
                  <td height="5" style="background: linear-gradient(90deg, #6366f1 0%, #ec4899 50%, #38bdf8 100%);"></td>
                </tr>

                <!-- Brand Header -->
                ${getBrandHeader('Account Activation & Welcome')}

                <!-- Hero Section -->
                <tr>
                  <td style="padding: 0 44px 36px 44px;">
                    <!-- Badge -->
                    <div style="display: inline-block; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 16px; border-radius: 30px; margin-bottom: 20px;">
                      ✦ You&apos;re Officially Verified
                    </div>

                    <h1 style="font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; line-height: 1.3; margin: 0 0 16px 0;">
                      Welcome to Mindstocs Studio, <span style="background: linear-gradient(90deg, #a5b4fc 0%, #f472b6 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${displayName}</span>
                    </h1>
                    <p style="font-size: 15px; line-height: 1.7; color: #94a3b8; margin: 0 0 32px 0;">
                      Your identity has been verified and your profile is active. You now have access to Mindstocs Studio&apos;s suite of cutting-edge software engineering capabilities, high-frequency quantitative systems, and performance marketing infrastructure.
                    </p>

                    <!-- Feature Pillars Matrix -->
                    <div style="background: #11141f; border: 1px solid #20273c; border-radius: 16px; padding: 24px; margin-bottom: 32px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin-bottom: 20px;">
                        Studio Capabilities &amp; Highlights
                      </div>

                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="36" valign="top" style="padding-bottom: 20px;">
                            <div style="width: 32px; height: 32px; background: rgba(99, 102, 241, 0.15); border-radius: 8px; text-align: center; line-height: 32px; font-size: 15px;">💻</div>
                          </td>
                          <td style="padding-left: 12px; padding-bottom: 20px;">
                            <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 3px;">Full-Stack SaaS &amp; Custom Software</div>
                            <div style="font-size: 12px; color: #8291a7; line-height: 1.5;">Modern web applications engineered with Next.js, microservices, and reactive real-time architectures.</div>
                          </td>
                        </tr>
                        <tr>
                          <td width="36" valign="top" style="padding-bottom: 20px;">
                            <div style="width: 32px; height: 32px; background: rgba(16, 185, 129, 0.15); border-radius: 8px; text-align: center; line-height: 32px; font-size: 15px;">📊</div>
                          </td>
                          <td style="padding-left: 12px; padding-bottom: 20px;">
                            <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 3px;">Quantitative &amp; Algorithmic Trading</div>
                            <div style="font-size: 12px; color: #8291a7; line-height: 1.5;">Low-latency execution algorithms, strategy backtesting, and automated risk mitigation frameworks.</div>
                          </td>
                        </tr>
                        <tr>
                          <td width="36" valign="top">
                            <div style="width: 32px; height: 32px; background: rgba(236, 72, 153, 0.15); border-radius: 8px; text-align: center; line-height: 32px; font-size: 15px;">🚀</div>
                          </td>
                          <td style="padding-left: 12px;">
                            <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 3px;">Growth Marketing &amp; Technical SEO</div>
                            <div style="font-size: 12px; color: #8291a7; line-height: 1.5;">Data-driven conversion optimization, performance funnels, and enterprise search visibility.</div>
                          </td>
                        </tr>
                      </table>
                    </div>

                    <!-- Action Button -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 28px;">
                      <tr>
                        <td align="center">
                          <a href="http://localhost:3000" target="_blank" style="background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 15px 36px; border-radius: 10px; display: inline-block; box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);">
                            Launch Mindstocs Studio &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="font-size: 13px; color: #64748b; line-height: 1.6; text-align: center; margin: 0;">
                      Have a vision or new project in mind? Reply to this email anytime to connect directly with our engineering leads.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                ${getBrandFooter()}
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: config.smtp.from,
        to,
        subject: `Welcome to Mindstocs Studio, ${displayName}!`,
        text: `Welcome to Mindstocs Studio, ${displayName}! Your account is now active and ready.`,
        html: htmlContent,
      });

      console.log(`[MailService] Welcome email dispatched to ${to}. MessageId: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`[MailService] Error sending welcome email to ${to}:`, error);
      return false;
    }
  },

  // 3. Send Confirmation Email to Client submitting an Enquiry
  async sendEnquiryConfirmationEmail(data: EnquiryEmailData): Promise<boolean> {
    const displayName = data.name || 'Valued Client';
    const serviceName = data.service ? data.service.replace(/-/g, ' ').toUpperCase() : 'PROJECT BRIEF';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Enquiry Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040507; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #040507; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background: #0c0e14; border-radius: 20px; border: 1px solid #1c2232; box-shadow: 0 25px 60px rgba(0,0,0,0.8); overflow: hidden;">
                <!-- Glowing Top Gradient Bar -->
                <tr>
                  <td height="5" style="background: linear-gradient(90deg, #10b981 0%, #6366f1 50%, #38bdf8 100%);"></td>
                </tr>

                <!-- Brand Header -->
                ${getBrandHeader('Client Enquiry Confirmation')}

                <!-- Main Content -->
                <tr>
                  <td style="padding: 0 44px 36px 44px;">
                    <!-- Status Badge -->
                    <div style="display: inline-block; background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 16px; border-radius: 30px; margin-bottom: 20px;">
                      ✓ Project Brief Received
                    </div>

                    <h1 style="font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 14px 0;">
                      We&apos;ve received your enquiry, ${displayName}
                    </h1>
                    <p style="font-size: 14px; line-height: 1.7; color: #94a3b8; margin: 0 0 30px 0;">
                      Thank you for contacting Mindstocs Studio. Our engineering and strategy team is reviewing your project details. We will prepare an initial assessment and reach out within <strong style="color: #34d399;">24 hours</strong>.
                    </p>

                    <!-- Structured Project Specs Card -->
                    <div style="background: #11141f; border: 1px solid #20273c; border-radius: 16px; padding: 24px; margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #64748b; margin-bottom: 18px;">
                        Submitted Specifications
                      </div>

                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td style="padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; width: 35%;">Service Category:</td>
                          <td style="padding: 10px 0; font-size: 13px; color: #a5b4fc; font-weight: 700; text-align: right;">${serviceName}</td>
                        </tr>
                        ${data.company ? `
                        <tr>
                          <td style="padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; border-top: 1px solid #1c2234;">Company / Brand:</td>
                          <td style="padding: 10px 0; font-size: 13px; color: #f1f5f9; font-weight: 500; text-align: right; border-top: 1px solid #1c2234;">${data.company}</td>
                        </tr>` : ''}
                        ${data.timeline ? `
                        <tr>
                          <td style="padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; border-top: 1px solid #1c2234;">Target Timeline:</td>
                          <td style="padding: 10px 0; font-size: 13px; color: #f1f5f9; font-weight: 500; text-align: right; border-top: 1px solid #1c2234;">${data.timeline}</td>
                        </tr>` : ''}
                        ${data.budget ? `
                        <tr>
                          <td style="padding: 10px 0; font-size: 13px; color: #64748b; font-weight: 600; border-top: 1px solid #1c2234;">Budget Range:</td>
                          <td style="padding: 10px 0; font-size: 13px; color: #34d399; font-weight: 700; text-align: right; border-top: 1px solid #1c2234;">${data.budget}</td>
                        </tr>` : ''}
                      </table>

                      <div style="margin-top: 18px; padding-top: 18px; border-top: 1px solid #1c2234;">
                        <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 8px;">Project Scope &amp; Requirements:</div>
                        <div style="background: #080a0f; border-left: 3px solid #6366f1; padding: 14px 18px; border-radius: 0 10px 10px 0; font-size: 13px; color: #cbd5e1; font-style: italic; line-height: 1.7;">
                          &ldquo;${data.message}&rdquo;
                        </div>
                      </div>
                    </div>

                    <!-- Next Steps Tracker -->
                    <div style="background: linear-gradient(180deg, #131724 0%, #0e111a 100%); border: 1px dashed #262f48; border-radius: 14px; padding: 22px; margin-bottom: 28px;">
                      <div style="font-size: 13px; font-weight: 800; color: #ffffff; margin-bottom: 14px;">Next Steps on Our Roadmap:</div>
                      
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td width="28" valign="top" style="padding-bottom: 10px;">
                            <div style="width: 20px; height: 20px; background: #6366f1; color: #ffffff; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 800;">1</div>
                          </td>
                          <td style="padding-left: 10px; padding-bottom: 10px; font-size: 13px; color: #cbd5e1; line-height: 1.5;">
                            <strong>Technical Feasibility</strong> &mdash; Assessing stack, performance metrics, and milestones.
                          </td>
                        </tr>
                        <tr>
                          <td width="28" valign="top" style="padding-bottom: 10px;">
                            <div style="width: 20px; height: 20px; background: #272d42; color: #818cf8; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 800;">2</div>
                          </td>
                          <td style="padding-left: 10px; padding-bottom: 10px; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                            <strong>Strategy Sync</strong> &mdash; Aligning deliverables and architecture expectations.
                          </td>
                        </tr>
                        <tr>
                          <td width="28" valign="top">
                            <div style="width: 20px; height: 20px; background: #272d42; color: #818cf8; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 800;">3</div>
                          </td>
                          <td style="padding-left: 10px; font-size: 13px; color: #94a3b8; line-height: 1.5;">
                            <strong>Sprint Kickoff</strong> &mdash; Agreement, project workspace setup, and sprint execution.
                          </td>
                        </tr>
                      </table>
                    </div>

                    <p style="font-size: 13px; color: #64748b; margin: 0; text-align: center;">
                      Have urgent updates? Reply directly to this email or contact us on WhatsApp anytime.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                ${getBrandFooter()}
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: config.smtp.from,
        to: data.email,
        subject: `We've received your enquiry: ${serviceName} - Mindstocs Studio`,
        text: `Thank you ${displayName}. We have received your project enquiry and will respond within 24 hours.`,
        html: htmlContent,
      });

      console.log(`[MailService] Customer enquiry confirmation dispatched to ${data.email}. MessageId: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`[MailService] Error sending enquiry confirmation to ${data.email}:`, error);
      return false;
    }
  },

  // 4. Send Admin Notification Email for New Lead
  async sendAdminEnquiryNotificationEmail(data: EnquiryEmailData): Promise<boolean> {
    const adminTo = config.smtp.adminEmail;
    const serviceName = data.service ? data.service.replace(/-/g, ' ').toUpperCase() : 'GENERAL ENQUIRY';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Lead Notification</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #040507; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #040507; padding: 40px 16px;">
          <tr>
            <td align="center">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; background: #0c0e14; border-radius: 20px; border: 1px solid #2d364d; box-shadow: 0 25px 60px rgba(0,0,0,0.85); overflow: hidden;">
                <!-- Glowing Alert Top Accent Bar -->
                <tr>
                  <td height="5" style="background: linear-gradient(90deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%);"></td>
                </tr>

                <!-- Brand Header -->
                ${getBrandHeader('Executive Lead Alert System')}

                <!-- Main Content -->
                <tr>
                  <td style="padding: 0 44px 36px 44px;">
                    <!-- Badge & Timestamp -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                      <tr>
                        <td>
                          <span style="background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.35); color: #fbbf24; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 16px; border-radius: 30px;">
                            🔥 Inbound Project Lead
                          </span>
                        </td>
                        <td align="right" style="font-size: 12px; font-weight: 600; color: #64748b;">
                          ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })} IST
                        </td>
                      </tr>
                    </table>

                    <h1 style="font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin: 0 0 6px 0;">
                      New Lead: ${data.name}
                    </h1>
                    <div style="font-size: 13px; color: #94a3b8; margin-bottom: 24px;">
                      Target Service: <span style="color: #a5b4fc; font-weight: 700;">${serviceName}</span>
                    </div>

                    <!-- Client Profile Matrix -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #11141f; border: 1px solid #20273c; border-radius: 14px; overflow: hidden; margin-bottom: 24px;">
                      <tr>
                        <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; width: 34%; border-bottom: 1px solid #1c2234;">Client Name:</td>
                        <td style="padding: 12px 18px; font-size: 13px; color: #ffffff; font-weight: 700; border-bottom: 1px solid #1c2234;">${data.name}</td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #1c2234;">Email Address:</td>
                        <td style="padding: 12px 18px; font-size: 13px; border-bottom: 1px solid #1c2234;">
                          <a href="mailto:${data.email}" style="color: #60a5fa; text-decoration: none; font-weight: 700;">${data.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #1c2234;">Phone / WhatsApp:</td>
                        <td style="padding: 12px 18px; font-size: 13px; border-bottom: 1px solid #1c2234;">
                          ${data.phone ? `<a href="tel:${data.phone}" style="color: #34d399; text-decoration: none; font-weight: 700;">${data.phone}</a>` : '<span style="color: #475569;">Not provided</span>'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #1c2234;">Company / Brand:</td>
                        <td style="padding: 12px 18px; font-size: 13px; color: #f1f5f9; font-weight: 500; border-bottom: 1px solid #1c2234;">
                          ${data.company || '<span style="color: #475569;">Not provided</span>'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600; border-bottom: 1px solid #1c2234;">Timeline:</td>
                        <td style="padding: 12px 18px; font-size: 13px; color: #f1f5f9; font-weight: 500; border-bottom: 1px solid #1c2234;">
                          ${data.timeline || '<span style="color: #475569;">Not specified</span>'}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 18px; font-size: 13px; color: #64748b; font-weight: 600;">Budget Range:</td>
                        <td style="padding: 12px 18px; font-size: 13px; color: #38bdf8; font-weight: 700;">
                          ${data.budget || '<span style="color: #475569;">Not specified</span>'}
                        </td>
                      </tr>
                    </table>

                    <!-- Project Scope Box -->
                    <div style="margin-bottom: 28px;">
                      <div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px;">
                        Client Project Scope / Message:
                      </div>
                      <div style="background: #080a0f; border: 1px solid #22293e; border-left: 4px solid #f59e0b; padding: 18px 22px; border-radius: 0 10px 10px 0; font-size: 14px; color: #f1f5f9; line-height: 1.7;">
                        ${data.message}
                      </div>
                    </div>

                    <!-- Direct Action Buttons -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <a href="mailto:${data.email}?subject=Re:%20Mindstocs%20Studio%20Enquiry%20-%20${encodeURIComponent(serviceName)}" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff !important; font-size: 13px; font-weight: 700; text-decoration: none; padding: 13px 28px; border-radius: 10px; display: inline-block; margin-right: 12px; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.35);">
                            ✉️ Reply to ${data.name}
                          </a>
                          ${data.phone ? `
                          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" target="_blank" style="background: linear-gradient(135deg, #10b981 0%, #047857 100%); color: #ffffff !important; font-size: 13px; font-weight: 700; text-decoration: none; padding: 13px 24px; border-radius: 10px; display: inline-block; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35);">
                            💬 Open WhatsApp
                          </a>` : ''}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                ${getBrandFooter()}
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    try {
      const info = await transporter.sendMail({
        from: config.smtp.from,
        to: adminTo,
        replyTo: data.email,
        subject: `🔔 [NEW LEAD] ${data.name} - ${serviceName}`,
        text: `New Enquiry from ${data.name} (${data.email}, Phone: ${data.phone || 'N/A'})\n\nService: ${serviceName}\nCompany: ${data.company || 'N/A'}\nTimeline: ${data.timeline || 'N/A'}\nBudget: ${data.budget || 'N/A'}\n\nMessage:\n${data.message}`,
        html: htmlContent,
      });

      console.log(`[MailService] Admin lead alert dispatched to ${adminTo}. MessageId: ${info.messageId}`);
      return true;
    } catch (error) {
      console.error(`[MailService] Error sending admin alert to ${adminTo}:`, error);
      return false;
    }
  },
};
