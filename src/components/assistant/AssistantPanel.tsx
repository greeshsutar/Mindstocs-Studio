'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Send, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { company } from '@/data/company';
import { ASSISTANT_ROBOT_VIDEO } from './AssistantButton';
import '@/styles/components/assistant.css';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  time: string;
  sources?: string[];
  confidence?: number;
  cta?: {
    type: 'contact' | 'whatsapp' | 'portal' | 'none';
    link: string;
    text: string;
  };
}

interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_QUICK_ACTIONS = [
  'Custom Software',
  'SaaS Products',
  'Trading Algorithms',
  'Growth Marketing',
  'Technical SEO',
  '7-Step Process',
  'Office Location',
];

export default function AssistantPanel({ isOpen, onClose }: AssistantPanelProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am the MindStocs Studio AI Assistant, powered by our live RAG (Retrieval-Augmented Generation) knowledge engine. I have verified knowledge on our engineering capabilities, trading systems, client projects, and pricing models. What would you like to build or explore?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['MindStocs Knowledge Engine'],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>(INITIAL_QUICK_ACTIONS);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // ESC key handler to close assistant panel
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus inside panel when open
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

  const addMessage = (
    sender: 'assistant' | 'user',
    text: string,
    sources?: string[],
    confidence?: number,
    cta?: Message['cta']
  ) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources,
      confidence,
      cta,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleAction = async (actionText: string) => {
    // Only WhatsApp opens an external window
    if (actionText === 'Talk to the Team (WhatsApp)' || actionText === 'Talk to Team' || actionText === 'Chat on WhatsApp') {
      window.open(company.whatsapp.link, '_blank');
      return;
    }

    if (actionText === 'Start Over') {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: "Hello! I am the MindStocs Studio AI Assistant, powered by our live RAG knowledge engine. What would you like to explore?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: ['MindStocs Knowledge Engine'],
        },
      ]);
      setSuggestedActions(INITIAL_QUICK_ACTIONS);
      return;
    }

    // Treat any selected action chip as an in-chat conversational query
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
        addMessage('assistant', data.message, data.sources, data.confidence, data.cta);
        if (data.suggestedActions && data.suggestedActions.length > 0) {
          setSuggestedActions(data.suggestedActions);
        }
      } else {
        throw new Error('API failure');
      }
    } catch {
      setIsTyping(false);
      addMessage(
        'assistant',
        "I'm temporarily experiencing connectivity issues with the knowledge base. You can connect with our team directly on WhatsApp anytime.",
        ['Offline Fallback']
      );
      setSuggestedActions(['Talk to the Team (WhatsApp)', 'Send Project Brief', 'Start Over']);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          className="assistant-panel-motion-wrapper"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div
            className="assistant-panel"
            role="dialog"
            aria-modal="true"
            aria-label="MindStocs RAG Assistant Chat"
          >
            {/* Header */}
            <div className="assistant-header">
              <div className="assistant-header__brand">
                <div className="assistant-header__avatar">
                  <video
                    src={ASSISTANT_ROBOT_VIDEO}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="assistant-header__avatar-video"
                  />
                </div>
                <div className="assistant-header__info">
                  <div className="assistant-header__title-row">
                    <span className="assistant-header__title">MindStocs Assistant</span>
                    <span className="assistant-rag-badge">
                      <Sparkles size={10} /> RAG
                    </span>
                  </div>
                  <span className="assistant-header__status">Knowledge Engine Online</span>
                </div>
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
                  <div className="assistant-message__bubble">
                    <div className="assistant-message__text" style={{ whiteSpace: 'pre-line' }}>
                      {msg.text}
                    </div>

                    {/* Sources Badge */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="assistant-message__sources">
                        {msg.sources.map((src, sIdx) => (
                          <span key={sIdx} className="assistant-source-tag">
                            ✦ {src}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Inline CTA Button */}
                    {msg.cta && msg.cta.link && (
                      <div className="assistant-message__cta-wrap">
                        {msg.cta.type === 'whatsapp' ? (
                          <a
                            href={msg.cta.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="assistant-bubble-cta assistant-bubble-cta--whatsapp"
                          >
                            {msg.cta.text} <ExternalLink size={12} />
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              router.push(msg.cta!.link);
                              onClose();
                            }}
                            className="assistant-bubble-cta"
                          >
                            {msg.cta.text} <ArrowRight size={12} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="assistant-message__time">{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="assistant-typing" aria-label="Assistant is retrieving knowledge">
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

            {/* Footer Input */}
            <form className="assistant-footer" onSubmit={handleSubmit}>
              <div className="assistant-input-container">
                <input
                  type="text"
                  className="assistant-input"
                  placeholder="Ask about software, trading, SaaS, pricing..."
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
