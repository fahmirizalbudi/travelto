import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" className={className}>
      <defs>
        <linearGradient id="mainGradLogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2F6EEA" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="accGradLogo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>

      {/* Modern Plane / Pin Geometric Icon */}
      <g transform="translate(5, 5)">
        <path d="M5,25 L20,38 L45,0 Z" fill="#E2E8F0" />
        <path d="M5,25 L45,0 L18,50 Z" fill="url(#mainGradLogo)" />
        <path d="M18,50 L28,45 L20,34 Z" fill="url(#accGradLogo)" />
      </g>
    </svg>
  );
}
