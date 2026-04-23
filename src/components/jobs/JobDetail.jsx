// ============================================================
// AfriHire — JobDetail Component
// Full job details with apply CTA, company info, requirements
// ============================================================

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectJobById } from '../../store/jobsSlice';
import { selectHasApplied } from '../../store/applicationsSlice';
import { useAuth } from '../../hooks/useAuth';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import ApplyModal from '../applications/ApplyModal';
import { formatDate, formatSalary, formatRelativeTime } from '../../utils/helpers';

const JobDetail = ({ jobId }) => {
  const job = useSelector((state) => selectJobById(state, jobId));
  const { user, isCandidate, isAuthenticated, isJobSaved, toggleSavedJob } = useAuth();
  const hasApplied = useSelector(selectHasApplied(user?.id, jobId));
  const [showApplyModal, setShowApplyModal] = useState(false);

  if (!job) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-16)' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: 'var(--space-4)' }}>🔍</span>
        <h2>Job not found</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>This position may have been removed.</p>
      </div>
    );
  }

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-5)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: 'var(--radius-xl)', background: 'var(--color-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
            {job.companyLogo}
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>{job.title}</h1>
              {job.featured && <Badge variant="warning">⭐ Featured</Badge>}
            </div>
            <p style={{ fontSize: 'var(--text-lg)', color: 'var(--color-primary-light)', margin: 0, marginBottom: 'var(--space-3)' }}>
              {job.company}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              <span>📍 {job.location}</span>
              <span>💰 {formatSalary(job.salary)}/yr</span>
              <span>🕐 {job.type}</span>
              <span>📊 {job.experience}</span>
              <span>👥 {job.applicants} applicants</span>
              <span>📅 Posted {formatRelativeTime(job.postedAt)}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexShrink: 0 }}>
            {isAuthenticated && isCandidate && (
              <>
                <Button variant="ghost" onClick={() => toggleSavedJob(job.id)} icon={isJobSaved(job.id) ? '💜' : '🤍'} />
                {hasApplied ? (
                  <Button variant="success" disabled icon="✅">Applied</Button>
                ) : (
                  <Button variant="primary" size="lg" onClick={() => setShowApplyModal(true)} icon="🚀">Apply Now</Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="job-detail-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)' }}>
        {/* Main content */}
        <div>
          {/* Description */}
          <div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>About this Role</h2>
            <p style={{ lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-secondary)' }}>{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Requirements</h2>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {job.requirements.map((req, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                  <span style={{ color: 'var(--color-accent-emerald)', flexShrink: 0 }}>✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>Required Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {job.skills.map((skill) => (
                <Badge key={skill} variant="primary">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          {/* Benefits */}
          <div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Benefits</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {job.benefits.map((benefit, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                  <span style={{ color: 'var(--color-accent-gold)' }}>✦</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Job Info */}
          <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Job Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Posted</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', margin: 0 }}>{formatDate(job.postedAt)}</p>
              </div>
              {job.deadline && (
                <div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Deadline</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', margin: 0 }}>{formatDate(job.deadline)}</p>
                </div>
              )}
              <div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Remote</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-accent-emerald)', margin: 0 }}>{job.remote ? '✅ Yes — Fully Remote' : '❌ On-site'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply modal */}
      {showApplyModal && (
        <ApplyModal job={job} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default JobDetail;
