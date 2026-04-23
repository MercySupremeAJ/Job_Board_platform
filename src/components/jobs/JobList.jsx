// ============================================================
// AfriHire — JobList Component
// Grid layout with skeleton loading
// ============================================================

import React from 'react';
import JobCard from './JobCard';
import { EmptyState, Skeleton } from '../ui/SharedUI';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const JobList = ({ jobs, loading = false, showMatch = false }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="glass-card" style={{ padding: 'var(--space-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
              <Skeleton width="3rem" height="3rem" borderRadius="var(--radius-lg)" />
              <div style={{ flex: 1 }}>
                <Skeleton width="70%" height="1.25rem" style={{ marginBottom: 'var(--space-2)' }} />
                <Skeleton width="40%" height="0.875rem" />
              </div>
            </div>
            <Skeleton count={3} height="0.75rem" style={{ marginBottom: 'var(--space-2)' }} />
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <Skeleton width="4rem" height="1.5rem" borderRadius="var(--radius-full)" />
              <Skeleton width="4rem" height="1.5rem" borderRadius="var(--radius-full)" />
              <Skeleton width="4rem" height="1.5rem" borderRadius="var(--radius-full)" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <EmptyState
        icon="🔍"
        title="No jobs found"
        message="Try adjusting your filters or search terms to find more opportunities."
        action={
          <Button variant="primary" onClick={() => navigate('/jobs')}>
            Browse All Jobs
          </Button>
        }
      />
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-5)' }}>
      {jobs.map((job, index) => (
        <div
          key={job.id}
          style={{
            animation: 'fadeInUp 0.4s ease-out forwards',
            animationDelay: `${index * 0.05}s`,
            opacity: 0,
          }}
        >
          <JobCard
            job={job}
            showMatchPercentage={showMatch}
            matchPercentage={job.matchPercentage}
            matchingSkills={job.matchingSkills || []}
          />
        </div>
      ))}
    </div>
  );
};

export default JobList;
