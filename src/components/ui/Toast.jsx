// ============================================================
// AfriHire — Toast Component
// Notification toast with auto-dismiss and slide animation
// ============================================================

import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const Toast = ({ toast, onRemove }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 4000);
    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const iconMap = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const colorMap = {
    success: 'var(--color-accent-emerald)',
    error: 'var(--color-accent-rose)',
    warning: 'var(--color-accent-gold)',
    info: 'var(--color-primary)',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-4) var(--space-5)',
        background: 'var(--color-bg-secondary)',
        border: `1px solid ${colorMap[toast.type] || 'var(--color-border)'}`,
        borderLeft: `4px solid ${colorMap[toast.type] || 'var(--color-primary)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '400px',
        width: '100%',
        animation: isExiting ? 'fadeInRight 0.3s ease-out reverse' : 'fadeInRight 0.3s ease-out',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.3s',
      }}
    >
      <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{iconMap[toast.type] || 'ℹ️'}</span>
      <div style={{ flex: 1 }}>
        {toast.title && (
          <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)', marginBottom: '0.125rem' }}>
            {toast.title}
          </p>
        )}
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', margin: 0 }}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
          flexShrink: 0,
          padding: '0.25rem',
        }}
      >
        ✕
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showSuccess = useCallback((message, title) => addToast({ type: 'success', message, title }), [addToast]);
  const showError = useCallback((message, title) => addToast({ type: 'error', message, title }), [addToast]);
  const showWarning = useCallback((message, title) => addToast({ type: 'warning', message, title }), [addToast]);
  const showInfo = useCallback((message, title) => addToast({ type: 'info', message, title }), [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      {/* Toast container */}
      <div
        style={{
          position: 'fixed',
          top: 'calc(var(--navbar-height) + 1rem)',
          right: 'var(--space-4)',
          zIndex: 'var(--z-toast)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default Toast;
