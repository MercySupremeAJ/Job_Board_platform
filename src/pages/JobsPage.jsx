// ============================================================
// AfriHire — JobsPage
// Browse all jobs with filters + search (useSearchParams)
// ============================================================

import React, { useState } from 'react';
import { useJobSearch } from '../hooks/useJobSearch';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import { SearchBar } from '../components/ui/SharedUI';
import Button from '../components/ui/Button';

const JobsPage = () => {
  const { jobs, filters, totalJobs, resultCount, activeFilterCount, handleSearch, updateFilters } = useJobSearch();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filterProps = {
    filters,
    onUpdateFilters: updateFilters,
    resultCount,
    totalJobs,
    activeFilterCount,
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: 'calc(var(--navbar-height) + var(--space-8)) var(--space-6) var(--space-8)',
      }}
    >
      <div style={{ maxWidth: 'var(--max-content-width)', margin: '0 auto' }}>
        <div style={{ marginBottom: 'var(--space-8)', animation: 'fadeInUp 0.5s ease-out' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', marginBottom: 'var(--space-2)' }}>
            Browse <span className="gradient-text">Remote Jobs</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-6)' }}>
            {resultCount} remote positions curated for African tech talent
          </p>
          <SearchBar
            value={filters.search}
            onChange={handleSearch}
            placeholder="Search by title, company, or skill..."
          />
          <div className="jobs-mobile-filter-bar" style={{ marginTop: 'var(--space-4)' }}>
            <Button variant="outline" size="sm" onClick={() => setFiltersOpen((o) => !o)} icon="🎛️">
              {filtersOpen ? 'Hide filters' : 'Filters & sort'}
            </Button>
          </div>
        </div>

        <div className="jobs-page-layout">
          <div className="jobs-filters-desktop">
            <JobFilters {...filterProps} />
          </div>

          {filtersOpen && (
            <div className="jobs-filters-mobile-panel">
              <JobFilters
                {...filterProps}
                onUpdateFilters={(f) => {
                  updateFilters(f);
                  setFiltersOpen(false);
                }}
              />
            </div>
          )}

          <div className="jobs-list-column" style={{ minWidth: 0 }}>
            <JobList jobs={jobs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
