// ============================================================
// AfriHire — useJobSearch Hook
// Debounced search with URL params sync and memoized filtering
// ============================================================

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { selectAllJobs, setFilters, selectJobFilters } from '../store/jobsSlice';
import { sortJobs } from '../utils/helpers';

export const useJobSearch = () => {
  const dispatch = useDispatch();
  const allJobs = useSelector(selectAllJobs);
  const storeFilters = useSelector(selectJobFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const [debouncedSearch, setDebouncedSearch] = useState(storeFilters.search || '');
  const debounceTimerRef = useRef(null);

  // Sync URL params to store on mount
  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    const urlSkills = searchParams.get('skills')?.split(',').filter(Boolean) || [];
    const urlLocation = searchParams.get('location') || '';
    const urlExperience = searchParams.get('experience') || '';
    const urlType = searchParams.get('type') || '';
    const urlSortBy = searchParams.get('sort') || 'newest';
    const remoteOnly = searchParams.get('remote') !== '0';

    dispatch(
      setFilters({
        search: urlSearch,
        skills: urlSkills,
        location: urlLocation,
        experience: urlExperience,
        type: urlType,
        sortBy: urlSortBy,
        remoteOnly,
      })
    );
    setDebouncedSearch(urlSearch);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced search handler
  const handleSearch = useCallback(
    (searchTerm) => {
      // Update UI immediately
      dispatch(setFilters({ search: searchTerm }));

      // Debounce the URL update
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setDebouncedSearch(searchTerm);
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm) {
          newParams.set('search', searchTerm);
        } else {
          newParams.delete('search');
        }
        setSearchParams(newParams, { replace: true });
      }, 300);
    },
    [dispatch, searchParams, setSearchParams]
  );

  // Filter update handler (non-debounced)
  const updateFilters = useCallback(
    (newFilters) => {
      dispatch(setFilters(newFilters));

      // Sync to URL
      const newParams = new URLSearchParams(searchParams);
      Object.entries(newFilters).forEach(([key, value]) => {
        if (key === 'skills' && Array.isArray(value)) {
          if (value.length) {
            newParams.set('skills', value.join(','));
          } else {
            newParams.delete('skills');
          }
        } else if (key === 'sortBy') {
          if (value && value !== 'newest') {
            newParams.set('sort', value);
          } else {
            newParams.delete('sort');
          }
        } else if (key === 'remoteOnly') {
          if (value) {
            newParams.delete('remote');
          } else {
            newParams.set('remote', '0');
          }
        } else {
          if (value) {
            newParams.set(key, value);
          } else {
            newParams.delete(key);
          }
        }
      });
      setSearchParams(newParams, { replace: true });
    },
    [dispatch, searchParams, setSearchParams]
  );

  // Memoized filtered and sorted results
  const filteredJobs = useMemo(() => {
    let result = [...allJobs];

    // Text search (use debounced value)
    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search) ||
          job.skills.some((s) => s.toLowerCase().includes(search))
      );
    }

    // Skills filter
    if (storeFilters.skills?.length > 0) {
      result = result.filter((job) =>
        storeFilters.skills.some((skill) =>
          job.skills.map((s) => s.toLowerCase()).includes(skill.toLowerCase())
        )
      );
    }

    // Location filter
    if (storeFilters.location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(storeFilters.location.toLowerCase())
      );
    }

    // Experience filter
    if (storeFilters.experience) {
      result = result.filter((job) => job.experience === storeFilters.experience);
    }

    // Type filter
    if (storeFilters.type) {
      result = result.filter((job) => job.type === storeFilters.type);
    }

    if (storeFilters.remoteOnly) {
      result = result.filter((job) => job.remote !== false);
    }

    // Sort
    return sortJobs(result, storeFilters.sortBy);
  }, [allJobs, debouncedSearch, storeFilters]);

  // Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (storeFilters.search) count++;
    if (storeFilters.skills?.length) count++;
    if (storeFilters.location) count++;
    if (storeFilters.experience) count++;
    if (storeFilters.type) count++;
    if (!storeFilters.remoteOnly) count++;
    return count;
  }, [storeFilters]);

  return {
    jobs: filteredJobs,
    filters: storeFilters,
    totalJobs: allJobs.length,
    resultCount: filteredJobs.length,
    activeFilterCount,
    handleSearch,
    updateFilters,
  };
};
