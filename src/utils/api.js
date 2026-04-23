// ============================================================
// AfriHire — API Simulation Layer
// Simulated async API calls with realistic delays
// ============================================================

/**
 * Simulate an API call with delay
 * @param {*} data - Data to return
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} shouldFail - Whether the call should fail
 * @returns {Promise}
 */
export const simulateApiCall = (data, delay = 800, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API request failed. Please try again.'));
      } else {
        resolve({ data, status: 200 });
      }
    }, delay);
  });
};

/**
 * Simulate fetching jobs with optional filters
 */
export const fetchJobsApi = async (filters = {}) => {
  const { mockJobs } = await import('../data/mockJobs');
  let jobs = [...mockJobs];

  if (filters.search) {
    const search = filters.search.toLowerCase();
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.skills.some((s) => s.toLowerCase().includes(search))
    );
  }

  if (filters.skills && filters.skills.length > 0) {
    jobs = jobs.filter((job) =>
      filters.skills.some((skill) => job.skills.includes(skill))
    );
  }

  if (filters.location) {
    jobs = jobs.filter((job) =>
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  if (filters.experience) {
    jobs = jobs.filter((job) => job.experience === filters.experience);
  }

  if (filters.type) {
    jobs = jobs.filter((job) => job.type === filters.type);
  }

  return simulateApiCall(jobs, 600);
};

/**
 * Simulate applying to a job
 */
export const applyToJobApi = async (applicationData) => {
  return simulateApiCall(
    {
      ...applicationData,
      id: `app-${Date.now()}`,
      status: 'Applied',
      appliedAt: new Date().toISOString(),
    },
    1000
  );
};

/**
 * Simulate posting a new job
 */
export const postJobApi = async (jobData) => {
  return simulateApiCall(
    {
      ...jobData,
      id: `job-${Date.now()}`,
      postedAt: new Date().toISOString(),
      applicants: 0,
    },
    1000
  );
};

/**
 * Simulate updating a job
 */
export const updateJobApi = async (jobData) => {
  return simulateApiCall(jobData, 800);
};

/**
 * Simulate deleting a job
 */
export const deleteJobApi = async (jobId) => {
  return simulateApiCall({ id: jobId, deleted: true }, 600);
};

/**
 * Simulate updating application status
 */
export const updateApplicationStatusApi = async (applicationId, status) => {
  return simulateApiCall({ id: applicationId, status }, 500);
};

/**
 * Simulate user login
 */
export const loginApi = async (credentials) => {
  const { mockUsers } = await import('../data/mockUsers');
  const allUsers = [...mockUsers.candidates, ...mockUsers.companies];
  const user = allUsers.find(
    (u) => u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    const { password, ...safeUser } = user;
    return simulateApiCall(safeUser, 800);
  }

  return simulateApiCall(null, 800, true).catch(() => {
    throw new Error('Invalid email or password. Try using the demo buttons below.');
  });
};

/**
 * Simulate user registration
 */
export const registerApi = async (userData) => {
  const id = `${userData.role}-${Date.now()}`;
  const newUser = {
    ...userData,
    id,
    createdAt: new Date().toISOString(),
    savedJobs: [],
  };
  const { password, ...safeUser } = newUser;
  return simulateApiCall(safeUser, 1000);
};
