// ============================================================
// AfriHire — PostJobPage (create or edit company listing)
// ============================================================

import React, { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../components/layout/DashboardLayout';
import JobForm from '../components/jobs/JobForm';
import { selectJobById } from '../store/jobsSlice';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';

const PostJobPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const editId = searchParams.get('edit');
  const job = useSelector((state) => (editId ? selectJobById(state, editId) : null));

  const canEdit = useMemo(() => {
    if (!editId || !job) return !editId;
    return job.companyId === user?.id;
  }, [editId, job, user?.id]);

  if (editId && !job) {
    return (
      <DashboardLayout>
        <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
          <p style={{ marginBottom: 'var(--space-4)' }}>This job could not be found.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  if (editId && job && !canEdit) {
    return (
      <DashboardLayout>
        <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
          <p style={{ marginBottom: 'var(--space-4)' }}>You can only edit listings posted by your company.</p>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Back to dashboard
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <JobForm existingJob={job || null} />
    </DashboardLayout>
  );
};

export default PostJobPage;
