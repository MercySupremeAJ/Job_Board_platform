// ============================================================
// AfriHire — SavedJobsPage
// ============================================================

import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { selectAllJobs } from '../store/jobsSlice';
import DashboardLayout from '../components/layout/DashboardLayout';
import JobList from '../components/jobs/JobList';
import { EmptyState } from '../components/ui/SharedUI';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const SavedJobsPage = () => {
  const { savedJobs } = useAuth();
  const allJobs = useSelector(selectAllJobs);
  const navigate = useNavigate();

  const savedJobList = allJobs.filter((j) => savedJobs.includes(j.id));

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>💜 Saved Jobs</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
          Jobs you've bookmarked for later · {savedJobList.length} saved
        </p>

        {savedJobList.length > 0 ? (
          <JobList jobs={savedJobList} />
        ) : (
          <EmptyState
            icon="💜"
            title="No saved jobs yet"
            message="Click the heart icon on any job card to save it for later."
            action={<Button variant="primary" onClick={() => navigate('/jobs')}>Browse Jobs</Button>}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default SavedJobsPage;
