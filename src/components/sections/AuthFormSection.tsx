'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  User,
  Lock,
  Mail,
  Building,
  Send,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  Loader2,
  KeyRound,
  RotateCcw,
  Eye,
  EyeOff,
  ShieldCheck,
  Key,
} from 'lucide-react';
import '@/styles/components/auth-form.css';

type FormTab = 'login' | 'signup' | 'inquiry' | 'otp' | 'forgot-password';

interface AuthFormSectionProps {
  initialTab?: FormTab;
}

function AuthFormInner({ initialTab = 'login' }: AuthFormSectionProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab') as FormTab | null;

  const [activeTab, setActiveTab] = useState<FormTab>(() => {
    if (tabParam && ['login', 'signup', 'inquiry', 'otp', 'forgot-password'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  });

  useEffect(() => {
    if (tabParam && ['login', 'signup', 'inquiry', 'otp', 'forgot-password'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [verifiedUser, setVerifiedUser] = useState<any>(null);

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    password: '',
    service: 'software-development',
    budget: '₹5L - ₹15L',
    message: '',
  });

  // Password Visibility Toggles
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 6-Digit OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpEmail, setOtpEmail] = useState('');
  const [countdown, setCountdown] = useState(300); // 5 mins in seconds
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Forgot Password Multi-Step State
  const [forgotStep, setForgotStep] = useState<1 | 2 | 3>(1); // 1: Email, 2: OTP, 3: New Passwords
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Countdown timer for OTP in both Signup OTP and Forgot Password OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const isOtpActive = activeTab === 'otp' || (activeTab === 'forgot-password' && forgotStep === 2);
    if (isOtpActive && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, forgotStep, countdown]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (errorMsg) setErrorMsg('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim().replace(/[^0-9]/g, '');
    if (!pastedData) return;

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      newOtp[idx] = digit;
    });
    setOtp(newOtp);
    if (errorMsg) setErrorMsg('');

    // Focus next empty or last input
    const nextIndex = Math.min(digits.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // 1. Handle Signup Submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg('Please enter your name, email, and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setOtpEmail(formData.email);
        setCountdown(300);
        setOtp(['', '', '', '', '', '']);
        setActiveTab('otp');
        setSuccessMsg('Verification code sent to your email. Please enter the 6 digits below.');
      } else {
        setErrorMsg(data.message || 'Signup failed. Please try again.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Signup OTP Verification
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: otpEmail,
          otp: otpCode,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.data?.token) {
          localStorage.setItem('mindstocs_token', data.data.token);
        }
        setVerifiedUser(data.data?.user || { name: formData.name, email: otpEmail });
        setSuccessMsg('Email verified successfully! Welcome email has been sent to your inbox.');
      } else {
        setErrorMsg(data.message || 'Invalid verification code. Please check or request a new code.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Resend OTP (Signup)
  const handleResendOtp = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCountdown(300);
        setOtp(['', '', '', '', '', '']);
        setSuccessMsg('A new 6-digit code has been dispatched to your email.');
      } else {
        setErrorMsg(data.message || 'Failed to resend code.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Login Submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg('Please enter your email and password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.data?.token) {
          localStorage.setItem('mindstocs_token', data.data.token);
        }
        setVerifiedUser(data.data?.user);
        setSuccessMsg('Logged in successfully! Welcome back.');
      } else if (data.requiresOtp) {
        // Unverified user redirected to OTP
        setOtpEmail(data.email || formData.email);
        setCountdown(300);
        setOtp(['', '', '', '', '', '']);
        setActiveTab('otp');
        setErrorMsg('Your account is not verified yet. A verification code has been emailed to you.');
      } else {
        setErrorMsg(data.message || 'Invalid email or password.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 5. Handle Forgot Password Step 1 (Request OTP)
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMsg('Please enter your work email.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCountdown(300);
        setOtp(['', '', '', '', '', '']);
        setForgotStep(2);
        setSuccessMsg('Password reset code sent to your email. Enter the 6 digits below.');
      } else {
        setErrorMsg(data.message || 'Failed to send reset code.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 6. Handle Forgot Password Step 2 (Verify Reset OTP)
  const handleVerifyForgotOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the reset code.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/verify-reset-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          otp: otpCode,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResetToken(data.data.resetToken);
        setForgotStep(3);
        setSuccessMsg('Code verified! Please create your new password.');
      } else {
        setErrorMsg(data.message || 'Invalid or expired verification code.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 7. Handle Forgot Password Step 2 Resend
  const handleResendForgotOtp = async () => {
    if (loading) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCountdown(300);
        setOtp(['', '', '', '', '', '']);
        setSuccessMsg('A fresh verification code has been dispatched to your email.');
      } else {
        setErrorMsg(data.message || 'Failed to resend code.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 8. Handle Forgot Password Step 3 (Set New & Confirm Password)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setErrorMsg('Please enter and confirm your new password.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please ensure both passwords match.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          resetToken,
          newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormData((prev) => ({ ...prev, email: forgotEmail, password: '' }));
        setActiveTab('login');
        setForgotStep(1);
        setNewPassword('');
        setConfirmPassword('');
        setSuccessMsg('Password reset successfully! You can now log in with your new password.');
      } else {
        setErrorMsg(data.message || 'Failed to reset password.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 9. Handle Project Brief / Enquiry
  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please provide your name, email, and project details.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          company: formData.companyName,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVerifiedUser({ isEnquiry: true, name: formData.name });
        setSuccessMsg('Project brief received! Confirmation email sent and admin alerted.');
      } else {
        setErrorMsg(data.errors?.[0] || data.message || 'Failed to submit project brief.');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section auth-form-section" id="auth-form-section" aria-labelledby="auth-form-heading">
      <div className="container container--narrow">
        <div className="section-heading section-heading--center">
          <span className="section-heading__eyebrow">Client Portal & Inquiries</span>
          <h2 className="section-heading__title" id="auth-form-heading">
            GET STARTED WITH MINDSTOCS.
          </h2>
          <p className="section-heading__description">
            Sign in to your client dashboard, create a new account with email verification, or submit your project brief.
          </p>
        </div>

        {/* Tab Selector (Hidden in OTP and Forgot Password modes) */}
        {!verifiedUser && activeTab !== 'otp' && activeTab !== 'forgot-password' && (
          <div className="auth-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'login'}
              className={`auth-tab ${activeTab === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
            >
              CLIENT LOGIN
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'signup'}
              className={`auth-tab ${activeTab === 'signup' ? 'auth-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
            >
              CREATE ACCOUNT
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'inquiry'}
              className={`auth-tab ${activeTab === 'inquiry' ? 'auth-tab--active' : ''}`}
              onClick={() => {
                setActiveTab('inquiry');
                setErrorMsg('');
                setSuccessMsg('');
              }}
            >
              PROJECT BRIEF
            </button>
          </div>
        )}

        {/* Form Card Container */}
        <div className="auth-card">
          {/* SUCCESS / LOGGED IN STATE */}
          {verifiedUser ? (
            <div className="auth-success-state">
              <CheckCircle2 size={52} className="auth-success-icon" />
              <h3 className="auth-success-title">
                {verifiedUser.isEnquiry ? 'Project Brief Received!' : `Welcome, ${verifiedUser.name}!`}
              </h3>
              <p className="auth-success-desc">
                {verifiedUser.isEnquiry
                  ? 'Thank you! A confirmation email has been sent to your inbox. Our engineering team will review your requirements and respond within 24 hours.'
                  : 'Your account is authenticated and active. A welcome email has been sent to your email address.'}
              </p>
              <button
                onClick={() => {
                  setVerifiedUser(null);
                  setActiveTab('login');
                  setSuccessMsg('');
                }}
                className="btn btn--outline btn--sm"
              >
                {verifiedUser.isEnquiry ? 'Submit Another Brief' : 'Sign Out / Switch Account'}
              </button>
            </div>
          ) : (
            <>
              {/* ALERTS */}
              {errorMsg && (
                <div className="auth-alert auth-alert--error" style={{ marginBottom: '16px' }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}
              {successMsg && (
                <div className="auth-alert auth-alert--success" style={{ marginBottom: '16px' }}>
                  <CheckCircle2 size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* TAB 1: LOGIN */}
              {activeTab === 'login' && (
                <form onSubmit={handleLogin} className="auth-form">
                  <div className="auth-input-group">
                    <label htmlFor="login-email" className="auth-label">
                      Work Email
                    </label>
                    <div className="auth-input-wrapper">
                      <Mail size={18} className="auth-input-icon" />
                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label htmlFor="login-password" className="auth-label" style={{ marginBottom: 0 }}>
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(formData.email || '');
                          setActiveTab('forgot-password');
                          setForgotStep(1);
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="auth-forgot-link"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="auth-input-wrapper" style={{ marginTop: '8px' }}>
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        name="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        className="auth-password-toggle"
                        aria-label="Toggle password visibility"
                      >
                        {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading}>
                    {loading ? (
                      <>SIGNING IN... <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>SIGN IN TO DASHBOARD <ArrowRight size={14} /></>
                    )}
                  </button>

                  <p className="auth-footer-text">
                    Don&apos;t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('signup');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="auth-link"
                    >
                      Create one here
                    </button>
                  </p>
                </form>
              )}

              {/* TAB 2: SIGNUP */}
              {activeTab === 'signup' && (
                <form onSubmit={handleSignup} className="auth-form">
                  <div className="auth-grid-2">
                    <div className="auth-input-group">
                      <label htmlFor="signup-name" className="auth-label">
                        Full Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <User size={18} className="auth-input-icon" />
                        <input
                          id="signup-name"
                          type="text"
                          name="name"
                          required
                          placeholder="Jackson Fernandes"
                          value={formData.name}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="signup-company" className="auth-label">
                        Company Name
                      </label>
                      <div className="auth-input-wrapper">
                        <Building size={18} className="auth-input-icon" />
                        <input
                          id="signup-company"
                          type="text"
                          name="companyName"
                          placeholder="Acme Corp"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="signup-email" className="auth-label">
                      Work Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div className="auth-input-wrapper">
                      <Mail size={18} className="auth-input-icon" />
                      <input
                        id="signup-email"
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="signup-password" className="auth-label">
                      Create Password <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        id="signup-password"
                        type={showSignupPassword ? 'text' : 'password'}
                        name="password"
                        required
                        minLength={6}
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword((prev) => !prev)}
                        className="auth-password-toggle"
                        aria-label="Toggle password visibility"
                      >
                        {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading}>
                    {loading ? (
                      <>CREATING ACCOUNT... <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>CONTINUE TO VERIFY OTP <ArrowRight size={14} /></>
                    )}
                  </button>

                  <p className="auth-footer-text">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('login');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="auth-link"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              )}

              {/* TAB 3: SIGNUP OTP VERIFICATION */}
              {activeTab === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="auth-form auth-otp-form" style={{ textAlign: 'center' }}>
                  <div className="auth-otp-header">
                    <div className="auth-otp-badge-icon">
                      <KeyRound size={26} />
                    </div>
                    <h3 className="auth-otp-title">
                      Verify Your Email
                    </h3>
                    <p className="auth-otp-subtitle">
                      We sent a 6-digit verification code to
                      <br />
                      <strong className="auth-otp-email-tag">{otpEmail}</strong>
                    </p>
                  </div>

                  {/* 6-Digit OTP Boxes */}
                  <div className="auth-otp-wrap" onPaste={handleOtpPaste}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpInputRefs.current[idx] = el; }}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onPaste={handleOtpPaste}
                        className={`auth-otp-input ${digit ? 'auth-otp-input--filled' : ''}`}
                        required
                        aria-label={`Digit ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="auth-otp-timer-row">
                    <span className="auth-badge-timer">
                      <span className="auth-timer-dot" />
                      Expires in: <strong>{formatTime(countdown)}</strong>
                    </span>
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading || countdown <= 0}>
                    {loading ? (
                      <>VERIFYING CODE... <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>VERIFY &amp; ACTIVATE ACCOUNT <ArrowRight size={14} /></>
                    )}
                  </button>

                  <div className="auth-otp-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('signup');
                        setErrorMsg('');
                        setSuccessMsg('');
                      }}
                      className="auth-link auth-otp-link"
                    >
                      &larr; Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="auth-link auth-otp-link"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RotateCcw size={13} /> Resend Code
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: FORGOT PASSWORD FLOW (3 STEPS) */}
              {activeTab === 'forgot-password' && (
                <div className="auth-forgot-flow">
                  {/* Step 1: Enter Email */}
                  {forgotStep === 1 && (
                    <form onSubmit={handleForgotPassword} className="auth-form">
                      <div className="auth-otp-header" style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <div className="auth-otp-badge-icon">
                          <Key size={26} />
                        </div>
                        <h3 className="auth-otp-title">
                          Forgot Password?
                        </h3>
                        <p className="auth-otp-subtitle">
                          Enter your registered email address to receive a secure 6-digit verification code.
                        </p>
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="forgot-email" className="auth-label">
                          Registered Work Email
                        </label>
                        <div className="auth-input-wrapper">
                          <Mail size={18} className="auth-input-icon" />
                          <input
                            id="forgot-email"
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={forgotEmail}
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                              if (errorMsg) setErrorMsg('');
                            }}
                            className="auth-input"
                          />
                        </div>
                      </div>

                      <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading}>
                        {loading ? (
                          <>SENDING RESET CODE... <Loader2 size={14} className="animate-spin" /></>
                        ) : (
                          <>SEND VERIFICATION CODE <ArrowRight size={14} /></>
                        )}
                      </button>

                      <p className="auth-footer-text">
                        Remember your password?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('login');
                            setErrorMsg('');
                            setSuccessMsg('');
                          }}
                          className="auth-link"
                        >
                          Sign in here
                        </button>
                      </p>
                    </form>
                  )}

                  {/* Step 2: Verify 6-Digit OTP */}
                  {forgotStep === 2 && (
                    <form onSubmit={handleVerifyForgotOtp} className="auth-form auth-otp-form" style={{ textAlign: 'center' }}>
                      <div className="auth-otp-header">
                        <div className="auth-otp-badge-icon">
                          <KeyRound size={26} />
                        </div>
                        <h3 className="auth-otp-title">
                          Verify Reset Code
                        </h3>
                        <p className="auth-otp-subtitle">
                          Enter the 6-digit password reset code sent to
                          <br />
                          <strong className="auth-otp-email-tag">{forgotEmail}</strong>
                        </p>
                      </div>

                      <div className="auth-otp-wrap" onPaste={handleOtpPaste}>
                        {otp.map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => { otpInputRefs.current[idx] = el; }}
                            type="text"
                            maxLength={1}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            value={digit}
                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                            onPaste={handleOtpPaste}
                            className={`auth-otp-input ${digit ? 'auth-otp-input--filled' : ''}`}
                            required
                            aria-label={`Digit ${idx + 1}`}
                          />
                        ))}
                      </div>

                      <div className="auth-otp-timer-row">
                        <span className="auth-badge-timer">
                          <span className="auth-timer-dot" />
                          Expires in: <strong>{formatTime(countdown)}</strong>
                        </span>
                      </div>

                      <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading || countdown <= 0}>
                        {loading ? (
                          <>VERIFYING CODE... <Loader2 size={14} className="animate-spin" /></>
                        ) : (
                          <>VERIFY CODE &amp; CONTINUE <ArrowRight size={14} /></>
                        )}
                      </button>

                      <div className="auth-otp-actions">
                        <button
                          type="button"
                          onClick={() => {
                            setForgotStep(1);
                            setErrorMsg('');
                            setSuccessMsg('');
                          }}
                          className="auth-link auth-otp-link"
                        >
                          &larr; Change Email
                        </button>
                        <button
                          type="button"
                          onClick={handleResendForgotOtp}
                          disabled={loading}
                          className="auth-link auth-otp-link"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                        >
                          <RotateCcw size={13} /> Resend Code
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Set New Password & Confirm Password */}
                  {forgotStep === 3 && (
                    <form onSubmit={handleResetPassword} className="auth-form">
                      <div className="auth-otp-header" style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <div className="auth-otp-badge-icon">
                          <ShieldCheck size={26} />
                        </div>
                        <h3 className="auth-otp-title">
                          Set New Password
                        </h3>
                        <p className="auth-otp-subtitle">
                          Create a strong new password with at least 6 characters.
                        </p>
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="new-password" className="auth-label">
                          New Password <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <div className="auth-input-wrapper">
                          <Lock size={18} className="auth-input-icon" />
                          <input
                            id="new-password"
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            placeholder="At least 6 characters"
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              if (errorMsg) setErrorMsg('');
                            }}
                            className="auth-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className="auth-password-toggle"
                            aria-label="Toggle password visibility"
                          >
                            {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <div className="auth-input-group">
                        <label htmlFor="confirm-password" className="auth-label">
                          Confirm New Password <span style={{ color: '#ef4444' }}>*</span>
                        </label>
                        <div className="auth-input-wrapper">
                          <Lock size={18} className="auth-input-icon" />
                          <input
                            id="confirm-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            minLength={6}
                            placeholder="Re-enter your new password"
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              if (errorMsg) setErrorMsg('');
                            }}
                            className="auth-input"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="auth-password-toggle"
                            aria-label="Toggle password visibility"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading}>
                        {loading ? (
                          <>UPDATING PASSWORD... <Loader2 size={14} className="animate-spin" /></>
                        ) : (
                          <>SAVE NEW PASSWORD &amp; LOG IN <ArrowRight size={14} /></>
                        )}
                      </button>

                      <p className="auth-footer-text">
                        Cancel password reset?{' '}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('login');
                            setForgotStep(1);
                            setErrorMsg('');
                            setSuccessMsg('');
                          }}
                          className="auth-link"
                        >
                          Return to Login
                        </button>
                      </p>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 5: PROJECT BRIEF */}
              {activeTab === 'inquiry' && (
                <form onSubmit={handleInquiry} className="auth-form">
                  <div className="auth-grid-2">
                    <div className="auth-input-group">
                      <label htmlFor="inquiry-name" className="auth-label">
                        Your Name <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <User size={18} className="auth-input-icon" />
                        <input
                          id="inquiry-name"
                          type="text"
                          name="name"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="inquiry-company" className="auth-label">
                        Company Name
                      </label>
                      <div className="auth-input-wrapper">
                        <Building size={18} className="auth-input-icon" />
                        <input
                          id="inquiry-company"
                          type="text"
                          name="companyName"
                          placeholder="Acme Corp"
                          value={formData.companyName}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="inquiry-email" className="auth-label">
                      Work Email <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <div className="auth-input-wrapper">
                      <Mail size={18} className="auth-input-icon" />
                      <input
                        id="inquiry-email"
                        type="email"
                        name="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <div className="auth-grid-2">
                    <div className="auth-input-group">
                      <label htmlFor="inquiry-service" className="auth-label">
                        Target Service
                      </label>
                      <select
                        id="inquiry-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="auth-select"
                      >
                        <option value="software-development">Custom Software Development</option>
                        <option value="saas-product-development">SaaS Product Development</option>
                        <option value="trading-algorithm-development">Trading Algorithm Engineering</option>
                        <option value="seo">SEO &amp; Growth</option>
                        <option value="content-creation">Content Creation</option>
                      </select>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="inquiry-budget" className="auth-label">
                        Estimated Budget
                      </label>
                      <select
                        id="inquiry-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="auth-select"
                      >
                        <option value="₹5L - ₹15L">₹5,00,000 – ₹15,00,000</option>
                        <option value="₹15L - ₹30L">₹15,00,000 – ₹30,00,000</option>
                        <option value="₹30L+">₹30,00,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="inquiry-message" className="auth-label">
                      Project Details <span style={{ color: '#ef4444' }}>*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={3}
                      required
                      placeholder="Tell us about your project goals and requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      className="auth-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading}>
                    {loading ? (
                      <>SENDING BRIEF... <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>SEND PROJECT BRIEF <Send size={14} /></>
                    )}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AuthFormSection({ initialTab = 'login' }: AuthFormSectionProps) {
  return (
    <Suspense fallback={<div style={{ minHeight: '400px' }} />}>
      <AuthFormInner initialTab={initialTab} />
    </Suspense>
  );
}
