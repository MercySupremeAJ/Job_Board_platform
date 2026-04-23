// ============================================================
// AfriHire — LoginPage
// ============================================================

import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-6)' }}>
      <div className="login-page-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '900px', width: '100%', gap: 'var(--space-10)', alignItems: 'center' }}>
        {/* Left: Visual */}
        <div style={{ animation: 'fadeInLeft 0.6s ease-out' }} className="desktop-only">
          <h1 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-snug)' }}>
            Welcome back to{' '}
            <span className="gradient-text">AfriHire</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 'var(--line-height-relaxed)', marginBottom: 'var(--space-8)' }}>
            Continue your journey to discover remote tech opportunities or find exceptional African talent.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {['🌍 Access 22+ remote positions', '📊 Track your application status', '🔔 Get real-time notifications'].map((item, i) => (
              <p key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div style={{ animation: 'fadeInRight 0.6s ease-out' }}>
          <div className="glass-card" style={{ padding: 'var(--space-8)' }}>
            <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)', textAlign: 'center' }}>Sign In</h2>
            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
              Enter your credentials to access your account
            </p>
            <LoginForm />
            <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: 'var(--color-primary-light)', fontWeight: 'var(--font-weight-medium)' }}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
