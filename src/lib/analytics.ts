type EventName =
  | 'hero_cta_click'
  | 'service_cta_click'
  | 'whatsapp_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'assistant_opened'
  | 'assistant_conversion'
  | 'service_page_view';

export function trackEvent(name: EventName, properties?: Record<string, any>) {
  // Enforce privacy constraints: Never track raw chatbot message logs
  const cleanedProps = properties ? { ...properties } : {};
  if ('message' in cleanedProps) {
    delete cleanedProps.message;
  }
  if ('text' in cleanedProps) {
    delete cleanedProps.text;
  }

  // Log in development console
  console.log(`[Analytics Event]: ${name}`, cleanedProps);

  // Optional: Web Analytics integration hook (e.g. GA4, Plausible, or custom server endpoint)
  try {
    if (typeof window !== 'undefined') {
      // Example Plausible: window.plausible?.(name, { props: cleanedProps })
      // Example GA4: window.gtag?.('event', name, cleanedProps)
    }
  } catch (err) {
    console.error('Failed to dispatch analytics event:', err);
  }
}
