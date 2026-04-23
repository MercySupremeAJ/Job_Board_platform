// ============================================================
// AfriHire — Modal Component
// Reusable modal with backdrop blur and animations
// ============================================================

import React, { useEffect, useCallback } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', showClose = true }) => {
  const handleEscape = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: '480px',
    md: '640px',
    lg: '800px',
    xl: '1000px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal-backdrop)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-4)',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.2s ease-out',
        }}
      />

      {/* Modal content */}
      <div
        style={{
          position: 'relative',
          zIndex: 'var(--z-modal)',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-2xl)',
          maxWidth: sizeMap[size],
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          animation: 'scaleIn 0.3s ease-out',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        {/* Header */}
        {(title || showClose) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-6)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            {title && (
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  margin: 0,
                }}
              >
                {title}
              </h3>
            )}
            {showClose && (
              <button
                onClick={onClose}
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--glass-bg)',
                  color: 'var(--color-text-secondary)',
                  fontSize: '1.25rem',
                  transition: 'all var(--transition-fast)',
                  border: '1px solid var(--color-border)',
                }}
                aria-label="Close modal"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div style={{ padding: 'var(--space-6)' }}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
