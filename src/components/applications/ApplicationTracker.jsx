// ============================================================
// AfriHire — ApplicationTracker Component
// Kanban-style status board for candidates
// ============================================================

import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllApplications } from '../../store/applicationsSlice';
import { useAuth } from '../../hooks/useAuth';
import { StatusBadge } from '../ui/Badge';
import { EmptyState } from '../ui/SharedUI';
import Button from '../ui/Button';
import { formatRelativeTime } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const ApplicationTracker = () => {
  const { user } = useAuth();
  const allApplications = useSelector(selectAllApplications);
  const navigate = useNavigate();

  const myApplications = allApplications.filter((app) => app.candidateId === user?.id);

  const statuses = ['Applied', 'Reviewed', 'Shortlisted', 'Rejected'];

  const getAppsByStatus = (status) => myApplications.filter((app) => app.status === status);

  if (myApplications.length === 0) {
    return (
      <EmptyState
        icon="📋"
        title="No applications yet"
        message="Start applying to jobs to track your applications here."
        action={<Button variant="primary" onClick={() => navigate('/jobs')}>Browse Jobs</Button>}
      />
    );
  }

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>My Applications</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
        Track the status of all your job applications
      </p>

      {/* Summary cards */}
      <div className="application-tracker-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
        {statuses.map((status, i) => {
          const count = getAppsByStatus(status).length;
          const colors = {
            Applied: 'var(--color-status-applied)',
            Reviewed: 'var(--color-status-reviewed)',
            Shortlisted: 'var(--color-status-shortlisted)',
            Rejected: 'var(--color-status-rejected)',
          };
          return (
            <div
              key={status}
              className="glass-card"
              style={{
                padding: 'var(--space-4)',
                textAlign: 'center',
                borderTop: `3px solid ${colors[status]}`,
                animation: 'fadeInUp 0.4s ease-out forwards',
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            >
              <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--font-weight-bold)', fontFamily: 'var(--font-display)', color: colors[status], margin: 0 }}>
                {count}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>{status}</p>
            </div>
          );
        })}
      </div>

      {/* Application list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {myApplications
          .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
          .map((app, index) => (
            <div
              key={app.id}
              className="glass-card"
              style={{
                padding: 'var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                cursor: 'pointer',
                animation: 'fadeInUp 0.3s ease-out forwards',
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
              }}
              onClick={() => navigate(`/jobs/${app.jobId}`)}
            >
              <div style={{ width: '3rem', height: '3rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                {app.companyLogo || '🏢'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: 'var(--text-base)', margin: 0, marginBottom: '0.25rem' }}>{app.jobTitle}</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>
                  {app.company} · Applied {formatRelativeTime(app.appliedAt)}
                </p>
              </div>
              <StatusBadge status={app.status} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;
