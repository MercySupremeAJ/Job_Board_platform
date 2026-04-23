// ============================================================
// AfriHire — Footer Component
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer
      id="main-footer"
      style={{
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg-secondary)',
        padding: 'var(--space-12) var(--space-6) var(--space-8)',
        marginTop: 'auto',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-8)',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: '1.5rem' }}>🌍</span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-bold)',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AfriHire
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', maxWidth: '280px' }}>
            Connecting Africa's brightest tech talent with world-class remote opportunities.
          </p>
        </div>

        {/* For Candidates */}
        <div>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', color: 'var(--color-text-primary)' }}>
            For Candidates
          </h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Link to="/jobs" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Browse Jobs</Link>
            <Link to="/register" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Create Profile</Link>
            <Link to="/dashboard" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Application Tracker</Link>
          </nav>
        </div>

        {/* For Companies */}
        <div>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', color: 'var(--color-text-primary)' }}>
            For Companies
          </h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Link to="/register" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Post a Job</Link>
            <Link to="/dashboard" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Manage Listings</Link>
            <Link to="/jobs" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>View Talent Pool</Link>
          </nav>
        </div>

        {/* Platform */}
        <div>
          <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', marginBottom: 'var(--space-4)', color: 'var(--color-text-primary)' }}>
            Platform
          </h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>About Us</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Privacy Policy</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Terms of Service</span>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 'var(--max-content-width)',
          margin: 'var(--space-8) auto 0',
          paddingTop: 'var(--space-6)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
          © 2026 AfriHire. Empowering African Tech Talent Globally.
        </p>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
          Built with 💜 for Africa's future
        </p>
      </div>
    </footer>
  );
};

export default Footer;
