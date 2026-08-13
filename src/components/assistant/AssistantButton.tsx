'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { MessageSquareCode } from 'lucide-react';
import '@/styles/components/assistant.css';

import { trackEvent } from '@/lib/analytics';

// Lazy load the chatbot panel to optimize initial page loading metrics
const AssistantPanel = dynamic(() => import('./AssistantPanel'), {
  ssr: false,
});

export default function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAssistant = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        trackEvent('assistant_opened');
      }
      return next;
    });
  };

  return (
    <>
      <button
        className="assistant-trigger"
        onClick={toggleAssistant}
        aria-label={isOpen ? 'Close MindStocs Assistant' : 'Open MindStocs Assistant'}
        aria-expanded={isOpen}
      >
        <MessageSquareCode size={24} />
      </button>

      <AssistantPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
