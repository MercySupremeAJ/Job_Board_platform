// ============================================================
// AfriHire — Landing Page
// Hero section with animated elements, features, stats
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import JobCard from '../components/jobs/JobCard';
import { useSelector } from 'react-redux';
import { selectAllJobs } from '../store/jobsSlice';

const LandingPage = () => {
  const navigate = useNavigate();
  const allJobs = useSelector(selectAllJobs) || [];
  const featuredJobs = Array.isArray(allJobs) ? allJobs.filter((j) => j.featured).slice(0, 3) : [];

  const stats = [
    { value: '22+', label: 'Remote Positions', icon: '💼' },
    { value: '15+', label: 'African Companies', icon: '🏢' },
    { value: '500+', label: 'Candidates', icon: '👩‍💻' },
    { value: '100%', label: 'Remote Friendly', icon: '🌍' },
  ];

  const features = [
    {
      icon: '🎯',
      title: 'AI Job Matching',
      description: 'Get personalized job recommendations based on your skills and experience profile.',
    },
    {
      icon: '📊',
      title: 'Application Tracking',
      description: 'Track every application status — from Applied to Reviewed to Shortlisted — all in one place.',
    },
    {
      icon: '🔍',
      title: 'Smart Search & Filters',
      description: 'Find your perfect role with debounced search, skill-based filtering, and URL-synced parameters.',
    },
    {
      icon: '🏢',
      title: 'Company Dashboard',
      description: 'Post jobs, view applicant pipelines, and manage your hiring process efficiently.',
    },
    {
      icon: '🔔',
      title: 'Real-time Notifications',
      description: 'Get instant updates when your application status changes or new matching jobs are posted.',
    },
    {
      icon: '🛡️',
      title: 'Role-based Access',
      description: 'Separate experiences for candidates and companies with protected routes and tailored UIs.',
    },
  ];

  // Fallback for CSS variables if missing
  const fallback = (variable, fallbackValue) => `var(${variable}, ${fallbackValue})`;

  return (
    <div style={{ paddingTop: fallback('--navbar-height', '64px'), background: fallback('--color-bg', '#f9fafb'), minHeight: '100vh' }}>
      {/* ─── Hero Section ──────────────────────────────────── */}
      <section
        style={{
          minHeight: `calc(100vh - ${fallback('--navbar-height', '64px')})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: `${fallback('--space-8', '3rem')} ${fallback('--space-6', '1.5rem')}`,
        }}
      >
        {/* Animated background orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
            top: '10%', left: '5%', animation: 'float 8s ease-in-out infinite',
          }} />
          <div style={{
            position: 'absolute', width: '300px', height: '300px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
            bottom: '15%', right: '10%', animation: 'float 6s ease-in-out infinite reverse',
          }} />
          <div style={{
            position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
            top: '50%', right: '30%', animation: 'float 10s ease-in-out infinite',
          }} />
        </div>

        <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) var(--space-5)',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(124, 58, 237, 0.1)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              marginBottom: 'var(--space-8)',
              animation: 'fadeInDown 0.6s ease-out',
            }}
          >
            <span style={{ animation: 'pulse 2s ease-in-out infinite' }}>🌍</span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-light)', fontWeight: 'var(--font-weight-medium)' }}>
              Africa's #1 Remote Tech Job Board
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 'var(--font-weight-extrabold)',
              lineHeight: 'var(--line-height-tight)',
              marginBottom: 'var(--space-6)',
              animation: 'fadeInUp 0.7s ease-out',
            }}
          >
            Connect Africa's{' '}
            <span className="gradient-text">Brightest Talent</span>
            {' '}with{' '}
            <span className="gradient-text-gold">Global Opportunities</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--color-text-secondary)',
              maxWidth: '650px',
              margin: '0 auto var(--space-10)',
              lineHeight: 'var(--line-height-relaxed)',
              animation: 'fadeInUp 0.8s ease-out',
            }}
          >
            Discover remote tech positions from Africa's leading companies and global employers.
            Build your profile, apply with confidence, and track every step.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              justifyContent: 'center',
              flexWrap: 'wrap',
              animation: 'fadeInUp 0.9s ease-out',
            }}
          >
            <Button
              variant="primary"
              size="xl"
              onClick={() => navigate('/register')}
              icon="🚀"
              id="hero-cta-primary"
            >
              Get Started Free
            </Button>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => navigate('/jobs')}
              icon="🔍"
              id="hero-cta-browse"
            >
              Browse Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ─────────────────────────────────── */}
      <section
        style={{
          padding: 'var(--space-12) var(--space-6)',
          background: 'rgba(255, 255, 255, 0.02)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--max-content-width)',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                animation: 'fadeInUp 0.5s ease-out forwards',
                animationDelay: `${i * 0.15}s`,
                opacity: 0,
              }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: 'var(--space-2)' }}>{stat.icon}</span>
              <p
                style={{
                  fontSize: 'var(--text-4xl)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--font-weight-bold)',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Features Section ──────────────────────────────── */}
      <section style={{ padding: 'var(--space-24) var(--space-6)' }}>
        <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '550px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>
              A complete hiring ecosystem designed specifically for Africa's tech talent pipeline.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className="glass-card"
                style={{
                  padding: 'var(--space-8)',
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    width: '3.5rem',
                    height: '3.5rem',
                    borderRadius: 'var(--radius-xl)',
                    background: 'rgba(124, 58, 237, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    marginBottom: 'var(--space-5)',
                  }}
                >
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Jobs Section ─────────────────────────── */}
      <section
        style={{
          padding: 'var(--space-24) var(--space-6)',
          background: 'rgba(255, 255, 255, 0.01)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <h2 style={{ fontSize: 'var(--text-4xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-4)' }}>
              <span className="gradient-text-gold">Featured</span> Opportunities
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)' }}>
              Top remote positions from Africa's most innovative companies
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: fallback('--space-6', '1.5rem'), marginBottom: fallback('--space-10', '2.5rem') }}>
            {featuredJobs.length > 0 ? (
              featuredJobs.map((job, i) => (
                <div key={job.id} style={{ animation: 'fadeInUp 0.5s ease-out forwards', animationDelay: `${i * 0.15}s`, opacity: 0 }}>
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', fontSize: '1.2rem', padding: '2rem 0' }}>
                No featured jobs available yet. Register or log in to explore opportunities!
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('/jobs')} icon="→" iconRight>
              View All {allJobs.length} Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* ─── CTA Section ───────────────────────────────────── */}
      <section
        style={{
          padding: 'var(--space-24) var(--space-6)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0, background: 'var(--gradient-primary)', opacity: 0.05, pointerEvents: 'none'
        }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontSize: 'var(--text-4xl)',
              fontFamily: 'var(--font-display)',
              marginBottom: 'var(--space-6)',
            }}
          >
            Ready to Shape Africa's <span className="gradient-text">Tech Future</span>?
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-10)', lineHeight: 'var(--line-height-relaxed)' }}>
            Whether you're a talented developer seeking global opportunities or a company looking for exceptional remote talent, AfriHire is your launchpad.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="primary" size="xl" onClick={() => navigate('/register')} icon="👩‍💻">
              I'm a Candidate
            </Button>
            <Button variant="gold" size="xl" onClick={() => navigate('/register')} icon="🏢">
              I'm a Company
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
