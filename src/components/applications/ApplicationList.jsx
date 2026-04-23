// ============================================================
// AfriHire — ApplicationList Component
// Company view: applicants per job with status management
// ============================================================

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllApplications, updateApplicationStatus } from '../../store/applicationsSlice';
import { selectAllJobs } from '../../store/jobsSlice';
import { addNotification, createStatusChangeNotification } from '../../store/notificationsSlice';
import { useAuth } from '../../hooks/useAuth';
import { StatusBadge } from '../ui/Badge';
import Button from '../ui/Button';
import { EmptyState } from '../ui/SharedUI';
import { formatRelativeTime } from '../../utils/helpers';
import { useToast } from '../ui/Toast';

const ApplicationList = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toast = useToast();
  const allApplications = useSelector(selectAllApplications);
  const allJobs = useSelector(selectAllJobs);

  // Get jobs posted by this company
  const companyJobs = allJobs.filter((job) => job.companyId === user?.id);
  const companyJobIds = companyJobs.map((j) => j.id);

  // Get applications for company's jobs
  const companyApplications = allApplications.filter((app) => companyJobIds.includes(app.jobId));

  const handleStatusChange = async (application, newStatus) => {
    try {
      await dispatch(
        updateApplicationStatus({ applicationId: application.id, status: newStatus })
      ).unwrap();

      dispatch(
        addNotification({
          ...createStatusChangeNotification(application.jobTitle, newStatus),
          userId: application.candidateId,
        })
      );

      toast?.showSuccess(`Application marked as ${newStatus}`);
    } catch (error) {
      toast?.showError('Failed to update status');
    }
  };

  if (companyApplications.length === 0) {
    return (
      <EmptyState
        icon="📥"
        title="No applications yet"
        message="Applications will appear here when candidates apply to your job listings."
      />
    );
  }

  // Group by job
  const applicationsByJob = {};
  companyApplications.forEach((app) => {
    if (!applicationsByJob[app.jobId]) {
      applicationsByJob[app.jobId] = [];
    }
    applicationsByJob[app.jobId].push(app);
  });

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>Applications Received</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
        Manage applications for your job listings · {companyApplications.length} total
      </p>

      {Object.entries(applicationsByJob).map(([jobId, apps]) => {
        const job = companyJobs.find((j) => j.id === jobId);
        return (
          <div key={jobId} className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: 0 }}>{job?.title || 'Job'}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', margin: 0 }}>{apps.length} applicant{apps.length !== 1 ? 's' : ''}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="application-row"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    background: 'var(--glass-bg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{app.candidateAvatar || '👤'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', margin: 0, marginBottom: '0.125rem' }}>
                      {app.candidateName}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                      {app.candidateEmail} · Applied {formatRelativeTime(app.appliedAt)}
                    </p>
                    {app.coverLetter && (
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', margin: 0, marginTop: 'var(--space-2)', fontStyle: 'italic' }}>
                        "{app.coverLetter.substring(0, 100)}{app.coverLetter.length > 100 ? '...' : ''}"
                      </p>
                    )}
                  </div>
                  <StatusBadge status={app.status} />
                  <div style={{ display: 'flex', gap: 'var(--space-2)', flexShrink: 0, flexWrap: 'wrap' }}>
                    {app.status !== 'Reviewed' && (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(app, 'Reviewed')} icon="👀">Review</Button>
                    )}
                    {app.status !== 'Shortlisted' && (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(app, 'Shortlisted')} icon="✅">Shortlist</Button>
                    )}
                    {app.status !== 'Rejected' && (
                      <Button variant="ghost" size="sm" onClick={() => handleStatusChange(app, 'Rejected')} icon="❌">Reject</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationList;
