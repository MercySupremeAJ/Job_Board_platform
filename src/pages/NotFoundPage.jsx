// ============================================================
// AfriHire — NotFoundPage (404)
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingTop: 'var(--navbar-height)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--space-8)',
      }}
    >
      <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
        <span style={{ fontSize: '6rem', display: 'block', marginBottom: 'var(--space-4)' }} className="animate-float">
          🌍
        </span>
        <h1
          style={{
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--font-weight-extrabold)',
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1,
            marginBottom: 'var(--space-4)',
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>Page Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto var(--space-8)', lineHeight: 'var(--line-height-relaxed)' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Button variant="primary" onClick={() => navigate('/')}>Go Home</Button>
          <Button variant="secondary" onClick={() => navigate('/jobs')}>Browse Jobs</Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
