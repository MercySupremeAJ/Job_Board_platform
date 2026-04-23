// ============================================================
// AfriHire — JobForm Component
// Company job creation/edit form with validation
// ============================================================

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postJob, updateJob } from '../../store/jobsSlice';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import SkillSelector from '../profile/SkillSelector';
import { useToast } from '../ui/Toast';
import { useNavigate } from 'react-router-dom';

const JobForm = ({ existingJob = null }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const isEditing = !!existingJob;

  const [formData, setFormData] = useState({
    title: existingJob?.title || '',
    description: existingJob?.description || '',
    location: existingJob?.location || '',
    type: existingJob?.type || 'Full-time',
    remote: existingJob?.remote ?? true,
    experience: existingJob?.experience || 'Mid',
    skills: existingJob?.skills || [],
    salaryMin: existingJob?.salary?.min || '',
    salaryMax: existingJob?.salary?.max || '',
    requirements: existingJob?.requirements?.join('\n') || '',
    benefits: existingJob?.benefits?.join('\n') || '',
  });

  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { salaryMin, salaryMax, requirements: reqText, benefits: benText, ...formFields } = formData;
    const jobData = {
      ...formFields,
      id: existingJob?.id,
      company: user?.companyName || 'Your Company',
      companyId: user?.id,
      companyLogo: user?.avatar || '🏢',
      salary: {
        min: parseInt(salaryMin, 10) || 0,
        max: parseInt(salaryMax, 10) || 0,
        currency: 'USD',
      },
      requirements: reqText.split('\n').filter(Boolean),
      benefits: benText.split('\n').filter(Boolean),
      featured: existingJob?.featured ?? false,
    };

    try {
      if (isEditing) {
        await dispatch(updateJob({ ...existingJob, ...jobData })).unwrap();
        toast?.showSuccess('Job updated successfully!');
      } else {
        await dispatch(postJob(jobData)).unwrap();
        toast?.showSuccess('Job posted successfully!');
      }
      navigate('/dashboard');
    } catch (err) {
      toast?.showError('Failed to save job. Please try again.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
        {isEditing ? 'Edit Job Listing' : 'Post a New Job'}
      </h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
        Create a job listing to attract top African tech talent
      </p>

      <div className="glass-card" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Job Title *</label>
          <input id="job-title" type="text" value={formData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g. Senior Frontend Engineer" required />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Description *</label>
          <textarea id="job-description" value={formData.description} onChange={(e) => updateField('description', e.target.value)} rows={6} placeholder="Describe the role, responsibilities, and what makes it exciting..." required style={{ resize: 'vertical' }} />
        </div>

        <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Location</label>
            <input type="text" value={formData.location} onChange={(e) => updateField('location', e.target.value)} placeholder="e.g. Remote - Africa" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Job Type</label>
            <select value={formData.type} onChange={(e) => updateField('type', e.target.value)} id="job-type-select">
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="form-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Experience Level</label>
            <select value={formData.experience} onChange={(e) => updateField('experience', e.target.value)}>
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Mid-Senior">Mid-Senior</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Min Salary (USD)</label>
            <input type="number" value={formData.salaryMin} onChange={(e) => updateField('salaryMin', e.target.value)} placeholder="50000" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Max Salary (USD)</label>
            <input type="number" value={formData.salaryMax} onChange={(e) => updateField('salaryMax', e.target.value)} placeholder="90000" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <input
            type="checkbox"
            id="remote-check"
            checked={formData.remote}
            onChange={(e) => updateField('remote', e.target.checked)}
            style={{ width: 'auto', accentColor: 'var(--color-primary)' }}
          />
          <label htmlFor="remote-check" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            This is a remote position
          </label>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Required Skills</label>
          <SkillSelector selected={formData.skills} onChange={(skills) => updateField('skills', skills)} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Requirements (one per line)</label>
          <textarea value={formData.requirements} onChange={(e) => updateField('requirements', e.target.value)} rows={4} placeholder="3+ years experience&#10;React proficiency&#10;..." style={{ resize: 'vertical' }} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Benefits (one per line)</label>
          <textarea value={formData.benefits} onChange={(e) => updateField('benefits', e.target.value)} rows={3} placeholder="Competitive salary&#10;Remote work&#10;Health insurance" style={{ resize: 'vertical' }} />
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
          <Button variant="secondary" onClick={() => navigate('/dashboard')} type="button">Cancel</Button>
          <Button variant="primary" size="lg" type="submit" loading={loading} icon="🚀">
            {isEditing ? 'Update Job' : 'Publish Job'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default JobForm;
