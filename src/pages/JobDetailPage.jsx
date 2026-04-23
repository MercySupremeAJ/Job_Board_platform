// ============================================================
// AfriHire — JobDetailPage
// ============================================================

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import JobDetail from '../components/jobs/JobDetail';

const JobDetailPage = () => {
  const { id } = useParams();

  return (
    <div style={{ paddingTop: 'calc(var(--navbar-height) + var(--space-8))', minHeight: '100vh', padding: 'calc(var(--navbar-height) + var(--space-8)) var(--space-6) var(--space-8)' }}>
      <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
          <Link to="/jobs" style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}>← Back to Jobs</Link>
        </div>
        <JobDetail jobId={id} />
      </div>
    </div>
  );
};

export default JobDetailPage;
