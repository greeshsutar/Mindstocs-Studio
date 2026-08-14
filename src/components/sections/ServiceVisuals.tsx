import React from 'react';

// ─────────────────────────────────────────────
// 01  SOFTWARE DEVELOPMENT
// Application architecture — connected modules, UI panels, API graph
// ─────────────────────────────────────────────
export function SoftwareDevVisual() {
  return (
    <div className="svc-visual">
      <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Background grid */}
        <defs>
          <pattern id="sw-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
          </pattern>
          <linearGradient id="sw-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#C9A84C" />
          </linearGradient>
        </defs>
        <rect width="240" height="140" fill="url(#sw-grid)" />

        {/* Central API Gateway node */}
        <rect x="88" y="10" width="64" height="26" rx="4" fill="rgba(201,168,76,0.12)" stroke="#C9A84C" strokeWidth="1" />
        <text x="120" y="27" textAnchor="middle" fontSize="9" fill="#C9A84C" fontWeight="600" letterSpacing="0.5">API GATEWAY</text>

        {/* Connection lines from gateway down */}
        <line x1="120" y1="36" x2="50" y2="60" stroke="rgba(201,168,76,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="120" y1="36" x2="120" y2="60" stroke="rgba(201,168,76,0.4)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="120" y1="36" x2="190" y2="60" stroke="rgba(201,168,76,0.4)" strokeWidth="1" strokeDasharray="3 2" />

        {/* Service module — Auth */}
        <rect x="16" y="60" width="68" height="26" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="20" y="64" width="6" height="6" rx="1" fill="rgba(201,168,76,0.6)" />
        <text x="31" y="69" fontSize="8" fill="#9a9590">Auth Service</text>
        <text x="31" y="78" fontSize="7" fill="rgba(255,255,255,0.3)">JWT / OAuth2</text>

        {/* Service module — Core */}
        <rect x="88" y="60" width="64" height="26" rx="4" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
        <rect x="92" y="64" width="6" height="6" rx="1" fill="#C9A84C" />
        <text x="103" y="69" fontSize="8" fill="#C9A84C">Core Engine</text>
        <text x="103" y="78" fontSize="7" fill="rgba(201,168,76,0.6)">TypeScript / Node</text>

        {/* Service module — DB */}
        <rect x="156" y="60" width="68" height="26" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="160" y="64" width="6" height="6" rx="1" fill="rgba(201,168,76,0.6)" />
        <text x="171" y="69" fontSize="8" fill="#9a9590">Data Layer</text>
        <text x="171" y="78" fontSize="7" fill="rgba(255,255,255,0.3)">PostgreSQL / Redis</text>

        {/* Connection lines down to UI layer */}
        <line x1="50" y1="86" x2="50" y2="102" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="120" y1="86" x2="120" y2="102" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
        <line x1="190" y1="86" x2="190" y2="102" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

        {/* UI panel bar — bottom */}
        <rect x="16" y="102" width="208" height="22" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <rect x="20" y="107" width="30" height="5" rx="2" fill="rgba(201,168,76,0.5)" />
        <rect x="56" y="107" width="20" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="82" y="107" width="24" height="5" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="176" y="107" width="44" height="10" rx="2" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
        <text x="198" y="115" textAnchor="middle" fontSize="7" fill="#C9A84C">DEPLOY</text>

        {/* Status dots */}
        <circle cx="228" cy="23" r="3" fill="#4caf50" opacity="0.8" />
        <circle cx="228" cy="23" r="6" fill="#4caf50" opacity="0.15" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// 02  SAAS PRODUCT DEVELOPMENT
// Product dashboard — interface panels, cloud modules, subscription MRR
// ─────────────────────────────────────────────
export function SaaSVisual() {
  return (
    <div className="svc-visual">
      <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="saas-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* App chrome */}
        <rect x="6" y="6" width="228" height="128" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {/* Titlebar */}
        <rect x="6" y="6" width="228" height="18" rx="6" fill="rgba(255,255,255,0.04)" />
        <rect x="6" y="18" width="228" height="6" fill="rgba(255,255,255,0.04)" />
        <circle cx="17" cy="15" r="3" fill="rgba(255,255,255,0.15)" />
        <circle cx="27" cy="15" r="3" fill="rgba(255,255,255,0.1)" />
        <circle cx="37" cy="15" r="3" fill="rgba(255,255,255,0.07)" />
        <text x="120" y="18" textAnchor="middle" fontSize="7" fill="#9a9590" letterSpacing="1">DASHBOARD</text>

        {/* Left sidebar */}
        <rect x="6" y="24" width="34" height="110" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <rect x="11" y="32" width="24" height="5" rx="2" fill="rgba(201,168,76,0.7)" />
        <rect x="11" y="43" width="24" height="5" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="11" y="54" width="24" height="5" rx="2" fill="rgba(255,255,255,0.07)" />
        <rect x="11" y="65" width="24" height="5" rx="2" fill="rgba(255,255,255,0.07)" />

        {/* Metric cards */}
        <rect x="46" y="28" width="58" height="34" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="51" y="40" fontSize="7" fill="#9a9590" letterSpacing="0.5">MRR</text>
        <text x="51" y="54" fontSize="11" fill="#F0ECE4" fontWeight="700">$48.2k</text>

        <rect x="110" y="28" width="58" height="34" rx="3" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.25)" strokeWidth="0.5" />
        <text x="115" y="40" fontSize="7" fill="#9a9590" letterSpacing="0.5">RETENTION</text>
        <text x="115" y="54" fontSize="11" fill="#C9A84C" fontWeight="700">98.4%</text>

        <rect x="174" y="28" width="54" height="34" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="179" y="40" fontSize="7" fill="#9a9590" letterSpacing="0.5">USERS</text>
        <text x="179" y="54" fontSize="11" fill="#F0ECE4" fontWeight="700">2,840</text>

        {/* Chart area */}
        <rect x="46" y="70" width="182" height="56" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        {/* Grid lines */}
        <line x1="46" y1="90" x2="228" y2="90" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="46" y1="105" x2="228" y2="105" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        {/* Area fill */}
        <path d="M50 118 L70 108 L90 112 L115 98 L140 88 L165 80 L185 76 L205 72 L225 70 L225 126 L50 126 Z" fill="url(#saas-area)" />
        {/* Line */}
        <path d="M50 118 L70 108 L90 112 L115 98 L140 88 L165 80 L185 76 L205 72 L225 70" stroke="#C9A84C" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="225" cy="70" r="3" fill="#C9A84C" />
        <circle cx="225" cy="70" r="6" fill="#C9A84C" fillOpacity="0.2" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// 03  TRADING ALGORITHM DEVELOPMENT
// Financial chart — candlesticks, signal paths, risk/data nodes
// ─────────────────────────────────────────────
export function TradingVisual() {
  return (
    <div className="svc-visual">
      <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="trd-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Header bar */}
        <rect x="6" y="6" width="228" height="20" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        <text x="14" y="19" fontSize="8" fill="#C9A84C" fontWeight="700" letterSpacing="0.5">BTC / USD</text>
        <text x="70" y="19" fontSize="7" fill="#9a9590">ALGO STRATEGY</text>
        <rect x="178" y="10" width="52" height="12" rx="2" fill="rgba(76,175,80,0.15)" />
        <circle cx="184" cy="16" r="3" fill="#4caf50" />
        <circle cx="184" cy="16" r="5" fill="#4caf50" fillOpacity="0.2" />
        <text x="191" y="19" fontSize="7" fill="#4caf50">LIVE</text>

        {/* Price axis labels */}
        <text x="8" y="45" fontSize="6" fill="rgba(255,255,255,0.2)">52k</text>
        <text x="8" y="72" fontSize="6" fill="rgba(255,255,255,0.2)">48k</text>
        <text x="8" y="99" fontSize="6" fill="rgba(255,255,255,0.2)">44k</text>

        {/* Horizontal grid */}
        <line x1="22" y1="42" x2="234" y2="42" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="22" y1="69" x2="234" y2="69" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <line x1="22" y1="96" x2="234" y2="96" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

        {/* Candlesticks */}
        {/* Bullish (gold fill) */}
        <line x1="36" y1="88" x2="36" y2="58" stroke="#C9A84C" strokeWidth="1" />
        <rect x="31" y="66" width="10" height="18" rx="1" fill="#C9A84C" />
        {/* Bearish (outline) */}
        <line x1="60" y1="58" x2="60" y2="92" stroke="#9a9590" strokeWidth="1" />
        <rect x="55" y="64" width="10" height="22" rx="1" fill="#0a0a0a" stroke="#9a9590" strokeWidth="1" />
        {/* Bullish */}
        <line x1="84" y1="72" x2="84" y2="48" stroke="#C9A84C" strokeWidth="1" />
        <rect x="79" y="54" width="10" height="16" rx="1" fill="#C9A84C" />
        {/* Bearish */}
        <line x1="108" y1="50" x2="108" y2="78" stroke="#9a9590" strokeWidth="1" />
        <rect x="103" y="56" width="10" height="18" rx="1" fill="#0a0a0a" stroke="#9a9590" strokeWidth="1" />
        {/* Bullish large */}
        <line x1="132" y1="78" x2="132" y2="36" stroke="#C9A84C" strokeWidth="1" />
        <rect x="127" y="44" width="10" height="28" rx="1" fill="#C9A84C" />
        {/* Bullish */}
        <line x1="156" y1="60" x2="156" y2="34" stroke="#C9A84C" strokeWidth="1" />
        <rect x="151" y="38" width="10" height="18" rx="1" fill="#C9A84C" />
        {/* Small bullish */}
        <line x1="180" y1="50" x2="180" y2="34" stroke="#C9A84C" strokeWidth="1" />
        <rect x="175" y="36" width="10" height="12" rx="1" fill="#C9A84C" />
        {/* Latest */}
        <line x1="204" y1="42" x2="204" y2="26" stroke="#C9A84C" strokeWidth="1" />
        <rect x="199" y="28" width="10" height="12" rx="1" fill="#C9A84C" />

        {/* Signal trendline */}
        <path d="M26 84 L60 74 L84 62 L108 65 L132 48 L156 42 L180 38 L204 30" stroke="#C9A84C" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.7" />

        {/* Signal node */}
        <circle cx="204" cy="30" r="4" fill="#C9A84C" />
        <circle cx="204" cy="30" r="8" fill="#C9A84C" fillOpacity="0.15" />
        <circle cx="204" cy="30" r="12" fill="#C9A84C" fillOpacity="0.06" />

        {/* Algo nodes at bottom */}
        <rect x="6" y="112" width="52" height="22" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="10" y="121" fontSize="7" fill="#9a9590">SIGNAL</text>
        <text x="10" y="130" fontSize="7" fill="#C9A84C">LONG ↑</text>

        <rect x="64" y="112" width="52" height="22" rx="3" fill="rgba(201,168,76,0.06)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
        <text x="68" y="121" fontSize="7" fill="#9a9590">RISK</text>
        <text x="68" y="130" fontSize="7" fill="#C9A84C">1.2% / trade</text>

        <rect x="122" y="112" width="52" height="22" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="126" y="121" fontSize="7" fill="#9a9590">WIN RATE</text>
        <text x="126" y="130" fontSize="7" fill="#F0ECE4">68.4%</text>

        <rect x="180" y="112" width="54" height="22" rx="3" fill="rgba(76,175,80,0.06)" stroke="rgba(76,175,80,0.2)" strokeWidth="0.5" />
        <text x="184" y="121" fontSize="7" fill="#9a9590">P&L</text>
        <text x="184" y="130" fontSize="7" fill="#4caf50">+$12,440</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// 04  PERFORMANCE MARKETING
// Analytics dashboard — conversion funnel, ROAS, campaign metrics
// ─────────────────────────────────────────────
export function MarketingVisual() {
  return (
    <div className="svc-visual">
      <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="mkt-bar1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="mkt-bar2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0ECE4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F0ECE4" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Top KPI row */}
        <rect x="6" y="6" width="68" height="36" rx="4" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
        <text x="12" y="20" fontSize="7" fill="#9a9590" letterSpacing="0.5">ROAS</text>
        <text x="12" y="34" fontSize="13" fill="#C9A84C" fontWeight="800">4.2×</text>

        <rect x="80" y="6" width="68" height="36" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <text x="86" y="20" fontSize="7" fill="#9a9590" letterSpacing="0.5">CTR</text>
        <text x="86" y="34" fontSize="13" fill="#F0ECE4" fontWeight="700">6.8%</text>

        <rect x="154" y="6" width="80" height="36" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <text x="160" y="20" fontSize="7" fill="#9a9590" letterSpacing="0.5">CONVERSIONS</text>
        <text x="160" y="34" fontSize="13" fill="#F0ECE4" fontWeight="700">1,284</text>

        {/* Funnel visualization */}
        <text x="8" y="58" fontSize="7" fill="#9a9590" letterSpacing="0.5">CONVERSION FUNNEL</text>

        {/* Funnel bars — tapered */}
        <rect x="8" y="64" width="155" height="12" rx="2" fill="rgba(255,255,255,0.08)" />
        <text x="168" y="73" fontSize="7" fill="#9a9590">Impressions 142k</text>

        <rect x="8" y="82" width="112" height="12" rx="2" fill="rgba(201,168,76,0.2)" />
        <text x="124" y="91" fontSize="7" fill="#9a9590">Clicks 10.2k</text>

        <rect x="8" y="100" width="72" height="12" rx="2" fill="rgba(201,168,76,0.45)" />
        <text x="84" y="109" fontSize="7" fill="#9a9590">Leads 2,840</text>

        <rect x="8" y="118" width="44" height="12" rx="2" fill="url(#mkt-bar1)" />
        <text x="56" y="127" fontSize="7" fill="#C9A84C">Customers 1,284</text>

        {/* Growth arrow indicator */}
        <rect x="190" y="58" width="44" height="78" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <text x="212" y="72" textAnchor="middle" fontSize="6" fill="#9a9590">MoM</text>
        {/* Sparkline bars */}
        <rect x="196" y="110" width="6" height="16" rx="1" fill="rgba(201,168,76,0.3)" />
        <rect x="205" y="100" width="6" height="26" rx="1" fill="rgba(201,168,76,0.5)" />
        <rect x="214" y="88" width="6" height="38" rx="1" fill="rgba(201,168,76,0.7)" />
        <rect x="223" y="78" width="6" height="48" rx="1" fill="url(#mkt-bar1)" />
        <text x="212" y="133" textAnchor="middle" fontSize="8" fill="#C9A84C" fontWeight="700">+340%</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// 05  SEO
// Search indexing — technical graph, ranking positions, site structure
// ─────────────────────────────────────────────
export function SEOVisual() {
  return (
    <div className="svc-visual">
      <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Search bar */}
        <rect x="6" y="6" width="228" height="24" rx="12" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        {/* Search icon circle */}
        <circle cx="22" cy="18" r="5" stroke="#9a9590" strokeWidth="1.5" fill="none" />
        <line x1="26" y1="22" x2="30" y2="26" stroke="#9a9590" strokeWidth="1.5" strokeLinecap="round" />
        <text x="38" y="22" fontSize="8" fill="#9a9590">high intent B2B SaaS tools</text>
        <rect x="208" y="9" width="22" height="12" rx="2" fill="rgba(201,168,76,0.15)" stroke="rgba(201,168,76,0.3)" strokeWidth="0.5" />
        <text x="219" y="18" textAnchor="middle" fontSize="7" fill="#C9A84C">SERP</text>

        {/* SERP results */}
        {/* Result #1 — highlighted */}
        <rect x="6" y="36" width="228" height="28" rx="3" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.3)" strokeWidth="1" />
        <rect x="10" y="40" width="14" height="10" rx="2" fill="rgba(201,168,76,0.9)" />
        <text x="17" y="47" textAnchor="middle" fontSize="8" fill="#0a0a0a" fontWeight="800">#1</text>
        <rect x="28" y="41" width="90" height="5" rx="2" fill="rgba(201,168,76,0.7)" />
        <rect x="28" y="51" width="60" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
        <text x="224" y="54" textAnchor="end" fontSize="7" fill="#4caf50">● Indexed</text>

        {/* Result #2 */}
        <rect x="6" y="70" width="228" height="22" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
        <rect x="10" y="74" width="14" height="10" rx="2" fill="rgba(255,255,255,0.07)" />
        <text x="17" y="81" textAnchor="middle" fontSize="8" fill="#9a9590">#2</text>
        <rect x="28" y="75" width="70" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
        <rect x="28" y="83" width="45" height="3" rx="2" fill="rgba(255,255,255,0.07)" />

        {/* Result #3 */}
        <rect x="6" y="97" width="228" height="22" rx="3" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        <rect x="10" y="101" width="14" height="10" rx="2" fill="rgba(255,255,255,0.05)" />
        <text x="17" y="108" textAnchor="middle" fontSize="8" fill="#6b6560">#3</text>
        <rect x="28" y="102" width="55" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="28" y="110" width="40" height="3" rx="2" fill="rgba(255,255,255,0.05)" />

        {/* Technical structure indicator */}
        <rect x="6" y="124" width="228" height="10" rx="2" fill="rgba(255,255,255,0.02)" />
        <rect x="8" y="126" width="40" height="6" rx="1" fill="rgba(201,168,76,0.2)" />
        <rect x="52" y="126" width="2" height="6" fill="rgba(255,255,255,0.1)" />
        <rect x="58" y="126" width="30" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="92" y="126" width="2" height="6" fill="rgba(255,255,255,0.1)" />
        <rect x="98" y="126" width="24" height="6" rx="1" fill="rgba(255,255,255,0.06)" />
        <text x="12" y="132" fontSize="6" fill="rgba(201,168,76,0.8)">Core Web Vitals</text>
        <text x="62" y="132" fontSize="6" fill="rgba(255,255,255,0.3)">Structured Data</text>
        <text x="102" y="132" fontSize="6" fill="rgba(255,255,255,0.3)">Schema</text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// 06  CONTENT CREATION
// Editorial workflow — publishing pipeline, content blocks, media
// ─────────────────────────────────────────────
export function ContentVisual() {
  return (
    <div className="svc-visual">
      <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* CMS / Editor frame */}
        <rect x="6" y="6" width="144" height="128" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        {/* Editor topbar */}
        <rect x="6" y="6" width="144" height="18" rx="5" fill="rgba(255,255,255,0.04)" />
        <rect x="6" y="18" width="144" height="6" fill="rgba(255,255,255,0.04)" />
        <circle cx="16" cy="15" r="3" fill="rgba(255,255,255,0.15)" />
        <circle cx="25" cy="15" r="3" fill="rgba(255,255,255,0.1)" />
        <text x="75" y="18" textAnchor="middle" fontSize="7" fill="#9a9590">content-editor.cms</text>

        {/* Editor toolbar */}
        <rect x="10" y="28" width="136" height="12" rx="2" fill="rgba(255,255,255,0.03)" />
        <rect x="13" y="31" width="8" height="6" rx="1" fill="rgba(255,255,255,0.15)" />
        <rect x="24" y="31" width="8" height="6" rx="1" fill="rgba(255,255,255,0.1)" />
        <rect x="35" y="31" width="8" height="6" rx="1" fill="rgba(255,255,255,0.08)" />
        <rect x="50" y="33" width="1" height="6" fill="rgba(255,255,255,0.1)" />
        <rect x="54" y="31" width="14" height="6" rx="1" fill="rgba(201,168,76,0.2)" />
        <text x="61" y="36" textAnchor="middle" fontSize="5" fill="#C9A84C">PUBLISH</text>

        {/* Article hero image placeholder */}
        <rect x="10" y="44" width="136" height="32" rx="3" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        {/* Hero image lines */}
        <line x1="10" y1="68" x2="60" y2="44" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        <circle cx="50" cy="54" r="8" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.15)" strokeWidth="0.5" />
        <text x="78" y="61" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.2)">HERO IMAGE</text>

        {/* Headline block */}
        <rect x="10" y="82" width="120" height="6" rx="2" fill="rgba(201,168,76,0.6)" />
        <rect x="10" y="92" width="90" height="6" rx="2" fill="rgba(201,168,76,0.4)" />

        {/* Body text lines */}
        <rect x="10" y="104" width="136" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
        <rect x="10" y="112" width="120" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
        <rect x="10" y="120" width="100" height="4" rx="2" fill="rgba(255,255,255,0.06)" />

        {/* Tag pills */}
        <rect x="10" y="128" width="30" height="4" rx="2" fill="rgba(201,168,76,0.15)" />
        <rect x="44" y="128" width="24" height="4" rx="2" fill="rgba(255,255,255,0.06)" />

        {/* Right panel — publishing pipeline */}
        <rect x="156" y="6" width="78" height="128" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <text x="195" y="20" textAnchor="middle" fontSize="7" fill="#9a9590" letterSpacing="0.5">PIPELINE</text>

        {/* Pipeline steps */}
        <circle cx="170" cy="34" r="5" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="1" />
        <text x="170" y="37" textAnchor="middle" fontSize="6" fill="#4caf50">✓</text>
        <text x="180" y="37" fontSize="7" fill="#9a9590">Strategy</text>
        <line x1="170" y1="39" x2="170" y2="51" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        <circle cx="170" cy="54" r="5" fill="rgba(76,175,80,0.2)" stroke="#4caf50" strokeWidth="1" />
        <text x="170" y="57" textAnchor="middle" fontSize="6" fill="#4caf50">✓</text>
        <text x="180" y="57" fontSize="7" fill="#9a9590">Research</text>
        <line x1="170" y1="59" x2="170" y2="71" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

        <circle cx="170" cy="74" r="5" fill="rgba(201,168,76,0.15)" stroke="#C9A84C" strokeWidth="1" />
        <text x="170" y="77" textAnchor="middle" fontSize="7" fill="#C9A84C">◎</text>
        <text x="180" y="77" fontSize="7" fill="#C9A84C">Draft</text>
        <line x1="170" y1="79" x2="170" y2="91" stroke="rgba(201,168,76,0.2)" strokeWidth="1" strokeDasharray="2 2" />

        <circle cx="170" cy="94" r="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="180" y="97" fontSize="7" fill="rgba(255,255,255,0.3)">Review</text>
        <line x1="170" y1="99" x2="170" y2="111" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />

        <circle cx="170" cy="114" r="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text x="180" y="117" fontSize="7" fill="rgba(255,255,255,0.2)">Publish</text>

        {/* Formats */}
        <rect x="158" y="124" width="18" height="8" rx="2" fill="rgba(201,168,76,0.1)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
        <text x="167" y="130" textAnchor="middle" fontSize="5" fill="#C9A84C">Blog</text>
        <rect x="180" y="124" width="18" height="8" rx="2" fill="rgba(255,255,255,0.04)" />
        <text x="189" y="130" textAnchor="middle" fontSize="5" fill="#9a9590">Video</text>
        <rect x="202" y="124" width="28" height="8" rx="2" fill="rgba(255,255,255,0.04)" />
        <text x="216" y="130" textAnchor="middle" fontSize="5" fill="#9a9590">Social</text>
      </svg>
    </div>
  );
}
