'use client';

import { useState } from 'react';
import { User, Mail, Building, MessageSquare, Send, CheckCircle2, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { isValidEmail, isValidName, isValidPhone } from '@/lib/validation';
import '@/styles/components/get-connected.css';

export default function GetConnected() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nameVal = isValidName(formData.name);
    if (!nameVal.valid) {
      setErrorMsg(nameVal.message || 'Please provide your name.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      setErrorMsg('Please enter a valid work email address.');
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      setErrorMsg('Please enter a valid phone number or leave it blank.');
      return;
    }

    if (!formData.message || formData.message.trim().length < 5) {
      setErrorMsg('Please provide your project message (minimum 5 characters).');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          service: formData.service,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.errors?.[0] || data.message || 'Failed to submit enquiry. Please try again.');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section get-connected" id="get-connected" aria-labelledby="get-connected-heading">
      <div className="container">
        <div className="get-connected__inner">
          {/* Left — Copy */}
          <div className="get-connected__copy">
            <span className="section-heading__eyebrow">Get In Touch</span>
            <h2 className="get-connected__title" id="get-connected-heading">
              LET&apos;S BUILD<br />SOMETHING GREAT.
            </h2>
            <p className="get-connected__desc">
              Whether you have a product idea, need a technology partner, or want to scale your digital presence — we&apos;re ready to help. Drop us a message and our team will get back to you within 24 hours.
            </p>

            <ul className="get-connected__features">
              <li><span className="get-connected__dot" />Free initial consultation</li>
              <li><span className="get-connected__dot" />Response within 24 hours</li>
              <li><span className="get-connected__dot" />No commitment required</li>
              <li><span className="get-connected__dot" />Transparent pricing</li>
            </ul>
          </div>

          {/* Right — Form */}
          <div className="get-connected__form-wrap">
            {submitted ? (
              <div className="get-connected__success">
                <CheckCircle2 size={52} className="get-connected__success-icon" />
                <h3 className="get-connected__success-title">Message Received!</h3>
                <p className="get-connected__success-desc">
                  Thank you for reaching out. A confirmation email has been sent to your inbox. Our team will review your enquiry and contact you shortly.
                </p>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="get-connected__form" onSubmit={handleSubmit} noValidate>
                {/* Row 1 */}
                <div className="get-connected__row">
                  <div className="gc-field">
                    <label htmlFor="gc-name" className="gc-label">Full Name <span className="gc-required">*</span></label>
                    <div className="gc-input-wrap">
                      <User size={16} className="gc-icon" />
                      <input
                        id="gc-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Jackson Fernandes"
                        value={formData.name}
                        onChange={handleChange}
                        className="gc-input"
                      />
                    </div>
                  </div>

                  <div className="gc-field">
                    <label htmlFor="gc-email" className="gc-label">Work Email <span className="gc-required">*</span></label>
                    <div className="gc-input-wrap">
                      <Mail size={16} className="gc-icon" />
                      <input
                        id="gc-email"
                        name="email"
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="gc-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="get-connected__row">
                  <div className="gc-field">
                    <label htmlFor="gc-phone" className="gc-label">Phone Number</label>
                    <div className="gc-input-wrap">
                      <Phone size={16} className="gc-icon" />
                      <input
                        id="gc-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        className="gc-input"
                      />
                    </div>
                  </div>

                  <div className="gc-field">
                    <label htmlFor="gc-company" className="gc-label">Company / Brand</label>
                    <div className="gc-input-wrap">
                      <Building size={16} className="gc-icon" />
                      <input
                        id="gc-company"
                        name="company"
                        type="text"
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={handleChange}
                        className="gc-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Service */}
                <div className="gc-field">
                  <label htmlFor="gc-service" className="gc-label">How Can We Help?</label>
                  <select
                    id="gc-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="gc-select"
                  >
                    <option value="">Select a service...</option>
                    <option value="software-development">Software Development</option>
                    <option value="saas-product-development">SaaS Product Development</option>
                    <option value="trading-algorithm-development">Trading Algorithm Development</option>
                    <option value="performance-marketing">Performance Marketing</option>
                    <option value="seo">SEO &amp; Search Growth</option>
                    <option value="content-creation">Content Creation</option>
                    <option value="other">Other / General Enquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="gc-field">
                  <label htmlFor="gc-message" className="gc-label">
                    <MessageSquare size={14} style={{ display: 'inline', marginRight: 4 }} />
                    Tell Us About Your Project <span className="gc-required">*</span>
                  </label>
                  <textarea
                    id="gc-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Briefly describe your goals, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="gc-textarea"
                  />
                </div>

                {errorMsg && (
                  <div style={{ color: '#ef4444', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <button type="submit" className="btn btn--primary get-connected__submit" disabled={loading}>
                  {loading ? (
                    <>
                      SENDING... <Loader2 size={14} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      SEND MESSAGE <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
