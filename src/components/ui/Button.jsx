// ============================================================
// AfriHire — Button Component
// Gradient buttons with hover animations and variants
// ============================================================

import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  iconRight,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-primary)',
    fontWeight: 'var(--font-weight-semibold)',
    borderRadius: 'var(--radius-lg)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-normal)',
    border: 'none',
    outline: 'none',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles = {
    sm: { padding: '0.5rem 1rem', fontSize: 'var(--text-sm)' },
    md: { padding: '0.75rem 1.5rem', fontSize: 'var(--text-base)' },
    lg: { padding: '1rem 2rem', fontSize: 'var(--text-lg)' },
    xl: { padding: '1.125rem 2.5rem', fontSize: 'var(--text-lg)' },
  };

  const variantStyles = {
    primary: {
      background: 'var(--gradient-primary)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
    },
    secondary: {
      background: 'var(--glass-bg)',
      color: 'var(--color-text-primary)',
      border: '1px solid var(--color-border)',
    },
    gold: {
      background: 'var(--gradient-gold)',
      color: 'var(--color-text-inverse)',
      boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
    },
    success: {
      background: 'var(--color-accent-emerald)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
    },
    danger: {
      background: 'var(--color-accent-rose)',
      color: 'white',
      boxShadow: '0 4px 15px rgba(244, 63, 94, 0.3)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-primary-light)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary-light)',
      border: '1px solid var(--color-primary)',
    },
  };

  const combinedStyle = {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  return (
    <button
      type={type}
      style={combinedStyle}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="animate-spin" style={{ width: '1rem', height: '1rem', border: '2px solid transparent', borderTop: '2px solid currentColor', borderRadius: '50%', display: 'inline-block' }} />
      ) : icon ? (
        <span style={{ fontSize: '1.1em', display: 'flex' }}>{icon}</span>
      ) : null}
      {children}
      {iconRight && <span style={{ fontSize: '1.1em', display: 'flex' }}>{iconRight}</span>}
    </button>
  );
};

export default Button;
