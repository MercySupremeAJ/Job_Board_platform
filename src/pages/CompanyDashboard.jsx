// ============================================================
// AfriHire — CompanyDashboard
// Overview: posted jobs, applications received, pipeline stats
// ============================================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../hooks/useAuth';
import { selectAllJobs, deleteJob } from '../store/jobsSlice';
import { selectAllApplications } from '../store/applicationsSlice';
import { StatsCard } from '../components/ui/SharedUI';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import DashboardLayout from '../components/layout/DashboardLayout';
import { formatRelativeTime } from '../utils/helpers';
import { useToast } from '../components/ui/Toast';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const allJobs = useSelector(selectAllJobs);
  const allApplications = useSelector(selectAllApplications);

  const companyJobs = allJobs.filter((j) => j.companyId === user?.id);
  const companyJobIds = companyJobs.map((j) => j.id);
  const companyApps = allApplications.filter((a) => companyJobIds.includes(a.jobId));

  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      await dispatch(deleteJob(jobId));
      toast?.showSuccess('Job listing deleted');
    }
  };

  return (
    <DashboardLayout>
      <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
        {/* Welcome */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
              <span className="gradient-text-gold">{user?.companyName || 'Company'}</span> Dashboard
            </h1>
            <p style={{ color: 'var(--color-text-muted)' }}>Manage your job listings and candidate pipeline</p>
          </div>
          <Button variant="primary" onClick={() => navigate('/dashboard/post-job')} icon="➕">
            Post a Job
          </Button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-10)' }}>
          <StatsCard icon="💼" label="Active Jobs" value={companyJobs.length} color="var(--color-primary)" delay={0} />
          <StatsCard icon="📥" label="Total Applications" value={companyApps.length} color="var(--color-accent-gold)" delay={0.1} />
          <StatsCard icon="👀" label="Reviewed" value={companyApps.filter((a) => a.status === 'Reviewed').length} color="var(--color-accent-cyan)" delay={0.2} />
          <StatsCard icon="✅" label="Shortlisted" value={companyApps.filter((a) => a.status === 'Shortlisted').length} color="var(--color-accent-emerald)" delay={0.3} />
        </div>

        {/* Job Listings */}
        <div>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)' }}>Your Job Listings</h2>
          {companyJobs.length === 0 ? (
            <div className="glass-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: 'var(--space-4)' }}>📝</span>
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>No jobs posted yet</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>Start attracting African tech talent by posting your first job.</p>
              <Button variant="primary" onClick={() => navigate('/dashboard/post-job')} icon="➕">Post Your First Job</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {companyJobs.map((job, index) => {
                const jobApps = companyApps.filter((a) => a.jobId === job.id);
                return (
                  <div
                    key={job.id}
                    className="glass-card"
                    style={{
                      padding: 'var(--space-5)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-4)',
                      animation: 'fadeInUp 0.3s ease-out forwards',
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: 'var(--text-base)', margin: 0, marginBottom: '0.25rem' }}>{job.title}</h3>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>
                        {job.location} · {job.type} · Posted {formatRelativeTime(job.postedAt)}
                      </p>
                    </div>
                    <Badge variant="info">{jobApps.length} applicant{jobApps.length !== 1 ? 's' : ''}</Badge>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/jobs/${job.id}`)} icon="👁️">View</Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/post-job?edit=${job.id}`)} icon="✏️">Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteJob(job.id)} icon="🗑️" style={{ color: 'var(--color-accent-rose)' }}>Delete</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
