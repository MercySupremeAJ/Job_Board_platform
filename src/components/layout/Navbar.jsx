// ============================================================
// AfriHire — Navbar Component
// Role-aware navigation with notifications and profile avatar
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NotificationPanel from '../ui/NotificationPanel';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, role, isAuthenticated, isCandidate, isCompany, logout: handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = isAuthenticated
    ? [
        { path: '/jobs', label: 'Browse Jobs', show: true },
        { path: '/dashboard', label: 'Dashboard', show: true },
        { path: '/dashboard/applications', label: 'Applications', show: isCandidate },
        { path: '/dashboard/post-job', label: 'Post Job', show: isCompany },
      ].filter((l) => l.show)
    : [
        { path: '/jobs', label: 'Browse Jobs', show: true },
      ].filter((l) => l.show);

  const onLogout = () => {
    handleLogout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--navbar-height)',
        background: 'rgba(10, 10, 26, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--color-border)',
        zIndex: 'var(--z-sticky)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          padding: '0 var(--space-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '1.75rem' }}>🌍</span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            AfriHire
          </span>
        </Link>

        {/* Desktop nav links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
          className="navbar-desktop-links"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: isActive(link.path) ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                background: isActive(link.path) ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                transition: 'all var(--transition-fast)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {isAuthenticated ? (
            <>
              <NotificationPanel />

              {/* Profile menu */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => navigate('/profile')}
                  id="profile-button"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{user?.avatar || '👤'}</span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      color: 'var(--color-text-primary)',
                    }}
                    className="desktop-only"
                  >
                    {user?.firstName || user?.companyName || 'Profile'}
                  </span>
                </button>
              </div>

              <Button variant="ghost" size="sm" onClick={onLogout} id="logout-button">
                Logout
              </Button>
            </>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Sign In
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-mobile-toggle"
            type="button"
            style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              fontSize: '1.25rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="navbar-mobile-menu"
          style={{
            position: 'absolute',
            top: 'var(--navbar-height)',
            left: 0,
            right: 0,
            background: 'var(--color-bg-secondary)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-4)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            animation: 'fadeInDown 0.2s ease-out',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-base)',
                color: isActive(link.path) ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                background: isActive(link.path) ? 'rgba(124, 58, 237, 0.1)' : 'transparent',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
