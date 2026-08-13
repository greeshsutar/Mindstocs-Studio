'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { X, Bot } from 'lucide-react';
import '@/styles/components/assistant.css';

import { trackEvent } from '@/lib/analytics';

export const ASSISTANT_ROBOT_VIDEO = '/videos/assistant-robot.webm';

const AssistantPanel = dynamic(() => import('./AssistantPanel'), {
  ssr: false,
});

export default function AssistantButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // First-visit automatic greeting logic
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasBeenGreeted = localStorage.getItem('mindstocs-assistant-greeted');
    if (!hasBeenGreeted) {
      const showTimer = setTimeout(() => {
        setShowBubble(true);
      }, 1000);

      const hideTimer = setTimeout(() => {
        setShowBubble(false);
        localStorage.setItem('mindstocs-assistant-greeted', 'true');
      }, 7000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const toggleAssistant = () => {
    if (showBubble) {
      setShowBubble(false);
      localStorage.setItem('mindstocs-assistant-greeted', 'true');
    }

    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        trackEvent('assistant_opened');
      }
      return next;
    });
  };

  const handleCloseBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBubble(false);
    localStorage.setItem('mindstocs-assistant-greeted', 'true');
  };

  return (
    <div className="assistant-wrapper">
      {/* First-Visit Greeting Speech Bubble */}
      {showBubble && !isOpen && (
        <div className="assistant-bubble" role="status" aria-live="polite">
          <button
            onClick={handleCloseBubble}
            className="assistant-bubble__close"
            aria-label="Dismiss greeting"
          >
            <X size={12} />
          </button>
          <p className="assistant-bubble__text">
            <span className="assistant-bubble__line assistant-bubble__line--accent">
              Hi! I&apos;m the MindStocs Assistant.
            </span>
            <span className="assistant-bubble__line">
              How can I help you today?
            </span>
          </p>
        </div>
      )}

      {/* Tooltip on Hover */}
      <span className="assistant-tooltip">Ask MindStocs</span>

      {/* Floating Robot Video Button Trigger */}
      <button
        className={`assistant-trigger ${isOpen ? 'assistant-trigger--open' : ''}`}
        onClick={toggleAssistant}
        aria-label={isOpen ? 'Close MindStocs Assistant' : 'Open MindStocs Assistant'}
        aria-expanded={isOpen}
      >
        <div className="assistant-avatar-video-container">
          {/* Animated Gold AI Core Fallback (active while video loads or if video file is missing) */}
          {(!videoLoaded || videoError) && (
            <div className="assistant-avatar-fallback" aria-hidden="true">
              <div className="assistant-fallback-orb" />
              <Bot size={28} className="assistant-fallback-icon" />
            </div>
          )}

          {/* Native HTML5 WebM Video Player */}
          <video
            ref={videoRef}
            src={ASSISTANT_ROBOT_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className={`assistant-avatar-video ${videoLoaded && !videoError ? 'assistant-avatar-video--loaded' : ''}`}
            onLoadedData={() => {
              setVideoLoaded(true);
              setVideoError(false);
            }}
            onError={() => {
              setVideoError(true);
            }}
          />
        </div>
        {isOpen && <span className="assistant-active-ring" />}
      </button>

      {/* Assistant Chat Panel */}
      <AssistantPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
