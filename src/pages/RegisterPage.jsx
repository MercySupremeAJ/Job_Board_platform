// ============================================================
// AfriHire — RegisterPage
// ============================================================

import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [isAuthenticated, navigate, from]);

  return (
    <div style={{ paddingTop: 'var(--navbar-height)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-8) var(--space-6)' }}>
      <div style={{ maxWidth: '560px', width: '100%', animation: 'fadeInUp 0.5s ease-out' }}>
        <div className="glass-card" style={{ padding: 'var(--space-8)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-2)' }}>🌍</span>
            <h1 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-1)' }}>
              Join <span className="gradient-text">AfriHire</span>
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
              Create your account in just a few steps
            </p>
          </div>
          <RegisterForm />
          <p style={{ textAlign: 'center', marginTop: 'var(--space-5)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary-light)', fontWeight: 'var(--font-weight-medium)' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
