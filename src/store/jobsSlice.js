// ============================================================
// AfriHire — Jobs Slice
// Job listings state management with CRUD operations
// ============================================================

import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchJobsApi, postJobApi, updateJobApi, deleteJobApi } from '../utils/api';
import { saveToStorage, loadFromStorage } from '../utils/helpers';
import { mockJobs } from '../data/mockJobs';

const STORAGE_KEY = 'afrihire_jobs';

// Entity adapter for normalized job storage
const jobsAdapter = createEntityAdapter({
  selectId: (job) => job.id,
  sortComparer: (a, b) => new Date(b.postedAt) - new Date(a.postedAt),
});

// Load persisted custom jobs (posted by companies)
const persistedJobs = loadFromStorage(STORAGE_KEY, []);
const allInitialJobs = [...mockJobs, ...persistedJobs.filter(pj => !mockJobs.find(mj => mj.id === pj.id))];

const initialState = jobsAdapter.getInitialState({
  loading: false,
  error: null,
  filters: {
    search: '',
    skills: [],
    location: '',
    experience: '',
    type: '',
    sortBy: 'newest',
    remoteOnly: true,
  },
  initialized: false,
});

// Pre-populate with all jobs
const preloadedState = { ...jobsAdapter.setAll(initialState, allInitialJobs), initialized: true };

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await fetchJobsApi(filters);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postJob = createAsyncThunk(
  'jobs/postJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await postJobApi(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await updateJobApi(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (jobId, { rejectWithValue }) => {
    try {
      await deleteJobApi(jobId);
      return jobId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: preloadedState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        skills: [],
        location: '',
        experience: '',
        type: '',
        sortBy: 'newest',
        remoteOnly: true,
      };
    },
    incrementApplicants: (state, action) => {
      const job = state.entities[action.payload];
      if (job) {
        job.applicants = (job.applicants || 0) + 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Post job
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        jobsAdapter.addOne(state, action.payload);
        // Persist custom jobs
        const customJobs = Object.values(state.entities).filter(
          (j) => !mockJobs.find((mj) => mj.id === j.id)
        );
        saveToStorage(STORAGE_KEY, customJobs);
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update job
      .addCase(updateJob.fulfilled, (state, action) => {
        jobsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: action.payload,
        });
        const customJobs = Object.values(state.entities).filter(
          (j) => !mockJobs.find((mj) => mj.id === j.id)
        );
        saveToStorage(STORAGE_KEY, customJobs);
      })
      // Delete job
      .addCase(deleteJob.fulfilled, (state, action) => {
        jobsAdapter.removeOne(state, action.payload);
        const customJobs = Object.values(state.entities).filter(
          (j) => !mockJobs.find((mj) => mj.id === j.id)
        );
        saveToStorage(STORAGE_KEY, customJobs);
      });
  },
});

export const { setFilters, clearFilters, incrementApplicants } = jobsSlice.actions;

// Selectors from entity adapter
export const {
  selectAll: selectAllJobs,
  selectById: selectJobById,
  selectIds: selectJobIds,
  selectTotal: selectTotalJobs,
} = jobsAdapter.getSelectors((state) => state.jobs);

export const selectJobFilters = (state) => state.jobs.filters;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;

export default jobsSlice.reducer;
