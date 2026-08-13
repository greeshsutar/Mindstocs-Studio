'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Send } from 'lucide-react';
import { company } from '@/data/company';
import { assistantKnowledge } from '@/data/assistant-knowledge';
import '@/styles/components/assistant.css';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
}

interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AssistantPanel({ isOpen, onClose }: AssistantPanelProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: assistantKnowledge.welcomeMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>(
    assistantKnowledge.quickActions
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Trap focus inside panel when open on mobile/accessibility
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex="0"]'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTab);
    return () => window.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  const addMessage = (sender: 'assistant' | 'user', text: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleAction = async (actionText: string) => {
    // 1. Direct Page Actions / Redirection triggers
    if (actionText.startsWith('Discuss') || actionText === 'Send Project Brief') {
      const mapping: Record<string, string> = {
        'Discuss Software Project': '/contact?service=software-development',
        'Discuss SaaS Project': '/contact?service=saas-product-development',
        'Discuss Trading Project': '/contact?service=trading-algorithm-development',
        'Discuss Marketing Project': '/contact?service=performance-marketing',
        'Discuss SEO Project': '/contact?service=seo',
        'Discuss Content Project': '/contact?service=content-creation',
        'Send Project Brief': '/contact',
      };
      const dest = mapping[actionText] || '/contact';
      router.push(dest);
      onClose();
      return;
    }

    if (actionText === 'Talk to the Team (WhatsApp)' || actionText === 'Talk to Team') {
      window.open(company.whatsapp.link, '_blank');
      return;
    }

    if (actionText === 'Start Over') {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: assistantKnowledge.welcomeMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setSuggestedActions(assistantKnowledge.quickActions);
      return;
    }

    // 2. Otherwise treat it as a user message query
    addMessage('user', actionText);
    await getResponse(actionText);
  };

  const getResponse = async (queryText: string) => {
    setIsTyping(true);
    setSuggestedActions([]);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsTyping(false);
        addMessage('assistant', data.message);
        if (data.suggestedActions) {
          setSuggestedActions(data.suggestedActions);
        }
      } else {
        throw new Error('API failure');
      }
    } catch {
      setIsTyping(false);
      addMessage(
        'assistant',
        "Sorry, I'm experiencing some connectivity issues right now. You can reach the team directly on WhatsApp."
      );
      setSuggestedActions(['Talk to the Team (WhatsApp)', 'Start Over']);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal('');
    addMessage('user', userText);
    await getResponse(userText);
  };

  return (
    <div
      ref={panelRef}
      className={`assistant-panel ${isOpen ? 'assistant-panel--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="MindStocs Assistant Chat"
    >
      {/* Header */}
      <div className="assistant-header">
        <div className="assistant-header__info">
          <span className="assistant-header__title">MindStocs Assistant</span>
          <span className="assistant-header__status">Online</span>
        </div>
        <button
          className="assistant-header__close"
          onClick={onClose}
          aria-label="Close Chat Assistant"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="assistant-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`assistant-message assistant-message--${msg.sender}`}
          >
            <div className="assistant-message__bubble">{msg.text}</div>
            <span className="assistant-message__time">{msg.time}</span>
          </div>
        ))}
        {isTyping && (
          <div className="assistant-typing" aria-label="Assistant is typing">
            <span className="assistant-typing__dot" />
            <span className="assistant-typing__dot" />
            <span className="assistant-typing__dot" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Actions */}
      {suggestedActions.length > 0 && (
        <div className="assistant-actions">
          {suggestedActions.map((action) => {
            const isCTA =
              action.includes('WhatsApp') ||
              action.includes('Discuss') ||
              action.includes('Brief') ||
              action.includes('Team');
            return (
              <button
                key={action}
                className={`assistant-action-btn ${
                  isCTA ? 'assistant-action-btn--cta' : ''
                }`}
                onClick={() => handleAction(action)}
              >
                {action}
              </button>
            );
          })}
        </div>
      )}

      {/* Input */}
      <form className="assistant-footer" onSubmit={handleSubmit}>
        <div className="assistant-input-container">
          <input
            type="text"
            className="assistant-input"
            placeholder="Type your message..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            aria-label="Type message to assistant"
          />
          <button
            type="submit"
            className="assistant-send"
            disabled={!inputVal.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
