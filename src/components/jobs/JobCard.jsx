// ============================================================
// AfriHire — JobCard Component
// Glassmorphism card with company, tags, save, hover effects
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../ui/Badge';
import { formatRelativeTime, formatSalary, truncateText } from '../../utils/helpers';

const JobCard = ({ job, showMatchPercentage = false, matchPercentage = 0, matchingSkills = [] }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isCandidate, isJobSaved, toggleSavedJob } = useAuth();

  const handleSave = (e) => {
    e.stopPropagation();
    if (isAuthenticated && isCandidate) {
      toggleSavedJob(job.id);
    }
  };

  return (
    <div
      className="glass-card"
      onClick={() => navigate(`/jobs/${job.id}`)}
      id={`job-card-${job.id}`}
      style={{
        padding: 'var(--space-6)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Featured badge */}
      {job.featured && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: 'var(--space-4)',
          }}
        >
          <Badge variant="warning" size="xs">⭐ Featured</Badge>
        </div>
      )}

      {/* Match percentage */}
      {showMatchPercentage && matchPercentage > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--space-4)',
            right: job.featured ? '6rem' : 'var(--space-4)',
          }}
        >
          <Badge variant={matchPercentage >= 70 ? 'success' : matchPercentage >= 40 ? 'warning' : 'default'} size="xs">
            {matchPercentage}% match
          </Badge>
        </div>
      )}

      {/* Header: Logo + Company Info */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-elevated)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0,
          }}
        >
          {job.companyLogo}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              margin: 0,
              marginBottom: '0.25rem',
              color: 'var(--color-text-primary)',
            }}
          >
            {job.title}
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-light)', margin: 0 }}>
            {job.company}
          </p>
        </div>
      </div>

      {/* Meta info */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
        <span>📍 {job.location}</span>
        <span>💰 {formatSalary(job.salary)}</span>
        <span>⏰ {job.type}</span>
      </div>

      {/* Description preview */}
      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-relaxed)' }}>
        {truncateText(job.description, 120)}
      </p>

      {/* Skills tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
        {job.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            style={{
              padding: '0.125rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-xs)',
              background: matchingSkills.includes(skill)
                ? 'rgba(16, 185, 129, 0.15)'
                : 'rgba(124, 58, 237, 0.1)',
              color: matchingSkills.includes(skill)
                ? 'var(--color-accent-emerald-light)'
                : 'var(--color-primary-light)',
              border: `1px solid ${matchingSkills.includes(skill) ? 'rgba(16, 185, 129, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
            }}
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 5 && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            +{job.skills.length - 5} more
          </span>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          <span>👥 {job.applicants} applicants</span>
          <span>· {formatRelativeTime(job.postedAt)}</span>
        </div>

        {isAuthenticated && isCandidate && (
          <button
            onClick={handleSave}
            style={{
              fontSize: '1.25rem',
              transition: 'transform var(--transition-fast)',
              transform: isJobSaved(job.id) ? 'scale(1.2)' : 'scale(1)',
            }}
            aria-label={isJobSaved(job.id) ? 'Unsave job' : 'Save job'}
          >
            {isJobSaved(job.id) ? '💜' : '🤍'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
