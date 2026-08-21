'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, UserPlus, ArrowUpRight, MessageSquare } from 'lucide-react';
import { mainNavItems, ctaNav } from '@/data/navigation';
import { company } from '@/data/company';
import '@/styles/components/header.css';

import Logo from './Logo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    },
    [mobileOpen]
  );

  return (
    <>
      <header
        className={`header ${scrolled ? 'header--scrolled' : ''}`}
        role="banner"
        onKeyDown={handleKeyDown}
      >
        <div className="header__inner">
          {/* Logo */}
          <Link href="/" className="header__logo" aria-label="MindStocs Studio — Home">
            <Logo height={36} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            {mainNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`header__nav-link ${isActive ? 'header__nav-link--active' : ''}`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="header__nav-indicator" />}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions & Auth */}
          <div className="header__actions">
            <div className="header__auth-group">
              <Link
                href="/portal?tab=login"
                className={`header__auth-btn header__login-btn ${
                  pathname === '/login' || (pathname === '/portal' && typeof window !== 'undefined' && window.location.search.includes('tab=login'))
                    ? 'header__auth-btn--active'
                    : ''
                }`}
                title="Client Login"
              >
                <LogIn size={14} className="header__auth-icon" />
                <span>Log In</span>
              </Link>
              <Link
                href="/portal?tab=signup"
                className={`header__auth-btn header__signup-btn ${
                  pathname === '/signup' || (pathname === '/portal' && typeof window !== 'undefined' && window.location.search.includes('tab=signup'))
                    ? 'header__auth-btn--active'
                    : ''
                }`}
                title="Create Account"
              >
                <UserPlus size={14} className="header__auth-icon" />
                <span>Sign Up</span>
              </Link>
            </div>

            <div className="header__action-divider" aria-hidden="true" />

            <Link href={ctaNav.href} className="header__cta">
              <span>{ctaNav.label}</span>
              <ArrowUpRight size={14} className="header__cta-icon" />
            </Link>
          </div>

          {/* Hamburger Menu Toggle */}
          <button
            className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
            <span className="header__hamburger-line" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="mobile-nav__backdrop-glow" aria-hidden="true" />
        
        <div className="mobile-nav__content">
          <nav className="mobile-nav__links" aria-label="Mobile navigation links">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-nav__link ${
                  pathname === item.href ? 'mobile-nav__link--active' : ''
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              className={`mobile-nav__link ${
                pathname === '/contact' ? 'mobile-nav__link--active' : ''
              }`}
              onClick={() => setMobileOpen(false)}
            >
              <span>Contact</span>
            </Link>
          </nav>

          <div className="mobile-nav__divider" />

          {/* Mobile Auth Actions */}
          <div className="mobile-nav__auth">
            <Link
              href="/portal?tab=login"
              className="mobile-nav__auth-btn mobile-nav__login-btn"
              onClick={() => setMobileOpen(false)}
            >
              <LogIn size={16} />
              <span>Log In</span>
            </Link>
            <Link
              href="/portal?tab=signup"
              className="mobile-nav__auth-btn mobile-nav__signup-btn"
              onClick={() => setMobileOpen(false)}
            >
              <UserPlus size={16} />
              <span>Sign Up</span>
            </Link>
          </div>

          {/* Primary Mobile CTA */}
          <Link
            href={ctaNav.href}
            className="mobile-nav__cta"
            onClick={() => setMobileOpen(false)}
          >
            <span>{ctaNav.label}</span>
            <ArrowUpRight size={16} />
          </Link>

          {/* WhatsApp Support Link */}
          <a
            href={company.whatsapp.link}
            className="mobile-nav__whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            <MessageSquare size={14} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}
