// ============================================================
// AfriHire — Helper Utilities
// Date formatting, skill matching, ID generation, and more
// ============================================================

/**
 * Generate a unique ID
 */
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format a date string to relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  return `${diffMonths}mo ago`;
};

/**
 * Format a date string to a readable format
 */
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Format salary range
 */
export const formatSalary = (salary) => {
  if (!salary) return 'Competitive';
  const { min, max, currency } = salary;
  const formatNum = (n) => {
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return n.toString();
  };
  return `${currency === 'USD' ? '$' : currency}${formatNum(min)} - ${currency === 'USD' ? '$' : currency}${formatNum(max)}`;
};

/**
 * Calculate skill match percentage between candidate and job
 */
export const calculateSkillMatch = (candidateSkills = [], jobSkills = []) => {
  if (!jobSkills.length) return 0;
  const normalizedCandidate = candidateSkills.map((s) => s.toLowerCase());
  const normalizedJob = jobSkills.map((s) => s.toLowerCase());
  const matchCount = normalizedJob.filter((skill) =>
    normalizedCandidate.includes(skill)
  ).length;
  return Math.round((matchCount / normalizedJob.length) * 100);
};

/**
 * Get matching skills between candidate and job
 */
export const getMatchingSkills = (candidateSkills = [], jobSkills = []) => {
  const normalizedCandidate = candidateSkills.map((s) => s.toLowerCase());
  return jobSkills.filter((skill) =>
    normalizedCandidate.includes(skill.toLowerCase())
  );
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Debounce function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

/**
 * Get status color variable name
 */
export const getStatusColor = (status) => {
  const colors = {
    Applied: 'var(--color-status-applied)',
    Reviewed: 'var(--color-status-reviewed)',
    Shortlisted: 'var(--color-status-shortlisted)',
    Rejected: 'var(--color-status-rejected)',
  };
  return colors[status] || 'var(--color-text-muted)';
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Sort jobs by different criteria
 */
export const sortJobs = (jobs, sortBy = 'newest') => {
  const sorted = [...jobs];
  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
    case 'salary-high':
      return sorted.sort((a, b) => (b.salary?.max || 0) - (a.salary?.max || 0));
    case 'salary-low':
      return sorted.sort((a, b) => (a.salary?.min || 0) - (b.salary?.min || 0));
    case 'applicants':
      return sorted.sort((a, b) => (b.applicants || 0) - (a.applicants || 0));
    default:
      return sorted;
  }
};

/**
 * Save to localStorage safely
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
  }
};

/**
 * Load from localStorage safely
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to load ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Clear a key from localStorage
 */
export const clearFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to clear ${key} from localStorage:`, error);
  }
};
