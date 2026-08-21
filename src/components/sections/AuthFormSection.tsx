'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { User, Lock, Mail, Building, Send, CheckCircle2, ArrowRight, AlertCircle, Loader2, KeyRound, RotateCcw } from 'lucide-react';
import '@/styles/components/auth-form.css';

type FormTab = 'login' | 'signup' | 'inquiry' | 'otp';

interface AuthFormSectionProps {
  initialTab?: FormTab;
}

function AuthFormInner({ initialTab = 'login' }: AuthFormSectionProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get('tab') as FormTab | null;

  const [activeTab, setActiveTab] = useState<FormTab>(() => {
    if (tabParam && ['login', 'signup', 'inquiry', 'otp'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  });

  useEffect(() => {
    if (tabParam && ['login', 'signup', 'inquiry', 'otp'].includes(tabParam)) {
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

  // 6-Digit OTP State
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpEmail, setOtpEmail] = useState('');
  const [countdown, setCountdown] = useState(300); // 5 mins in seconds
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTab === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, countdown]);

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

  // 2. Handle OTP Verification
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
        // Save JWT Session Token in localStorage
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

  // 3. Handle Resend OTP
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

  // 5. Handle Project Brief / Enquiry
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

        {/* Tab Selector */}
        {!verifiedUser && activeTab !== 'otp' && (
          <div className="auth-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === 'login'}
              className={`auth-tab ${activeTab === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              CLIENT LOGIN
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'signup'}
              className={`auth-tab ${activeTab === 'signup' ? 'auth-tab--active' : ''}`}
              onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSuccessMsg(''); }}
            >
              CREATE ACCOUNT
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'inquiry'}
              className={`auth-tab ${activeTab === 'inquiry' ? 'auth-tab--active' : ''}`}
              onClick={() => { setActiveTab('inquiry'); setErrorMsg(''); setSuccessMsg(''); }}
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
                    <label htmlFor="login-password" className="auth-label">
                      Password
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        id="login-password"
                        type="password"
                        name="password"
                        required
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                      />
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
                    <button type="button" onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSuccessMsg(''); }} className="auth-link">
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
                        type="password"
                        name="password"
                        required
                        placeholder="At least 6 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                      />
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
                    <button type="button" onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }} className="auth-link">
                      Sign in here
                    </button>
                  </p>
                </form>
              )}

              {/* TAB 3: OTP VERIFICATION */}
              {activeTab === 'otp' && (
                <form onSubmit={handleVerifyOtp} className="auth-form" style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(201, 168, 76, 0.15)', color: 'var(--color-gold)', margin: '0 auto 12px auto' }}>
                    <KeyRound size={24} />
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '0 0 6px 0' }}>
                    Verify Your Email
                  </h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                    We sent a 6-digit verification code to <strong style={{ color: '#f1f5f9' }}>{otpEmail}</strong>
                  </p>

                  <div className="auth-otp-wrap">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => { otpInputRefs.current[idx] = el; }}
                        type="text"
                        maxLength={1}
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="auth-otp-input"
                        required
                      />
                    ))}
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <span className="auth-badge-timer">
                      ⏱️ Expires in: <strong>{formatTime(countdown)}</strong>
                    </span>
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn" disabled={loading || countdown <= 0}>
                    {loading ? (
                      <>VERIFYING... <Loader2 size={14} className="animate-spin" /></>
                    ) : (
                      <>VERIFY &amp; ACTIVATE ACCOUNT <ArrowRight size={14} /></>
                    )}
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '12px' }}>
                    <button
                      type="button"
                      onClick={() => { setActiveTab('signup'); setErrorMsg(''); setSuccessMsg(''); }}
                      className="auth-link"
                    >
                      &larr; Change Email
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="auth-link"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RotateCcw size={12} /> Resend Code
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: PROJECT BRIEF */}
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
                          placeholder="Jackson Fernandes"
                          value={formData.name}
                          onChange={handleChange}
                          className="auth-input"
                        />
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
                  </div>

                  <div className="auth-grid-2">
                    <div className="auth-input-group">
                      <label htmlFor="inquiry-service" className="auth-label">
                        Capability Needed
                      </label>
                      <select
                        id="inquiry-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="auth-select"
                      >
                        <option value="software-development">Software Development</option>
                        <option value="saas-product-development">SaaS Product Development</option>
                        <option value="trading-algorithm-development">Trading Algorithm Development</option>
                        <option value="performance-marketing">Performance Marketing</option>
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
