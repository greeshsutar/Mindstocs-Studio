'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { company } from '@/data/company';
import { services } from '@/data/services';
import { trackEvent } from '@/lib/analytics';
import '@/styles/components/contact.css';

const serviceOptions = [
  { value: '', label: 'Select a service' },
  ...services.map((s) => ({ value: s.id, label: s.title })),
  { value: 'not-sure', label: 'Not Sure' },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formState, setFormState] = useState<FormState>('idle');
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: preselectedService,
    description: '',
    timeline: '',
    budget: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      trackEvent('contact_form_start');
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormState('success');
        trackEvent('contact_form_submit', { success: true, service: formData.service });
      } else {
        setFormState('error');
        trackEvent('contact_form_submit', { success: false });
      }
    } catch {
      setFormState('error');
      trackEvent('contact_form_submit', { success: false });
    }
  };

  if (formState === 'success') {
    return (
      <div className="contact-form__success">
        <h3>Thank you.</h3>
        <p>Your project brief has been received. We will be in touch.</p>
        <a
          href={company.whatsapp.link}
          className="btn btn--outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          CHAT ON WHATSAPP
        </a>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor="name" className="contact-form__label">
            Name <span className="contact-form__required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="contact-form__input"
            placeholder="Your name"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="company" className="contact-form__label">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="contact-form__input"
            placeholder="Company name"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="email" className="contact-form__label">
            Email <span className="contact-form__required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="contact-form__input"
            placeholder="you@example.com"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="phone" className="contact-form__label">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="contact-form__input"
            placeholder="+91 ..."
          />
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor="service" className="contact-form__label">
            Service
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="contact-form__select"
          >
            {serviceOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor="description" className="contact-form__label">
            Project description <span className="contact-form__required">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="contact-form__textarea"
            placeholder="Tell us about your project..."
            rows={5}
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="timeline" className="contact-form__label">
            Timeline
          </label>
          <input
            type="text"
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="contact-form__input"
            placeholder="e.g. 3 months"
          />
        </div>

        <div className="contact-form__field">
          <label htmlFor="budget" className="contact-form__label">
            Budget range
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="contact-form__input"
            placeholder="e.g. ₹5L–15L"
          />
        </div>
      </div>

      {formState === 'error' && (
        <p className="contact-form__error">
          Something went wrong. Please try again or contact us via WhatsApp.
        </p>
      )}

      <div className="contact-form__actions">
        <button
          type="submit"
          className="btn btn--primary btn--lg"
          disabled={formState === 'loading'}
        >
          {formState === 'loading' ? 'SENDING...' : 'SEND PROJECT BRIEF'}
        </button>
        <a
          href={company.whatsapp.link}
          className="btn btn--outline"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { location: 'contact_form' })}
        >
          CHAT ON WHATSAPP
        </a>
      </div>
    </form>
  );
}
