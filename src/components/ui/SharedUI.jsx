// ============================================================
// AfriHire — Shared UI Components
// SearchBar, Skeleton, EmptyState, StatsCard
// ============================================================

import React from 'react';

// ─── SearchBar ──────────────────────────────────────────────
export const SearchBar = ({ value, onChange, placeholder = 'Search jobs, skills, companies...', style = {} }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      <span
        style={{
          position: 'absolute',
          left: 'var(--space-4)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '1.1rem',
          color: 'var(--color-text-muted)',
          pointerEvents: 'none',
        }}
      >
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: 'var(--space-4) var(--space-4) var(--space-4) 3rem',
          background: 'var(--glass-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--text-base)',
          transition: 'all var(--transition-fast)',
          outline: 'none',
        }}
        id="job-search-input"
      />
    </div>
  );
};

// ─── Skeleton Loader ────────────────────────────────────────
export const Skeleton = ({ width = '100%', height = '1rem', borderRadius = 'var(--radius-md)', count = 1, style = {} }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-shimmer"
          style={{
            width,
            height,
            borderRadius,
            background: 'linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-elevated) 50%, var(--color-bg-tertiary) 75%)',
            backgroundSize: '200% 100%',
            marginBottom: count > 1 && i < count - 1 ? 'var(--space-3)' : 0,
            ...style,
          }}
        />
      ))}
    </>
  );
};

// ─── Empty State ────────────────────────────────────────────
export const EmptyState = ({ icon = '📭', title, message, action }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-16) var(--space-8)',
        textAlign: 'center',
        animation: 'fadeInUp 0.5s ease-out',
      }}
    >
      <span style={{ fontSize: '4rem', marginBottom: 'var(--space-4)', display: 'block' }} className="animate-float">
        {icon}
      </span>
      <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', marginBottom: action ? 'var(--space-6)' : 0 }}>
        {message}
      </p>
      {action}
    </div>
  );
};

// ─── Stats Card ─────────────────────────────────────────────
export const StatsCard = ({ icon, label, value, trend, color = 'var(--color-primary)', delay = 0 }) => {
  return (
    <div
      className="glass-card"
      style={{
        padding: 'var(--space-6)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--space-4)',
        animation: 'fadeInUp 0.5s ease-out forwards',
        animationDelay: `${delay}s`,
        opacity: 0,
      }}
    >
      <div
        style={{
          width: '3rem',
          height: '3rem',
          borderRadius: 'var(--radius-lg)',
          background: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
          {label}
        </p>
        <p
          style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text-primary)',
            margin: 0,
            animation: 'countUp 0.6s ease-out',
          }}
        >
          {value}
        </p>
        {trend && (
          <p style={{ fontSize: 'var(--text-xs)', color: trend >= 0 ? 'var(--color-accent-emerald)' : 'var(--color-accent-rose)', marginTop: 'var(--space-1)' }}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
          </p>
        )}
      </div>
    </div>
  );
};

// ─── Notification Panel ─────────────────────────────────────
export { default as NotificationPanel } from './NotificationPanel';
