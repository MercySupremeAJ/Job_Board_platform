// ============================================================
// AfriHire — LoginForm Component
// Animated login with role selector and demo credentials
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { demoCredentials } from '../../data/mockUsers';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  const fillDemo = (role) => {
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {error && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--color-accent-rose-light)',
            fontSize: 'var(--text-sm)',
            animation: 'fadeInUp 0.3s ease-out',
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <div>
        <label htmlFor="login-email" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Email Address
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="login-password" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
        Sign In
      </Button>

      {/* Demo credentials */}
      <div
        style={{
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--glass-bg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)', textAlign: 'center' }}>
          Quick Demo Login
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button variant="outline" size="sm" fullWidth onClick={() => fillDemo('candidate')} type="button">
            👩‍💻 Candidate
          </Button>
          <Button variant="outline" size="sm" fullWidth onClick={() => fillDemo('company')} type="button">
            🏢 Company
          </Button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
