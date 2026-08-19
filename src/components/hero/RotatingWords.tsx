'use client';

import { useState, useEffect } from 'react';

interface RotatingWordsProps {
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function RotatingWords({
  words = ['BUILD', 'GROW', 'SCALE'],
  typingSpeed = 130,
  deletingSpeed = 70,
  pauseDuration = 2000,
  className = '',
}: RotatingWordsProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing phase
      if (displayText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        // Pause when word is completely typed
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting phase
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        // Move to the next word
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`rotating-word-container ${className}`}>
      <span className="rotating-word text-gradient-gold">
        {displayText}
      </span>
      <span className="rotating-word-cursor" aria-hidden="true" />
    </span>
  );
}
