'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/components/founder-popup.css';

export default function FounderPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSeenPopup = localStorage.getItem('mindstocs-founder-message-seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('mindstocs-founder-message-seen', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="founder-popup"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Founder Introduction Message"
        >
          {/* Top Gold Accent Line */}
          <div className="founder-popup__accent" />

          {/* Close Button */}
          <button
            onClick={handleDismiss}
            className="founder-popup__close"
            aria-label="Close founder message"
          >
            <X size={14} />
          </button>

          {/* Founder Header */}
          <div className="founder-popup__header">
            <span className="founder-popup__badge">FOUNDER&apos;S NOTE</span>
            <span className="founder-popup__name">Jackson Fernandes</span>
          </div>

          {/* Content Body */}
          <p className="founder-popup__text">
            Hi, I&apos;m the founder of MindStocs. We build software, products, and digital systems around real business needs. If you have an idea, I&apos;d love to hear about it.
          </p>

          {/* Action CTA */}
          <div className="founder-popup__footer">
            <Link
              href="/contact"
              onClick={handleDismiss}
              className="btn btn--primary btn--sm founder-popup__btn"
            >
              START A CONVERSATION <ArrowRight size={12} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
