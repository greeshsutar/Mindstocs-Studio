'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X, Send, Sparkles, ExternalLink, ArrowRight, RotateCcw, Bot } from 'lucide-react';
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
  '💻 Custom Software',
  '⚡ SaaS Products',
  '📈 Quant Trading',
  '🚀 Growth Marketing',
  '🔍 Technical SEO',
  '🧭 7-Step Process',
  '📍 Office Location',
];

/**
 * Lightweight Markdown & Typography Formatter for Assistant responses
 */
function FormattedMessageText({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="assistant-formatted-content">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={idx} className="assistant-spacer" />;
        }

        // Bullet line
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const itemText = trimmed.replace(/^[•\-\*]\s+/, '');
          return (
            <div key={idx} className="assistant-bullet-row">
              <span className="assistant-bullet-dot">✦</span>
              <span
                className="assistant-bullet-text"
                dangerouslySetInnerHTML={{ __html: parseMarkdownInline(itemText) }}
              />
            </div>
          );
        }

        // Numbered line (e.g. 1. 2.)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          return (
            <div key={idx} className="assistant-number-row">
              <span className="assistant-number-badge">{numMatch[1]}</span>
              <span
                className="assistant-number-text"
                dangerouslySetInnerHTML={{ __html: parseMarkdownInline(numMatch[2]) }}
              />
            </div>
          );
        }

        // Standard paragraph
        return (
          <p
            key={idx}
            className="assistant-paragraph"
            dangerouslySetInnerHTML={{ __html: parseMarkdownInline(trimmed) }}
          />
        );
      })}
    </div>
  );
}

function parseMarkdownInline(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="assistant-strong">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="assistant-em">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="assistant-code">$1</code>');
}

export default function AssistantPanel({ isOpen, onClose }: AssistantPanelProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am the MindStocs Studio AI Assistant, powered by our live RAG (Retrieval-Augmented Generation) knowledge engine.\n\nI have verified information on our custom software engineering, SaaS accelerators, quantitative trading systems, performance marketing, and pricing models.\n\nHow can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: ['MindStocs Neural RAG'],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<string[]>(INITIAL_QUICK_ACTIONS);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

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

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'assistant',
        text: "Hello! I am the MindStocs Studio AI Assistant, powered by our live RAG knowledge engine.\n\nWhat would you like to build, scope, or explore?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: ['MindStocs Neural RAG'],
      },
    ]);
    setSuggestedActions(INITIAL_QUICK_ACTIONS);
  };

  const handleAction = async (actionText: string) => {
    // Only WhatsApp opens an external window
    if (
      actionText === 'Talk to the Team (WhatsApp)' ||
      actionText === 'Talk to Team' ||
      actionText === 'Chat on WhatsApp'
    ) {
      window.open(company.whatsapp.link, '_blank');
      return;
    }

    if (actionText === 'Start Over') {
      handleResetChat();
      return;
    }

    // Clean emoji prefix from action chips if present for clean search
    const cleanQuery = actionText.replace(/^[\p{Emoji}\u200d\uFE0F\s]+/u, '').trim();

    addMessage('user', actionText);
    await getResponse(cleanQuery || actionText);
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
        ['Offline Fallback'],
        0.1,
        {
          type: 'whatsapp',
          link: company.whatsapp.link,
          text: 'Chat on WhatsApp',
        }
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          className="assistant-panel-motion-wrapper"
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        >
          <div
            className="assistant-panel"
            role="dialog"
            aria-modal="true"
            aria-label="MindStocs RAG Assistant Chat"
          >
            {/* Ambient Background Aura */}
            <div className="assistant-panel__ambient-glow" />

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
                  <span className="assistant-header__avatar-online-dot" />
                </div>
                <div className="assistant-header__info">
                  <div className="assistant-header__title-row">
                    <span className="assistant-header__title">MindStocs Studio</span>
                    <span className="assistant-rag-badge">
                      <Sparkles size={10} className="assistant-rag-sparkle" /> RAG 2.0
                    </span>
                  </div>
                  <span className="assistant-header__status">Neural Knowledge Engine Active</span>
                </div>
              </div>

              <div className="assistant-header__controls">
                <button
                  className="assistant-header__control-btn"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  className="assistant-header__control-btn assistant-header__control-btn--close"
                  onClick={onClose}
                  aria-label="Close Chat Assistant"
                  title="Close Assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="assistant-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  className={`assistant-message assistant-message--${msg.sender}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <div className="assistant-message__bubble">
                    {msg.sender === 'assistant' ? (
                      <FormattedMessageText content={msg.text} />
                    ) : (
                      <div className="assistant-user-text">{msg.text}</div>
                    )}

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

                    {/* Inline Action CTA Button */}
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
                </motion.div>
              ))}

              {isTyping && (
                <div className="assistant-typing-wrapper">
                  <div className="assistant-typing">
                    <span className="assistant-typing__label">
                      <Bot size={12} className="assistant-typing__bot-icon" /> Synthesizing with RAG
                    </span>
                    <div className="assistant-typing__dots">
                      <span className="assistant-typing__dot" />
                      <span className="assistant-typing__dot" />
                      <span className="assistant-typing__dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Actions Grid */}
            {suggestedActions.length > 0 && (
              <div className="assistant-actions-container">
                <div className="assistant-actions-label">Suggested Inquiries</div>
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
              </div>
            )}

            {/* Footer Input Bar */}
            <form className="assistant-footer" onSubmit={handleSubmit}>
              <div className="assistant-input-container">
                <input
                  ref={inputRef}
                  type="text"
                  className="assistant-input"
                  placeholder="Ask about software, SaaS, quant algorithms, pricing..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  aria-label="Type message to assistant"
                />
                <button
                  type="submit"
                  className="assistant-send"
                  disabled={!inputVal.trim()}
                  aria-label="Send message"
                  title="Send message"
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
