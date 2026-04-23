// ============================================================
// AfriHire — CompanyProfile Component
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setCompanyProfile, selectProfile } from '../../store/profileSlice';
import Button from '../ui/Button';
import { useToast } from '../ui/Toast';

const CompanyProfile = () => {
  const { user, updateProfile } = useAuth();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile(user?.id));
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user?.companyName || profile?.companyName || '',
    description: user?.description || profile?.description || '',
    website: user?.website || profile?.website || '',
    industry: user?.industry || profile?.industry || '',
    location: user?.location || profile?.location || '',
    size: user?.size || profile?.size || '',
    founded: user?.founded || profile?.founded || '',
  });

  const updateField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    dispatch(setCompanyProfile({ userId: user.id, ...formData }));
    updateProfile(formData);
    setIsEditing(false);
    toast?.showSuccess('Company profile updated!');
  };

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>Company Profile</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Manage your company information</p>
        </div>
        <Button variant={isEditing ? 'success' : 'primary'} onClick={isEditing ? handleSave : () => setIsEditing(true)} icon={isEditing ? '💾' : '✏️'}>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: 'var(--radius-xl)', background: 'var(--gradient-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
            {user?.avatar || '🏢'}
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{formData.companyName || 'Company Name'}</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{formData.industry || 'Industry'} · {formData.location || 'Location'}</p>
          </div>
        </div>

        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Company Name</label>
                <input type="text" value={formData.companyName} onChange={(e) => updateField('companyName', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Industry</label>
                <input type="text" value={formData.industry} onChange={(e) => updateField('industry', e.target.value)} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Description</label>
              <textarea value={formData.description} onChange={(e) => updateField('description', e.target.value)} rows={4} style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Website</label>
                <input type="url" value={formData.website} onChange={(e) => updateField('website', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Location</label>
                <input type="text" value={formData.location} onChange={(e) => updateField('location', e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Size</label>
                <select value={formData.size} onChange={(e) => updateField('size', e.target.value)}>
                  <option value="">Select size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {formData.description && <p style={{ marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-relaxed)' }}>{formData.description}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-4)' }}>
              {formData.website && <div><p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Website</p><a href={formData.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)' }}>{formData.website}</a></div>}
              {formData.size && <div><p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Size</p><p style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>{formData.size}</p></div>}
              {formData.founded && <div><p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Founded</p><p style={{ color: 'var(--color-text-primary)', fontSize: 'var(--text-sm)' }}>{formData.founded}</p></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
