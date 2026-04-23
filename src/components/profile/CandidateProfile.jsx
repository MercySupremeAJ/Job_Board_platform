// ============================================================
// AfriHire — CandidateProfile Component
// Skills tags, experience timeline, links
// ============================================================

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setCandidateProfile, selectProfile } from '../../store/profileSlice';
import Button from '../ui/Button';
import SkillSelector from './SkillSelector';
import { useToast } from '../ui/Toast';

const CandidateProfile = () => {
  const { user, updateProfile } = useAuth();
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile(user?.id));
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: user?.title || profile?.title || '',
    location: user?.location || profile?.location || '',
    bio: user?.bio || profile?.bio || '',
    skills: user?.skills || profile?.skills || [],
    links: user?.links || profile?.links || { github: '', linkedin: '', portfolio: '' },
    experience: user?.experience || profile?.experience || [],
  });

  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateLink = (field, value) => {
    setFormData((prev) => ({ ...prev, links: { ...prev.links, [field]: value } }));
  };

  const addExperience = () => {
    if (!newExp.company || !newExp.role) return;
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...newExp, id: Date.now().toString() }],
    }));
    setNewExp({ company: '', role: '', duration: '', description: '' });
  };

  const removeExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const handleSave = () => {
    dispatch(setCandidateProfile({ userId: user.id, ...formData }));
    updateProfile(formData);
    setIsEditing(false);
    toast?.showSuccess('Profile updated successfully!');
  };

  return (
    <div style={{ animation: 'fadeInUp 0.5s ease-out' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <div>
          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-1)' }}>My Profile</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>Manage your candidate profile and skills</p>
        </div>
        <Button variant={isEditing ? 'success' : 'primary'} onClick={isEditing ? handleSave : () => setIsEditing(true)} icon={isEditing ? '💾' : '✏️'}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile card */}
      <div className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: 'var(--radius-xl)', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
            {user?.avatar || '👤'}
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>{user?.firstName} {user?.lastName}</h3>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>{formData.title || 'Add your title'}</p>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', margin: 0 }}>📍 {formData.location || 'Add location'}</p>
          </div>
        </div>

        {isEditing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="profile-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Title</label>
                <input type="text" value={formData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g. Frontend Developer" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Location</label>
                <input type="text" value={formData.location} onChange={(e) => updateField('location', e.target.value)} placeholder="e.g. Lagos, Nigeria" />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Bio</label>
              <textarea value={formData.bio} onChange={(e) => updateField('bio', e.target.value)} placeholder="Tell companies about yourself..." rows={4} style={{ resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Skills</label>
              <SkillSelector selected={formData.skills} onChange={(skills) => updateField('skills', skills)} />
            </div>
            <div className="profile-form-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>GitHub</label>
                <input type="url" value={formData.links.github} onChange={(e) => updateLink('github', e.target.value)} placeholder="https://github.com/..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>LinkedIn</label>
                <input type="url" value={formData.links.linkedin} onChange={(e) => updateLink('linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Portfolio</label>
                <input type="url" value={formData.links.portfolio} onChange={(e) => updateLink('portfolio', e.target.value)} placeholder="https://yoursite.dev" />
              </div>
            </div>
          </div>
        ) : (
          <div>
            {formData.bio && <p style={{ marginBottom: 'var(--space-4)', lineHeight: 'var(--line-height-relaxed)' }}>{formData.bio}</p>}
            {formData.skills.length > 0 && (
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Skills</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {formData.skills.map((skill) => (
                    <span key={skill} style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'rgba(124, 58, 237, 0.15)', color: 'var(--color-primary-light)', border: '1px solid rgba(124, 58, 237, 0.3)', fontSize: 'var(--text-sm)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(formData.links.github || formData.links.linkedin || formData.links.portfolio) && (
              <div>
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Links</h4>
                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                  {formData.links.github && <a href={formData.links.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)' }}>🔗 GitHub</a>}
                  {formData.links.linkedin && <a href={formData.links.linkedin} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)' }}>🔗 LinkedIn</a>}
                  {formData.links.portfolio && <a href={formData.links.portfolio} target="_blank" rel="noopener noreferrer" style={{ fontSize: 'var(--text-sm)' }}>🔗 Portfolio</a>}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Experience section */}
      <div className="glass-card" style={{ padding: 'var(--space-6)' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Experience</h3>
        {formData.experience.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {formData.experience.map((exp, i) => (
              <div key={exp.id || i} style={{ display: 'flex', gap: 'var(--space-4)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-primary)' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)' }}>{exp.role}</h4>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-primary-light)', marginBottom: 'var(--space-1)' }}>{exp.company}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>{exp.duration}</p>
                  {exp.description && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{exp.description}</p>}
                </div>
                {isEditing && (
                  <button onClick={() => removeExperience(exp.id)} style={{ color: 'var(--color-accent-rose)', fontSize: 'var(--text-sm)', flexShrink: 0 }}>Remove</button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>No experience added yet</p>
        )}

        {isEditing && (
          <div style={{ marginTop: 'var(--space-6)', padding: 'var(--space-4)', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>Add Experience</h4>
            <div className="profile-form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <input type="text" placeholder="Company" value={newExp.company} onChange={(e) => setNewExp({ ...newExp, company: e.target.value })} />
              <input type="text" placeholder="Role" value={newExp.role} onChange={(e) => setNewExp({ ...newExp, role: e.target.value })} />
            </div>
            <div className="profile-form-grid-split" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <input type="text" placeholder="Duration (e.g. 2023-Present)" value={newExp.duration} onChange={(e) => setNewExp({ ...newExp, duration: e.target.value })} />
              <input type="text" placeholder="Description" value={newExp.description} onChange={(e) => setNewExp({ ...newExp, description: e.target.value })} />
            </div>
            <Button variant="outline" size="sm" onClick={addExperience} type="button" icon="➕">Add</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
