// ============================================================
// AfriHire — Notification Panel Component
// Dropdown notification center with read/unread state
// ============================================================

import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectNotificationsForUser,
  selectUnreadCountForUser,
  markAsRead,
  markAllAsRead,
  removeNotification,
} from '../../store/notificationsSlice';
import { formatRelativeTime } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';

const NotificationPanel = () => {
  const { user } = useAuth();
  const userId = user?.id;
  const [isOpen, setIsOpen] = useState(false);
  const notifications = useSelector(selectNotificationsForUser(userId));
  const unreadCount = useSelector(selectUnreadCountForUser(userId));
  const dispatch = useDispatch();
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={panelRef} style={{ position: 'relative' }}>
      {/* Bell button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="notification-bell"
        style={{
          position: 'relative',
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--glass-bg)',
          border: '1px solid var(--color-border)',
          fontSize: '1.2rem',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)',
        }}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '1.125rem',
              height: '1.125rem',
              borderRadius: '50%',
              background: 'var(--color-accent-rose)',
              color: 'white',
              fontSize: '0.65rem',
              fontWeight: 'var(--font-weight-bold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'bounceIn 0.3s ease-out',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            right: 0,
            width: 'min(380px, calc(100vw - 2rem))',
            maxHeight: '480px',
            background: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            overflow: 'hidden',
            zIndex: 'var(--z-dropdown)',
            animation: 'fadeInDown 0.2s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-4) var(--space-5)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <h4 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0 }}>
              Notifications
            </h4>
            {unreadCount > 0 && (
              <button
                onClick={() => dispatch(markAllAsRead(userId))}
                style={{
                  color: 'var(--color-primary-light)',
                  fontSize: 'var(--text-sm)',
                  cursor: 'pointer',
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: 'var(--space-8)',
                  textAlign: 'center',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-2)' }}>🔕</span>
                <p style={{ margin: 0 }}>No notifications yet</p>
              </div>
            ) : (
              notifications.slice(0, 20).map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => !notif.read && dispatch(markAsRead(notif.id))}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-4) var(--space-5)',
                    borderBottom: '1px solid var(--color-border)',
                    background: notif.read ? 'transparent' : 'rgba(124, 58, 237, 0.05)',
                    cursor: notif.read ? 'default' : 'pointer',
                    transition: 'background var(--transition-fast)',
                  }}
                >
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{notif.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: notif.read ? 'var(--font-weight-normal)' : 'var(--font-weight-semibold)',
                        color: 'var(--color-text-primary)',
                        margin: 0,
                        marginBottom: '0.125rem',
                      }}
                    >
                      {notif.title}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-muted)',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {notif.message}
                    </p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', margin: 0, marginTop: '0.25rem' }}>
                      {formatRelativeTime(notif.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeNotification(notif.id));
                    }}
                    style={{
                      color: 'var(--color-text-muted)',
                      fontSize: '0.75rem',
                      flexShrink: 0,
                      opacity: 0.5,
                      padding: '0.25rem',
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
