// ============================================================
// AfriHire — CandidateDashboard
// Overview: applications, recommendations, saved jobs, stats
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { useJobRecommendations } from '../hooks/useJobRecommendations';
import { selectAllApplications } from '../store/applicationsSlice';
import { selectAllJobs } from '../store/jobsSlice';
import { StatsCard } from '../components/ui/SharedUI';
import JobList from '../components/jobs/JobList';
import Button from '../components/ui/Button';
import DashboardLayout from '../components/layout/DashboardLayout';

const CandidateDashboard = () => {
  const { user, savedJobs } = useAuth();
  const navigate = useNavigate();
  const allApplications = useSelector(selectAllApplications);
  const allJobs = useSelector(selectAllJobs);
  const { recommendations } = useJobRecommendations(4);

  const myApps = allApplications.filter((a) => a.candidateId === user?.id);
  const savedJobList = allJobs.filter((j) => savedJobs.includes(j.id));

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
        {/* Welcome */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            Welcome back, <span className="gradient-text">{user?.firstName || 'Candidate'}</span> 👋
          </h1>
          <p style={{ color: 'var(--color-text-muted)' }}>Here's your job search overview</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
          <StatsCard icon="📋" label="Applications" value={myApps.length} color="var(--color-primary)" delay={0} />
          <StatsCard icon="👀" label="Reviewed" value={myApps.filter((a) => a.status === 'Reviewed').length} color="var(--color-accent-gold)" delay={0.1} />
          <StatsCard icon="✅" label="Shortlisted" value={myApps.filter((a) => a.status === 'Shortlisted').length} color="var(--color-accent-emerald)" delay={0.2} />
          <StatsCard icon="💾" label="Saved Jobs" value={savedJobs.length} color="var(--color-accent-cyan)" delay={0.3} />
        </div>

        {/* Recommended Jobs */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-1)' }}>
                ✨ Recommended for You
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>Based on your skills and profile</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')}>View All →</Button>
          </div>
          <JobList jobs={recommendations} showMatch={true} />
        </div>

        {/* Saved Jobs */}
        {savedJobList.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
              <h2 style={{ fontSize: 'var(--text-xl)' }}>💜 Saved Jobs</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/saved')}>View All →</Button>
            </div>
            <JobList jobs={savedJobList.slice(0, 3)} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard;
