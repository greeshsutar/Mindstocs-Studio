'use client';

import { useState } from 'react';
import { User, Lock, Mail, Building, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import '@/styles/components/auth-form.css';

type FormTab = 'login' | 'signup' | 'inquiry';

export default function AuthFormSection() {
  const [activeTab, setActiveTab] = useState<FormTab>('login');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    password: '',
    service: 'software-development',
    budget: '$5k - $15k',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'signup') {
      alert(`Account created successfully! Welcome to MindStocs Studio, ${formData.name || 'User'}!`);
    } else if (activeTab === 'login') {
      alert('Logged in successfully! Welcome back to MindStocs Studio.');
    } else {
      alert('Project brief submitted successfully! We will contact you within 24 hours.');
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
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
            Sign in to your client dashboard, create a new account, or send us your project requirements directly.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="auth-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'login'}
            className={`auth-tab ${activeTab === 'login' ? 'auth-tab--active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            CLIENT LOGIN
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'signup'}
            className={`auth-tab ${activeTab === 'signup' ? 'auth-tab--active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            CREATE ACCOUNT
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'inquiry'}
            className={`auth-tab ${activeTab === 'inquiry' ? 'auth-tab--active' : ''}`}
            onClick={() => setActiveTab('inquiry')}
          >
            PROJECT BRIEF
          </button>
        </div>

        {/* Form Container */}
        <div className="auth-card">
          {isSubmitted ? (
            <div className="auth-success-state">
              <CheckCircle2 size={48} className="auth-success-icon" />
              <h3 className="auth-success-title">Submission Received</h3>
              <p className="auth-success-desc">
                Thank you! Our engineering team will process your request and respond within 24 hours.
              </p>
              <button onClick={() => setIsSubmitted(false)} className="btn btn--outline btn--sm">
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="auth-form">
              {/* TAB 1: LOGIN */}
              {activeTab === 'login' && (
                <>
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

                  <div className="auth-flex-row">
                    <label className="auth-checkbox-label">
                      <input type="checkbox" defaultChecked /> Remember me
                    </label>
                    <a href="#forgot" className="auth-link">
                      Forgot Password?
                    </a>
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn">
                    SIGN IN TO DASHBOARD <ArrowRight size={14} />
                  </button>

                  <p className="auth-footer-text">
                    Don&apos;t have an account yet?{' '}
                    <button type="button" onClick={() => setActiveTab('signup')} className="auth-link">
                      Create one here
                    </button>
                  </p>
                </>
              )}

              {/* TAB 2: SIGNUP */}
              {activeTab === 'signup' && (
                <>
                  <div className="auth-grid-2">
                    <div className="auth-input-group">
                      <label htmlFor="signup-name" className="auth-label">
                        Full Name
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
                      Work Email
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
                      Create Password
                    </label>
                    <div className="auth-input-wrapper">
                      <Lock size={18} className="auth-input-icon" />
                      <input
                        id="signup-password"
                        type="password"
                        name="password"
                        required
                        placeholder="At least 8 characters"
                        value={formData.password}
                        onChange={handleChange}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn">
                    CREATE ACCOUNT <ArrowRight size={14} />
                  </button>

                  <p className="auth-footer-text">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setActiveTab('login')} className="auth-link">
                      Sign in here
                    </button>
                  </p>
                </>
              )}

              {/* TAB 3: PROJECT BRIEF */}
              {activeTab === 'inquiry' && (
                <>
                  <div className="auth-grid-2">
                    <div className="auth-input-group">
                      <label htmlFor="inquiry-name" className="auth-label">
                        Your Name
                      </label>
                      <div className="auth-input-wrapper">
                        <User size={18} className="auth-input-icon" />
                        <input
                          id="inquiry-name"
                          type="text"
                          name="name"
                          required
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          className="auth-input"
                        />
                      </div>
                    </div>

                    <div className="auth-input-group">
                      <label htmlFor="inquiry-email" className="auth-label">
                        Work Email
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
                        <option value="seo">SEO</option>
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
                        <option value="$5k - $15k">$5,000 – $15,000</option>
                        <option value="$15k - $30k">$15,000 – $30,000</option>
                        <option value="$30k+">$30,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="auth-input-group">
                    <label htmlFor="inquiry-message" className="auth-label">
                      Project Details
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows={3}
                      placeholder="Tell us about your project goals and requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      className="auth-textarea"
                    />
                  </div>

                  <button type="submit" className="btn btn--primary auth-submit-btn">
                    SEND PROJECT BRIEF <Send size={14} />
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
