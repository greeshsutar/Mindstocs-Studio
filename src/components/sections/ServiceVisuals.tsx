import React from 'react';

// 01. Software Development Visual — Abstract Architecture & Modules
export function SoftwareDevVisual() {
  return (
    <div className="service-visual-container">
      <div className="service-visual-window">
        {/* Window Topbar */}
        <div className="service-visual-header">
          <div className="service-visual-dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="service-visual-title">architecture.config.ts</span>
        </div>
        {/* Architecture Grid */}
        <div className="service-visual-body service-visual-body--grid">
          <div className="arch-node arch-node--primary">
            <span className="arch-badge">API Gateway</span>
            <div className="arch-lines">
              <span className="arch-line" />
              <span className="arch-line" />
            </div>
          </div>
          <div className="arch-row">
            <div className="arch-card">
              <span className="arch-dot" />
              <span className="arch-text">Microservices</span>
            </div>
            <div className="arch-card arch-card--gold">
              <span className="arch-dot arch-dot--gold" />
              <span className="arch-text">DB Cluster</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 02. SaaS Product Development Visual — Dashboard UI & Graph
export function SaaSVisual() {
  return (
    <div className="service-visual-container">
      <div className="service-visual-window">
        {/* Sidebar + Main Interface */}
        <div className="saas-layout">
          <div className="saas-sidebar">
            <div className="saas-nav-item saas-nav-item--active" />
            <div className="saas-nav-item" />
            <div className="saas-nav-item" />
          </div>
          <div className="saas-main">
            <div className="saas-metrics">
              <div className="saas-metric-card">
                <span className="saas-metric-label">MRR</span>
                <span className="saas-metric-val">$48.5k</span>
              </div>
              <div className="saas-metric-card saas-metric-card--gold">
                <span className="saas-metric-label">Retention</span>
                <span className="saas-metric-val">98.2%</span>
              </div>
            </div>
            {/* Sparkline Chart */}
            <svg className="saas-chart" viewBox="0 0 200 60" fill="none">
              <path
                d="M5 45 Q 40 35, 70 40 T 130 20 T 195 10"
                stroke="url(#saasGoldGrad)"
                strokeWidth="2.5"
                fill="none"
              />
              <path
                d="M5 45 Q 40 35, 70 40 T 130 20 T 195 10 L 195 60 L 5 60 Z"
                fill="url(#saasAreaGrad)"
                opacity="0.25"
              />
              <circle cx="195" cy="10" r="3.5" fill="#C9A84C" />
              <defs>
                <linearGradient id="saasGoldGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#F0ECE4" />
                </linearGradient>
                <linearGradient id="saasAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A84C" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// 03. Trading Algorithm Development Visual — Candlestick & Data Nodes
export function TradingVisual() {
  return (
    <div className="service-visual-container">
      <div className="service-visual-window">
        <div className="trading-header">
          <span className="trading-pair">BTC/USD ALGO</span>
          <span className="trading-status">EXECUTION ACTIVE</span>
        </div>
        <div className="trading-body">
          <svg className="trading-candles" viewBox="0 0 220 70" fill="none">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="220" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
            <line x1="0" y1="45" x2="220" y2="45" stroke="rgba(255,255,255,0.05)" strokeDasharray="4" />
            {/* Candle 1 */}
            <line x1="25" y1="15" x2="25" y2="55" stroke="#C9A84C" strokeWidth="1" />
            <rect x="20" y="25" width="10" height="20" fill="#C9A84C" rx="1" />
            {/* Candle 2 */}
            <line x1="65" y1="10" x2="65" y2="50" stroke="#F0ECE4" strokeWidth="1" />
            <rect x="60" y="20" width="10" height="22" fill="#151515" stroke="#F0ECE4" strokeWidth="1" rx="1" />
            {/* Candle 3 */}
            <line x1="105" y1="20" x2="105" y2="60" stroke="#C9A84C" strokeWidth="1" />
            <rect x="100" y="30" width="10" height="20" fill="#C9A84C" rx="1" />
            {/* Trendline */}
            <path d="M15 50 L65 30 L105 40 L160 15 L205 10" stroke="#C9A84C" strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="205" cy="10" r="4" fill="#C9A84C" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// 04. Performance Marketing Visual — Conversion Funnel & Analytics
export function MarketingVisual() {
  return (
    <div className="service-visual-container">
      <div className="service-visual-window">
        <div className="marketing-flex">
          <div className="marketing-badge">
            <span className="marketing-badge-val">+340%</span>
            <span className="marketing-badge-lbl">ROAS Target</span>
          </div>
          <div className="marketing-bars">
            <div className="m-bar" style={{ height: '35%' }} />
            <div className="m-bar" style={{ height: '55%' }} />
            <div className="m-bar" style={{ height: '75%' }} />
            <div className="m-bar m-bar--gold" style={{ height: '95%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// 05. SEO Visual — Search & Ranking Data Nodes
export function SEOVisual() {
  return (
    <div className="service-visual-container">
      <div className="service-visual-window">
        <div className="seo-searchbar">
          <span className="seo-icon">🔍</span>
          <span className="seo-query">high intent B2B SaaS</span>
        </div>
        <div className="seo-results">
          <div className="seo-item seo-item--top">
            <span className="seo-rank">#1</span>
            <div className="seo-lines">
              <span className="seo-line seo-line--bold" />
              <span className="seo-line" />
            </div>
          </div>
          <div className="seo-item">
            <span className="seo-rank">#2</span>
            <div className="seo-lines">
              <span className="seo-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 06. Content Creation Visual — Editorial Wireframe Composition
export function ContentVisual() {
  return (
    <div className="service-visual-container">
      <div className="service-visual-window">
        <div className="content-layout">
          <div className="content-hero-frame">
            <span className="content-tag">EDITORIAL</span>
            <div className="content-title-lines">
              <span className="c-line c-line--thick" />
              <span className="c-line c-line--medium" />
            </div>
          </div>
          <div className="content-grid">
            <div className="content-card-wire" />
            <div className="content-card-wire content-card-wire--gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
