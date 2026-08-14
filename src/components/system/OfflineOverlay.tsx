'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/components/offline.css';

type ConnectionState = 'online' | 'offline' | 'restored';

// Lightweight connectivity probe — HEAD request to a reliable fast endpoint
async function probeConnectivity(): Promise<boolean> {
  try {
    const res = await fetch('/favicon.ico', {
      method: 'HEAD',
      cache: 'no-store',
      signal: AbortSignal.timeout(4000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Six floating particle definitions (static data, no random on render)
const PARTICLES = [
  { cx: -68, cy: -42, r: 1.8, delay: 0 },
  { cx: 72, cy: -38, r: 1.2, delay: 0.4 },
  { cx: -80, cy: 30, r: 2.2, delay: 0.8 },
  { cx: 84, cy: 44, r: 1.4, delay: 1.2 },
  { cx: -28, cy: -78, r: 1.6, delay: 0.6 },
  { cx: 36, cy: 80, r: 1.0, delay: 1.0 },
];

// Signal ring animation config
const RINGS = [
  { delay: 0,    size: 56, opacity: 0.25 },
  { delay: 0.55, size: 78, opacity: 0.15 },
  { delay: 1.1,  size: 100, opacity: 0.08 },
];

export default function OfflineOverlay() {
  const [state, setState] = useState<ConnectionState>('online');
  const [isRetrying, setIsRetrying] = useState(false);
  const restoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Sync with actual browser state on mount
    if (!navigator.onLine) setState('offline');

    const goOffline = () => setState('offline');

    const goOnline = () => {
      setState('restored');
      restoreTimer.current = setTimeout(() => setState('online'), 2200);
    };

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
      if (restoreTimer.current) clearTimeout(restoreTimer.current);
    };
  }, []);

  const handleRetry = async () => {
    if (isRetrying) return;
    setIsRetrying(true);
    const connected = await probeConnectivity();
    setIsRetrying(false);
    if (connected) {
      setState('restored');
      restoreTimer.current = setTimeout(() => setState('online'), 2200);
    }
    // If still offline, stay in offline state — no full reload
  };

  const isVisible = state === 'offline' || state === 'restored';
  const isRestored = state === 'restored';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="offline-overlay"
          role="alertdialog"
          aria-modal="true"
          aria-live="assertive"
          aria-label={isRestored ? 'Connection restored' : 'You are offline'}
          className="offline-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Vignette radial background */}
          <div className="offline-bg" aria-hidden="true" />

          <motion.div
            className="offline-panel"
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── Animated icon ── */}
            <div className="offline-icon" aria-hidden="true">
              <svg
                viewBox="-60 -60 120 120"
                className="offline-icon__svg"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Signal rings — animate outward */}
                {RINGS.map((ring, i) => (
                  <circle
                    key={i}
                    cx="0"
                    cy="0"
                    r={ring.size / 2}
                    stroke={isRestored ? '#4caf50' : '#C9A84C'}
                    strokeWidth="0.8"
                    strokeOpacity={ring.opacity}
                    className="offline-ring"
                    style={{
                      animationDelay: `${ring.delay}s`,
                    }}
                  />
                ))}

                {/* Floating particles */}
                {PARTICLES.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.cx}
                    cy={p.cy}
                    r={p.r}
                    fill={isRestored ? '#4caf50' : '#C9A84C'}
                    opacity={0.5}
                    className="offline-particle"
                    style={{ animationDelay: `${p.delay}s` }}
                  />
                ))}

                {/* Core icon — connection lost or check */}
                {isRestored ? (
                  // Checkmark
                  <g>
                    <circle cx="0" cy="0" r="20" fill="rgba(76,175,80,0.1)" stroke="#4caf50" strokeWidth="1.2" />
                    <polyline
                      points="-9,0 -2,7 10,-7"
                      stroke="#4caf50"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ) : (
                  // Signal/network icon
                  <g>
                    <circle cx="0" cy="0" r="20" fill="rgba(201,168,76,0.08)" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
                    {/* Wifi arcs — broken (dashed) */}
                    <path
                      d="M -14,-6 A 18 18 0 0 1 14,-6"
                      stroke="rgba(201,168,76,0.3)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeDasharray="3 3"
                    />
                    <path
                      d="M -9,2 A 11 11 0 0 1 9,2"
                      stroke="rgba(201,168,76,0.55)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeDasharray="2 2"
                    />
                    {/* Center dot */}
                    <circle cx="0" cy="9" r="2.5" fill="#C9A84C" />
                    {/* Slash — disconnected */}
                    <line
                      x1="-15"
                      y1="15"
                      x2="15"
                      y2="-15"
                      stroke="rgba(201,168,76,0.18)"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </g>
                )}
              </svg>
            </div>

            {/* ── Text ── */}
            <motion.div
              className="offline-content"
              key={isRestored ? 'restored' : 'offline'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {isRestored ? (
                <>
                  <p className="offline-label offline-label--restored">Connection Restored</p>
                  <h1 className="offline-title offline-title--restored">BACK ONLINE.</h1>
                  <p className="offline-description">
                    Your connection has been re-established. Resuming normally.
                  </p>
                </>
              ) : (
                <>
                  <p className="offline-label">Network Status</p>
                  <h1 className="offline-title">CONNECTION LOST.</h1>
                  <p className="offline-description">
                    You&apos;re currently offline.
                    <br />
                    We&apos;ll reconnect automatically when your connection returns.
                  </p>

                  <button
                    className={`offline-retry ${isRetrying ? 'offline-retry--loading' : ''}`}
                    onClick={handleRetry}
                    disabled={isRetrying}
                    aria-label="Retry internet connection"
                    aria-busy={isRetrying}
                  >
                    {isRetrying ? (
                      <>
                        <span className="offline-retry__spinner" aria-hidden="true" />
                        CHECKING…
                      </>
                    ) : (
                      <>
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M3 21v-5h5" />
                        </svg>
                        RETRY CONNECTION
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.div>

            {/* ── Footer tech label ── */}
            <p className="offline-footer" aria-hidden="true">
              MINDSTOCS STUDIO — SYSTEM STATUS
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
