// ============================================================
// AfriHire — RegisterForm Component
// Multi-step registration (role → details → skills/company info)
// ============================================================

import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import SkillSelector from '../profile/SkillSelector';

const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Candidate fields
    firstName: '',
    lastName: '',
    title: '',
    location: '',
    skills: [],
    bio: '',
    // Company fields
    companyName: '',
    description: '',
    website: '',
    industry: '',
    size: '',
  });
  const [validationError, setValidationError] = useState('');

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationError('');
  };

  const nextStep = () => {
    if (step === 1 && !formData.role) {
      setValidationError('Please select a role');
      return;
    }
    if (step === 2) {
      if (!formData.email || !formData.password) {
        setValidationError('Please fill in all required fields');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setValidationError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setValidationError('Password must be at least 6 characters');
        return;
      }
    }
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...userData } = formData;
    userData.avatar = formData.role === 'candidate' ? '👩🏾‍💻' : '🏢';
    userData.savedJobs = [];
    await register(userData);
  };

  const stepIndicator = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-6)' }}>
      {[1, 2, 3].map((s) => (
        <React.Fragment key={s}>
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              background: step >= s ? 'var(--gradient-primary)' : 'var(--glass-bg)',
              color: step >= s ? 'white' : 'var(--color-text-muted)',
              border: step >= s ? 'none' : '1px solid var(--color-border)',
              transition: 'all var(--transition-normal)',
            }}
          >
            {step > s ? '✓' : s}
          </div>
          {s < 3 && (
            <div style={{ width: '3rem', height: '2px', background: step > s ? 'var(--color-primary)' : 'var(--color-border)', transition: 'background var(--transition-normal)' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {stepIndicator}

      {(error || validationError) && (
        <div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: 'var(--color-accent-rose-light)',
            fontSize: 'var(--text-sm)',
          }}
        >
          ⚠️ {error || validationError}
        </div>
      )}

      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', textAlign: 'center' }}>
            I want to...
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: 'var(--space-6)' }}>
            Choose how you'll use AfriHire
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
            {[
              { role: 'candidate', icon: '👩‍💻', title: 'Find Jobs', desc: 'Search and apply for remote positions' },
              { role: 'company', icon: '🏢', title: 'Hire Talent', desc: 'Post jobs and find great candidates' },
            ].map((option) => (
              <button
                key={option.role}
                type="button"
                onClick={() => updateField('role', option.role)}
                style={{
                  padding: 'var(--space-6)',
                  borderRadius: 'var(--radius-xl)',
                  background: formData.role === option.role ? 'rgba(124, 58, 237, 0.15)' : 'var(--glass-bg)',
                  border: `2px solid ${formData.role === option.role ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all var(--transition-normal)',
                }}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 'var(--space-3)' }}>{option.icon}</span>
                <p style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>{option.title}</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>{option.desc}</p>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-6)' }}>
            <Button variant="primary" size="lg" fullWidth onClick={nextStep} type="button">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Account Details */}
      {step === 2 && (
        <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            Create your account
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {formData.role === 'candidate' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <label htmlFor="reg-fname" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>First Name</label>
                  <input id="reg-fname" type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} placeholder="Amara" required />
                </div>
                <div>
                  <label htmlFor="reg-lname" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Last Name</label>
                  <input id="reg-lname" type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} placeholder="Okafor" required />
                </div>
              </div>
            ) : (
              <div>
                <label htmlFor="reg-company" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Company Name</label>
                <input id="reg-company" type="text" value={formData.companyName} onChange={(e) => updateField('companyName', e.target.value)} placeholder="TechCorp Africa" required />
              </div>
            )}
            <div>
              <label htmlFor="reg-email" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Email</label>
              <input id="reg-email" type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="reg-password" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Password</label>
              <input id="reg-password" type="password" value={formData.password} onChange={(e) => updateField('password', e.target.value)} placeholder="At least 6 characters" required />
            </div>
            <div>
              <label htmlFor="reg-confirm" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Confirm Password</label>
              <input id="reg-confirm" type="password" value={formData.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} placeholder="Confirm password" required />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Button variant="secondary" size="lg" onClick={prevStep} type="button">Back</Button>
            <Button variant="primary" size="lg" fullWidth onClick={nextStep} type="button">Continue</Button>
          </div>
        </div>
      )}

      {/* Step 3: Profile Details */}
      {step === 3 && (
        <div style={{ animation: 'fadeInUp 0.3s ease-out' }}>
          <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
            {formData.role === 'candidate' ? 'Tell us about yourself' : 'Company details'}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {formData.role === 'candidate' ? (
              <>
                <div>
                  <label htmlFor="reg-title" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Professional Title</label>
                  <input id="reg-title" type="text" value={formData.title} onChange={(e) => updateField('title', e.target.value)} placeholder="e.g. Frontend Developer" />
                </div>
                <div>
                  <label htmlFor="reg-location" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Location</label>
                  <input id="reg-location" type="text" value={formData.location} onChange={(e) => updateField('location', e.target.value)} placeholder="e.g. Lagos, Nigeria" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Skills</label>
                  <SkillSelector selected={formData.skills} onChange={(skills) => updateField('skills', skills)} />
                </div>
                <div>
                  <label htmlFor="reg-bio" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Bio</label>
                  <textarea id="reg-bio" value={formData.bio} onChange={(e) => updateField('bio', e.target.value)} placeholder="Tell companies about your experience..." rows={3} style={{ resize: 'vertical' }} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="reg-industry" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Industry</label>
                  <input id="reg-industry" type="text" value={formData.industry} onChange={(e) => updateField('industry', e.target.value)} placeholder="e.g. Fintech, SaaS" />
                </div>
                <div>
                  <label htmlFor="reg-website" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Website</label>
                  <input id="reg-website" type="url" value={formData.website} onChange={(e) => updateField('website', e.target.value)} placeholder="https://yourcompany.com" />
                </div>
                <div>
                  <label htmlFor="reg-desc" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Description</label>
                  <textarea id="reg-desc" value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="Tell candidates about your company..." rows={3} style={{ resize: 'vertical' }} />
                </div>
                <div>
                  <label htmlFor="reg-size" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Company Size</label>
                  <select id="reg-size" value={formData.size} onChange={(e) => updateField('size', e.target.value)}>
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="reg-comp-loc" style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Location</label>
                  <input id="reg-comp-loc" type="text" value={formData.location} onChange={(e) => updateField('location', e.target.value)} placeholder="e.g. Lagos, Nigeria" />
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
            <Button variant="secondary" size="lg" onClick={prevStep} type="button">Back</Button>
            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              Create Account
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
