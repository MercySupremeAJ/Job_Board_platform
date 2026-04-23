// ============================================================
// AfriHire — ApplyModal Component
// Application submission with cover letter
// ============================================================

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyToJob } from '../../store/applicationsSlice';
import { incrementApplicants } from '../../store/jobsSlice';
import {
  addNotification,
  createApplicationNotification,
  createNewApplicantNotification,
} from '../../store/notificationsSlice';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';

const ApplyModal = ({ job, onClose }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const toast = useToast();
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    setLoading(true);
    try {
      await dispatch(
        applyToJob({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          companyLogo: job.companyLogo,
          candidateId: user.id,
          candidateName: `${user.firstName} ${user.lastName}`,
          candidateEmail: user.email,
          candidateAvatar: user.avatar,
          coverLetter,
        })
      ).unwrap();

      // Increment applicant count
      dispatch(incrementApplicants(job.id));

      dispatch(
        addNotification({
          ...createApplicationNotification(job.title, job.company),
          userId: user.id,
        })
      );
      dispatch(
        addNotification({
          ...createNewApplicantNotification(`${user.firstName} ${user.lastName}`, job.title),
          userId: job.companyId,
        })
      );

      toast?.showSuccess(`Application submitted for ${job.title}!`);
      onClose();
    } catch (error) {
      toast?.showError('Failed to submit application. Please try again.');
    }
    setLoading(false);
  };

  return (
    <Modal isOpen={true} onClose={onClose} title={`Apply to ${job.title}`} size="md">
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', padding: 'var(--space-4)', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
          <span style={{ fontSize: '2rem' }}>{job.companyLogo}</span>
          <div>
            <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', margin: 0 }}>{job.title}</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-light)', margin: 0 }}>{job.company}</p>
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Applying as:</p>
          <p style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)', margin: 0 }}>
            {user?.avatar} {user?.firstName} {user?.lastName} ({user?.email})
          </p>
        </div>

        <div>
          <label htmlFor="cover-letter" style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
            Cover Letter (optional)
          </label>
          <textarea
            id="cover-letter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={6}
            placeholder="Tell the hiring team why you're a great fit for this role..."
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleApply} loading={loading} icon="🚀">
          Submit Application
        </Button>
      </div>
    </Modal>
  );
};

export default ApplyModal;
