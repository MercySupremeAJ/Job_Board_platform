// ============================================================
// AfriHire — SkillSelector Component
// Animated multi-select with popular tech skills
// ============================================================

import React, { useState } from 'react';

const popularSkills = [
  'React', 'JavaScript', 'TypeScript', 'Python', 'Node.js', 'Vue.js',
  'Angular', 'Django', 'Flask', 'Ruby', 'Go', 'Rust', 'Java', 'Swift',
  'Kotlin', 'React Native', 'Flutter', 'AWS', 'Azure', 'GCP',
  'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL',
  'REST APIs', 'Git', 'CI/CD', 'Linux', 'HTML', 'CSS', 'Sass',
  'Next.js', 'Express', 'Firebase', 'SQL', 'Machine Learning',
  'TensorFlow', 'PyTorch', 'Figma', 'UI Design', 'UX Research',
  'Solidity', 'Web3.js', 'Cybersecurity', 'DevOps', 'Agile',
];

const SkillSelector = ({ selected = [], onChange, maxSkills = 15 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = popularSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selected.includes(skill)
  );

  const toggleSkill = (skill) => {
    if (selected.includes(skill)) {
      onChange(selected.filter((s) => s !== skill));
    } else if (selected.length < maxSkills) {
      onChange([...selected, skill]);
    }
  };

  const removeSkill = (skill) => {
    onChange(selected.filter((s) => s !== skill));
  };

  return (
    <div>
      {/* Selected skills */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          {selected.map((skill) => (
            <span
              key={skill}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(124, 58, 237, 0.15)',
                color: 'var(--color-primary-light)',
                border: '1px solid rgba(124, 58, 237, 0.3)',
                fontSize: 'var(--text-sm)',
                animation: 'scaleIn 0.2s ease-out',
              }}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                style={{
                  color: 'var(--color-primary-light)',
                  fontSize: '0.75rem',
                  marginLeft: '0.25rem',
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={`Search skills... (${selected.length}/${maxSkills})`}
        style={{ marginBottom: 'var(--space-3)' }}
      />

      {/* Available skills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
          maxHeight: '150px',
          overflowY: 'auto',
          padding: 'var(--space-2)',
        }}
      >
        {filteredSkills.slice(0, 20).map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: 'var(--text-sm)',
              cursor: selected.length >= maxSkills ? 'not-allowed' : 'pointer',
              transition: 'all var(--transition-fast)',
              opacity: selected.length >= maxSkills ? 0.5 : 1,
            }}
          >
            + {skill}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillSelector;
