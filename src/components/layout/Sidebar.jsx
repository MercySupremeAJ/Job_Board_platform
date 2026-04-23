// ============================================================
// AfriHire — Sidebar Component
// Dashboard sidebar with animated menu items
// ============================================================

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = ({ mobileOpen = false, onNavigate }) => {
  const { isCandidate, isCompany } = useAuth();
  const location = useLocation();

  const candidateLinks = [
    { path: '/dashboard', icon: '📊', label: 'Overview', exact: true },
    { path: '/dashboard/applications', icon: '📋', label: 'My Applications' },
    { path: '/dashboard/saved', icon: '💾', label: 'Saved Jobs' },
    { path: '/jobs', icon: '🔍', label: 'Browse Jobs' },
    { path: '/profile', icon: '👤', label: 'My Profile' },
  ];

  const companyLinks = [
    { path: '/dashboard', icon: '📊', label: 'Overview', exact: true },
    { path: '/dashboard/post-job', icon: '➕', label: 'Post a Job' },
    { path: '/dashboard/applications', icon: '📋', label: 'Applications' },
    { path: '/jobs', icon: '🔍', label: 'Browse Jobs' },
    { path: '/profile', icon: '🏢', label: 'Company Profile' },
  ];

  const links = isCompany ? companyLinks : candidateLinks;

  const isActive = (link) => {
    if (link.exact) return location.pathname === link.path;
    return location.pathname.startsWith(link.path);
  };

  return (
    <aside
      id="dashboard-sidebar"
      className={mobileOpen ? 'dashboard-sidebar is-open' : 'dashboard-sidebar'}
      style={{
        width: 'var(--sidebar-width)',
        minHeight: 'calc(100vh - var(--navbar-height))',
        background: 'var(--gradient-sidebar)',
        borderRight: '1px solid var(--color-border)',
        padding: 'var(--space-6) var(--space-3)',
        flexShrink: 0,
      }}
    >
      {/* Role indicator */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          background: isCompany ? 'rgba(245, 158, 11, 0.1)' : 'rgba(124, 58, 237, 0.1)',
          border: `1px solid ${isCompany ? 'rgba(245, 158, 11, 0.2)' : 'rgba(124, 58, 237, 0.2)'}`,
          marginBottom: 'var(--space-6)',
          textAlign: 'center',
        }}
      >
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'var(--font-weight-semibold)' }}>
          {isCompany ? '🏢 Company' : '👩‍💻 Candidate'} Dashboard
        </span>
      </div>

      {/* Navigation links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {links.map((link, index) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => onNavigate?.()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              fontWeight: isActive(link) ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
              color: isActive(link) ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              background: isActive(link) ? 'rgba(124, 58, 237, 0.15)' : 'transparent',
              borderLeft: isActive(link) ? '3px solid var(--color-primary)' : '3px solid transparent',
              textDecoration: 'none',
              transition: 'all var(--transition-fast)',
              animation: 'fadeInLeft 0.3s ease-out forwards',
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
            }}
          >
            <span style={{ fontSize: '1.1rem', width: '1.5rem', textAlign: 'center' }}>{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
