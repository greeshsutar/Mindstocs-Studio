import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className = '', height = 38 }: LogoProps) {
  return (
    <div
      className={`logo-container ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo (1).jpg"
        alt="MindStocs Studio Logo"
        style={{
          height: `${height}px`,
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
}
