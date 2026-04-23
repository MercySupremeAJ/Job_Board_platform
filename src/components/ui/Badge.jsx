// ============================================================
// AfriHire — Badge Component
// Status badges with color coding and pulse animation
// ============================================================

import React from 'react';

const Badge = ({ children, variant = 'default', size = 'sm', pulse = false, dot = false, style = {} }) => {
  const variantStyles = {
    default: {
      background: 'var(--color-bg-elevated)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)',
    },
    primary: {
      background: 'rgba(124, 58, 237, 0.15)',
      color: 'var(--color-primary-light)',
      border: '1px solid rgba(124, 58, 237, 0.3)',
    },
    success: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: 'var(--color-accent-emerald-light)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.15)',
      color: 'var(--color-accent-gold-light)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
    danger: {
      background: 'rgba(244, 63, 94, 0.15)',
      color: 'var(--color-accent-rose-light)',
      border: '1px solid rgba(244, 63, 94, 0.3)',
    },
    info: {
      background: 'rgba(59, 130, 246, 0.15)',
      color: '#93C5FD',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    },
    applied: {
      background: 'rgba(59, 130, 246, 0.15)',
      color: '#93C5FD',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    },
    reviewed: {
      background: 'rgba(245, 158, 11, 0.15)',
      color: 'var(--color-accent-gold-light)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
    shortlisted: {
      background: 'rgba(16, 185, 129, 0.15)',
      color: 'var(--color-accent-emerald-light)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
    },
    rejected: {
      background: 'rgba(244, 63, 94, 0.15)',
      color: 'var(--color-accent-rose-light)',
      border: '1px solid rgba(244, 63, 94, 0.3)',
    },
  };

  const sizeStyles = {
    xs: { padding: '0.125rem 0.5rem', fontSize: 'var(--text-xs)' },
    sm: { padding: '0.25rem 0.75rem', fontSize: 'var(--text-sm)' },
    md: { padding: '0.375rem 1rem', fontSize: 'var(--text-base)' },
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: 'var(--font-weight-medium)',
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-fast)',
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...(pulse ? { animation: 'pulse 2s ease-in-out infinite' } : {}),
    ...style,
  };

  const dotStyle = {
    width: '0.5rem',
    height: '0.5rem',
    borderRadius: '50%',
    background: 'currentColor',
    ...(pulse ? { animation: 'pulse 1.5s ease-in-out infinite' } : {}),
  };

  return (
    <span style={baseStyle}>
      {dot && <span style={dotStyle} />}
      {children}
    </span>
  );
};

// Status-specific badge factory
export const StatusBadge = ({ status }) => {
  const variantMap = {
    Applied: 'applied',
    Reviewed: 'reviewed',
    Shortlisted: 'shortlisted',
    Rejected: 'rejected',
  };

  return (
    <Badge variant={variantMap[status] || 'default'} dot pulse={status === 'Shortlisted'}>
      {status}
    </Badge>
  );
};

export default Badge;
