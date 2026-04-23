// ============================================================
// AfriHire — JobFilters Component
// Smart filter sidebar with skill chips, dropdowns
// ============================================================

import React from 'react';
import { allSkills, allLocations, experienceLevels, jobTypes } from '../../data/mockJobs';
import Button from '../ui/Button';

const JobFilters = ({ filters, onUpdateFilters, resultCount, totalJobs, activeFilterCount }) => {
  const toggleSkill = (skill) => {
    const current = filters.skills || [];
    const newSkills = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    onUpdateFilters({ skills: newSkills });
  };

  const clearAll = () => {
    onUpdateFilters({
      search: '',
      skills: [],
      location: '',
      experience: '',
      type: '',
      sortBy: 'newest',
      remoteOnly: true,
    });
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: 'var(--space-5)',
        position: 'sticky',
        top: 'calc(var(--navbar-height) + var(--space-4))',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
        <div>
          <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)', margin: 0 }}>
            Filters
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0, marginTop: '0.25rem' }}>
            {resultCount} of {totalJobs} jobs
          </p>
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      <div style={{ marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <input
          type="checkbox"
          id="remote-only-filter"
          checked={!!filters.remoteOnly}
          onChange={(e) => onUpdateFilters({ remoteOnly: e.target.checked })}
          style={{ width: 'auto', accentColor: 'var(--color-primary)' }}
        />
        <label htmlFor="remote-only-filter" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', cursor: 'pointer', margin: 0 }}>
          Remote roles only (AfriHire default)
        </label>
      </div>

      {/* Sort */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onUpdateFilters({ sortBy: e.target.value })}
          id="sort-filter"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="salary-high">Highest Salary</option>
          <option value="salary-low">Lowest Salary</option>
          <option value="applicants">Most Applicants</option>
        </select>
      </div>

      {/* Job Type */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Job Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => onUpdateFilters({ type: e.target.value })}
          id="type-filter"
        >
          <option value="">All Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Experience */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Experience Level
        </label>
        <select
          value={filters.experience}
          onChange={(e) => onUpdateFilters({ experience: e.target.value })}
          id="experience-filter"
        >
          <option value="">All Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Location
        </label>
        <select
          value={filters.location}
          onChange={(e) => onUpdateFilters({ location: e.target.value })}
          id="location-filter"
        >
          <option value="">All Locations</option>
          {allLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Skills */}
      <div>
        <label style={{ display: 'block', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          Skills
        </label>
        {/* Selected */}
        {filters.skills?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', marginBottom: 'var(--space-2)' }}>
            {filters.skills.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                style={{
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(124, 58, 237, 0.2)',
                  color: 'var(--color-primary-light)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                {skill} ✕
              </button>
            ))}
          </div>
        )}
        {/* Available */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', maxHeight: '120px', overflowY: 'auto' }}>
          {allSkills
            .filter((s) => !filters.skills?.includes(s))
            .slice(0, 15)
            .map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                style={{
                  padding: '0.125rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontSize: 'var(--text-xs)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {skill}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;
