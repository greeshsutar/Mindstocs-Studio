'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
            <Logo height={38} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header__nav" aria-label="Main navigation">
            {mainNavItems.map((item) => {
              const hasDropdown = ['Work', 'Process', 'Insights'].includes(item.label);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`header__nav-link ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'header__nav-link--active'
                      : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <svg
                      className="header__nav-link-chevron"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="header__actions">
            <Link href="/portal?tab=login" className="header__login-btn">
              LOG IN
            </Link>
            <Link href="/portal?tab=signup" className="header__signup-btn">
              SIGN UP
            </Link>
            <Link href={ctaNav.href} className="header__cta">
              {ctaNav.label}
            </Link>
          </div>

          {/* Hamburger */}
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

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-nav"
        className={`mobile-nav ${mobileOpen ? 'mobile-nav--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <nav className="mobile-nav__links" aria-label="Mobile navigation">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav__link ${
                pathname === item.href ? 'mobile-nav__link--active' : ''
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`mobile-nav__link ${
              pathname === '/contact' ? 'mobile-nav__link--active' : ''
            }`}
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Auth Actions */}
        <div className="mobile-nav__auth">
          <Link
            href="/portal?tab=login"
            className="mobile-nav__login-btn"
            onClick={() => setMobileOpen(false)}
          >
            LOG IN
          </Link>
          <Link
            href="/portal?tab=signup"
            className="mobile-nav__signup-btn"
            onClick={() => setMobileOpen(false)}
          >
            SIGN UP
          </Link>
        </div>

        <Link
          href={ctaNav.href}
          className="mobile-nav__cta"
          onClick={() => setMobileOpen(false)}
        >
          {ctaNav.label}
        </Link>

        <a
          href={company.whatsapp.link}
          className="mobile-nav__whatsapp"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
        >
          Chat on WhatsApp
        </a>
      </div>
    </>
  );
}
